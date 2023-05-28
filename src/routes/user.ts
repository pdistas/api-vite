import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const { name } = req.query;
  res.send(`Hello ${name}`);
});

router.get("/whoami", (req, res) => {
  const { name } = req.cookies.name;
  res.send(`Hello ${name}`);
});

router.post("/login", (req, res) => {
  const { name } = req.body;
  res.cookie("name", name);
  res.send("Logged in successfully");
});

router.patch("/update", (req, res) => {
  const { name } = req.body;
  res.cookie("name", name);
  res.send("Updated successfully");
});

router.get("/logout", (_, res) => {
  res.clearCookie("name");
  res.send("Logged out successfully");
});

export default router;
