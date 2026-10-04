import { test as setup, expect } from '@playwright/test';
import { env } from '@utils/env';
import { ROUTES } from '@routes/routes';

setup('authenticate user', async ({ page, request }) => {

    const response = await request.post('api/ecom/auth/login', {
        data: {
            userEmail: env.email,
            userPassword: env.password
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