import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./config.js";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

export async function getQuestion(mode) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
Generate ONE short ${mode} question.
Style: Fun + Roast
Rules:
- No NSFW
- No hate
- Group-friendly
Only output the question text.
`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}
