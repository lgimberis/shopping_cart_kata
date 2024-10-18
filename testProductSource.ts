import { Product, TaxCategories } from "./product.ts";
import { ProductSource } from "./productSource.ts";

// Dummy product provider for testing purposes

export class TestProductSource implements ProductSource {
  getProducts(): Product[] {
    return [
      new Product("Iceberg", 1.55, 0.15, TaxCategories.NORMAL),
      new Product("Tomato", 0.52, 0.15, TaxCategories.NORMAL),
      new Product("Chicken", 1.34, 0.12, TaxCategories.NORMAL),
      new Product("Bread", 0.71, 0.12, TaxCategories.FIRST_NECESSITY),
      new Product("Corn", 1.21, 0.12, TaxCategories.FIRST_NECESSITY),
    ];
  }
}
