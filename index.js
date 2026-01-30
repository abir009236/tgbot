import express from "express";
import bodyParser from "body-parser";
import { initBot } from "./bot.js";

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.RENDER_EXTERNAL_URL;

initBot(app, WEBHOOK_URL);

app.get("/", (req, res) => {
  res.send("Bot running");
});

app.listen(PORT, () => {
  console.log("Server running");
});
