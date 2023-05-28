import { Router } from "express";
import * as fruitControl from "../controllers/fruit_controller";

const router = Router();

router.get("/", (_, res) => {
  res.send(fruitControl.names());
});

router.get("/price/:price", (req, res) => {
  const { price } = req.params;
  res.send(fruitControl.byPrice(Number(price)));
});

router.get("/:name", (req, res) => {
  const { name } = req.params;
  res.send(fruitControl.byName(name));
});

router.get("/type/:type", (req, res) => {
  const { type } = req.params;
  res.send(fruitControl.byType(type));
});

router.get("/color/:color", (req, res) => {
  const { color } = req.params;
  res.send(fruitControl.byColor(color));
});

router.post("/", (req, res) => {
  const { name, variety, type, color, price } = req.body;
  fruitControl.add({ name, variety, type, color, price });
  res.status(201).send("Fruit created successfully");
});

router.patch("/:name", (req, res) => {
  const { name } = req.params;
  const { newName, variety, type, color, price } = req.body;
  fruitControl.update(name, { name: newName, variety, type, color, price });
  res.send("Fruit updated successfully");
});

router.delete("/:name", (req, res) => {
  const { name } = req.params;
  fruitControl.remove(name);
  res.send("Fruit deleted successfully");
});

export default router;
