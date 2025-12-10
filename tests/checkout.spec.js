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

// full checkout process
test("Add product to cart", async ({ page }) => {
    await login(page);  // Reusing login fixture
    await page.pause();
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
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
   
});


