import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { ROUTES } from "src/routes/routes";
import { validUser, invalidUser, missingField } from "@test-data/login-data.json";

test.describe("Login Tests", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto(ROUTES.LOGIN);
    });

    test("Verify login with valid credentials", async ({ page }) => {
        await loginPage.login(validUser.email, validUser.password);
        await expect(page).toHaveURL(/dashboard/);
    });

    test("Verify login with invalid credentials", async () => {
        await loginPage.login(invalidUser.email, invalidUser.password);
        await loginPage.expectLoginErrorMessage("Incorrect email or password.");
    })

    test("Verify validation error when the email & password field is empty", async ({ }) => {
        await loginPage.login(missingField.email, missingField.password);
        await loginPage.expectEmailRequiredError("*Email is required");
        await loginPage.expectPasswordrequiredError("*Password is required");
    })
});