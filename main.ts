import { Product } from "./product.ts";
import type { ProductService } from "./productService.ts";

export type ShoppingCartRender = {
  products: {
    name: string;
    priceWithVAT: number;
    quantity: number;
  }[];
  numberOfProducts: number;
  totalPrice: number;
};

export class ShoppingCart {
  productService: ProductService;
  products: Map<string, { product: Product; quantity: number }>;
  constructor(productService: ProductService) {
    this.productService = productService;
    this.products = new Map();
  }

  render(): ShoppingCartRender {
    const products = [];
    let numberOfProducts = 0;
    let totalPrice = 0.0;
    for (const [name, { product, quantity }] of this.products.entries()) {
      const priceWithVAT = product.getFinalPrice();
      products.push({ name, priceWithVAT, quantity });
      numberOfProducts += quantity;
      totalPrice += priceWithVAT * quantity;
    }
    return {
      products,
      numberOfProducts,
      totalPrice,
    };
  }

  add(name: string) {
    if (this.products.has(name)) {
      // Existing product
      const product = this.products.get(name);
      product!.quantity += 1;
      this.products.set(name, product!);
      return;
    }
    // New product
    const product = this.productService.get(name);
    if (!product) {
      throw new Error(`Product ${name} does not exist in service`);
    }
    this.products.set(name, { product, quantity: 1 });
  }
}
