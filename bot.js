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

  // START
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "🎉 Truth or Dare time!\nChoose one 👇", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Truth", callback_data: "mode_truth" }],
          [{ text: "Dare", callback_data: "mode_dare" }],
          [{ text: "Random", callback_data: "mode_random" }]
        ]
      }
    });
  });

  // BUTTON HANDLER
  bot.on("callback_query", async (q) => {
    await bot.answerCallbackQuery(q.id);

    const chatId = q.message.chat.id;
    const data = q.data;

    // END GAME
    if (data === "end") {
      return bot.sendMessage(chatId, "Game ended 👋");
    }

    // DETERMINE MODE
    let mode;
    if (data === "mode_truth" || data === "next_truth") mode = "truth";
    else if (data === "mode_dare" || data === "next_dare") mode = "dare";
    else if (data === "mode_random" || data === "next_random") {
      mode = Math.random() > 0.5 ? "truth" : "dare";
    }

    const question = await getQuestion(mode);

    // SEND QUESTION WITH CORRECT NEXT STATE
    bot.sendMessage(chatId, question, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Next 🔁", callback_data: `next_${mode}` }],
          [{ text: "End ❌", callback_data: "end" }]
        ]
      }
    });
  });
}
