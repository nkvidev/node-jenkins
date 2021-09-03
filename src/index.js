import express from "express";

const app = express();
app.set("PORT", process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.send(
        `<h1>Just a simple project to learn docker - devops with nodejs, express</h1>`
    );
});
app.listen(app.get("PORT"), () => {
    console.log(`[*] Server is running on port: ${app.get("PORT")}`);
});
