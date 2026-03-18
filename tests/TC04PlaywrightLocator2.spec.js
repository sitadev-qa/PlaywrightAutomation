//Way to Write CSS Locators
//1. Tag and Attribute
//2. Tag, Attribute and Value
//3. Using ID
//4. Using Class

import { test, expect } from '@playwright/test';

test('Playwright Locators - CSS', async ({ page }) => {
    
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Login
    await page.getByPlaceholder('Username').fill('Admin');

    await page.getByPlaceholder('Password').fill('admin123');

    await page.getByRole('button', { name: 'Login' }).click();
   
    //1. Using Tag, Attribute and Value
    //Syntax - tag[attribute='value'] 
    await page.locator("a[href='/web/index.php/admin/viewAdminModule']").click();
    
    //2. Using Attribute and Value
    //Syntax - [attribute='value']

    //data-testid = "demoTestID"
    //data-testid is an attribute

    await page.locator('[href="/web/index.php/pim/viewPimModule"]').click();

    await page.locator('input["placeholder="Type for hints..."]').first().fill("Test");

    await page.locator('input["placeholder="Type for hints..."]').last().fill("Demo");

    await page.waitForTimeout(10000);


})

test('Playwright Locators - CSS - 2', async ({ page }) => {

    await page.goto("https://practicetestautomation.com/practice-test-login/")

    //3. Using ID
    //Syntax =- #idValue
    //Syntax - input#idValue

    await page.locator("#username").fill("student");
    
    await page.locator("#password").fill("Password123");

    //4. Using Class
    //Syntax - .classValue
    //Syntax - button.classValue

    await page.locator('.btn').click();
})