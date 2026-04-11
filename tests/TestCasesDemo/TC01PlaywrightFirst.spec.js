import { test } from '@playwright/test';

//describe // Test Suite
//test // Test Case
// describe('LOGIN FLOWS', ()=>{
//     test()
//     test()
//     test()
//     test()
// })

test('My First Playwright Test Case', async ({page}) => {

   await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    //Capture Page Title
    const title = await page.title()
    const ActualURL = await page.url()
    const ExpectedTitle = "Orangehrm"
    const ExpectedURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    if((title === ExpectedTitle) && (ActualURL === ExpectedURL) && 1===1 && 2>1){
    console.log("Title and URL are correct -- USING AND")
    }
    else
    {
        console.log("Title or URL is incorrect -- USING AND")
    }


    if(title === ExpectedTitle || ActualURL === ExpectedURL){
    console.log("Title and URL are correct -- USING OR")
    }
    else
    {
        console.log("Title or URL is incorrect -- USING OR")
    }


    
})


