import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

interface ProductDetails {
    name: string,
    price: number,
    imageUrl: string
}

export class DashboardPage extends BasePage {

    // Locators
    private readonly careerJoblink: Locator = this.page.getByRole('link', { name: '🎯 I\'ll help you prepare for' });
    private readonly products: Locator = this.page.locator('#products .card');
    // private readonly productImageUrl: Locator = this.page.locator('img').getAttribute('src');
    // private readonly productName: Locator = this.page.locator('h5 b');
    // private readonly productPrice: Locator = this.page.locator('.text-muted');


    // Dynamic Locators
    private productCard(productName: string): Locator {
        return this.products.filter({ has: this.page.getByRole('heading', { name: productName }) });
    }

    private addToCartButton(productName: string): Locator {
        return this.productCard(productName).getByRole('button', { name: ' Add To Cart', exact: true });
    }

    // Methods
    async clickOnCareerJobLink(): Promise<void> {
        this.careerJoblink.click();
    }

    async getProductNames(): Promise<string[]> {
        return await this.products.locator('h5 b').allTextContents();
    }

    async getProductDetails(): Promise<ProductDetails[]> {
        const productDetails: ProductDetails[] = [];

        // Read the details from each product card.
        for (const product of await this.products.all()) {
            const name = await product.locator('h5 b').innerText();
            const price = await product.locator('.text-muted').innerText();
            const imageUrl = await product.locator('img').getAttribute('src');

            productDetails.push({
                name: name.trim(),
                price: Number(price.replace(/[$,\s]/g, '')),
                imageUrl: imageUrl ?? '',
            });
        }

        return productDetails;
    }

    async addProductToCart(productName: string): Promise<void> {
        await this.addToCartButton(productName).click();
    }
}