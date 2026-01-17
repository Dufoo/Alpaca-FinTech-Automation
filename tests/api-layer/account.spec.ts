// We now import our custom 'test' instead of the default one
import { test, expect } from '../../fixtures/baseTest';
import { AlpacaAccount } from '../../models/AlpacaModels';

test.describe('Alpaca API - Account Verification', () => {

    test('should retrieve account information with type safety', async ({ alpaca }) => {
        // 1. Perform request using the 'alpaca' fixture injected automatically
        const response = await alpaca.get('/v2/account');
        expect(response.status()).toBe(200);

        // 2. Cast the JSON response to our AlpacaAccount interface
        const data: AlpacaAccount = await response.json();

        // 3. Perform assertions with full auto-completion and type checking
        expect(data.currency).toBe('USD');
        expect(data.status).toBe('ACTIVE');

        console.log(`Verified Account: ${data.account_number} using Fixtures and Interfaces.`);
    });
});