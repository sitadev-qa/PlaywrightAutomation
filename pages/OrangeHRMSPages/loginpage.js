export class LoginPage {

    constructor(page){
        this.page = page
        this.username = page.locator("input[name='username']")
        this.password = page.locator("input[name='password']")
        this.loginBtn = page.locator("button[type='submit']")
        this.errorMessage = page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text')
        this.dashboardHeader = page.locator('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module')
    }

    async navigateToLoginPage(){
        await this.page.goto('/')
    }

    async loginIntoOrangeHRMS(username, password){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginBtn.click()
        
    }
    
    async validateErrorMessage(){
        return await this.errorMessage.isVisible();
    }

    async validateHomePageDashboard(){
        return await this.dashboardHeader.isVisible();
    }
}
export default LoginPage
