import { test as base } from '@playwright/test';
import { DashboardPage } from '@pages/dashboard.page';


type fixtures = {
    dashboardPage: DashboardPage;
}

export const test = base.extend<fixtures>({
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    }
});

export { expect } from '@playwright/test';