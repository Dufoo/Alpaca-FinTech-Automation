import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Define available environments
const ENV_URLS = {
  stage: 'https://paper-api.alpaca.markets/',
  dev: 'https://paper-api.alpaca.markets/', // In a real scenario, these would be different
  prod: 'https://api.alpaca.markets/',     // Real-money live API
};

// Logic to select the environment. Default to 'stage' (Paper Trading)
const environment = process.env.TEST_ENV || 'stage';
const selectedBaseURL = ENV_URLS[environment as keyof typeof ENV_URLS];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    // Dynamically select baseURL based on environment variable
    baseURL: selectedBaseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // We can also add environment-specific tags for reporting
    extraHTTPHeaders: {
      'x-test-environment': environment,
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /auth.setup.spec.ts/,
      // Logic: Skip this project in CI (GitHub Actions) because 2FA requires human interaction
      grepInvert: process.env.CI ? /.*/ : undefined,
    },
    {
      name: 'api-tests',
      testDir: './tests/api-layer',
      // Runs everywhere
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'ui-tests',
      testDir: './tests/ui-layer',
      // Logic: UI tests depend on 'setup' and are executed locally only
      dependencies: process.env.CI ? [] : ['setup'],
      grepInvert: process.env.CI ? /.*/ : undefined,
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
      },
    },
    {
      name: 'security-tests',
      testDir: './tests/security-layer',
      // Runs everywhere
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});