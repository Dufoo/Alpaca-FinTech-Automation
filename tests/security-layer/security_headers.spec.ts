import { test, expect } from '@playwright/test';
import { AlpacaClient } from '../../utils/AlpacaClient';

test.describe('Alpaca API - Security Verification', () => {
  let alpaca: AlpacaClient;

  test.beforeEach(async ({ request }) => {
    alpaca = new AlpacaClient(request);
  });

  test('should include essential security headers in the response', async () => {
    const response = await alpaca.get('/v2/account');
    const headers = response.headers();

    // 1. Verifiser at API-et returnerer JSON (Standard krav)
    expect(headers['content-type']).toContain('application/json');

    // 2. Verifiser Strict-Transport-Security (HSTS)
    // Dette er en kritisk sikkerhetsheader for finansielle tjenester
    expect(headers['strict-transport-security']).toBeDefined();
    
    // 3. Verifiser X-Request-ID (Viktig for sporbarhet/observability i DevSecOps)
    // Dette gjør at vi kan spore en transaksjon gjennom alle systemer hvis noe feiler
    expect(headers['x-request-id']).toBeDefined();

    console.log('Sikkerhetsverifisering vellykket: HSTS og Request-ID er tilstede.');
  });
});