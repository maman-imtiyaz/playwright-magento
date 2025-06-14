import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

type Pages = {
  loginPage: LoginPage;
};

export const test = baseTest.extend<Pages>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});
