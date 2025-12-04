import fetch from "node-fetch";
export async function getWeather(lat, lon) {
    const apiKey = "478641caeaf3370a06ecd504fda3a17a";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=zh_tw`;
    const resp = await fetch(url);
    const data = (await resp.json()); // ✅ 型別斷言
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
