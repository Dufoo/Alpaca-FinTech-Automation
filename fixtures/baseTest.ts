import { test as base } from '@playwright/test';
import { AlpacaClient } from '../utils/AlpacaClient';
import { DashboardPage } from '../pages/DashboardPage';

// Declare the types for our custom fixtures
type MyFixtures = {
    alpaca: AlpacaClient;
    dashboardPage: DashboardPage;
};

/**
 * Extending the base Playwright test to include custom fixtures.
 * This removes the need for repetitive 'beforeEach' setup in spec files.
 */
export const test = base.extend<MyFixtures>({
    // Provide the Alpaca API Client fixture
    alpaca: async ({ request }, use) => {
        const client = new AlpacaClient(request);
        await use(client);
    },

    // Provide the Dashboard Page Object fixture
    dashboardPage: async ({ page }, use) => {
        const dashboard = new DashboardPage(page);
        await use(dashboard);
    },
});

export { expect } from '@playwright/test';