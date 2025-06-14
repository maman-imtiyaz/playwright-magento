import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://magento.softwaretestingboard.com/customer/account/login');
  }

  async enterEmail(email: string) {
    await this.page.fill('#email', email);
  }

  async enterPassword(password: string) {
    await this.page.fill('#pass', password);
  }

  async clickSignIn() {
    await this.page.click('button[id="send2"]');
  }

  async getErrorMessage(): Promise<string> {
    return this.page.textContent('.message-error');
  }

  async getValidationError(selector: string): Promise<string> {
    return this.page.textContent(selector);
  }
}
