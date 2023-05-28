import fruits from "../data/fruits.json";
import { IFruit } from "../models/fruit";

export function names(): string[] {
  return fruits.map((fruit) => fruit.name);
}

export function getID(name: string): number {
  const index = fruits.findIndex((fruit) => fruit.name === name);
  if (index < 0) throw new Error("Fruit name not found");

  return index;
}

export function byType(type: string): IFruit[] {
  return fruits.filter((fruit) => fruit.type === type);
}

export function byColor(color: string): IFruit[] {
  return fruits.filter((fruit) => fruit.color === color);
}

export function byPrice(price: number): IFruit[] {
  return fruits.filter((fruit) => fruit.price <= price);
}

export function byID(id: number): IFruit {
  const fruit = fruits[id];
  if (!fruit) throw new Error("Fruit ID not found");

  return fruit;
}

export function byName(name: string): IFruit {
  const id = getID(name);
  return byID(id);
}

export function add(fruit: IFruit): void {
  fruits.push(fruit);
}

export function update(name: string, fruit: IFruit): void {
  const index = getID(name);

  fruits[index] = fruit;
}

export function remove(name: string): void {
  const index = getID(name);
  fruits.splice(index, 1);
}
