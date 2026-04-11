export class JobTitlesPage {
  constructor(page) {
    this.page = page;
    this.adminMenuLink = page.getByRole('link', { name: 'Admin' });
    this.jobMenu = page.getByText('Job', { exact: true });
    this.jobTitlesMenuItem = page.getByRole('menuitem', { name: 'Job Titles' });
    this.addButton = page.getByRole('button', { name: ' Add' });
    this.titleInput = page.getByRole('textbox').nth(1);
    this.descriptionInput = page.getByRole('textbox', { name: 'Type description here' });
    this.noteInput = page.getByRole('textbox', { name: 'Add note' });
    this.browseText = page.getByText('Browse');
    this.chooseFileButton = page.getByRole('button', { name: 'Choose File' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.confirmDeleteButton = page.getByRole('button', { name: ' Yes, Delete' });
  }

  async navigate() {
    await this.adminMenuLink.click();
    await this.jobMenu.click();
    await this.jobTitlesMenuItem.click();
  }

  async addJobTitle({ title, description, specFile, noteFile, note }) {
    await this.addButton.click();
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);

    if (specFile) {
      await this.browseText.click();
      await this.chooseFileButton.setInputFiles(specFile);
    }

    if (noteFile) {
      await this.browseText.click();
      await this.chooseFileButton.setInputFiles(noteFile);
    }

    await this.noteInput.fill(note);
    await this.saveButton.click();
  }

  async editJobTitle(rowLocator, { description, note }) {
    await rowLocator.click();
    await this.descriptionInput.fill(description);
    await this.noteInput.fill(note);
    await this.saveButton.click();
  }

  async deleteJobTitle(deleteButtonLocator) {
    await deleteButtonLocator.click();
    await this.confirmDeleteButton.click();
  }
}

export default JobTitlesPage;
