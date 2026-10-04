import { DashboardPage } from '@pages/dashboard.page';
import { LoginPage } from '@pages/login.page';
import { test, expect } from '@playwright/test';
import { ROUTES } from '@routes/routes';
import { env } from '@utils/env'

test.describe('Handle Popups / New Tabs', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await page.goto(ROUTES.LOGIN);

        const responsePromise = page.waitForResponse(
            response =>
                response.url().includes('api/ecom/auth/login') &&
                response.request().method() === 'POST'
        );

        await loginPage.login(env.email, env.password);

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

    test('Verify handling multiple tabs', async ({ page }) => {
        const careerPagePromise = page.waitForEvent('popup');
        await dashboardPage.clickOnCareerJobLink();
        const careerJobPage = await careerPagePromise;
        await careerJobPage.waitForLoadState('domcontentloaded');
        await expect(careerJobPage).toHaveURL(/qa-career-accelerator-job-ready/);


        // Listen for the Signup popup from the Career page
        const signupPagePromise = careerJobPage.waitForEvent('popup');
        await careerJobPage.getByText('Sign Up', { exact: true }).click();
        const signupPage = await signupPagePromise;
        await signupPage.waitForLoadState('domcontentloaded');
        await expect(signupPage).toHaveURL(/sign_up/);

        // Switch the visual focus to a careerJobPage browser tab
        await careerJobPage.bringToFront();

        // Switch the visual focus to a signupPage browser tab
        await signupPage.bringToFront();
    });
});