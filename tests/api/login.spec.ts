import { test, expect } from '@playwright/test';
import { env } from '@utils/env';

test('Login API with valid credentials', { tag: ['@auth', '@smoke'] }, async ({ request }) => {
    const response = await request.post('api/ecom/auth/login', {
        data: {
            userEmail: env.email,
            userPassword: env.password
        }
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody.token).toBeTruthy();
    expect(responseBody.userId).toBeTruthy();
    expect(responseBody.message).toBe('Login Successfully');
});