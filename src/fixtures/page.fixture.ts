import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { DashboardPage } from '@pages/dashboard.page';
import { RegistrationPage } from '@pages/registration.page';
import { ForgotPasswordPage } from '@pages/forgot-password.page';
import { PracticePage } from '@pages/practice.page';


type fixtures = {
    loginPage: LoginPage;
    registrationPage: RegistrationPage;
    forgotPasswordPage: ForgotPasswordPage;
    dashboardPage: DashboardPage;
    practicePage: PracticePage;
}

export const test = base.extend<fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    registrationPage: async ({ page }, use) => {
        await use(new RegistrationPage(page));
    },

    forgotPasswordPage: async ({ page }, use) => {
        await use(new ForgotPasswordPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },

    practicePage: async ({ page }, use) => {
        await use(new PracticePage(page));
    }
});

export { expect } from '@playwright/test';