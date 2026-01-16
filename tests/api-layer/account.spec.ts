import { test, expect } from '@playwright/test';
import { AlpacaClient } from '../../utils/AlpacaClient';

test.describe('Alpaca API - Account Verification', () => {
  let alpaca: AlpacaClient;

  // Initialize the specialized client before each test to ensure a clean state
  test.beforeEach(async ({ request }) => {
    alpaca = new AlpacaClient(request);
  });

  test('should retrieve account information and verify currency', async () => {
    // 1. Perform the GET request using our encapsulated client
    const response = await alpaca.get('/v2/account');
    
    // 2. Assert successful status code
    // A 401 status would indicate an issue with API keys in the .env file
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    // 3. Verify domain-specific rules for a paper trading account
    // We expect the account to be active and denominated in USD
    expect(data.currency).toBe('USD');
    expect(data.status).toBe('ACTIVE');
    
    // Logging for traceability during manual debugging
    console.log(`Verification successful for account: ${data.account_number}`);
    console.log(`Current buying power: $${data.buying_power}`);
  });
});