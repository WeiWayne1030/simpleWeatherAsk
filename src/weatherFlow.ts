import { z } from "genkit";
import fs from "fs";
import { ai } from "./ai.js";
import { getWeather } from "./weatherTool.js";
import "dotenv/config";

const promptText = fs.readFileSync("./src/weather.md", "utf8");


async function cityToLatLon(city: string) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    city
  )}&limit=1&appid=${apiKey}`;

  const resp = await fetch(url);
  const data = await resp.json();

  if (!data[0]) throw new Error(`無法找到城市: ${city}`);
  return { lat: data[0].lat, lon: data[0].lon };
}

export const weatherFlow = ai.defineFlow(
  {
    name: "weatherFlow",
    inputSchema: z.object({ city: z.string() }),
    outputSchema: z.object({ reply: z.string() }),
  },
  async (input) => {
    const { lat, lon } = await cityToLatLon(input.city);
    console.log(`Coordinates for ${input.city}: lat=${lat}, lon=${lon}`);
    const weather = await getWeather(lat, lon);

    const { text } = await ai.generate({
      prompt: `${promptText}\nUser Input: ${input.city}\n\n目前天氣資料:\n城市: ${weather.city}\n氣溫: ${weather.temp}\n濕度: ${weather.humidity}\n天氣: ${weather.description}`,
    });

    return { reply: text };
  }
);