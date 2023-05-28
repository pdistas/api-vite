import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.send(["banana", "maçã", "laranja"]);
});

export default router;
