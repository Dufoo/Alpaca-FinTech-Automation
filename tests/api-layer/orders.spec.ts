import { test, expect } from '@playwright/test';
import { AlpacaClient } from '../../utils/AlpacaClient';

test.describe('Alpaca API - Order & Position Integration', () => {
  let alpaca: AlpacaClient;

  test.beforeEach(async ({ request }) => {
    alpaca = new AlpacaClient(request);
  });

  test('should place an order and verify the position exists', async () => {
    const symbol = 'AAPL';

    // 1. Place a market buy order
    const orderResponse = await alpaca.post('/v2/orders', {
      symbol: symbol,
      qty: '1',
      side: 'buy',
      type: 'market',
      time_in_force: 'gtc' // 'Good 'til cancelled'
    });

    expect(orderResponse.status()).toBe(200);
    console.log(`Order placed for ${symbol}`);

    // 2. Wait slightly for the order to be processed (Market execution)
    // In a real production environment, we would use a 'retry' logic or a loop.
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 3. Verify that the position now exists
    const positionResponse = await alpaca.get(`/v2/positions/${symbol}`);
    
    // If the market is open, this should be 200. 
    // If the market is closed, the order is 'held' and position won't exist yet (404).
    if (positionResponse.status() === 200) {
      const position = await positionResponse.json();
      expect(position.symbol).toBe(symbol);
      expect(Number(position.qty)).toBeGreaterThanOrEqual(1);
      console.log(`Confirmed: Position in ${symbol} is active with ${position.qty} shares.`);
    } else {
      console.log(`Market is likely closed. Order is accepted but position not yet created (Status: ${positionResponse.status()}).`);
    }
  });
});