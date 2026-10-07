import { test, expect } from '@fixtures/auth.fixture';
import { ROUTES } from '@routes/routes';

test.describe('Dashboard Tests', () => {

    test.beforeEach(async ({ page }) => {

        // Start waiting before navigation triggers the products request.
        const responsePromise = page.waitForResponse(
            response =>
                response.url().includes('/api/ecom/product/get-all-products') &&
                response.request().method() === 'POST'
        );

        // Navigate to the dashboard.
        await page.goto(ROUTES.DASHBOARD);
        await expect(page).toHaveURL(/dashboard/);

        // Validate the products API response.
        const response = await responsePromise;
        expect(response.status()).toBe(200);
    });

    test('Display product names, prices, and image URLs', async ({ dashboardPage }) => {

        // Get details of the displayed products.
        const products = await dashboardPage.getProductDetails();

        // Validate that products are available.
        expect(products.length).toBeGreaterThan(0);

        // Validate each product has a name, price, and image URL.
        for (const product of products) {
            expect(product.name).not.toBe('');
            expect(product.price).not.toBe('');
            expect(product.imageUrl).not.toBe('');
        }
    });

});