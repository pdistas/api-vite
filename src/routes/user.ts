import { Router } from "express";
import * as userControl from "../controllers/user_controller";

const router = Router();

router.get("/:username", (req, res) => {
  const { username } = req.params;
  const user = userControl.byUsername(username);
  res.json({ username: user.username, email: user.email });
});

router.post("/signup", async (req, res) => {
  const { username, email, password, birth } = req.body;
  const createdUser = await userControl.add({ username, email, password, birth });

  res.cookie("username", createdUser.username);
  res.status(201).send("User created successfully");
});

router.get("/whoami", (req, res) => {
  const { username } = req.cookies;

  if (!username) {
    res.status(401).send("You're not logged in");
  } else {
    res.send(`Hello ${username}`);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(400).send("Username expected");
    return;
  }

  if (!password) {
    res.status(400).send("Password expected");
    return;
  }

  if (await userControl.checkPassword(username, password)) {
    res.cookie("username", username);
    res.send("Logged in successfully");
  } else {
    res.status(401).send("Unauthorized");
  }
});

router.patch("/update",async (req, res) => {
  const { username } = req.cookies;
  const { password, newUser } = req.body;

  if (!username) {
    res.status(401).send("You're not logged in");
    return;
  }

  if (!password) {
    res.status(400).send("Password not provided");
    return;
  }

  if (!await userControl.checkPassword(username, password)) {
    res.status(403).send("Incorrect password");
    return;
  }

  userControl.updateUser({ username, password }, newUser);
  res.cookie("username", newUser.username);
  res.send("User updated successfully");
});

router.get("/logout", (_, res) => {
  res.clearCookie("username");
  res.send("Logged out successfully");
});

export default router;
