//Base URL - https://opensource-demo.orangehrmlive.com/

import {test, expect} from "@playwright/test"

test('Handle Date Picker', async({page})=>{


        const orangeHRMSURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
        
        await page.goto(orangeHRMSURL);

        // Login Into Application
        await page.fill("input[name='username']", "Admin");
        await page.fill("input[name='password']", "admin123");
        await page.click("button[type='submit']");

        //Click on Leave Menu
        await page.waitForTimeout(5000);
        await page.click("//span[normalize-space()='Leave']");

        //Click on Date Picker and Select Today
        await page.getByPlaceholder('yyyy-dd-mm').first().click();
        await page.getByText('Today').click();
        await page.waitForTimeout(2000);

        await page.getByPlaceholder('yyyy-dd-mm').last().click();        
        await page.getByText('Today').click();
        await page.waitForTimeout(2000);


        //Open Date Picker and Select Date from Same Year Different Month

        await page.getByPlaceholder('yyyy-dd-mm').first().click();

        await page.locator(".oxd-calendar-dropdown--option.--selected").click();

        await page.getByRole('option',{name:'November'}).click();

        await page.waitForTimeout(4000);
        
        //p[normalize-space()='January']

        //p[normalize-space()='January']

        //div[class='oxd-layout-container'] li:nth-child(11)

})