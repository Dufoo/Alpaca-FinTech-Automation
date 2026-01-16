import { test as setup } from '@playwright/test';

const authFile = 'auth.json';

setup('authenticate', async ({ page }) => {
  // 1. Go to login page
  await page.goto('https://app.alpaca.markets/account/login');

  // 2. Automated login flow using environment variables
  // Note: We use 'fill' instead of 'type' for speed and reliability
  await page.locator('input[name="email"]').fill(process.env.ALPACA_USERNAME || '');
  await page.locator('input[name="password"]').fill(process.env.ALPACA_PASSWORD || '');
  
  // Click the login button
  await page.getByRole('button', { name: /Log In/i }).click();

  // 3. Resilience: Wait for the dashboard to load
  // We wait for the URL to contain 'dashboard' and the portfolio balance to be visible
  await page.waitForURL(/.*dashboard.*/, { timeout: 45000 });
  await page.waitForSelector('text=Your portfolio', { timeout: 30000 });

  // 4. Save the authenticated session state to a file
  await page.context().storageState({ path: authFile });
  console.log('Automation Success: Session saved automatically.');
});