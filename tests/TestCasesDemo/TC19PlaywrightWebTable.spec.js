import { test, expect } from '@playwright/test';

const URL = 'https://practice.expandtesting.com/dynamic-table';

test.describe('Dynamic Web Table - Task Manager Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  // ✅ 1. Validate Table Structure
  test('Validate rows and columns count', async ({ page }) => {
    const rows = await page.locator('tbody tr').count();
    const cols = await page.locator('tbody tr:first-child td').count();

    expect(rows).toBeGreaterThan(0);
    expect(cols).toBe(3);
  });

  // ✅ 2. Validate Column Headers
  test('Validate table headers', async ({ page }) => {
    const headers = await page.locator('thead th').allTextContents();
    expect(headers).toEqual(['Process', 'CPU (%)', 'Memory (MB)']);
  });

  // ✅ 3. Validate Specific Cell Data
  test('Validate specific cell value', async ({ page }) => {
    const firstRowCPU = await page.locator('tbody tr:nth-child(1) td:nth-child(2)').textContent();
    expect(firstRowCPU).not.toBeNull();
  });

  // ✅ 4. Find Row by Text (Dynamic)
  test('Find Chrome row dynamically', async ({ page }) => {
    const chromeRow = page.locator('tbody tr', { hasText: 'Chrome' });
    await expect(chromeRow).toBeVisible();
  });

  // ✅ 5. Validate Entire Table Data (Print)
  test('Print full table data', async ({ page }) => {
    const rows = page.locator('tbody tr');
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const cells = await rows.nth(i).locator('td').allTextContents();
      console.log(`Row ${i + 1}:`, cells);
    }

    expect(count).toBeGreaterThan(0);
  });

  // ✅ 6. Validate Chrome CPU with Yellow Label (MAIN TEST)
  test('Validate Chrome CPU value with yellow label', async ({ page }) => {

    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();

    let chromeCPUFromTable;

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);

      const processName = await row.locator('td:nth-child(1)').textContent();

      if (processName.includes('Chrome')) {
        chromeCPUFromTable = await row.locator('td:has-text("%")').textContent();
        console.log(chromeCPUFromTable)
        break;
      }
    }

    const yellowLabel = await page.locator('#chrome-cpu').textContent();
   // const cpuFromLabel = yellowLabel.split(':')[1].trim();

    expect(chromeCPUFromTable).toContain(yellowLabel);
  });

  // ✅ 7. Same Test Using evaluateAll (Optimized)
  test('Validate Chrome CPU using evaluateAll (optimized)', async ({ page }) => {

    const tableData = await page.locator('tbody tr').evaluateAll(rows => {
      return rows.map(row => {
        const cells = row.querySelectorAll('td');
        return {
          process: cells[0].textContent.trim(),
          cpu: cells[1].textContent.trim(),
          memory: cells[2].textContent.trim()
        };
      });
    });

    const chromeRow = tableData.find(r => r.process.includes('Chrome'));

    const yellowLabel = await page.locator('#chrome-cpu').textContent();
    const cpuFromLabel = yellowLabel.split(':')[1].trim();

    expect(chromeRow.cpu).toBe(cpuFromLabel);
  });

  // ✅ 8. Validate Dynamic Data Change
  test('Validate CPU values change after refresh', async ({ page }) => {
    const before = await page.locator('#chrome-cpu').textContent();

    await page.reload();

    const after = await page.locator('#chrome-cpu').textContent();

    expect(before).not.toBe(after);
  });

  // ✅ 9. Validate No Empty Cells
  test('Validate no empty cells in table', async ({ page }) => {
    const cells = await page.locator('tbody td').allTextContents();

    cells.forEach(cell => {
      expect(cell.trim()).not.toBe('');
    });
  });

  // ✅ 10. Validate Row Count Consistency
  test('Validate minimum row count', async ({ page }) => {
    const rowCount = await page.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThanOrEqual(3);
  });

});