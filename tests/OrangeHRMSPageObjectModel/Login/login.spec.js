import {test, expect} from "@playwright/test";
import {LoginPage} from "../../../pages/OrangeHRMSPages/loginpage"

test.describe("Login Functionality of OrangeHRMS Application", () =>{

    test('TC - 01 - Verify Login with Valid Credentials', async ({page}) =>{
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.loginIntoOrangeHRMS("Admin", "admin123");
        await page.waitForLoadState('networkidle');
        const isDashboardVisible = await loginPage.validateHomePageDashboard();
        console.log("Is Dashboard Visible: ", isDashboardVisible);
        expect(isDashboardVisible).toBeTruthy();    
    })

})