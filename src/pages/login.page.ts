import { Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {

    // Locators
    private readonly emailInput: Locator = this.page.getByPlaceholder("email@example.com");
    private readonly passwordInput: Locator = this.page.getByPlaceholder("enter your passsword");
    private readonly loginButton: Locator = this.page.locator("#login");
    private readonly loginErrorMessage: Locator = this.page.getByRole("alert", { name: "Incorrect email or password." });
    private readonly emailRequiredError: Locator = this.page.getByText("*Email is required", { exact: true });
    private readonly passwordRequiredError: Locator = this.page.getByText("*Password is required", { exact: true });

    // Methods
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectLoginErrorMessage(message: string): Promise<void> {
        await expect(this.loginErrorMessage).toBeVisible();
    }

    async expectEmailRequiredError(message: string): Promise<void> {
        await expect(this.emailRequiredError).toBeVisible();
    }

    async expectPasswordrequiredError(message: string): Promise<void> {
        await expect(this.passwordRequiredError).toBeVisible();
    }
}