import { Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {

    // Locators
    private readonly emailInput: Locator = this.page.getByPlaceholder('email@example.com');
    private readonly passwordInput: Locator = this.page.getByPlaceholder('enter your passsword');
    private readonly loginButton: Locator = this.page.locator('#login');
    private readonly loginErrorMessage: Locator = this.page.getByRole('alert', { name: 'Incorrect email or password.' });
    private readonly emailRequiredErrorMessage: Locator = this.page.getByText('*Email is required', { exact: true });
    private readonly passwordRequiredErrorMessage: Locator = this.page.getByText('*Password is required', { exact: true });
    private readonly passwordChangedSuccessMessage: Locator = this.page.locator('div[aria-label="Password Changed Successfully"]');

    // Methods
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectLoginErrorMessage(message: string): Promise<void> {
        await expect(this.loginErrorMessage).toHaveText(message);
    }

    async expectEmailRequiredError(message: string): Promise<void> {
        await expect(this.emailRequiredErrorMessage).toHaveText(message);
    }

    async expectPasswordRequiredError(message: string): Promise<void> {
        await expect(this.passwordRequiredErrorMessage).toHaveText(message);
    }

    async expectPasswordChangedSuccessMessage(message: string): Promise<void> {
        await expect(this.passwordChangedSuccessMessage).toHaveText(message);
    }
}