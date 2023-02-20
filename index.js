import express from "express";
import config from "./config/config.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/api/test", (req, res) => {
    res.send("API is running...");
});

app.listen(config.PORT, () => {
    console.log(`server running on ${config.PORT}`);
});
