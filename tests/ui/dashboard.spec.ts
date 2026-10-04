import { test, expect } from '@fixtures/auth.fixture';
import { ROUTES } from '@routes/routes';

test('Access dashboard as authenticated user', async ({ page }) => {
    await page.goto(ROUTES.DASHBOARD);

    await expect(page).toHaveURL(/dashboard/);
});