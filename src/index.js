import express from "express";
import dotenv from 'dotenv';
dotenv.config({})

import mongoose from "mongoose";
const app = express();
mongoose
    .connect(
        "mongodb://myusername:mypassword@172.20.0.2:27017/?authSource=admin"
    )
    .then(() => {
        console.log(`[*] mongoDB connected`);
    })
    .catch((e) => {
        console.log(`Err: ${JSON.stringify(e)}`);
    });
app.set("PORT", process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.send(
        `<h1>Just a simple project to learn docker - devops with nodejs, express 123<h1>`
    );
});
app.listen(app.get("PORT"), () => {
    console.log(`[*] Server is running on port: ${app.get("PORT")}`);
});
