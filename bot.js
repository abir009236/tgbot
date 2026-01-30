import TelegramBot from "node-telegram-bot-api";
import { BOT_TOKEN } from "./config.js";
import { getQuestion } from "./ai.js";

export const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🎉 Truth or Dare time!\nChoose one 👇", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Truth", callback_data: "truth" }],
        [{ text: "Dare", callback_data: "dare" }],
        [{ text: "Random", callback_data: "random" }]
      ]
    }
  });
});

// Button handler
bot.on("callback_query", async (q) => {
  try {
    await bot.answerCallbackQuery(q.id); // ✅ REQUIRED

    const chatId = q.message.chat.id;
    let mode = q.data;

    if (mode === "end") {
      return bot.sendMessage(chatId, "Game ended 👋");
    }

    if (mode === "random") {
      mode = Math.random() > 0.5 ? "truth" : "dare";
    }

    const question = await getQuestion(mode);

    await bot.sendMessage(chatId, question, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Next 🔁", callback_data: q.data }],
          [{ text: "End ❌", callback_data: "end" }]
        ]
      }
    });

  } catch (err) {
    console.error("Callback error:", err);
  }
});
