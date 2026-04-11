import { pageActions } from "../../utility/pageActions";
import {test} from "@playwright/test"

test('TC10: Playwright Page Action Demo', async({page})=>{

    const baseURL = "https://testautomationpractice.blogspot.com/";

    const pg = new pageActions(page);

    await page.goto(baseURL)

    //Radio
    await pg.check("#female");

    await pg.fill("#name", "Test User");

})