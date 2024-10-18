import type { Product } from "./product.ts";

export interface ProductSource {
  getProducts(): Product[];
}
