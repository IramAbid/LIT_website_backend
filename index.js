import express from "express";
import config from "./config/config.js";
import myLogger from "./services/logger/index.js";
import authRoutes from "./routes/authRoutes.js"
import {} from 'dotenv/config'


const app = express();

app.use(express.json());
app.use(authRoutes)





app.get("/", (req, res) => {
    res.send("API is running...");

});



app.get("/api/test", (req, res) => {
    res.send("API is running...");
});

app.listen(config.PORT, () => {
    myLogger("Server").info(`server running on port ${config.PORT}`)
});
