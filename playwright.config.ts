import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

const ENV = process.env.ENV || 'qa';

const result = dotenv.config({ path: `.env.${ENV}` });
if (result.error) {
    throw new Error(`Could not load .env.${ENV}: ${result.error.message}`);
}

const BASE_URL = process.env.BASE_URL;
if (!BASE_URL) {
    throw new Error(`BASE_URL is missing in .env.${ENV}`);
}

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    use: {
        baseURL: BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: false,
        navigationTimeout: 10000,
        viewport: null,
        launchOptions: {
            args: ['--start-maximized']
        }
    },

    projects: [

        // Creates authentication state
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/
        },

        // Authentication UI tests
        {
            name: 'auth',
            testMatch: /.*\/ui\/auth\/.*\.spec\.ts/,
            use: {
                browserName: 'chromium'
            }
        },

        // Application UI tests
        {
            name: 'chromium',
            testMatch: /.*\/ui\/.*\.spec\.ts/,
            testIgnore: /.*\/ui\/auth\/.*\.spec\.ts/,
            dependencies: ['setup'],
            use: {
                browserName: 'chromium'
            }
        },

        // API tests
        {
            name: 'api',
            testMatch: /.*\/api\/.*\.spec\.ts/
        }
    ]
});