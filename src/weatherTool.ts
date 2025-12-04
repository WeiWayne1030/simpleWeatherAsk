import fetch from "node-fetch";
import { WeatherApiResponse} from "./weatherApiResponse.js";
import "dotenv/config";

export async function getWeather(lat: number, lon: number) {

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=zh_tw`;

  const resp = await fetch(url);
  const data = (await resp.json()) as WeatherApiResponse; // ✅ 型別斷言

  if (!data.main) {
    throw new Error("Weather data not found");
  }

  return {
    temp: data.main.temp,
    humidity: data.main.humidity,
    description: data.weather[0]?.description || "無資料",
    city: data.name,
  };
}