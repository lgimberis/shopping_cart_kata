import { assertEquals } from "@std/assert";
import { ProductService } from "./productService.ts";
import { TestProductSource } from "./testProductSource.ts";
import { Product, TaxCategories } from "./product.ts";

Deno.test("test product service functional", function getSingleTestProduct() {
  const productService = new ProductService(new TestProductSource());

  assertEquals(
    productService.get("Chicken"),
    new Product("Chicken", 1.34, 0.12, TaxCategories.NORMAL)
  );
});
