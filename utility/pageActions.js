export class pageActions {

    constructor(page){
        this.page = page;
    }

    async click(selector){
        await this.page.click(selector);        
    }

    async fill(selector, value){
        await this.page.fill(selector, value);
    }

    async check(selector){
        await this.page.check(selector);
    }

}