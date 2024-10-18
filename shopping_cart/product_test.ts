import { assertEquals } from "@std/assert";
import { Product } from "./product.ts";

Deno.test("Margins correctly applied", function marginTest() {
    const product = Product(name: "Iceberg", price: 1.55, marginPercentage: 0.15);
    assertEquals(product.getPreTaxPrice(), 1.79);
});