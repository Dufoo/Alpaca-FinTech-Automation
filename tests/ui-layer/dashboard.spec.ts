import { test, expect } from '../../fixtures/baseTest';

test.describe('Alpaca UI - Dashboard Verification', () => {
  
  // We just pull in the 'dashboardPage' fixture directly
  test('should display correct portfolio overview via fixture', async ({ dashboardPage }) => {
    console.log('Navigating to dashboard...');
    await dashboardPage.goto();

    console.log('Verifying that the dashboard is loaded...');
    await dashboardPage.verifyDashboardLoaded();

    const balance = await dashboardPage.getBalanceText();
    console.log(`SUCCESS: Current balance is: ${balance}`);
    
    expect(balance).toContain('$');
  });
});