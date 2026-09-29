import { BasePage } from "./base.page";

export type ResetPasswordData = {
    email: string;
    password: string;
}

export class ForgotPasswordPage extends BasePage {

    // Locators
    private readonly emailInput = this.page.getByRole('textbox', { name: 'Enter your email address' });
    private readonly passwordInput = this.page.getByRole('textbox', { name: 'Passsword' });
    private readonly confirmPasswordInput = this.page.getByRole('textbox', { name: 'Confirm Password' });
    private readonly saveNewPasswordButton = this.page.getByRole('button', { name: 'Save New Password' });
    private readonly loginLink = this.page.getByRole('link', { name: 'Login' });
    private readonly registerlink = this.page.getByRole('link', { name: 'Register' });

    // Methods
    async fillResetPasswordForm(data: ResetPasswordData): Promise<void> {
        await this.emailInput.fill(data.email)
        await this.passwordInput.fill(data.password);
        await this.confirmPasswordInput.fill(data.password);
    }

    async saveNewPassword(): Promise<void> {
        await this.saveNewPasswordButton.click();
    }

}