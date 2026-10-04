import { defineConfig, devices } from '@playwright/test';
import { env } from '@utils/env';

export default defineConfig({
    testDir: './tests',
    timeout: 30_000,
    expect: { timeout: 10_000 },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 4 : undefined,
    reporter: [
        ['html', { open: 'never' }],
        ['list']
    ],

    use: {
        baseURL: env.baseUrl,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: false,
        navigationTimeout: 30_000,
        actionTimeout: 30_000,
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
                ...devices['Desktop Chrome'],
                viewport: { width: 1440, height: 900 }
            }
        },
        // Application UI tests
        {
            name: 'chromium',
            testMatch: /.*\/ui\/.*\.spec\.ts/,
            testIgnore: /.*\/ui\/auth\/.*\.spec\.ts/,
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1440, height: 900 }
            }
        },
        // API tests
        {
            name: 'api',
            testMatch: /.*\/api\/.*\.spec\.ts/
        }
    ]
});