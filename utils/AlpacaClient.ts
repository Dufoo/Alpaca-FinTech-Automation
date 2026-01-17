import { APIRequestContext, APIResponse } from '@playwright/test';

export class AlpacaClient {
    private request: APIRequestContext;
    private headers: { [key: string]: string };

    constructor(request: APIRequestContext) {
        this.request = request;
        // Centralized management of headers
        this.headers = {
            'APCA-API-KEY-ID': process.env.ALPACA_API_KEY || '',
            'APCA-API-SECRET-KEY': process.env.ALPACA_SECRET_KEY || '',
            'Content-Type': 'application/json',
        };
    }

    /**
     * GET-request
     * Logic: Includes automatic FinTech authentication
     */
    async get(endpoint: string): Promise<APIResponse> {
        return await this.request.get(endpoint, {
            headers: this.headers,
        });
    }

    /**
     * POST-request
     * Used to place orders or create resources
     */
    async post(endpoint: string, data: Record<string, unknown>): Promise<APIResponse> {
        return await this.request.post(endpoint, {
            headers: this.headers,
            data: data,
        });
    }

    /**
     * DELETE request wrapper
     * Useful for closing positions or canceling orders
     */
    async delete(endpoint: string): Promise<APIResponse> {
        return await this.request.delete(endpoint, {
            headers: this.headers,
        });
    }
}