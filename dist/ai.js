// 讀取 .env
import "dotenv/config";
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";
export const ai = genkit({
    plugins: [
        googleAI({
            apiKey: "AIzaSyA3-uwaEmREv4REKHfZhyDleC4GI-T6VvA", // 從環境變數讀取
        }),
    ],
    model: googleAI.model("gemini-2.5-flash"),
});
