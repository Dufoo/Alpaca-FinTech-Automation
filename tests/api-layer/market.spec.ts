import { test, expect } from '../../fixtures/baseTest';
import { MarketClock } from '../../models/AlpacaModels';

test.describe('Alpaca API - Market Clock', () => {

  test('should retrieve current market status with type safety', async ({ alpaca }) => {
    const response = await alpaca.get('/clock');
    expect(response.status()).toBe(200);
    
    // Cast to interface for auto-completion
    const clock: MarketClock = await response.json();

    expect(typeof clock.is_open).toBe('boolean');
    console.log(`Market status: ${clock.is_open ? 'OPEN' : 'CLOSED'}`);
  });
});