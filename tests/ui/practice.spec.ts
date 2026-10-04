import { expect, test } from '@playwright/test';
import { ROUTES } from '@routes/routes';
import { PracticePage } from '@pages/practice.page';

test.describe('Practice Tests', () => {
    let practicePage: PracticePage;

    test.beforeEach(async ({ page }) => {
        practicePage = new PracticePage(page);
        await page.goto(ROUTES.AUTOMATION_PRACTICE);
    });

    test('Handle alerts', async ({ page }) => {
        // Start listening for the dialog
        page.once('dialog', async dialog => {
            // Validate the dialog message
            expect(dialog.message()).toBe('Hello , share this practice page and share your knowledge');

            // Accept the dialog
            await dialog.accept();
        });

        // Trigger the alert
        await practicePage.clickAlert();
    });

    test('Handle iframe', async () => {
        const userEmail = await practicePage.getEmailText();

        expect(userEmail).not.toBeNull();
    });
});