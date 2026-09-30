import { DashboardPage } from '@pages/dashboard.page';
import { LoginPage } from '@pages/login.page';
import { test, expect } from '@playwright/test';
import { ROUTES } from 'src/routes/routes';

test.describe('Handle Popups / New Tabs', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await page.goto(ROUTES.LOGIN);
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;

        if (!email || !password) {
            throw new Error(`EMAIL or PASSWORD missing in selected environment`);
        }

        const responsePromise = page.waitForResponse(
            response =>
                response.url().includes('api/ecom/auth/login') &&
                response.request().method() === 'POST'
        );

        await loginPage.login(email, password);

        const response = await responsePromise;
        expect(response.status()).toBe(200);
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Verify handling Popups / New Tabs', async ({ page }) => {
        // Start listening for new page
        const newPagePromise = page.waitForEvent('popup');

        // Trigger the action that opens new tab
        await dashboardPage.clickOnCareerJobLink();

        // Get the newly opened page
        const newPage = await newPagePromise;

        // Wait for the new page to load
        await newPage.waitForLoadState();

        // Validate the new page
        await expect(newPage).toHaveURL(/qa-career-accelerator-job-ready/);
    });
});