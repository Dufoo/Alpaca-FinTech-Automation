import { test, expect } from '../../fixtures/baseTest';

test.describe('Alpaca API - Asset Verification', () => {

    test('should verify that TSLA is tradable', async ({ alpaca }) => {
        const response = await alpaca.get('/v2/assets/TSLA');
        expect(response.status()).toBe(200);

        const asset = await response.json();
        expect(asset.symbol).toBe('TSLA');
        expect(asset.tradable).toBe(true);
        
        console.log(`Asset ${asset.symbol} status: Tradable = ${asset.tradable}`);
    });
});