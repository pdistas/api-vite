export interface IFruit {
  name: string;
  variety: string;
  type: string;
  color: string;
  price: number;
}

export class Fruit implements IFruit {
  name: string;
  variety: string;
  type: string;
  color: string;
  price: number;

  constructor({ name, variety, type, color, price }: IFruit) {
    this.name = name;
    this.variety = variety;
    this.type = type;
    this.color = color;
    this.price = price;
  }

  toString(): string {
    return `Fruit: ${this.name}, ${this.variety}, ${this.type}, ${this.color}, ${this.price}`;
  }

  formatPrice(): string {
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BRL"
    }).format(this.price);
  }
}
