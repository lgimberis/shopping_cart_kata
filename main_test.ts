import { assertEquals } from "@std/assert";
import { ShoppingCart } from "./main.ts";

Deno.test("Test that empty cart is empty", function emptyTest() {
  const cart = new ShoppingCart();
  assertEquals(cart.render(), new Map());
});
