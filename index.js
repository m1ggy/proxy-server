const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["*"] }));

app.use((req, _, next) => {
  console.log("Incoming request:", req.ip);
  next();
});

app.get("/ping", (_, res) => {
  res.send("pong");
});

app.get("/proxy/", async (req, res) => {
  try {
    const { url = null } = req.query;

    if (!url) throw String("URL not provided");

    const response = await axios(url);
    console.debug("DATA: ", response.data);
    res.status(200).send(response.data);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});
