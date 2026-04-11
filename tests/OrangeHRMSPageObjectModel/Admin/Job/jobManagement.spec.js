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
    //Add TimeStamp to Job Title to ensure uniqueness
    const jobTitleValue = `${testData.newJobTitle.title}_${Date.now()}`;
    await jobTitlesPage.addJobTitle({
      title: jobTitleValue,
      description: testData.newJobTitle.description,
      specFile: testData.newJobTitle.specFile,
      noteFile: testData.newJobTitle.noteFile,
      note: testData.newJobTitle.note
    });

    await expect(
      page.getByRole('cell', { name: jobTitleValue })
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


//Single File Perform all Three Operations -

// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../../../../pages/OrangeHRMSPages/loginpage';
// import { JobTitlesPage } from '../../../../pages/OrangeHRMSPages/Admin/JobTitlesPage';
// import { NavigationPage } from '../../../../pages/OrangeHRMSPages/Logout/NavigationPage';
// const testData = require('../../../../testdata/OrangeHRMSTestData/jobData.json');

// test.describe('Job Module - Job Titles (E2E)', () => {
//   let loginPage;
//   let jobTitlesPage;
//   let navigationPage;

//   test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     jobTitlesPage = new JobTitlesPage(page);
//     navigationPage = new NavigationPage(page);

//     await loginPage.navigateToLoginPage();
//     await loginPage.loginIntoOrangeHRMS(
//       testData.credentials.username,
//       testData.credentials.password
//     );

//     await jobTitlesPage.navigate();
//   });

//   test.afterEach(async () => {
//     await navigationPage.logout();
//   });

//   test('should add, edit and delete the same job title', async ({ page }) => {

//     // ============================
//     // ✅ Test Data (Dynamic)
//     // ============================
//     const jobTitle = `${testData.newJobTitle.title}_${Date.now()}`;
//     const updatedJobTitle = `${jobTitle}_EDITED`;

//     // ============================
//     // ✅ ADD JOB
//     // ============================
//     await jobTitlesPage.addJobTitle({
//       title: jobTitle,
//       description: testData.newJobTitle.description,
//       specFile: testData.newJobTitle.specFile,
//       noteFile: testData.newJobTitle.noteFile,
//       note: testData.newJobTitle.note
//     });

//     await expect(
//       page.getByRole('cell', { name: jobTitle })
//     ).toBeVisible();

//     // ============================
//     // ✅ EDIT SAME JOB
//     // ============================
//     const jobRow = page.getByRole('row', { name: jobTitle });

//     const editButton = jobRow.locator('button').nth(1);

//     await jobTitlesPage.editJobTitle(editButton, {
//       title: updatedJobTitle,
//       description: testData.editJobTitle.description
//     });

//     await expect(
//       page.getByRole('cell', { name: updatedJobTitle })
//     ).toBeVisible();

//     // ============================
//     // ✅ DELETE SAME JOB
//     // ============================
//     const updatedRow = page.getByRole('row', { name: updatedJobTitle });

//     const deleteButton = updatedRow.locator('button').first();

//     await jobTitlesPage.deleteJobTitle(deleteButton);

//     await expect(
//       page.getByRole('cell', { name: updatedJobTitle })
//     ).not.toBeVisible();
//   });
// });