import { expect, test } from '@playwright/test';
import { ForgotPasswordPage } from '@pages/forgot-password.page';
import { ROUTES } from '@routes/routes';
import { LoginPage } from '@pages/login.page';
import forgotPasswordData from '@test-data/forgot-password.data.json';

test.describe('Reset Password Tests', () => {
    let loginPage: LoginPage;
    let forgotPasswordPage: ForgotPasswordPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        forgotPasswordPage = new ForgotPasswordPage(page);
        await page.goto(ROUTES.FORGOT_PASSWORD);
    });

    test('Reset password successfully', async ({ page }) => {
        await forgotPasswordPage.fillResetPasswordForm(forgotPasswordData);
        await forgotPasswordPage.saveNewPassword();
        await expect(page).toHaveURL(/login/);
        await loginPage.expectPasswordChangedSuccessMessage('Password Changed Successfully');
    });
});