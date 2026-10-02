import { test as base } from '@fixtures/page.fixture';

export const test = base.extend({
    storageState: 'playwright/.auth/user.json'
});

export { expect } from '@playwright/test';