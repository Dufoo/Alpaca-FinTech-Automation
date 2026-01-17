import { test as setup } from '@playwright/test';

const authFile = 'auth.json';

setup('authenticate', async ({ page }) => {
  setup.setTimeout(180000); // 3 minutes for manual login + 2FA
  await page.goto('https://app.alpaca.markets/account/login');

  console.log('Vennligst logg inn manuelt og fullfør 2FA i nettleservinduet...');

  // Logic: Wait for the dashboard to be visible before saving the session
  await page.waitForURL(/.*dashboard.*/, { timeout: 90000 });
  await page.waitForSelector('text=Your portfolio', { timeout: 60000 });

  await page.context().storageState({ path: authFile });
  console.log('Session successfully saved to auth.json');
});