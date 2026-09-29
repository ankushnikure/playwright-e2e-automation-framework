import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

const ENV = process.env.ENV || "staging";

const result = dotenv.config({ path: `.env.${ENV}` });
if (result.error) {
    throw new Error(`Could not load .env.${ENV}: ${result.error.message}`);
}

const BASE_URL = process.env.BASE_URL!
if (!BASE_URL) {
    throw new Error(`BASE_URL is missing in .env.${ENV}`);
}

export default defineConfig({
    testDir: "./tests",
    timeout: 5000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",

    use: {
        baseURL: BASE_URL,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        headless: false,
        viewport: null,
        launchOptions: {
            args: ['--start-maximized']
        }
    },

    projects: [{ name: "chromium" }]
});