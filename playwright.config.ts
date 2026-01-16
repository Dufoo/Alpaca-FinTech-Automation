import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    // Base URL for our FinTech Target
    baseURL: process.env.ALPACA_BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'api-tests',
      testDir: './tests/api-layer',
      use: { ...devices['Desktop Chrome'] }, // Browsers are rarely needed for API, but required by config
    },
    {
      name: 'ui-tests',
      testDir: './tests/ui-layer',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'security-tests',
      testDir: './tests/security-layer',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});