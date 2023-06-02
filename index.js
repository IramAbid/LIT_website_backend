import express from "express";
import config from "./config/config.js";
import myLogger from "./services/logger/index.js";
import authRoutes from "./routes/authRoutes.js"
import { } from 'dotenv/config'
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const app = express();

app.use(express.json());
app.use(authRoutes)

app.get("/", (req, res) => {
    res.send("API is running...");
});
app.get("/send", (req, res) => {


    const msg = {
        to: 'mr.mra.info@gmail.com', // Change to your recipient
        from: 'gj9678@myamu.ac.in', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        templateId: 'd-e1613d50f3914be69a19da39c2e27e7d',
        dynamicTemplateData: {
            subject: 'Testing Templates',
            name: 'Some One',
        },
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

    res.send("API is running...");
});


app.listen(config.PORT, () => {
    myLogger("Server").info(`server running on port http://localhost:${config.PORT}`)
});
