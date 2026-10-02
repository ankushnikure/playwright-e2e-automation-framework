import { test, expect } from '@playwright/test';
import { ROUTES } from '@routes/routes';

test('Verify authenticated and guest users have independent sessions', async ({ browser }) => {

    // Create authenticated user session using saved storage state
    const userContext = await browser.newContext({
        storageState: 'playwright/.auth/user.json'
    });

    // Create a separate guest session without authentication state
    const guestContext = await browser.newContext();

    const userPage = await userContext.newPage();
    const guestPage = await guestContext.newPage();

    // Open dashboard in both sessionsg
    await userPage.goto(ROUTES.DASHBOARD);
    await guestPage.goto(ROUTES.LOGIN);

    // Get authentication token from both sessions
    const userToken = await userPage.evaluate(() =>
        localStorage.getItem('token')
    );

    const guestToken = await guestPage.evaluate(() =>
        localStorage.getItem('token')
    );

    // Authenticated context has login state
    expect(userToken).not.toBeNull();

    // Guest context does not share the login state
    expect(guestToken).toBeNull();

    await userContext.close();
    await guestContext.close();
});