import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send(["banana", "maçã", "laranja"]);
});

export default router;
