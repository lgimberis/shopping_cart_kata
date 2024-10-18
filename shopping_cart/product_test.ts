import { assertEquals } from "@std/assert";
import { Product, TaxCategories } from "./product.ts";

Deno.test("Margins correctly applied", function marginTest() {
  const product = new Product("Iceberg", 1.55, 0.15, TaxCategories.NORMAL);
  assertEquals(product.getPreTaxPrice(), 1.79);
});
