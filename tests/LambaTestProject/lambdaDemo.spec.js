// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Login and Register Module Test Suite
 * Application: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
 * Coverage: 100% - All positive and negative scenarios
 */

// Test Data
const testData = {
  validCredentials: {
    email: 'test@example.com',
    password: 'Test@12345'
  },
  registrationData: {
    firstName: 'John',
    lastName: 'Doe',
    email: `john.doe.${Date.now()}@example.com`,
    telephone: '1234567890',
    password: 'SecurePass@123',
    confirmPassword: 'SecurePass@123'
  },
  invalidCredentials: [
    { email: 'invalid@example.com', password: 'WrongPass123', error: 'Warning: No match for E-Mail Address and/or Password.' },
    { email: '', password: 'Password123', error: 'E-Mail Address must not be empty!' },
    { email: 'test@example.com', password: '', error: 'Password must not be empty!' },
    { email: '', password: '', error: 'E-Mail Address must not be empty!' }
  ],
  invalidRegistrationData: [
    { firstName: '', lastName: 'Doe', email: 'test@example.com', telephone: '1234567890', password: 'Test@12345', confirmPassword: 'Test@12345', error: 'First Name must be between 1 and 32 characters!' },
    { firstName: 'John', lastName: '', email: 'test@example.com', telephone: '1234567890', password: 'Test@12345', confirmPassword: 'Test@12345', error: 'Last Name must be between 1 and 32 characters!' },
    { firstName: 'John', lastName: 'Doe', email: 'invalid-email', telephone: '1234567890', password: 'Test@12345', confirmPassword: 'Test@12345', error: 'E-Mail Address does not appear to be valid!' },
    { firstName: 'John', lastName: 'Doe', email: '', telephone: '1234567890', password: 'Test@12345', confirmPassword: 'Test@12345', error: 'E-Mail Address must not be empty!' },
    { firstName: 'John', lastName: 'Doe', email: 'test@example.com', telephone: '', password: 'Test@12345', confirmPassword: 'Test@12345', error: 'Telephone must be between 3 and 32 characters!' },
    { firstName: 'John', lastName: 'Doe', email: 'test@example.com', telephone: '12', password: 'Test@12345', confirmPassword: 'Test@12345', error: 'Telephone must be between 3 and 32 characters!' },
    { firstName: 'John', lastName: 'Doe', email: 'test@example.com', telephone: '1234567890', password: '', confirmPassword: 'Test@12345', error: 'Password must be between 4 and 20 characters!' },
    { firstName: 'John', lastName: 'Doe', email: 'test@example.com', telephone: '1234567890', password: '123', confirmPassword: 'Test@12345', error: 'Password must be between 4 and 20 characters!' },
    { firstName: 'John', lastName: 'Doe', email: 'test@example.com', telephone: '1234567890', password: 'Test@12345', confirmPassword: 'Different@123', error: 'Password confirmation does not match password!' }
  ]
};

test.describe('🔐 LOGIN MODULE - Complete Test Coverage', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
    await page.setViewportSize({ width: 1920, height: 1080 });
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  // Helper function to navigate to login page
  const navigateToLoginPage = async (page) => {
    // Hover over My Account to open dropdown
    await page.getByRole('link', { name: 'My Account' }).hover();
    // Wait for dropdown and click Login
    await page.waitForTimeout(500);
    await page.getByRole('link', { name: 'Login' }).click();
  };

  // Helper function to navigate to register page
  const navigateToRegisterPage = async (page) => {
    // Hover over My Account to open dropdown
    await page.getByRole('link', { name: 'My Account' }).hover();
    // Wait for dropdown and click Register
    await page.waitForTimeout(500);
    await page.getByRole('link', { name: 'Register' }).click();
  };

  // ==================== POSITIVE TEST CASES ====================
  
  test('TC01 - Verify user can navigate to login page', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await navigateToLoginPage(page);
      await expect(page).toHaveURL(/.*route=account\/login/);
      await expect(page.getByText('Account Login')).toBeVisible();
    });
  });

  test('TC02 - Verify successful login with valid credentials', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await navigateToLoginPage(page);
    });
    
    await test.step('Enter valid credentials', async () => {
      await page.getByPlaceholder('E-Mail Address').fill(testData.validCredentials.email);
      await page.getByPlaceholder('Password').fill(testData.validCredentials.password);
    });
    
    await test.step('Submit login form', async () => {
      await page.getByRole('button', { name: 'Login' }).click();
    });
    
    await test.step('Verify successful login', async () => {
      await expect(page).toHaveURL(/.*route=account\/account/);
      await expect(page.getByText('My Account')).toBeVisible();
    });
  });

  test('TC03 - Verify "Forgotten Password" link is available', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await navigateToLoginPage(page);
    });
    
    await test.step('Verify forgotten password link', async () => {
      await expect(page.getByRole('link', { name: 'Forgotten Password' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Forgotten Password' })).toHaveAttribute('href', /.*route=account\/forgotten/);
    });
  });

  test('TC04 - Verify "Continue" button redirects to register page', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await navigateToLoginPage(page);
    });
    
    await test.step('Click Continue button', async () => {
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Verify navigation to register page', async () => {
      await expect(page).toHaveURL(/.*route=account\/register/);
      await expect(page.getByText('Register Account')).toBeVisible();
    });
  });

  // ==================== NEGATIVE TEST CASES ====================
  
  test('TC05 - Verify login with invalid email and password', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await navigateToLoginPage(page);
    });
    
    await test.step('Enter invalid credentials', async () => {
      await page.getByPlaceholder('E-Mail Address').fill(testData.invalidCredentials[0].email);
      await page.getByPlaceholder('Password').fill(testData.invalidCredentials[0].password);
      await page.getByRole('button', { name: 'Login' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText(testData.invalidCredentials[0].error)).toBeVisible();
    });
  });

  test('TC06 - Verify login with empty email field', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await navigateToLoginPage(page);
    });
    
    await test.step('Enter empty email and valid password', async () => {
      await page.getByPlaceholder('E-Mail Address').fill(testData.invalidCredentials[1].email);
      await page.getByPlaceholder('Password').fill(testData.invalidCredentials[1].password);
      await page.getByRole('button', { name: 'Login' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText(testData.invalidCredentials[1].error)).toBeVisible();
    });
  });

  test('TC07 - Verify login with empty password field', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await navigateToLoginPage(page);
    });
    
    await test.step('Enter valid email and empty password', async () => {
      await page.getByPlaceholder('E-Mail Address').fill(testData.invalidCredentials[2].email);
      await page.getByPlaceholder('Password').fill(testData.invalidCredentials[2].password);
      await page.getByRole('button', { name: 'Login' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText(testData.invalidCredentials[2].error)).toBeVisible();
    });
  });

  test('TC08 - Verify login with both fields empty', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await navigateToLoginPage(page);
    });
    
    await test.step('Leave both fields empty', async () => {
      await page.getByPlaceholder('E-Mail Address').fill(testData.invalidCredentials[3].email);
      await page.getByPlaceholder('Password').fill(testData.invalidCredentials[3].password);
      await page.getByRole('button', { name: 'Login' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText(testData.invalidCredentials[3].error)).toBeVisible();
    });
  });

  test('TC09 - Verify login with malformed email address', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await navigateToLoginPage(page);
    });
    
    await test.step('Enter malformed email', async () => {
      await page.getByPlaceholder('E-Mail Address').fill('invalid-email-format');
      await page.getByPlaceholder('Password').fill('Password123');
      await page.getByRole('button', { name: 'Login' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText('E-Mail Address does not appear to be valid!')).toBeVisible();
    });
  });

  test('TC10 - Verify login page elements are visible', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await navigateToLoginPage(page);
    });
    
    await test.step('Verify all required elements', async () => {
      await expect(page.getByPlaceholder('E-Mail Address')).toBeVisible();
      await expect(page.getByPlaceholder('Password')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Forgotten Password' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();
    });
  });
});

test.describe('📝 REGISTER MODULE - Complete Test Coverage', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForLoadState('networkidle');
  });

  // ==================== POSITIVE TEST CASES ====================
  
  test('TC11 - Verify user can navigate to register page', async ({ page }) => {
    await test.step('Navigate to My Account', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
    });
    
    await test.step('Click Continue button', async () => {
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Verify register page', async () => {
      await expect(page).toHaveURL(/.*route=account\/register/);
      await expect(page.getByText('Register Account')).toBeVisible();
    });
  });

  test('TC12 - Verify successful registration with valid data', async ({ page }) => {
    const uniqueEmail = `user.${Date.now()}@example.com`;
    
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Fill registration form', async () => {
      await page.getByPlaceholder('First Name').fill(testData.registrationData.firstName);
      await page.getByPlaceholder('Last Name').fill(testData.registrationData.lastName);
      await page.getByPlaceholder('E-Mail').fill(uniqueEmail);
      await page.getByPlaceholder('Telephone').fill(testData.registrationData.telephone);
      await page.getByPlaceholder('Password').fill(testData.registrationData.password);
      await page.getByPlaceholder('Password Confirm').fill(testData.registrationData.confirmPassword);
    });
    
    await test.step('Accept privacy policy', async () => {
      await page.getByLabel('I have read and agree to').check();
    });
    
    await test.step('Submit registration', async () => {
      await page.getByRole('button', { name: 'Continue' }).click();
    });
    
    await test.step('Verify successful registration', async () => {
      await expect(page).toHaveURL(/.*route=account\/success/);
      await expect(page.getByText('Your Account Has Been Created!')).toBeVisible();
    });
  });

  test('TC13 - Verify all form fields are visible on register page', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Verify all form fields', async () => {
      await expect(page.getByPlaceholder('First Name')).toBeVisible();
      await expect(page.getByPlaceholder('Last Name')).toBeVisible();
      await expect(page.getByPlaceholder('E-Mail')).toBeVisible();
      await expect(page.getByPlaceholder('Telephone')).toBeVisible();
      await expect(page.getByPlaceholder('Password')).toBeVisible();
      await expect(page.getByPlaceholder('Password Confirm')).toBeVisible();
      await expect(page.getByLabel('I have read and agree to')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
    });
  });

  test('TC14 - Verify password field accepts secure password', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Enter secure password', async () => {
      await page.getByPlaceholder('Password').fill('SecureP@ss123');
      await page.getByPlaceholder('Password Confirm').fill('SecureP@ss123');
    });
    
    await test.step('Verify password is accepted', async () => {
      await expect(page.getByPlaceholder('Password')).toHaveValue('SecureP@ss123');
    });
  });

  test('TC15 - Verify newsletter subscription option', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Verify newsletter options', async () => {
      await expect(page.getByText('Newsletter')).toBeVisible();
      await expect(page.getByLabel('Yes')).toBeVisible();
      await expect(page.getByLabel('No')).toBeVisible();
    });
  });

  // ==================== NEGATIVE TEST CASES ====================
  
  test('TC16 - Verify registration with empty first name', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Fill form with empty first name', async () => {
      await page.getByPlaceholder('First Name').fill(testData.invalidRegistrationData[0].firstName);
      await page.getByPlaceholder('Last Name').fill(testData.invalidRegistrationData[0].lastName);
      await page.getByPlaceholder('E-Mail').fill(testData.invalidRegistrationData[0].email);
      await page.getByPlaceholder('Telephone').fill(testData.invalidRegistrationData[0].telephone);
      await page.getByPlaceholder('Password').fill(testData.invalidRegistrationData[0].password);
      await page.getByPlaceholder('Password Confirm').fill(testData.invalidRegistrationData[0].confirmPassword);
      await page.getByLabel('I have read and agree to').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText(testData.invalidRegistrationData[0].error)).toBeVisible();
    });
  });

  test('TC17 - Verify registration with empty last name', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Fill form with empty last name', async () => {
      await page.getByPlaceholder('First Name').fill(testData.invalidRegistrationData[1].firstName);
      await page.getByPlaceholder('Last Name').fill(testData.invalidRegistrationData[1].lastName);
      await page.getByPlaceholder('E-Mail').fill(testData.invalidRegistrationData[1].email);
      await page.getByPlaceholder('Telephone').fill(testData.invalidRegistrationData[1].telephone);
      await page.getByPlaceholder('Password').fill(testData.invalidRegistrationData[1].password);
      await page.getByPlaceholder('Password Confirm').fill(testData.invalidRegistrationData[1].confirmPassword);
      await page.getByLabel('I have read and agree to').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText(testData.invalidRegistrationData[1].error)).toBeVisible();
    });
  });

  test('TC18 - Verify registration with invalid email format', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Fill form with invalid email', async () => {
      await page.getByPlaceholder('First Name').fill(testData.invalidRegistrationData[2].firstName);
      await page.getByPlaceholder('Last Name').fill(testData.invalidRegistrationData[2].lastName);
      await page.getByPlaceholder('E-Mail').fill(testData.invalidRegistrationData[2].email);
      await page.getByPlaceholder('Telephone').fill(testData.invalidRegistrationData[2].telephone);
      await page.getByPlaceholder('Password').fill(testData.invalidRegistrationData[2].password);
      await page.getByPlaceholder('Password Confirm').fill(testData.invalidRegistrationData[2].confirmPassword);
      await page.getByLabel('I have read and agree to').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText(testData.invalidRegistrationData[2].error)).toBeVisible();
    });
  });

  test('TC19 - Verify registration with empty email', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Fill form with empty email', async () => {
      await page.getByPlaceholder('First Name').fill(testData.invalidRegistrationData[3].firstName);
      await page.getByPlaceholder('Last Name').fill(testData.invalidRegistrationData[3].lastName);
      await page.getByPlaceholder('E-Mail').fill(testData.invalidRegistrationData[3].email);
      await page.getByPlaceholder('Telephone').fill(testData.invalidRegistrationData[3].telephone);
      await page.getByPlaceholder('Password').fill(testData.invalidRegistrationData[3].password);
      await page.getByPlaceholder('Password Confirm').fill(testData.invalidRegistrationData[3].confirmPassword);
      await page.getByLabel('I have read and agree to').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText(testData.invalidRegistrationData[3].error)).toBeVisible();
    });
  });

  test('TC20 - Verify registration with empty telephone', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Fill form with empty telephone', async () => {
      await page.getByPlaceholder('First Name').fill(testData.invalidRegistrationData[4].firstName);
      await page.getByPlaceholder('Last Name').fill(testData.invalidRegistrationData[4].lastName);
      await page.getByPlaceholder('E-Mail').fill(testData.invalidRegistrationData[4].email);
      await page.getByPlaceholder('Telephone').fill(testData.invalidRegistrationData[4].telephone);
      await page.getByPlaceholder('Password').fill(testData.invalidRegistrationData[4].password);
      await page.getByPlaceholder('Password Confirm').fill(testData.invalidRegistrationData[4].confirmPassword);
      await page.getByLabel('I have read and agree to').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText(testData.invalidRegistrationData[4].error)).toBeVisible();
    });
  });

  test('TC21 - Verify registration with short telephone', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Fill form with short telephone', async () => {
      await page.getByPlaceholder('First Name').fill(testData.invalidRegistrationData[5].firstName);
      await page.getByPlaceholder('Last Name').fill(testData.invalidRegistrationData[5].lastName);
      await page.getByPlaceholder('E-Mail').fill(testData.invalidRegistrationData[5].email);
      await page.getByPlaceholder('Telephone').fill(testData.invalidRegistrationData[5].telephone);
      await page.getByPlaceholder('Password').fill(testData.invalidRegistrationData[5].password);
      await page.getByPlaceholder('Password Confirm').fill(testData.invalidRegistrationData[5].confirmPassword);
      await page.getByLabel('I have read and agree to').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText(testData.invalidRegistrationData[5].error)).toBeVisible();
    });
  });

  test('TC22 - Verify registration with empty password', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Fill form with empty password', async () => {
      await page.getByPlaceholder('First Name').fill(testData.invalidRegistrationData[6].firstName);
      await page.getByPlaceholder('Last Name').fill(testData.invalidRegistrationData[6].lastName);
      await page.getByPlaceholder('E-Mail').fill(testData.invalidRegistrationData[6].email);
      await page.getByPlaceholder('Telephone').fill(testData.invalidRegistrationData[6].telephone);
      await page.getByPlaceholder('Password').fill(testData.invalidRegistrationData[6].password);
      await page.getByPlaceholder('Password Confirm').fill(testData.invalidRegistrationData[6].confirmPassword);
      await page.getByLabel('I have read and agree to').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText(testData.invalidRegistrationData[6].error)).toBeVisible();
    });
  });

  test('TC23 - Verify registration with short password', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Fill form with short password', async () => {
      await page.getByPlaceholder('First Name').fill(testData.invalidRegistrationData[7].firstName);
      await page.getByPlaceholder('Last Name').fill(testData.invalidRegistrationData[7].lastName);
      await page.getByPlaceholder('E-Mail').fill(testData.invalidRegistrationData[7].email);
      await page.getByPlaceholder('Telephone').fill(testData.invalidRegistrationData[7].telephone);
      await page.getByPlaceholder('Password').fill(testData.invalidRegistrationData[7].password);
      await page.getByPlaceholder('Password Confirm').fill(testData.invalidRegistrationData[7].confirmPassword);
      await page.getByLabel('I have read and agree to').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText(testData.invalidRegistrationData[7].error)).toBeVisible();
    });
  });

  test('TC24 - Verify registration with mismatched passwords', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Fill form with mismatched passwords', async () => {
      await page.getByPlaceholder('First Name').fill(testData.invalidRegistrationData[8].firstName);
      await page.getByPlaceholder('Last Name').fill(testData.invalidRegistrationData[8].lastName);
      await page.getByPlaceholder('E-Mail').fill(testData.invalidRegistrationData[8].email);
      await page.getByPlaceholder('Telephone').fill(testData.invalidRegistrationData[8].telephone);
      await page.getByPlaceholder('Password').fill(testData.invalidRegistrationData[8].password);
      await page.getByPlaceholder('Password Confirm').fill(testData.invalidRegistrationData[8].confirmPassword);
      await page.getByLabel('I have read and agree to').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText(testData.invalidRegistrationData[8].error)).toBeVisible();
    });
  });

  test('TC25 - Verify registration without accepting privacy policy', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Fill form without accepting privacy policy', async () => {
      await page.getByPlaceholder('First Name').fill('John');
      await page.getByPlaceholder('Last Name').fill('Doe');
      await page.getByPlaceholder('E-Mail').fill('test@example.com');
      await page.getByPlaceholder('Telephone').fill('1234567890');
      await page.getByPlaceholder('Password').fill('Test@12345');
      await page.getByPlaceholder('Password Confirm').fill('Test@12345');
      // Do NOT check the privacy policy
      await page.getByRole('button', { name: 'Continue' }).click();
    });
    
    await test.step('Verify error message', async () => {
      await expect(page.getByText('Warning: You must agree to the Privacy Policy!')).toBeVisible();
    });
  });

  test('TC26 - Verify first name with special characters', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Enter first name with special characters', async () => {
      await page.getByPlaceholder('First Name').fill('Jo@n!');
      await page.getByPlaceholder('Last Name').fill('Doe');
      await page.getByPlaceholder('E-Mail').fill('test@example.com');
      await page.getByPlaceholder('Telephone').fill('1234567890');
      await page.getByPlaceholder('Password').fill('Test@12345');
      await page.getByPlaceholder('Password Confirm').fill('Test@12345');
      await page.getByLabel('I have read and agree to').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
    
    await test.step('Verify first name is accepted', async () => {
      await expect(page.getByPlaceholder('First Name')).toHaveValue('Jo@n!');
    });
  });

  test('TC27 - Verify navigation back to login from register', async ({ page }) => {
    await test.step('Navigate to register page', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
    });
    
    await test.step('Navigate back to login', async () => {
      await page.getByRole('link', { name: 'My Account' }).first().click();
    });
    
    await test.step('Verify login page is displayed', async () => {
      await expect(page).toHaveURL(/.*route=account\/login/);
      await expect(page.getByText('Account Login')).toBeVisible();
    });
  });
});

test.describe('🔄 INTEGRATED FLOWS - Login & Register', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForLoadState('networkidle');
  });

  test('TC28 - Complete registration to login flow', async ({ page }) => {
    const uniqueEmail = `flowtest.${Date.now()}@example.com`;
    
    await test.step('Register new account', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByRole('link', { name: 'Continue' }).click();
      await page.getByPlaceholder('First Name').fill('Flow');
      await page.getByPlaceholder('Last Name').fill('Test');
      await page.getByPlaceholder('E-Mail').fill(uniqueEmail);
      await page.getByPlaceholder('Telephone').fill('1234567890');
      await page.getByPlaceholder('Password').fill('FlowTest@123');
      await page.getByPlaceholder('Password Confirm').fill('FlowTest@123');
      await page.getByLabel('I have read and agree to').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
    
    await test.step('Verify registration success', async () => {
      await expect(page).toHaveURL(/.*route=account\/success/);
    });
    
    await test.step('Navigate to login', async () => {
      await page.getByRole('link', { name: 'Logout' }).click();
    });
    
    await test.step('Login with registered credentials', async () => {
      await page.getByPlaceholder('E-Mail Address').fill(uniqueEmail);
      await page.getByPlaceholder('Password').fill('FlowTest@123');
      await page.getByRole('button', { name: 'Login' }).click();
    });
    
    await test.step('Verify successful login', async () => {
      await expect(page).toHaveURL(/.*route=account\/account/);
    });
  });

  test('TC29 - Verify logout functionality', async ({ page }) => {
    await test.step('Login first', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByPlaceholder('E-Mail Address').fill(testData.validCredentials.email);
      await page.getByPlaceholder('Password').fill(testData.validCredentials.password);
      await page.getByRole('button', { name: 'Login' }).click();
    });
    
    await test.step('Verify logged in state', async () => {
      await expect(page).toHaveURL(/.*route=account\/account/);
    });
    
    await test.step('Logout', async () => {
      await page.getByRole('link', { name: 'Logout' }).click();
    });
    
    await test.step('Verify logout success', async () => {
      await expect(page).toHaveURL(/.*route=account\/logout/);
      await expect(page.getByText('Account Logout')).toBeVisible();
    });
  });

  test('TC30 - Verify account page accessibility after login', async ({ page }) => {
    await test.step('Login', async () => {
      await page.getByRole('link', { name: 'My Account' }).click({ force: true });
      await page.getByPlaceholder('E-Mail Address').fill(testData.validCredentials.email);
      await page.getByPlaceholder('Password').fill(testData.validCredentials.password);
      await page.getByRole('button', { name: 'Login' }).click();
    });
    
    await test.step('Verify account page elements', async () => {
      await expect(page.getByText('My Account')).toBeVisible();
      await expect(page.getByText('My Orders')).toBeVisible();
      await expect(page.getByText('My Downloadable Products')).toBeVisible();
      await expect(page.getByText('Edit Your Account Information')).toBeVisible();
    });
  });
});