import { test, expect } from "@playwright/test";
import { login } from "../helpers/login.helper";

// it will take screenshot after each test
test.afterEach(async ({ page }, testInfo) => {
  await page.screenshot({ path: `screenshot/${testInfo.title}.png` });
});

//login
test("Login test", async ({ page }) => {
    await login(page);
});

test("login failure", async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_userbot');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

// full checkout process
test("Add product to cart", async ({ page }) => {
    await login(page);  // Reusing login fixture
   // await page.pause();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('suryansh');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('sharma');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('174028');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await expect(page.getByText("Thank you for your order!")).toBeVisible();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html'); 
});

test("check cart updation after adding multiple products", async ({ page }) => {
    await login(page);  // Reusing login fixture
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // await page.pause();
await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
});

test("check cart updation after deleting multiple products", async ({ page }) => {
    await login(page);  // Reusing login fixture
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    // await page.pause();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});

test("check the final price on checkout overview page", async ({ page }) => {
    await login(page);  // Reusing login fixture

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  //storing the price of product added to cart
  // giving it fix value because other items have same test id for price
  const price = 29.99;
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('suryansh');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('sharma');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('174028');
  await page.locator('[data-test="continue"]').click();
//checking if  value of price on checkout overview page is same as the price of product added to cart
// 2. Build the expected label text
const expectedLabel = `Item total: $${price.toFixed(2)}`;
// 3. Assert UI text equals the expected label
await expect(page.locator('[data-test="subtotal-label"]')).toHaveText(expectedLabel);
});

test("checking logout functionality", async ({ page }) => {
    await login(page);  // Reusing login fixture
    // await page.pause();
     await page.getByRole('button', { name: 'Open Menu' }).click();
     await page.locator('[data-test="logout-sidebar-link"]').click();
     await expect(page).toHaveURL('https://www.saucedemo.com/');
}); 

  

