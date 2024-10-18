import type { Product } from "./product.ts";
import { ProductSource } from "./productSource.ts";

export class ProductService {
  source: ProductSource;
  products: Product[];

  constructor(source: ProductSource) {
    this.source = source;
    this.products = source.getProducts();
  }

  get(name: string): Product | undefined {
    // Returns product with given name. Names are specified as being unique in constraints, so this is acceptable

    return this.products.find((product) => product.name === name);
  }
}
