import { BasePage } from './base.page';
import { Locator, expect } from '@playwright/test';

export type RegistrationData = {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string,
    occupation: 'Doctor' | 'Student' | 'Engineer' | 'Scientist';
    gender: 'Male' | 'Female';
    password: string;
}

export class RegisterPage extends BasePage {

    // Locators
    private readonly firstNameInput: Locator = this.page.getByPlaceholder('First Name');
    private readonly lastNameInput: Locator = this.page.getByPlaceholder('Last Name');
    private readonly emailInput: Locator = this.page.getByPlaceholder('email@example.com');
    private readonly mobileNumberInput: Locator = this.page.getByPlaceholder('enter your number');
    private readonly occupationDropdown: Locator = this.page.locator('select[formcontrolname="occupation"]');
    private readonly maleRadioButton: Locator = this.page.getByLabel('Male', { exact: true });
    private readonly femaleRadioButton: Locator = this.page.getByLabel('Female', { exact: true });
    private readonly passwordInput: Locator = this.page.getByRole('textbox', { name: 'Passsword' })
    private readonly confirmPasswordInput: Locator = this.page.getByRole('textbox', { name: 'Confirm Password' });
    private readonly requiredAgeCheckbox: Locator = this.page.locator('input[type="checkbox"][formcontrolname="required"]');
    private readonly registerButton: Locator = this.page.getByRole('button', { name: 'Register' });
    private readonly registrationErrorMessage: Locator = this.page.getByRole('alert', { name: ' User already exisits with this Email Id! ' });


    // Methods
    async registerUser(user: RegistraionData): Promise<void> {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.mobileNumberInput.fill(user.mobileNumber);
        await this.occupationDropdown.selectOption({ label: user.occupation });

        if (user.gender === 'Male') {
            await this.maleRadioButton.check();
        } else {
            await this.femaleRadioButton.check();
        }

        await this.passwordInput.fill(user.password);
        await this.confirmPasswordInput.fill(user.password);
        await this.requiredAgeCheckbox.check();
        await this.registerButton.click();
    }

    async expectRegistrationError(message: string): Promise<void> {
        await expect(this.registrationErrorMessage).toHaveText(message);
    }

}