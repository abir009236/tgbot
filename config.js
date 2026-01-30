import dotenv from "dotenv";
dotenv.config();

export const BOT_TOKEN = process.env.BOT_TOKEN;
export const GEMINI_KEY = process.env.GEMINI_KEY;

if (!BOT_TOKEN || !GEMINI_KEY) {
  console.error("ENV missing");
  process.exit(1);
}
