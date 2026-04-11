import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  await page.getByRole('link', { name: 'Mac (1)' }).click();
  await page.getByRole('link', { name: 'iMac' }).first().dblclick();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'iMac' }).nth(1).click({
    button: 'right'
  });
  const download = await downloadPromise;
  await page.locator('#menu').getByRole('link', { name: 'Desktops', exact: true }).click();
  await page.locator('#menu').getByRole('link', { name: 'Desktops', exact: true }).hover();
  await page.getByRole('heading', { name: 'Related Products' }).dblclick();
  await page.getByRole('heading', { name: 'Related Products' }).click();
  await page.getByRole('heading', { name: 'iMac' }).click();
  await page.getByRole('heading', { name: 'iMac' }).click();
  await page.getByRole('heading', { name: 'iMac' }).click();
  await page.getByText('iMac Brand: Apple Product').dblclick();
  await page.getByRole('heading', { name: 'iMac' }).dblclick();
  await page.getByRole('heading', { name: 'iMac' }).click();
  await page.locator('#search').getByRole('button').click();
});