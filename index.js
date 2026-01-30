import express from "express";
import "./bot.js";

const app = express();
app.get("/", (_, res) => res.send("Bot running"));

app.listen(3000, () => console.log("Server started"));
