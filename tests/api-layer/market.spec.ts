import { test, expect } from '@playwright/test';
import { AlpacaClient } from '../../utils/AlpacaClient';

test.describe('Alpaca API - Market Clock', () => {
  let alpaca: AlpacaClient;

  test.beforeEach(async ({ request }) => {
    alpaca = new AlpacaClient(request);
  });

  test('should retrieve current market status and verify data types', async () => {
    const response = await alpaca.get('/v2/clock');
    
    expect(response.status()).toBe(200);
    
    const clock = await response.json();

    // 1. Structural Validation
    // We verify that the API returns the correct data types
    expect(typeof clock.is_open).toBe('boolean');
    expect(typeof clock.timestamp).toBe('string');
    
    // 2. Logical Validation
    // Even if the market is closed, the 'next_open' must be a valid date string
    const nextOpen = new Date(clock.next_open);
    expect(nextOpen.getTime()).toBeGreaterThan(0); // Checks if it's a valid date

    // 3. Traceability
    const status = clock.is_open ? 'OPEN' : 'CLOSED';
    console.log(`Market is currently: ${status}`);
    console.log(`Current Alpaca Timestamp: ${clock.timestamp}`);
  });
});