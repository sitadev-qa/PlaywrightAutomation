//Radio Button

//Checkbox

// Base URL - https://testautomationpractice.blogspot.com/

import {test, expect} from '@playwright/test';

test('Radio Button and Checkbox Logic', async ({page}) =>{

    const baseURL = "https://testautomationpractice.blogspot.com/";

    await page.goto(baseURL)

    //Radio Button - Male and Female

    await page.check("#female")
    
    await expect(page.locator("#female")).toBeChecked();

    await page.check("#male")

    await expect(page.locator("#male")).toBeChecked();
    await expect(page.locator("#female")).not.toBeChecked();

    //Checkbox
    let days = ["#sunday","#monday", "#tuesday", "#wednesday"];

    for(let day of days){
        await page.check(day);
        await expect(page.locator(day)).toBeChecked();   
    }
    //Select All the Checkbox
    //await page.check("[type='checkbox']"); 

    //await page.locator('[type="checkbox"]').nth(0).check();

    let uncheckdays = ["#thursday", "#friday","#saturday"]
    
    for(let uncheckday of uncheckdays)
    {
        await expect(page.locator(uncheckday)).not.toBeChecked();
    }

    
    await page.waitForTimeout(10000);

    await page.uncheck("[type='checkbox']");

    //ID
    //It is mandatory to have #
    //Class
    //It is mandatory to have .

})