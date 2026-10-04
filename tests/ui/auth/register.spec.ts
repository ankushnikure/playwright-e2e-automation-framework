import { RegisterPage } from '@pages/register.page';
import { test } from '@playwright/test';
import { ROUTES } from '@routes/routes';
import registrationData from '@test-data/registration.data.json';
import type { RegistrationData } from '@pages/register.page';

test.describe('Registration Tests', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto(ROUTES.REGISTER);
    });

    test('Show error when user already exists', async () => {
        await registerPage.registerUser(registrationData as RegistrationData);
        await registerPage.expectRegistrationError(' User already exisits with this Email Id! ');
    });

});