import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { ROUTES } from "src/routes/routes";
import loginData from "@test-data/login.data.json";

test.describe("Login Tests", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto(ROUTES.LOGIN);
    });

    test("Verify login with valid credentials", async ({ page }) => {
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        if (!email || !password) {
            throw new Error('EMAIL or PASSWORD is missing from the selected environment');
        }
        await loginPage.login(email, password);
        await expect(page).toHaveURL(/dashboard/);
    });

    test("Verify login with invalid credentials", async () => {
        const { email, password } = loginData.invalidUser;
        await loginPage.login(email, password);
        await loginPage.expectLoginErrorMessage("Incorrect email or password.");
    });

    test("Verify validation error when the email & password field is empty", async ({ }) => {
        const { email, password } = loginData.missingField;
        await loginPage.login(email, password);
        await loginPage.expectEmailRequiredError("*Email is required");
        await loginPage.expectPasswordrequiredError("*Password is required");
    });
});