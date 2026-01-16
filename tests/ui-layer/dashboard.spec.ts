import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('Alpaca UI - Dashboard Verification', () => {
  
  test('should display correct portfolio overview', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    console.log('Navigerer til dashboard...');
    await dashboard.goto();

    console.log('Verifiserer at siden er lastet...');
    await dashboard.verifyDashboardLoaded();

    const balance = await dashboard.getBalanceText();
    console.log(`SUKSESS: Din nåværende saldo er: ${balance}`);
    
    // Verifiser at saldoen er et gyldig beløp (inneholder $)
    expect(balance).toContain('$');
  });
});