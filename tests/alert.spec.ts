import { PracticePage } from '@pages/practice.page';
import { expect, test } from '@playwright/test';
import { ROUTES } from 'src/routes/routes';

test.describe('Practice Tests', () => {
    let practicePage: PracticePage;

    test.beforeEach(async ({ page }) => {
        practicePage = new PracticePage(page);
        await page.goto(ROUTES.AUTOMATION_PRACTICE);
    });

    test.only('Handle alerts', async ({ page }) => {
        // Start listening for the dialog
        page.once('dialog', async dialog => {

            // Validate the dialog message
            console.log(dialog.message());
            expect(dialog.message()).toBe('Hello , share this practice page and share your knowledge');

            // Accept the dialog
            await dialog.accept();


        });

        // Trigger the alert
        practicePage.clickAlert();
    });
});