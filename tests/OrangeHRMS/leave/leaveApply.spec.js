// Base URL - https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

import {test, expect} from "@playwright/test";

test('TC01 - Get Leave List', async ({page}) =>{

        // Open URL
        const orangeHRMSURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
        page.goto(orangeHRMSURL);

        // Login Into Application
        await page.fill("input[name='username']", "Admin");
        await page.fill("input[name='password']", "admin123");
        await page.click("button[type='submit']");

        //Click on Leave Menu
        await page.waitForTimeout(5000);
        await page.click("//span[normalize-space()='Leave']");

        //Click on Show Leave Status
        await page.getByText('-- Select --').first().click();

        // Convert below steps into for loop
        const arrayOptions = ["Rejected", "Cancelled", "Scheduled"];

        for(let dpValue of arrayOptions)
        {
            await page.getByRole('option', { name: dpValue }).click();
            await page.getByText('-- Select --').first().click();
            await page.waitForTimeout(500);
        }


        //Leave Type
        await page.getByText('-- Select --').nth(1).click();

        const leaveTypeOptions = page.locator("//div[@role='option']");

        const getAllLeaveType = await leaveTypeOptions.allTextContents();

        console.log(getAllLeaveType);

        for(let leaveTy of getAllLeaveType)
        {
            if(leaveTy === 'US - FMLA')
            {
                await page.getByRole('option',{name:leaveTy}).click();
                break;
            }
        }

        expect(page.locator('[class="oxd-select-text-input"]').nth(1).allTextContents()).toMatch('US - FMLA');


        // //Sub Unit

        // await page.getByText('-- Select --').nth(2).click();

        // await page.waitForTimeout(5000);

    })
    
    //div[class='oxd-multiselect-wrapper'] div[class='oxd-select-text oxd-select-text--active']
