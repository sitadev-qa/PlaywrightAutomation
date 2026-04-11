import {expect, playwright,test} from "@playwright/test";

test.describe('TC21 - Alerts in Playwright', ()=>{

    test('Handle JS Alerts', async ({page}) =>{

        test.step('Step1', async () =>{

        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        })


        
        page.on('dialog', async dialog =>{

            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBe('I am a JS Alert')
            await dialog.accept();
        })

        await page.click('text=Click for JS Alert');
        await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');  
    })


    test('Handle JS Confirm', async({page}) =>{

        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', async dialog =>{

            expect(dialog.type()).toBe('confirm');
            expect(dialog.message()).toBe('I am a JS Confirm')
            await dialog.accept();
        })

        await page.click('text=Click for JS Confirm');
        await expect(page.locator('#result')).toHaveText('You clicked: Ok');

    })

    test('Handle JS Confirm - Cancel', async({page}) =>{

        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', async dialog =>{
            expect(dialog.type()).toBe('confirm');
            expect(dialog.message()).toBe('I am a JS Confirm')  
            await dialog.dismiss();
        })
        await page.click('text=Click for JS Confirm');
        await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
    })


    test('Handle Click for JS Prompt', async({page})=>{

        await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

        page.on('dialog', async dialog =>{

            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toBe('I am a JS prompt');
            await dialog.dismiss();
        })

        await page.click('text=Click for JS Prompt');

        await expect(page.locator('#result')).toHaveText('You entered: null');
    })

    test('Handle Click for JS Prompt - Enter Text', async({page})=>{
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

        page.on('dialog', async dialog =>{

            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toBe('I am a JS prompt');
            await dialog.accept('Playwright Demo Value');
        })

        await page.click('text=Click for JS Prompt');

        await expect(page.locator('#result')).toHaveText('You entered: Playwright Demo Value');
        
    })



})