import { test, expect } from '@fixtures/page.fixture';
import { ROUTES } from '@routes/routes';
import forgotPasswordData from '@test-data/forgot-password.data.json';

test.describe('Reset Password Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(ROUTES.FORGOT_PASSWORD);
    });

    test('Reset password successfully', async ({ page, loginPage, forgotPasswordPage }) => {
        await forgotPasswordPage.fillResetPasswordForm(forgotPasswordData);
        await forgotPasswordPage.saveNewPassword();
        await expect(page).toHaveURL(/login/);
        await loginPage.expectPasswordChangedSuccessMessage('Password Changed Successfully');
    });
});