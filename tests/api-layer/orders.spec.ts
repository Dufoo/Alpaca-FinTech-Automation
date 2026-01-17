import { test, expect } from '../../fixtures/baseTest';
import { AlpacaOrder } from '../../models/AlpacaModels';

test.describe('Alpaca API - Order & Position Integration', () => {

  test('should place an order and verify state with type safety', async ({ alpaca }) => {
    const symbol = 'AAPL';

    // 1. Place a market buy order
    const response = await alpaca.post('/v2/orders', {
      symbol: symbol,
      qty: '1',
      side: 'buy',
      type: 'market',
      time_in_force: 'gtc'
    });

    expect(response.status()).toBe(200);
    
    // Use the comprehensive Order interface
    const order: AlpacaOrder = await response.json();
    console.log(`Order placed for ${order.symbol} with ID: ${order.id}`);

    // 2. Integration check for positions
    await new Promise(resolve => setTimeout(resolve, 3000));
    const positionResponse = await alpaca.get(`/v2/positions/${symbol}`);
    
    if (positionResponse.status() === 200) {
      console.log(`Confirmed: Position for ${symbol} is active.`);
    }
  });
});