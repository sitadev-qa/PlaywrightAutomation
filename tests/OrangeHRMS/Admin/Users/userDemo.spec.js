import {test, expect} from "@playwright/test"

async function login(page) {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard/);
}

async function goToAdmin(page) {
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page).toHaveURL(/admin/);
}

/* =========================
   LOGIN TEST
========================= */

test('TC_ADMIN_001 - Login Success', async ({ page }) => {
  await login(page);
});

/* =========================
   SEARCH TESTS
========================= */

test('TC_ADMIN_002 - Search by Username', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.locator('input').nth(1).fill('Admin');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.locator('.oxd-table')).toBeVisible();
});

test('TC_ADMIN_003 - Search by User Role', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.getByText('-- Select --').first().click();
  await page.getByRole('option', { name: 'Admin' }).click();
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.locator('.oxd-table')).toBeVisible();
});

test('TC_ADMIN_004 - Invalid Employee Name', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.getByPlaceholder('Type for hints...').fill('Tristan L');

// Example using role (if it's a listbox)
  await page.getByRole('option', { name: /Tristan L/i }).click();
  await page.getByRole('button', { name: 'Search' }).click();

  // ✅ Better assertion
  await expect(page.locator('.oxd-table-body')).not.toBeVisible();

  // Check row count = 0 OR fallback message
  const rows = page.locator('.oxd-table-body .oxd-table-row');
  await expect(rows).toHaveCount(0);
});

test('TC_ADMIN_005 - Full Employee Name', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.getByPlaceholder('Type for hints...').fill('shivani shah');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.locator('.oxd-table')).toBeVisible();
});

test('TC_ADMIN_006 - Partial Name Search', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.getByPlaceholder('Type for hints...').fill('shivani');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.locator('.oxd-table')).toBeVisible();
});

test('TC_ADMIN_007 - Auto Suggestion Selection', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.getByPlaceholder('Type for hints...').fill('shiv');
  await page.getByText('Shivaduth S Thampi').click();
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByText('No Record Found')).toBeVisible();
});

test('TC_ADMIN_008 - Empty Username Search', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.locator('input').nth(1).fill('');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.locator('.oxd-table')).toBeVisible();
});

test('TC_ADMIN_009 - Reset Filters', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.getByRole('button', { name: 'Reset' }).click();
});

test('TC_ADMIN_010 - Empty Employee Name', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.getByPlaceholder('Type for hints...').fill('');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.locator('.oxd-table')).toBeVisible();
});

test('TC_ADMIN_011 - Reset Search Form', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByPlaceholder('Type for hints...')).toHaveValue('');
});

/* =========================
   CREATE USER TESTS
========================= */

test('TC_ADMIN_012 - Create User Successfully', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByText('-- Select --').first().click();
  await page.getByRole('option', { name: 'Admin' }).click();

  await page.getByPlaceholder('Type for hints...').fill('shiva');
  await page.getByText('Shivaduth S Thampi').click();

  await page.locator('.oxd-select-text').nth(1).click();
  await page.getByRole('option', { name: 'Enabled' }).click();

  await page.locator('input').nth(2).fill(`shivshiv${Date.now()}`);  
  await page.locator('input').nth(3).fill('@!Game149');
  await page.locator('input').nth(4).fill('@!Game149');

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveSystemUser");
});

test('TC_ADMIN_013 - Missing Mandatory Fields', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.locator('.oxd-input-field-error-message')).toHaveCount(6);
  await expect(page.getByText('Required')).toHaveCount(6);
  await expect(page.getByText('Passwords do not match')).toBeVisible();
});

test('TC_ADMIN_014 - Password Mismatch', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.getByRole('button', { name: 'Add' }).click();

  await page.locator('input').nth(3).fill('Password123');
  await page.locator('input').nth(4).fill('Password456');

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Passwords do not match')).toBeVisible();
});

/* =========================
   EDIT USER TESTS
========================= */

test('TC_ADMIN_016 - Edit User Role', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.locator('.oxd-table-row').nth(1).locator('button').nth(1).click();

  await page.locator('.oxd-select-text').first().click();
  await page.getByRole('option', { name: 'ESS' }).click();

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Successfully Updated')).toBeVisible();
});

/* =========================
   DELETE USER TESTS
========================= */

test('TC_ADMIN_018 - Delete User', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.locator('.oxd-table-row').nth(2).locator('button').first().click();
  await page.getByRole('button', { name: 'Yes, Delete' }).click();

  await expect(page.getByText('Successfully Deleted')).toBeVisible();
});

test('TC_ADMIN_019 - Cancel Delete', async ({ page }) => {
  await login(page);
  await goToAdmin(page);

  await page.locator('.oxd-table-row').nth(2).locator('button').first().click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await expect(page.locator('.oxd-table')).toBeVisible();
});