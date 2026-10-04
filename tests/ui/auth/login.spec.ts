import { test, expect } from '@fixtures/page.fixture';
import { ROUTES } from '@routes/routes';
import { env } from '@utils/env';
import loginData from '@test-data/login.data.json';

test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(ROUTES.LOGIN);
    });

    test('Login with valid credentials', { tag: ['@auth', '@smoke'] }, async ({ page, loginPage }) => {
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

    test('Login with invalid credentials', { tag: '@auth' }, async ({ page, loginPage }) => {
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

    test('Show validation errors for empty credentials', { tag: '@auth' }, async ({ loginPage }) => {
        const { email, password } = loginData.missingField;

        await loginPage.login(email, password);

        await loginPage.expectEmailRequiredError('*Email is required');
        await loginPage.expectPasswordRequiredError('*Password is required');
    });
});