// CSS Locators using nth-child
import { test, expect } from '@playwright/test';

test('Playwright Locators - CSS - 3', async ({ page }) => { 

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Login    
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    //Using nth-child
    await page.locator('ul.oxd-main-menu > li').nth(0).click(); // Admin
    await page.locator('ul.oxd-main-menu > li').nth(1).click(); // PIM
    await page.locator('ul.oxd-main-menu > li').nth(2).click(); // Leave
    await page.locator('ul.oxd-main-menu > li').nth(3).click(); // Time

})
 