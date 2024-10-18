import type { Product } from "./product.ts";

export class Promotion {
  discount: number;

  constructor(discount: number) {
    this.discount = 0.0;
    if (discount > 0.0 && discount < 1.0) this.discount = discount;
  }

  private applies(_product: Product): boolean {
    return true;
  }

  applyDiscount(product: Product): Product {
    if (!this.applies(product)) {
      return product;
    }
    product.basePrice = product.basePrice * (1.0 - this.discount);
    return product;
  }
}

export const PROMOTIONS: Record<string, Promotion> = {
  PROMO_5: new Promotion(0.05),
  PROMO_10: new Promotion(0.1),
};
