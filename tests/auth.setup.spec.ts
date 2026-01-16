import { test as setup } from '@playwright/test';

const authFile = 'auth.json';

setup('authenticate', async ({ page }) => {
  // 1. Increase timeout for this specific setup test to 3 minutes
  // This overrides the global 30s limit for the human login process.
  setup.setTimeout(90000);

  await page.goto('https://app.alpaca.markets/account/login');

  console.log('Please log in manually and complete 2FA...');

  // 2. Wait for the URL to contain "dashboard" 
  // We make it more flexible to handle different dashboard landing pages.
  //await page.waitForURL(/.*dashboard.*/, { timeout: 90000 });
  
  // 3. Additional safety: Wait for a specific element on the dashboard to be visible
  // This ensures the session is fully established before we save it.
  await page.waitForSelector('text=Portfolio', { timeout: 60000 });

  // 4. Save the storage state
  await page.context().storageState({ path: authFile });
  console.log('Session successfully saved to auth.json');
});