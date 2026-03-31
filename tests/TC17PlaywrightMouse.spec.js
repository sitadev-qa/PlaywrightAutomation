import {test, expect} from '@playwright/test'
import strict from 'node:assert/strict'

test.describe('Mouse Event', ()=>{

    test.beforeEach(async({page})=>{

        await page.goto('https://tutorialsninja.com/demo')
    })

    test('mouse event - 1', async({page})=>{

        const menuItem = page.locator('asd');
        menuItem.click({button:'right'});
        menuItem.hover()
        page.mouse.move(200,300)
        page.dragAndDrop()
    })

    
})