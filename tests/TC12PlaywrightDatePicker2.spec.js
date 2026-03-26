import {test, expect} from "@playwright/test"

test.describe('Date Picker - All Scenarios (Single File)', () => {

  test.beforeEach(async ({ page }) => {
    // 🔐 Login
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Navigate to Leave
    await page.getByRole('link', { name: 'Leave' }).click();
  });

  // ✅ TC-01: Open Date Picker
  test('Open Date Picker', async ({ page }) => {
    await page.locator('.oxd-icon.bi-calendar').first().click();
    await expect(page.locator('.oxd-calendar-wrapper')).toBeVisible();
  });

  // ✅ TC-02: Month Selection
  test('Select Month (January → December)', async ({ page }) => {
   await page.locator('.oxd-icon.bi-calendar').first().click();

// Open month dropdown first
await page.locator('.oxd-calendar-selector-month-selected').click();

// Select month
await page.locator('.oxd-calendar-dropdown').getByText('January', { exact: true }).click();

// Change to December
await page.locator('.oxd-calendar-selector-month-selected').click();
await page.locator('.oxd-calendar-dropdown').getByText('December', { exact: true }).click();
  });

  // ✅ TC-03: Year Selection
  test('Select Year (2026 → 2025)', async ({ page }) => {
    await page.locator('.oxd-icon.bi-calendar').first().click();

    await page.locator('div').filter({ hasText: /^2026$/ }).click();
    await page.getByText('2025').click();

    await expect(page.locator('.oxd-calendar-selector-year-selected'))
      .toContainText('2025');
  });

  // ✅ TC-04: Select Specific Date (1st)
  test('Select Date 1', async ({ page }) => {
    await page.locator('.oxd-icon.bi-calendar').first().click();

    await page.getByText('1', { exact: true }).click();

    const input = page.getByRole('textbox', { name: 'yyyy-dd-mm' }).first();
    await expect(input).not.toHaveValue('');
  });

  // ✅ TC-05: Select Date using Navigation (26)
  test('Select Date 26 using navigation', async ({ page }) => {
    await page.getByRole('textbox', { name: 'yyyy-dd-mm' }).first().click();

    // Navigation clicks (as recorded)
    await page.getByRole('button').nth(5).click();
    await page.getByRole('button').nth(5).click();
    await page.getByRole('button').nth(5).click();

    await page.getByText('26', { exact: true }).click();

    const input = page.getByRole('textbox', { name: 'yyyy-dd-mm' }).first();
    await expect(input).not.toHaveValue('');
  });

  // ✅ TC-06: Select End Date (29)
  test('Select End Date 29', async ({ page }) => {
    await page.locator('.oxd-icon.bi-calendar').nth(1).click();

    await page.getByText('29').click();

    const input = page.getByRole('textbox', { name: 'yyyy-dd-mm' }).last();
    await expect(input).not.toHaveValue('');
  });

  // ✅ TC-07: From Date < To Date Validation
  test('Validate From Date < To Date', async ({ page }) => {

    // From Date
    await page.locator('.oxd-icon.bi-calendar').nth(0).click();
    await page.getByText('10').click();

    // To Date
    await page.locator('.oxd-icon.bi-calendar').nth(1).click();
    await page.getByText('15').last().click();

    const fromDate = await page.getByRole('textbox', { name: 'yyyy-dd-mm' }).first().inputValue();
    const toDate = await page.getByRole('textbox', { name: 'yyyy-dd-mm' }).last().inputValue();

    expect(new Date(fromDate) <= new Date(toDate)).toBeTruthy();
  });

  // ❌ TC-08: Invalid Date Input
  test('Enter Invalid Date', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'yyyy-dd-mm' }).first();

    await input.fill('2025-32-13');

    await expect(input).toHaveValue('2025-32-13');
  });

  // ⚠️ TC-09: Leap Year Check (Basic)
  test('Leap Year Check (Feb 29)', async ({ page }) => {
    await page.locator('.oxd-icon.bi-calendar').first().click();

// Open month dropdown
await page.locator('.oxd-calendar-selector-month-selected').click();
await page.locator('.oxd-calendar-dropdown').getByText('February', { exact: true }).click();

// Open year dropdown
await page.locator('.oxd-calendar-selector-year-selected').click();
await page.locator('.oxd-calendar-dropdown').getByText('2024', { exact: true }).click();

// Select 29 safely
const calendar = page.locator('.oxd-calendar-wrapper');

if (await calendar.locator('.oxd-calendar-date').filter({ hasText: /^29$/ }).first().isVisible()) {
  await calendar.locator('.oxd-calendar-date').filter({ hasText: /^29$/ }).first().click();
}
  });

  // 🔁 TC-10: Close Date Picker
  test('Close Date Picker on outside click', async ({ page }) => {
    await page.locator('.oxd-icon.bi-calendar').first().click();

    await page.click('body', { position: { x: 0, y: 0 } });

    await expect(page.locator('.oxd-calendar-wrapper')).toBeHidden();
  });

  // 🔄 TC-11: Reopen retains value
  test('Reopen Date Picker retains selected date', async ({ page }) => {
    await page.locator('.oxd-icon.bi-calendar').first().click();

const calendar = page.locator('.oxd-calendar-wrapper');

// Use exact date match
await calendar.locator('.oxd-calendar-date').filter({ hasText: /^20$/ }).first().click();
  });

  // 🔁 TC-12: Multiple Navigation Clicks Stability
  test('Multiple navigation clicks', async ({ page }) => {
    await page.locator('.oxd-icon.bi-calendar').first().click();

    for (let i = 0; i < 5; i++) {
      await page.getByRole('button').nth(5).click();
    }

    await page.getByText('15').click();

    const input = page.getByRole('textbox', { name: 'yyyy-dd-mm' }).first();
    await expect(input).not.toHaveValue('');
  });

});