import { test, expect } from '@playwright/test';
import { LoginPage} from '../../../../pages/OrangeHRMSPages/loginpage';
import { JobTitlesPage } from '../../../../pages/OrangeHRMSPages/Admin/JobTitlesPage';
import { NavigationPage } from '../../../../pages/OrangeHRMSPages/Logout/NavigationPage';
const testData = require('../../../../testdata/OrangeHRMSTestData/jobData.json');


test.describe('Job Module - Job Titles', () => {
  let loginPage;
  let jobTitlesPage;
  let navigationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    jobTitlesPage = new JobTitlesPage(page);
    navigationPage = new NavigationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.loginIntoOrangeHRMS(testData.credentials.username, testData.credentials.password);
    await jobTitlesPage.navigate();
  });

  test.afterEach(async ({ page }) => {
    await navigationPage.logout();
  });

  test('should add a new job title successfully', async ({ page }) => {
    await jobTitlesPage.addJobTitle(testData.newJobTitle);

    await expect(
      page.getByRole('cell', { name: testData.newJobTitle.title })
    ).toBeVisible();
  });

  test('should edit an existing job title', async ({ page }) => {
    const editJobButton = page.locator(
      'div:nth-child(28) > .oxd-table-row > div:nth-child(4) > .oxd-table-cell-actions > button:nth-child(2)'
    );

    await jobTitlesPage.editJobTitle(editJobButton, testData.editJobTitle);

    await expect(
      page.getByRole('cell', { name: testData.newJobTitle.title })
    ).toBeVisible();
  });

  test('should delete a job title', async ({ page }) => {
    const deleteJobButton = page.locator(
      'div:nth-child(28) > .oxd-table-row > div:nth-child(4) > .oxd-table-cell-actions > button'
    ).first();

    await jobTitlesPage.deleteJobTitle(deleteJobButton);

    await expect(
      page.getByRole('cell', { name: testData.newJobTitle.title })
    ).not.toBeVisible();
  });
});