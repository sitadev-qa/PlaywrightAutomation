const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { UserManagementPage } = require('../pages/UserManagementPage');
const { NavigationPage } = require('../pages/NavigationPage');
const testData = require('../testdata/userData.json');

test.describe('User Management', () => {
  let loginPage;
  let userManagementPage;
  let navigationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    userManagementPage = new UserManagementPage(page);
    navigationPage = new NavigationPage(page);

    await loginPage.goto();
    await loginPage.login(testData.credentials.username, testData.credentials.password);
    await userManagementPage.navigate();
  });

  test.afterEach(async ({ page }) => {
    await navigationPage.logout();
  });

  test('should add a new user successfully', async ({ page }) => {
    await userManagementPage.addUser(testData.newUser);

    await userManagementPage.gotoUsersPage();
    await expect(page.getByRole('cell', { name: testData.newUser.username })).toBeVisible();
  });

  test('should edit an existing user status to Disabled', async ({ page }) => {
    const editUserButton = page.locator(
      'div:nth-child(6) > .oxd-table-row > div:nth-child(6) > .oxd-table-cell-actions > button:nth-child(2)'
    );

    await userManagementPage.gotoUsersPage();
    await userManagementPage.editUser(editUserButton, testData.editUser);

    await expect(page.getByRole('cell', { name: testData.editUser.status })).toBeVisible();
  });

  test('should delete an existing user', async ({ page }) => {
    const deleteUserButton = page.locator(
      'div:nth-child(6) > .oxd-table-row > div:nth-child(6) > .oxd-table-cell-actions > button'
    ).first();

    await userManagementPage.gotoUsersPage();
    const usernameCell = page.locator(
      'div:nth-child(6) > .oxd-table-row > div:nth-child(3)'
    );
    const deletedUsername = await usernameCell.innerText();

    await userManagementPage.deleteUser(deleteUserButton);

    await expect(page.getByRole('cell', { name: deletedUsername })).not.toBeVisible();
  });
});