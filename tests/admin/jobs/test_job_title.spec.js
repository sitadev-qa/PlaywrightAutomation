const { test } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { JobTitlesPage } = require('./pages/JobTitlesPage');
const { UserManagementPage } = require('./pages/UserManagementPage');
const { NavigationPage } = require('./pages/NavigationPage');

test.describe('OrangeHRM Admin Workflow', () => {

  test('Manage Job Titles and Users', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const jobTitlesPage = new JobTitlesPage(page);
    const userManagementPage = new UserManagementPage(page);
    const navigationPage = new NavigationPage(page);

    // --- Login ---
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    // --- Job Title: Add ---
    await jobTitlesPage.navigate();
    await jobTitlesPage.addJobTitle({
      title: 'Test Job Title',
      description: 'Test Job Title Description',
      specFile: '.gitconfig',
      noteFile: 'Screenshot 2026-04-08 182851.png',
      note: 'Add Notes',
    });

    // --- Job Title: Edit ---
    const jobTitleRow = page.getByRole('row', { name: ' Test Job Title Test Job' });
    const editJobButton = page.locator('div:nth-child(28) > .oxd-table-row > div:nth-child(4) > .oxd-table-cell-actions > button:nth-child(2)');
    await jobTitlesPage.editJobTitle(editJobButton, {
      description: 'Test Job Title Description Updated',
      note: 'Add Notes Updated',
    });

    // --- Job Title: Delete ---
    const deleteJobButton = page.locator('div:nth-child(28) > .oxd-table-row > div:nth-child(4) > .oxd-table-cell-actions > button').first();
    await jobTitlesPage.deleteJobTitle(deleteJobButton);

    // --- User: Add ---
    await userManagementPage.navigate();
    await userManagementPage.addUser({
      role: 'Admin',
      employeeHint: 'd',
      employeeOption: 'A8DCo 4Ys 010Z',
      status: 'Enabled',
      username: 'fsfsfsqws',
      password: '@!Game149',
    });

    // --- User: Edit ---
    await userManagementPage.gotoUsersPage();
    const editUserButton = page.locator('div:nth-child(6) > .oxd-table-row > div:nth-child(6) > .oxd-table-cell-actions > button:nth-child(2)');
    await userManagementPage.editUser(editUserButton, { status: 'Disabled' });

    // --- User: Delete ---
    const deleteUserButton = page.locator('div:nth-child(6) > .oxd-table-row > div:nth-child(6) > .oxd-table-cell-actions > button').first();
    await userManagementPage.deleteUser(deleteUserButton);

    // --- Logout ---
    await navigationPage.logout();
  });

});