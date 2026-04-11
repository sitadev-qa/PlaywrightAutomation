import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('File Download Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');
  });

  // ✅ TC01 - Download file successfully
  test('Download file successfully', async ({ page }) => {

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('text=some-file.txt')
    ]);

    const filePath = path.join(__dirname, 'downloads', download.suggestedFilename());

    await download.saveAs(filePath);

    expect(fs.existsSync(filePath)).toBeTruthy();
  });

  // ✅ TC02 - Validate file name
  test('Validate downloaded file name', async ({ page }) => {

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('text=some-file.txt')
    ]);

    expect(download.suggestedFilename()).toBe('some-file.txt');
  });

  // ✅ TC03 - Validate file content (basic)
  test('Validate downloaded file content', async ({ page }) => {

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('text=some-file.txt')
    ]);

    const filePath = path.join(__dirname, 'downloads', download.suggestedFilename());

    await download.saveAs(filePath);

    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content.length).toBeGreaterThan(0);
  });

  // ❌ TC04 - Download broken link
  test('Download invalid/broken file link', async ({ page }) => {

    await page.setContent(`<a href="invalid-link.txt" download>Download</a>`);

    const [download] = await Promise.all([
      page.waitForEvent('download').catch(() => null),
      page.click('text=Download')
    ]);

    expect(download).toBeNull();
  });

  // 🔄 TC05 - Multiple file downloads
  test('Download multiple files', async ({ page }) => {

    const files = ['file1.txt', 'file2.txt'];

    for (const file of files) {
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click(`text=${file}`)
      ]);

      expect(download.suggestedFilename()).toBe(file);
    }
  });

  // ⚠️ TC06 - Cancel download
  test('Cancel download', async ({ page }) => {

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('text=some-file.txt')
    ]);

    await download.cancel();

    expect(download.failure()).resolves.toBeTruthy();
  });

});