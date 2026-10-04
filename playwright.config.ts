import { defineConfig } from '@playwright/test';
import { env } from '@utils/env';



export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    use: {
        baseURL: env.baseUrl,
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