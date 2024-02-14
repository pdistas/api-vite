import { Router } from "express";
import APIError from "../api_error";
import { randomInt } from "crypto";

const router = Router();

router.get("/", (_, res) => {
  res.send("Hello World!!");
});

router.get("/status", (_, res) => {
  res.json({ status: "OK" });
});

router.get("/ping", (_, res) => {
  res.send("pong");
});

router.get("/brew_coffee", (_, res) => {
  res.status(418).send("I'm a teapot");
});

async function asyncThrow() {
  const shouldCrash = randomInt(0, 2) === 1;

  if (shouldCrash) {
    throw new APIError("errinhos async!!", { status: 418 });
  }
}

function regThrow() {
  const shouldCrash = randomInt(0, 2) === 1;

  if (shouldCrash) {
    throw new Error("errinhos!!");
  }
}

router.get("/athrow", async (_, res) => {
  await asyncThrow();
  res.send("vombat 1");
});

router.get("/rthrow", (_, res) => {
  regThrow();
  res.send("vombat 2");
});

export default router;
