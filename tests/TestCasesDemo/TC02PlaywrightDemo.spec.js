import {test, describe} from "@playwright/test";

describe('Login Validation', ()=>{

    test('Validate login credentials', async ({page})=>{
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    
        let usernameValue = "Admin"
        let passwordValue = "admin123"
        if(usernameValue === "Admin" && passwordValue === "admin123"){
       
        }
        
    })

})