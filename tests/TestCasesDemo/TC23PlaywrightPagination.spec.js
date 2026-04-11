import {expect, test} from "@playwright/test"

test.describe('Pagination in Nationality Page Under Orange HRMS', ()=>{


    test.beforeEach(async({page})=>{
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.locator('input[name="username"]').fill('Admin');
        await page.locator('input[name="password"]').fill('admin123');
        await page.locator('button[type="submit"]').click();
        await page.waitForLoadState('networkidle');
        await page.locator('span:has-text("Admin")').click();
        await page.locator('a:has-text("Nationalities")').click();
        await page.waitForLoadState('networkidle');
    })


    test('Pagination - 1 - Count the number of Pages', async({page}) =>{

        const nationalityRecordPageCouont = 50;

        //Count the number of Record and Divide by 50 to Get the Page Count
        const recordCount = await page.locator('[class="oxd-text oxd-text--span"]').first().textContent();

        //(193) Records Found
        const recordCountNumber = parseInt(recordCount.match(/\d+/)[0]);

        //Create a Regex to Extract the Number from the String

        //Click on the [class="oxd-icon bi-chevron-right"] locator until it is disabled and count the number of times you click to get the number of pages

    })
})