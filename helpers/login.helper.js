export async function login(page) {
   
 await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,        // 60 seconds
  });



  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click()
 // await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


}