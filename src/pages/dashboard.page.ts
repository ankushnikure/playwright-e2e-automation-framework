import { Locator} from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {

    // Locators
    private readonly careerJoblink: Locator = this.page.getByRole('link', { name: '🎯 I\'ll help you prepare for' });
    private readonly products: Locator = this.page.locator('.card');

    // Dynamic Locators
    private productItem(productName: string): Locator {
        return this.products.filter({ hasText: productName});
    }

    private addToCartButton(productName: string): Locator {
        return this.productItem(productName).getByRole('button', { name: ' Add To Cart' });
    }

    // Methods
    async clickOnCareerJobLink(): Promise<void> {
        this.careerJoblink.click();
    }

    async addProductToCart(productName: string): Promise<void> {
        await this.addToCartButton(productName).click();
    }
}