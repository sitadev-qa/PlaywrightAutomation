class UserManagementPage {
  constructor(page) {
    this.page = page;
    this.userManagementMenu = page.getByText('User Management');
    this.usersMenuItem = page.getByRole('menuitem', { name: 'Users' });
    this.addButton = page.getByRole('button', { name: ' Add' });
    this.userRoleDropdownArrow = page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first();
    this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints...' });
    this.statusDropdownArrow = page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon');
    this.usernameInput = page.getByRole('textbox').nth(2);
    this.passwordInput = page.getByRole('textbox').nth(3);
    this.confirmPasswordInput = page.getByRole('textbox').nth(4);
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.confirmDeleteButton = page.getByRole('button', { name: ' Yes, Delete' });
  }

  async navigate() {
    await this.userManagementMenu.click();
    await this.usersMenuItem.click();
  }

  async gotoUsersPage() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  }

  async addUser({ role, employeeHint, employeeOption, status, username, password }) {
    await this.addButton.click();
    await this.userRoleDropdownArrow.click();
    await this.page.getByRole('option', { name: role }).click();
    await this.employeeNameInput.fill(employeeHint);
    await this.page.getByRole('option', { name: employeeOption }).click();
    await this.statusDropdownArrow.click();
    await this.page.getByText(status).click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.passwordInput.press('Tab');
    await this.confirmPasswordInput.press('Tab');
    await this.confirmPasswordInput.fill(password);
    await this.saveButton.click();
  }

  async editUser(editButtonLocator, { status }) {
    await editButtonLocator.click();
    await this.statusDropdownArrow.click();
    await this.page.getByRole('option', { name: status }).click();
    await this.saveButton.click();
  }

  async deleteUser(deleteButtonLocator) {
    await deleteButtonLocator.click();
    await this.confirmDeleteButton.click();
  }
}

module.exports = { UserManagementPage };