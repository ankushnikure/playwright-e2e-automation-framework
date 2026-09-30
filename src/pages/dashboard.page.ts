import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {

    // Locators
    private readonly careerJoblink: Locator = this.page.getByRole('link', { name: '🎯 I\'ll help you prepare for' });

    // Methods
    async clickOnCareerJobLink(): Promise<void> {
        this.careerJoblink.click();
    }
}