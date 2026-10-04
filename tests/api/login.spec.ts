import { test, expect } from '@playwright/test';
import { env } from '@utils/env';

test('Login API with valid credentials', async ({ request }) => {

    const response = await request.post('api/ecom/auth/login', {
        data: {
            userEmail: env.email,
            userPassword: env.password
        }
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    console.log(responseBody);
});