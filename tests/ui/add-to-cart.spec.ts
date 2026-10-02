import { test, expect } from '@fixtures/auth.fixture';
import { DashboardPage } from '@pages/dashboard.page';
import { ROUTES } from '@routes/routes';

test.describe('Add To Cart Tests', () => {

    test('Verify add to cart', async ({ page, dashboardPage }) => {

        const responsePromise = page.waitForResponse(
            response =>
                response.url().includes('api/ecom/user/add-to-cart') &&
                response.request().method() === 'POST'
        );

        await page.goto(ROUTES.DASHBOARD);
        await dashboardPage.addProductToCart('ZARA COAT 3');

        const response = await responsePromise;

        console.log('Status:', response.status());
        console.log('Response:', await response.json());

    });

    test('Verify add to cart with mocked API response', async ({ page, dashboardPage }) => {

        // Intercept Add to Cart API
        await page.route('api/ecom/user/add-to-cart', async route => {

            // Returns a mocked response without calling the real API
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Mock Product Added To Cart'
                })
            });
        });

        // Navigate to dashboard as authenticated user
        await page.goto(ROUTES.DASHBOARD);

        // Trigger Add to Cart API from UI
        await dashboardPage.addProductToCart('ZARA COAT 3');

        // Verify mocked API response on UI
        await expect(page.getByText('Mock Product Added To Cart')).toBeVisible();
    });

    test('Verify UI when add to cart API fails', async ({ page, dashboardPage }) => {

        // Intercept Add to Cart API
        await page.route('api/ecom/user/add-to-cart', async route => {

            // Returns a mocked response without calling the real API
            route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Internal Server Error'
                })
            });
        });

        // Navigate to dashboard as authenticated user
        await page.goto(ROUTES.DASHBOARD);

        // Trigger Add to Cart API from UI
        await dashboardPage.addProductToCart('ZARA COAT 3');
        await expect(page.getByText('Internal Server Error')).toBeVisible();
    });

    test('Verify UI when add to cart network request fails', async ({ page, dashboardPage }) => {

        // Intercept Add to Cart API
        await page.route('api/ecom/user/add-to-cart', async route => {

            // Aborts the request to simulate a network failure
            route.abort();
        });

        // Navigate to dashboard as authenticated user
        await page.goto(ROUTES.DASHBOARD);

        // Trigger Add to Cart API from UI
        await dashboardPage.addProductToCart('ZARA COAT 3');

        // Verify mocked API response on UI
        await expect(page.getByText('Unknown error occured')).toBeVisible();
    });

    test('Verify add to cart by modifying request header', async ({ page, dashboardPage }) => {

        // Intercept Add to Cart API
        await page.route('api/ecom/user/add-to-cart', async route => {

            // Add a custom header to an API request
            route.continue({
                headers: {
                    ...route.request().headers(),
                    'x-test-resource': 'playwright'
                }
            });
        });

        // Navigate to dashboard as authenticated user
        await page.goto(ROUTES.DASHBOARD);

        // Trigger Add to Cart API from UI
        await dashboardPage.addProductToCart('ZARA COAT 3');

        await expect(page.getByText('Product Added To Cart')).toBeVisible();
    });

    test('Verify add to cart by modifying API response', async ({ page, dashboardPage }) => {

        // Intercept Add to Cart API
        await page.route('api/ecom/user/add-to-cart', async route => {

            // Sends the request to the real API and gets the real response
            const response = await route.fetch();

            // Reads the real API response
            const responseBody = await response.json()

            // Modifies the real API response
            responseBody.message = 'Modified Product Added To Cart';;

            await route.fulfill({
                response,
                json: responseBody
            })
        });

        // Navigate to dashboard as authenticated user
        await page.goto(ROUTES.DASHBOARD);

        // Trigger Add to Cart API from UI
        await dashboardPage.addProductToCart('ZARA COAT 3');

        // Verify mocked API response on UI
        await expect(page.getByText('Modified Product Added To Cart')).toBeVisible();
    })
});
