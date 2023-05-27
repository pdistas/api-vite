import express from 'express'

const app = express()

app.get("/", (req, res) => {
    res.send("Hello World!");
});

if (import.meta.env.PROD) {
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

export const viteNodeApp = app;
