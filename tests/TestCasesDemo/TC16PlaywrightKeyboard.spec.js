import {test, expect} from "@playwright/test";
import { beforeEach } from "node:test";

test.describe("Playwright Keyboard Test", ()=> {

    test.beforeEach(async({page})=>{
        await page.goto("https://tutorialsninja.com/demo/");
        await page.waitForLoadState('networkidle');
    })


    test("Search Keyboard Event", async({page})=>{

        const searchInput =  page.locator('[name="search"]');

        await searchInput.focus();

        await page.keyboard.type('Macbook');
        await page.keyboard.press('Enter');

        const addtoCartButton =  page.getByText('Add to Cart').count();

        expect(addtoCartButton).toBe(3);
    })
  
    test("Register New User", async({page})=>{
        await page.goto("https://tutorialsninja.com/demo/");
        await page.getByText('My Account').first().click();
        await page.click('text=Register');

        const firstname = page.locator('#input-firstname');
        await firstname.focus();
        await page.keyboard.type('John');
        await page.keyboard.press('Tab');
        await page.keyboard.type('Doe');
        await page.keyboard.press('Tab');
        await page.keyboard.type('demo@yopmail.com',{delay: 100});
        await page.keyboard.press('Tab');
        await page.keyboard.type('Enter');
        await page.keyboard.press('Enter');
    })

    test('Currency Dropdown', async({page})=>{

        await page.goto("https://tutorialsninja.com/demo/");
        const currencyDropdown = page.locator('#form-currency button').first();
        await currencyDropdown.focus();
        await page.keyboard.press('Enter', { delay: 500 });
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

    })


})