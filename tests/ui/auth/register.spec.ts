import { test } from '@fixtures/page.fixture';
import { ROUTES } from '@routes/routes';
import registrationData from '@test-data/registration.data.json';
import type { RegistrationData } from '@pages/registration.page';

test.describe('Registration Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(ROUTES.REGISTER);
    });

    test('Show error when user already exists', async ({ registrationPage }) => {
        await registrationPage.registerUser(registrationData as RegistrationData);
        await registrationPage.expectRegistrationError(' User already exisits with this Email Id! ');
    });

});