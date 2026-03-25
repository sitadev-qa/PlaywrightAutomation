import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Leave' }).click();
  await page.getByText('-- Select --').first().click();
  await page.getByRole('option', { name: 'Rejected' }).click();
  await page.getByText('-- Select --').first().click();
  await page.getByRole('option', { name: 'Cancelled' }).click();
  await page.getByText('-- Select --').first().click();
  await page.getByRole('option', { name: 'Scheduled' }).click();
  await page.getByText('-- Select --').nth(1).click();
  await page.getByRole('option', { name: 'CAN - Bereavement' }).click();
  await page.getByText('Cancelled').click();
  await page.locator('span:nth-child(4) > .oxd-icon').click();
  await page.getByText('-- Select --').first().click();
  await page.getByRole('option', { name: 'Taken' }).click();
  await page.getByRole('button', { name: 'Reset' }).click();
});