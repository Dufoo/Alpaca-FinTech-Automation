import { test, expect } from '@playwright/test';
import { AlpacaClient } from '../../utils/AlpacaClient';

test.describe('Alpaca API - Negative Scenarios', () => {
  let alpaca: AlpacaClient;

  test.beforeEach(async ({ request }) => {
    alpaca = new AlpacaClient(request);
  });

  test('should return 404 when requesting a non-existent asset', async () => {
    // 1. We request a ticker symbol that definitely doesn't exist
    const response = await alpaca.get('/v2/assets/NON_EXISTENT_TICKER');

    // 2. Logic: The system MUST return 404 Not Found
    expect(response.status()).toBe(404);
    
    const errorData = await response.json();
    // Verify that the API returns a meaningful error message
    expect(errorData.message).toContain('asset not found');
    console.log('Negative test passed: Correct error message received for fake asset.');
  });

  test('should return 400 when placing an order with zero quantity', async () => {
    // 1. Attempt to place an invalid order (qty: 0)
    const response = await alpaca.post('/v2/orders', {
      symbol: 'AAPL',
      qty: '0', 
      side: 'buy',
      type: 'market',
      time_in_force: 'gtc'
    });

    // 2. Logic: The system MUST reject this (400 Bad Request or 422 Unprocessable Entity)
    // Alpaca typically returns 400 or 422 for invalid parameters.
    expect(response.status()).toBeGreaterThanOrEqual(400);
    
    console.log(`Negative test passed: System rejected invalid quantity with status ${response.status()}.`);
  });
});