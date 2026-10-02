import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { ROUTES } from '@routes/routes';

setup('authenticate user', async ({ page, request }) => {

    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    if (!email || !password) {
        throw new Error(`EMAIL or PASSWORD is missing in selected environment`);
    }

    const response = await request.post('api/ecom/auth/login', {
        data: {
            userEmail: email,
            userPassword: password
        }
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody.token).toBeTruthy();

    // Navigate to application domain before setting localStorage
    await page.goto(ROUTES.LOGIN);

    await page.evaluate((token) => {
        localStorage.setItem('token', token);
    }, responseBody.token);

    // Save authenticated browser state
    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });
});