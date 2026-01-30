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
Style: Fun + light roast.
Rules:
- No NSFW
- No hate
- No bullying
- Group friendly
- Short & simple
Only output the question text.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return text?.trim() || fallback(mode);

  } catch (err) {
    console.error("Gemini error:", err);
    return fallback(mode);
  }
}

function fallback(mode) {
  if (mode === "dare") return "Dare: Change your nickname for 1 minute 😆";
  return "Truth: Who here laughs at their own jokes the most? 😂";
}
