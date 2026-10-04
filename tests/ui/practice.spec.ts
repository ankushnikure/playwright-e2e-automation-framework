import { test, expect } from '@fixtures/page.fixture';
import { ROUTES } from '@routes/routes';

test.describe('Practice Tests', () => {
    test.beforeEach(async ({ page, practicePage }) => {
        await page.goto(ROUTES.AUTOMATION_PRACTICE);
    });

    test('Handle alerts', async ({ page, practicePage }) => {
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

    test('Handle iframe', async ({ practicePage }) => {
        const userEmail = await practicePage.getEmailText();

        expect(userEmail).not.toBeNull();
    });
});