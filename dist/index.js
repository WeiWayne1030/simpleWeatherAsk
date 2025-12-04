import { weatherFlow } from "./weatherFlow.js";
import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function askCity() {
    rl.question("請輸入城市名稱: ", async (city) => {
        if (!city.trim()) {
            console.log("請輸入有效城市名稱！");
            return askCity();
        }
        try {
            const result = await weatherFlow.run({ city });
            console.log("\n=== 天氣結果 ===");
            console.log(result.result.reply);
        }
        catch (err) {
            console.error("發生錯誤:", err);
        }
        console.log("\n"); // 空行
        askCity(); // 再次詢問
    });
}
console.log("=== 天氣查詢器 ===");
askCity();
