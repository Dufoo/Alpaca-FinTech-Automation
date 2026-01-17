import { APIRequestContext, APIResponse } from '@playwright/test';

export class AlpacaClient {
    private request: APIRequestContext;
    private headers: { [key: string]: string };

    constructor(request: APIRequestContext) {
        this.request = request;
        this.headers = {
            'APCA-API-KEY-ID': process.env.ALPACA_API_KEY || '',
            'APCA-API-SECRET-KEY': process.env.ALPACA_SECRET_KEY || '',
            'Content-Type': 'application/json',
        };
    }

    /**
     * Internal helper to ensure all requests hit the /v2 endpoint correctly.
     * Logic: Prevents leading slashes from breaking the baseURL versioning.
     */
    private buildUrl(endpoint: string): string {
        const cleanPath = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
        return `v2/${cleanPath}`; // We explicitly use v2/ here
    }

    async get(endpoint: string): Promise<APIResponse> {
        return await this.request.get(this.buildUrl(endpoint), {
            headers: this.headers,
        });
    }

    async post(endpoint: string, data: Record<string, unknown>): Promise<APIResponse> {
        return await this.request.post(this.buildUrl(endpoint), {
            headers: this.headers,
            data: data,
        });
    }

    async delete(endpoint: string): Promise<APIResponse> {
        return await this.request.delete(this.buildUrl(endpoint), {
            headers: this.headers,
        });
    }
}