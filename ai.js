import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./config.js";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

export async function getQuestion(mode) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
Create ONE unique ${mode} question.
Style: Fun, friendly roast.
Rules:
- No NSFW
- No hate
- No repeat questions
- Group friendly
Return ONLY the question text.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (!text || text.length < 5) throw new Error("Empty");

    return text.trim();

  } catch (e) {
    return mode === "dare"
      ? "Dare: Send a funny emoji that describes you 😂"
      : "Truth: Who here checks their phone the most? 📱";
  }
}
