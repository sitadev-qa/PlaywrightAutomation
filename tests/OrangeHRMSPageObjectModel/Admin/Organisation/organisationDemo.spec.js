import { test, expect } from '@playwright/test';

// Common Login Function
async function login(page) {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
}

// Navigate to General Information
async function navigateToGeneralInfo(page) {
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByText('Organization').click();
  await page.getByRole('menuitem', { name: 'General Information' }).click();
}

// Navigate to Locations
async function navigateToLocations(page) {
  await page.getByRole('listitem').filter({ hasText: /^Locations$/ }).click();
}

//////////////////////////////////////////////////////////
// ✅ GENERAL INFORMATION MODULE TEST CASES
//////////////////////////////////////////////////////////

test('GI-01: Verify General Information page loads', async ({ page }) => {
  await login(page);
  await navigateToGeneralInfo(page);

  await expect(page.locator('.oxd-switch-input')).toBeVisible();
});

test('GI-02: Enable edit and update fields', async ({ page }) => {
  await login(page);
  await navigateToGeneralInfo(page);

  await page.locator('.oxd-switch-input').click();

  await page.getByRole('textbox').nth(2).fill('12345');
  await page.getByRole('textbox').nth(3).fill('56789');

  await page.getByRole('button', { name: 'Save' }).click();
});

test('GI-03: Verify successful update message', async ({ page }) => {
  await login(page);
  await navigateToGeneralInfo(page);

  await page.locator('.oxd-switch-input').click();
  await page.getByRole('textbox').nth(4).fill('3249309398');

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Successfully Updated')).toBeVisible();
});

test('GI-04: Verify fields are disabled when toggle OFF', async ({ page }) => {
  await login(page);
  await navigateToGeneralInfo(page);

  const toggle = page.locator('.oxd-switch-input');

  await toggle.click(); // enable
  await toggle.click(); // disable

  await expect(page.getByRole('textbox').nth(2)).toBeDisabled();
});

test('GI-05: Validate mandatory fields', async ({ page }) => {
  await login(page);
  await navigateToGeneralInfo(page);

  await page.locator('.oxd-switch-input').click();

  await page.getByRole('textbox').nth(2).fill('');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
});

//////////////////////////////////////////////////////////
// ✅ LOCATION MODULE TEST CASES
//////////////////////////////////////////////////////////

test('LOC-01: Search location by name', async ({ page }) => {
  await login(page);
  await navigateToGeneralInfo(page);
  await navigateToLocations(page);

  await page.getByRole('textbox').nth(1).fill('Canada');
  await page.getByRole('button', { name: 'Search' }).click();
});

test('LOC-02: Search using country dropdown', async ({ page }) => {
  await login(page);
  await navigateToGeneralInfo(page);
  await navigateToLocations(page);

  await page.getByRole('textbox').nth(1).fill('');
  await page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();
  await page.getByRole('option', { name: 'Albania' }).click();

  await page.getByRole('button', { name: 'Search' }).click();
});

test('LOC-03: Add new location', async ({ page }) => {
  await login(page);
  await navigateToGeneralInfo(page);
  await navigateToLocations(page);

  await page.getByRole('button', { name: ' Add' }).click();

  await page.getByRole('textbox', { name: 'Type here' }).first().fill('Demo');
  await page.getByRole('textbox', { name: 'Type here' }).nth(1).fill('Demo');
  await page.getByRole('textbox', { name: 'Type here' }).nth(2).fill('Demo');
  await page.getByRole('textbox', { name: 'Type here' }).nth(3).fill('Demo');

  await page.getByText('Afghanistan').click();

  await page.getByRole('textbox', { name: 'Type here' }).nth(4).fill('2140-1992999');
  await page.getByRole('textbox', { name: 'Type here' }).nth(5).fill('3098');

  await page.locator('textarea').first().fill('danj');
  await page.locator('textarea').nth(1).fill('dsnnj');

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Successfully Saved')).toBeVisible();
});

test('LOC-04: Edit existing location', async ({ page }) => {
  await login(page);
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewLocations');

  await page.locator('div:nth-child(2) > .oxd-table-row > div:nth-child(7) > .oxd-table-cell-actions > button:nth-child(2)').click();

  await page.locator('textarea').nth(1).fill('Updated Address');

  await page.getByRole('button', { name: 'Save' }).click();
});

test('LOC-05: Delete location', async ({ page }) => {
  await login(page);
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewLocations');

  await page.getByRole('button').nth(5).click();
  await page.getByRole('button', { name: ' Yes, Delete' }).click();

  await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
});

test('LOC-06: Reset search filters', async ({ page }) => {
  await login(page);
  await navigateToGeneralInfo(page);
  await navigateToLocations(page);

  await page.getByRole('textbox').nth(1).fill('Canada');
  await page.getByRole('button', { name: 'Reset' }).click();

  await expect(page.getByRole('textbox').nth(1)).toBeEmpty();
});

test('LOC-07: Validate required fields while adding location', async ({ page }) => {
  await login(page);
  await navigateToGeneralInfo(page);
  await navigateToLocations(page);

  await page.getByRole('button', { name: ' Add' }).click();
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
});