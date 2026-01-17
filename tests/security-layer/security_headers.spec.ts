import { test, expect } from '@playwright/test';
import { AlpacaClient } from '../../utils/AlpacaClient';

test.describe('Alpaca API - Security Verification', () => {
  let alpaca: AlpacaClient;

  test.beforeEach(async ({ request }) => {
    alpaca = new AlpacaClient(request);
  });

  test('should include essential security headers in the response', async () => {
    const response = await alpaca.get('/account');
    const headers = response.headers();

    // 1. Verify that the API returns JSON (Default requirement)
    expect(headers['content-type']).toContain('application/json');

    // 2. Verify Strict-Transport-Security (HSTS)
    // This is a critical security header for financial services
    expect(headers['strict-transport-security']).toBeDefined();
    
    // 3. Verify X-Request-ID (Important for traceability/observability in DevSecOps)
    // This allows us to track a transaction through all systems if something goes wrong.
    expect(headers['x-request-id']).toBeDefined();

    console.log('Sikkerhetsverifisering vellykket: HSTS og Request-ID er tilstede.');
  });
});