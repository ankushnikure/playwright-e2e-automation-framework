import { test, expect } from '@fixtures/auth.fixture';

test('Verify authenticated user', async ({ page }) => {
    await page.goto('/client/#/dashboard/dash');
    await expect(page).toHaveURL(/dashboard/);
});