import {test, expect} from "@playwright/test"


test.beforeEach(async({page})=>{

    const orangeHRMSURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
        
        await page.goto(orangeHRMSURL);

        // Login Into Application
        await page.fill("input[name='username']", "Admin");
        await page.fill("input[name='password']", "admin123");
        await page.click("button[type='submit']");
        await page.waitForLoadState('networkidle');
})

test("Validate Admin Menu", async({page})=>{

    await expect(page.locator('[href="/web/index.php/admin/viewAdminModule"]')).toBeVisible();

})

test("Validate PIM Menu", async({page})=>{

    await expect(page.locator('[href="/web/index.php/pim/viewPimModule"]')).toBeVisible();
    
})

