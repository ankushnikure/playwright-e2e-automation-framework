import { FrameLocator, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class PracticePage extends BasePage {

    // Locators
    private readonly alertButton: Locator = this.page.getByRole('button', { name: 'Alert' });
    private readonly confirmButton: Locator = this.page.getByRole('button', { name: 'Confirm' });
    
    private readonly parentFrame: FrameLocator = this.page.frameLocator('#courses-iframe');
    private readonly userEmailText: Locator = this.parentFrame.getByText('contact@rahulshettyacademy.com');

    // Methods
    async clickAlert(): Promise<void> {
        await this.alertButton.click();
    }

    async clickConfirm(): Promise<void> {
        await this.confirmButton.click();
    }

    async getEmailText(): Promise<string | null> {
        return await this.userEmailText.textContent();
    }
}