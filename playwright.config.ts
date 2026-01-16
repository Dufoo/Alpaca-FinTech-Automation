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
    // 1. Setup project: This handles the initial authentication.
    // It looks for 'auth.setup.spec.ts' to generate a reusable session.
    {
      name: 'setup',
      testMatch: /auth.setup.spec.ts/,
      // Local timeout for this project
      timeout: 90000,
    },
    
    // 2. API Tests: Independent logic verification.
    {
      name: 'api-tests',
      testDir: './tests/api-layer',
      use: { ...devices['Desktop Chrome'] },
    },
    
    // 3. UI Tests: Full browser-based end-to-end verification.
    {
      name: 'ui-tests',
      testDir: './tests/ui-layer',
      // dependencies: ['setup'],  <-- Kommenter ut denne linjen midlertidig
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
      },
    },
    
    // 4. Security Tests: Header and protocol verification.
    {
      name: 'security-tests',
      testDir: './tests/security-layer',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});