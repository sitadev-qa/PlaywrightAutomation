import { test, expect } from '@playwright/test';

test('Playwright Locators', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Login
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard URL
    await expect(page).toHaveURL(/dashboard/);

    // Better locator for logo (avoid dynamic src)
    const logo = page.locator('img[alt="client brand banner"]');
    await expect(logo).toBeVisible();

});