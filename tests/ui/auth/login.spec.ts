import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { ROUTES } from '@routes/routes';
import { env } from '@utils/env'
import loginData from '@test-data/login.data.json';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto(ROUTES.LOGIN);
    });

    test('Verify login with valid credentials', async ({ page }) => {
        // Listen for the login response before triggering the request
        const responsePromise = page.waitForResponse(
            response =>
                response.url().includes('api/ecom/auth/login') &&
                response.request().method() === 'POST'
        );

        // Trigger the login request
        await loginPage.login(env.email, env.password);

        // Wait for the response and validate its status
        const response = await responsePromise;

        // Verify that the login API returned HTTP 200
        expect(response.status()).toBe(200);
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Verify login with invalid credentials', async ({ page }) => {
        const { email, password } = loginData.invalidUser;

        const responsePromise = page.waitForResponse(
            response =>
                response.url().includes('api/ecom/auth/login') &&
                response.request().method() === 'POST'
        );
        await loginPage.login(email, password);

        const response = await responsePromise;

        expect(response.status()).toBe(400);
        await loginPage.expectLoginErrorMessage('Incorrect email or password.');
    });

    test('Verify validation error when the email & password field is empty', async () => {
        const { email, password } = loginData.missingField;
        await loginPage.login(email, password);
        await loginPage.expectEmailRequiredError('*Email is required');
        await loginPage.expectPasswordRequiredError('*Password is required');
    });
});