import express from "express";
import config from "./config/config.js";
import myLogger from "./services/logger/index.js";


const app = express();

app.use(express.json());

//testing myLogger
myLogger("Test Error Log").error("This is a test error message")
myLogger("Test Info Log").info("This is a test info message")
myLogger("Test Warn Log").warn("This is a test warn message")


app.get("/", (req, res) => {
    res.send("API is running...");
});



app.get("/api/test", (req, res) => {
    res.send("API is running...");
});

app.listen(config.PORT, () => {
    console.log(`server running on ${config.PORT}`);
});
