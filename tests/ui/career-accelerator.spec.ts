import { test, expect } from '@fixtures/auth.fixture';
import { ROUTES } from '@routes/routes';

test.describe('Popups and New Tabs Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(ROUTES.LOGIN);
    });

    test('Handle new tab', async ({ page, dashboardPage }) => {
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

    test('Handle multiple tabs', async ({ page, dashboardPage }) => {
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

        // Switch the visual focus to the Career Job page
        await careerJobPage.bringToFront();

        // Switch the visual focus to the Signup page
        await signupPage.bringToFront();
    });
});