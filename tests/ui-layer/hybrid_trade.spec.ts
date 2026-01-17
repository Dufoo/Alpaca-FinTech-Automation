import { test, expect } from '../../fixtures/baseTest';
import { AlpacaOrder } from '../../models/AlpacaModels';

test.describe('Alpaca - Hybrid API/UI Integration', () => {

  test('should verify API order appears in UI using fixtures', async ({ alpaca, dashboardPage, page }) => {
    const symbol = 'MSFT';

    // 1. API: Place the order
    const orderResponse = await alpaca.post('/v2/orders', {
      symbol: symbol,
      qty: '1',
      side: 'buy',
      type: 'market',
      time_in_force: 'gtc'
    });
    
    expect(orderResponse.status()).toBe(200);
    const order: AlpacaOrder = await orderResponse.json();
    console.log(`API: Order placed with ID: ${order.id}`);

    await page.waitForTimeout(2000); 

    // 2. UI: Verify on Dashboard
    await dashboardPage.goto();
    await dashboardPage.verifyDashboardLoaded();
    await dashboardPage.verifyOrderVisible(symbol);
    
    console.log('HYBRID SUCCESS: API and UI consistency verified.');
  });
});