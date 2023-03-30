import express from "express";
import config from "./config/config.js";
import myLogger from "./services/logger/index.js";


const app = express();

app.use(express.json());

//testing myLogger
myLogger("login service").error("this error is genrating from logIn service")
myLogger("mail service").info("Information from Mail Service")
myLogger("forum service").warn("warning from Forum service")


app.get("/", (req, res) => {
    res.send("API is running...");
});



app.get("/api/test", (req, res) => {
    res.send("API is running...");
});

app.listen(config.PORT, () => {
    console.log(`server running on ${config.PORT}`);
});
