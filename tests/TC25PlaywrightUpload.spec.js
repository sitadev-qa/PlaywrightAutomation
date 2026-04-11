import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('File Upload Scenarios', () => {

  const filePath = path.join(__dirname, 'test-data/sample.pdf');

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
  });

  // ✅ TC01 - Upload single file
  test('Upload single file successfully', async ({ page }) => {
    await page.setInputFiles('#file-upload', filePath);
    await page.click('#file-submit');

    await expect(page.locator('#uploaded-files')).toHaveText('sample.pdf');
  });

  // ✅ TC02 - Upload multiple files
  test('Upload multiple files', async ({ page }) => {
    await page.setInputFiles('#file-upload', [
      path.join(__dirname, 'test-data/sample.pdf'),
      path.join(__dirname, 'test-data/sample2.png')
    ]);

    // Validation depends on app behavior
  });

  // ❌ TC03 - Upload without file
  test('Upload without selecting file', async ({ page }) => {
    await page.click('#file-submit');

    await expect(page).toHaveURL(/upload/); // stays on same page
  });

  // ❌ TC04 - Upload invalid file type
  test('Upload invalid file type', async ({ page }) => {
    const invalidFile = path.join(__dirname, 'test-data/sample.exe');

    await page.setInputFiles('#file-upload', invalidFile);
    await page.click('#file-submit');

    // Add assertion based on validation message
  });

  // ❌ TC05 - Upload large file
  test('Upload large file (boundary test)', async ({ page }) => {
    const largeFile = path.join(__dirname, 'test-data/large-file.zip');

    await page.setInputFiles('#file-upload', largeFile);
    await page.click('#file-submit');

    // Validate error message if size exceeds limit
  });

  // 🔄 TC06 - Replace uploaded file
  test('Replace uploaded file', async ({ page }) => {
    await page.setInputFiles('#file-upload', filePath);

    const newFile = path.join(__dirname, 'test-data/sample2.png');
    await page.setInputFiles('#file-upload', newFile);

    await page.click('#file-submit');

    await expect(page.locator('#uploaded-files')).toHaveText('sample2.png');
  });

  // 🔄 TC07 - Remove uploaded file
  test('Remove uploaded file', async ({ page }) => {
    await page.setInputFiles('#file-upload', filePath);

    await page.setInputFiles('#file-upload', []); // clears file

    // Validate no file selected state
  });

});