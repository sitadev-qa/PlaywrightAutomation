//Locators in Playwright
//8 Different Types of Locators in Playwright
// HTML - Hyper Text Markup Language

/*

<input data-v-1f99f73c="" class="oxd-input oxd-input--active" type="password" name="password" placeholder="Password">

Tag - input
Attribute - class
Value - oxd-input oxd-input--active

*/

import { test, expect } from '@playwright/test';

test('Playwright Locators', async ({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    
    await page.getByPlaceholder("Username").fill("Admin")

    await page.getByPlaceholder("Password").fill("admin123")

    await page.getByRole("button", {name:"Login"}).click()

    // await page.waitForTimeout(5000)

    // expect(page.url()).toBe("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");

    // expect(page.locator('[src="/web/images/orangehrm-logo.png?v=1763650546848"]')).toBeVisible()



})
    