import TelegramBot from "node-telegram-bot-api";
import { BOT_TOKEN } from "./config.js";
import { getQuestion } from "./ai.js";

export const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Choose mode 👇", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Truth", callback_data: "truth" }],
        [{ text: "Dare", callback_data: "dare" }],
        [{ text: "Random", callback_data: "random" }]
      ]
    }
  });
});

bot.on("callback_query", async (q) => {
  const chatId = q.message.chat.id;
  const mode = q.data;

  const question = await getQuestion(mode);

  bot.sendMessage(chatId, question, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Next 🔁", callback_data: mode }],
        [{ text: "End ❌", callback_data: "end" }]
      ]
    }
  });
});
