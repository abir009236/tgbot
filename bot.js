import TelegramBot from "node-telegram-bot-api";
import { BOT_TOKEN } from "./config.js";
import { getQuestion } from "./ai.js";

export function initBot(app, WEBHOOK_URL) {
  const bot = new TelegramBot(BOT_TOKEN);

  bot.setWebHook(`${WEBHOOK_URL}/bot${BOT_TOKEN}`);

  app.post(`/bot${BOT_TOKEN}`, async (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "🎉 Truth or Dare!\nChoose 👇", {
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
    await bot.answerCallbackQuery(q.id);

    let mode = q.data;
    if (mode === "random") {
      mode = Math.random() > 0.5 ? "truth" : "dare";
    }

    if (mode === "end") {
      return bot.sendMessage(q.message.chat.id, "Game ended 👋");
    }

    const question = await getQuestion(mode);

    bot.sendMessage(q.message.chat.id, question, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Next 🔁", callback_data: q.data }],
          [{ text: "End ❌", callback_data: "end" }]
        ]
      }
    });
  });
}
