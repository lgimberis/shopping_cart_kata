import { Product } from "./product.ts";

export class ShoppingCart {
  constructor() {}

  render(): Map<string, Product> {
    return new Map();
  }
}
