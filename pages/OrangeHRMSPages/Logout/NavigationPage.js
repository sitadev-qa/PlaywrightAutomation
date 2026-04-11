export class NavigationPage {
  constructor(page) {
    this.page = page;
    this.userProfileMenu = page.locator('[class="oxd-userdropdown-tab"]');
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' });
  }

  async logout() {
    await this.userProfileMenu.click();
    await this.logoutMenuItem.click();
  }
}

export default NavigationPage;