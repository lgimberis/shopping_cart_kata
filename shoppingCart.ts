import { Product } from "./product.ts";
import type { ProductService } from "./productService.ts";
import { PROMOTIONS } from "./promotion.ts";

export type ShoppingCartRender = {
  products: {
    name: string;
    priceWithVAT: number;
    quantity: number;
  }[];
  numberOfProducts: number;
  totalPrice: number;
  promotionsApplied?: string[];
};

export class ShoppingCart {
  productService: ProductService;
  products: Map<string, { product: Product; quantity: number }>;
  promotions: string[];
  constructor(productService: ProductService) {
    this.productService = productService;
    this.products = new Map();
    this.promotions = [];
  }

  render(): ShoppingCartRender {
    const products = [];
    let numberOfProducts = 0;
    let totalPrice = 0.0;
    for (let [name, { product, quantity }] of this.products.entries()) {
      const priceWithVAT = product.getFinalPrice();
      products.push({ name, priceWithVAT, quantity });
      numberOfProducts += quantity;
      for (const promotion of this.promotions) {
        product = PROMOTIONS[promotion].applyDiscount(product);
      }
      totalPrice += product.getFinalPrice() * quantity;
    }
    const render: ShoppingCartRender = {
      products,
      numberOfProducts,
      totalPrice,
    };
    if (this.promotions.length > 0) {
      render["promotionsApplied"] = this.promotions;
    }
    return render;
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

  applyPromotion(promotionCode: string) {
    if (Object.keys(PROMOTIONS).includes(promotionCode)) {
      this.promotions.push(promotionCode);
    }
  }
}
