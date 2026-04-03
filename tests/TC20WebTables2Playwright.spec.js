import { test, expect } from "@playwright/test"

test.describe('Static Web Table Validation', () => {

  test.beforeEach(async ({ page }) => {
    const baseURL = "https://testautomationpractice.blogspot.com/";
    await page.goto(baseURL, { timeout: 30000, waitUntil: 'domcontentloaded' });
  })

  test('Validate the row and column for the web table - Count', async ({ page }) => {
    // Wait for table to be visible
    const table = page.locator('[name="BookTable"]');
    await expect(table).toBeVisible({ timeout: 10000 });

    const rowCount = await page.locator('[name="BookTable"] tbody tr').count();
    const colCount = await page.locator('[name="BookTable"] thead th').count();

    console.log('Row Count = ', rowCount);
    console.log('Column Count = ', colCount);

    expect(rowCount).toBeGreaterThan(1);
    expect(colCount).toBeGreaterThanOrEqual(0);
  })

  test('Assert the value of BookName', async ({ page }) => {
    const bookNameToFind = 'Learn Selenium';
    
    // Wait for table to be visible
    const table = page.locator('[name="BookTable"]');
    await expect(table).toBeVisible({ timeout: 10000 });

    // Locate all rows inside the table
    const rows = page.locator('[name="BookTable"] tbody tr');
    let authorName = null;
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allTextContents();
      
      if (cells.length > 0 && cells[0].trim() === bookNameToFind) {
        authorName = cells[1]?.trim() || null;
        break;
      }
    }

    console.log(`Author of "${bookNameToFind}" is: ${authorName}`);
    expect(authorName).not.toBeNull();
  });

  test('Get Author Name based on Book Name', async ({ page }) => {
    const bookNameToFind = 'Learn Selenium';
    
    // Wait for table to be visible
    const table = page.locator('[name="BookTable"]');
    await expect(table).toBeVisible({ timeout: 10000 });

    // Locate all rows inside the table
    const rows = page.locator('[name="BookTable"] tbody tr');
    let authorName = null;
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allTextContents();
      
      if (cells.length > 0 && cells[0].trim() === bookNameToFind) {
        authorName = cells[1]?.trim() || null;
        break;
      }
    }

    console.log(`Author of "${bookNameToFind}" is: ${authorName}`);
    expect(authorName).not.toBeNull();
  });

  test('Get Author Name based on Book Name Details', async ({ page }) => {
    const bookNameToFind = 'Learn JS';
    
    // Wait for table to be visible
    const table = page.locator('[name="BookTable"]');
    await expect(table).toBeVisible({ timeout: 10000 });

    const rows = page.locator('[name="BookTable"] tbody tr');
    const rowCount = await rows.count();
    let authorName = null;

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allTextContents();
      
      if (cells.length > 0 && cells[0].trim() === bookNameToFind) {
        authorName = cells[1]?.trim() || null;
        break;
      }
    }

    console.log(`Author: ${authorName}`);
    expect(authorName).not.toBeNull();
  });

})
