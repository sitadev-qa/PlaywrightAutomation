import {test, expect, devices} from "@playwright/test";

test.describe('View ports in playwright', ()=>{

    test('ViewPort - 1', async({page})=>{

        await page.goto('https://www.airbnb.co.in/');
        await page.setViewportSize({width:1920, height:1080});

    })

    const devicesToTest = ['iPhone 12', 'Pixel 5', 'iPad Pro 11'];

    devicesToTest.forEach(deviceName => {

        test(`ViewPort - ${deviceName}`, async ({ page }) => {
            const device = devices[deviceName];
            await page.goto('https://www.airbnb.co.in/');
            await page.setViewportSize(device.viewport);
        });
    });
})