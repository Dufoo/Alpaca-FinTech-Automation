import { test, expect } from '@playwright/test';
import { AlpacaClient } from '../../utils/AlpacaClient';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('Alpaca - Hybrid API/UI Integration', () => {
  let alpaca: AlpacaClient;

  test.beforeEach(async ({ request }) => {
    alpaca = new AlpacaClient(request);
  });

  test('should place order via API and verify presence in UI Dashboard', async ({ page }) => {
    const symbol = 'MSFT';
    const dashboard = new DashboardPage(page);

    // 1. API STAGE: Place the order
    console.log(`API: Legger inn kjøpsordre for ${symbol}...`);
    const orderResponse = await alpaca.post('/v2/orders', {
      symbol: symbol,
      qty: '1',
      side: 'buy',
      type: 'market',
      time_in_force: 'gtc'
    });
    
    expect(orderResponse.status()).toBe(200);
    const orderData = await orderResponse.json();
    console.log(`API: Ordre plassert med ID: ${orderData.id}`);

    // Gi backend et sekund på å synkronisere før vi laster UI
    await page.waitForTimeout(2000); 

    // 2. UI STAGE: Verify on Dashboard
    console.log('UI: Navigerer til dashboard for å verifisere ordren...');
    await dashboard.goto();
    await dashboard.verifyDashboardLoaded();

    // Vi sjekker at ordren dukker opp i "Recent Orders"-tabellen
    await dashboard.verifyOrderVisible(symbol);
    
    console.log('HYBRID TEST SUKSESS: Sammenhengen mellom API og UI er bekreftet.');
  });
});