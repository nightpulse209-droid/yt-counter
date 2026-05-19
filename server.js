const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();

const API_KEY = "YAHAN_APNI_API_KEY_PASTE_KARO";

app.use(express.static(path.join(__dirname, "public")));

app.get("/subs/:id", async (req, res) => {
  try {
    const channelId = req.params.id;

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`
    );

    const data = await response.json();

    res.json(data.items[0].statistics);
  } catch (err) {
    res.status(500).json({ error: "Failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});