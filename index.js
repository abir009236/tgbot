import express from "express";
import "./bot.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🤖 Truth Or Dare Bot is running");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
