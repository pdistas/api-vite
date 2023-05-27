import express from 'express'
import cors from 'cors'

const app = express()

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(express.json());
app.use(cors({ origin: "*" }))

export default app;
