import { test, expect } from '@playwright/test';

// npx playwright codegen

test('test', async ({ page }) => {
  await page.goto('https://www.ajio.com/');
  await page.getByRole('button', { name: 'Allow Location' }).click();
  await page.getByRole('textbox', { name: 'Search Ajio' }).click();
  await page.getByRole('textbox', { name: 'Search Ajio' }).fill('Puma Shoes');
  await page.getByRole('button', { name: 'search' }).click();
  await expect(page.getByRole('link', { name: 'Puma Lace Fastening with' })).toBeVisible();
});