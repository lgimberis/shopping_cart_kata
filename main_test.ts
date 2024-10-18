import { assertEquals } from "@std/assert";
import { ShoppingCart, ShoppingCartRender } from "./main.ts";
import { ProductService } from "./productService.ts";
import { TestProductSource } from "./testProductSource.ts";

Deno.test("Test that empty cart is empty", function emptyTest() {
  const productService = new ProductService(new TestProductSource());
  const cart = new ShoppingCart(productService);
  const expected: ShoppingCartRender = {
    products: [],
    totalPrice: 0,
    numberOfProducts: 0,
  };
  assertEquals(cart.render(), expected);
});

Deno.test("Add a single item to the shopping cart", function addOneItem() {
  const productService = new ProductService(new TestProductSource());
  const cart = new ShoppingCart(productService);
  cart.add("Corn");
  const expected = {
    products: [{ name: "Corn", priceWithVAT: 1.5, quantity: 1 }],
    numberOfProducts: 1,
    totalPrice: 1.5,
  };
  assertEquals(cart.render(), expected);
});

Deno.test(
  "Add a single item to the shopping cart... twice",
  function addOneItemTwice() {
    const productService = new ProductService(new TestProductSource());
    const cart = new ShoppingCart(productService);
    cart.add("Corn");
    cart.add("Corn");
    const expected = {
      products: [{ name: "Corn", priceWithVAT: 1.5, quantity: 2 }],
      numberOfProducts: 2,
      totalPrice: 3.0,
    };
    assertEquals(cart.render(), expected);
  }
);
