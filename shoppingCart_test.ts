import { assertEquals } from "@std/assert";
import { ShoppingCart, ShoppingCartRender } from "./shoppingCart.ts";
import { PROMOTIONS } from "./promotion.ts";
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

Deno.test("Add two different items to the cart", function addTwoItems() {
  const productService = new ProductService(new TestProductSource());
  const cart = new ShoppingCart(productService);
  cart.add("Corn");
  cart.add("Bread");
  const expected = {
    products: [
      { name: "Corn", priceWithVAT: 1.5, quantity: 1 },
      { name: "Bread", priceWithVAT: 0.88, quantity: 1 },
    ],

    numberOfProducts: 2,
    totalPrice: 2.38,
  };
  assertEquals(cart.render(), expected);
});

Deno.test("Add multiple quantities of several items", function addTwoItems() {
  const productService = new ProductService(new TestProductSource());
  const cart = new ShoppingCart(productService);
  cart.add("Corn");
  cart.add("Tomato");
  cart.add("Chicken");
  cart.add("Bread");
  cart.add("Bread");
  cart.add("Chicken");
  cart.add("Corn");
  cart.add("Corn");
  const expected = {
    products: [
      { name: "Corn", priceWithVAT: 1.5, quantity: 3 },
      { name: "Tomato", priceWithVAT: 0.73, quantity: 1 },
      { name: "Chicken", priceWithVAT: 1.83, quantity: 2 },
      { name: "Bread", priceWithVAT: 0.88, quantity: 2 },
    ],

    numberOfProducts: 8,
    totalPrice: 10.65,
  };
  assertEquals(cart.render(), expected);
});

Deno.test(
  "Add a single item to the shopping cart and use a promotion",
  function addOneItemWithPromotion() {
    const productService = new ProductService(new TestProductSource());
    const cart = new ShoppingCart(productService);
    cart.add("Corn");
    cart.applyPromotion("PROMO_10");
    const expected = {
      products: [{ name: "Corn", priceWithVAT: 1.5, quantity: 1 }],
      numberOfProducts: 1,
      totalPrice: 1.35,
      promotionsApplied: ["PROMO_10"],
    };
    assertEquals(cart.render(), expected);
  }
);
