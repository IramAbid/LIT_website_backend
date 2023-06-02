import express from "express";
import config from "./config/config.js";
import myLogger from "./services/logger/index.js";
import authRoutes from "./routes/authRoutes.js"
import {} from 'dotenv/config'
import newsfeedRoutes from "./routes/newsfeedRoutes.js"


const app = express();

app.use(express.json());
app.use(authRoutes)
app.use(newsfeedRoutes)
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(config.PORT, () => {
    myLogger("Server").info(`server running on port ${config.PORT}`)
});