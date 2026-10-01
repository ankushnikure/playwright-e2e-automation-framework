import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class PracticePage extends BasePage {

    // Locators
    private readonly alertButton: Locator = this.page.getByRole('button', { name: 'Alert' });
    private readonly confirmButton: Locator = this.page.getByRole('button', { name: 'Confirm' });

    // Methods
    async clickAlert(): Promise<void> {
        await this.alertButton.click();
    }

    async clickConfirm(): Promise<void> {
        await this.confirmButton.click();
    }
}