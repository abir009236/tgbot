import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./config.js";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

export async function getQuestion(mode) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
Generate ONE ${mode} question.
Style: Fun + light roast
Rules:
- No NSFW
- No hate
- Group friendly
- Short sentence
Only output the question text.
`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();

  } catch (err) {
    console.error("Gemini error:", err);
    return "Truth: Who here would survive a zombie apocalypse the longest? 🧟‍♂️";
  }
}
