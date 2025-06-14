import { expect } from '@playwright/test'; // ✅ Import Playwright's built-in expect
import { test } from '../utils/baseTest';  // ✅ Still use your custom test fixtures
import { validCredentials, invalidPassword, unregisteredUser, emptyEmail, emptyPassword } from '../data/credentials';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ loginPage }) => {
    await loginPage.enterEmail(validCredentials.email);
    await loginPage.enterPassword(validCredentials.password);
    await loginPage.clickSignIn();
    await expect(loginPage.page).toHaveURL(/customer\/account/);
  });

  test('should show error on invalid password', async ({ loginPage }) => {
    await loginPage.enterEmail(invalidPassword.email);
    await loginPage.enterPassword(invalidPassword.password);
    await loginPage.clickSignIn();
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('incorrect');
  });

  test('should show error on unregistered email', async ({ loginPage }) => {
    await loginPage.enterEmail(unregisteredUser.email);
    await loginPage.enterPassword(unregisteredUser.password);
    await loginPage.clickSignIn();
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('incorrect');
  });

/*
  test('should show required field error for empty email', async ({ loginPage }) => {
    await loginPage.enterEmail(''); // leave email blank
    await loginPage.enterPassword('dummyPassword'); // ensure password is not blank
    await loginPage.clickSignIn();
  
    const error = await loginPage.getErrorMessage(); // uses `.message-error` internally
    expect(error).toContain('A login and a password are required.');
  });

  test('should show required field error for empty password', async ({ loginPage }) => {
    await loginPage.enterEmail('test@example.com'); // Provide only email
    await loginPage.enterPassword('');              // Leave password blank
    await loginPage.clickSignIn();
  
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('A login and a password are required.');
  });
  

  test('should show required field error for empty email', async ({ loginPage }) => {
    await loginPage.enterEmail(emptyEmail.email);
    await loginPage.enterPassword(emptyEmail.password);
    await loginPage.clickSignIn();
    const error = await loginPage.getValidationError('#email-error');
    expect(error).toContain('This is a required field.');
  });

  test('should show required field error for empty password', async ({ loginPage }) => {
    await loginPage.enterEmail(emptyPassword.email);
    await loginPage.enterPassword(emptyPassword.password);
    await loginPage.clickSignIn();
    const error = await loginPage.getValidationError('#pass-error');
    expect(error).toContain('This is a required field.');
  });
  */
});
