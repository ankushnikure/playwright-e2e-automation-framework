import { RegisterPage } from '@pages/register.page';
import { test } from '@playwright/test';
import { ROUTES } from '@routes/routes';
import registraionData from '@test-data/registraion.data.json';
import type { RegistraionData } from '@pages/register.page';

test.describe('Resgiter Test', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto(ROUTES.REGISTER);
    });

    test('Verify user registraion', async ({ }) => {
        await registerPage.registerUser(registraionData as RegistraionData);
        await registerPage.expectRegistrationError(' User already exisits with this Email Id! ');
    });

});