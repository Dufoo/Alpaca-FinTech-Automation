/**
 * Defines the structure of an Alpaca Account response.
 * This ensures type safety and auto-completion in VSCode.
 */
export interface AlpacaAccount {
    id: string;
    account_number: string;
    status: string;
    currency: string;
    buying_power: string;
    regt_buying_power: string;
    daytrading_buying_power: string;
    cash: string;
    portfolio_value: string;
    trading_blocked: boolean;
    transfers_blocked: boolean;
    account_blocked: boolean;
    created_at: string;
}

/**
 * Defines the structure for Market Clock data.
 */
export interface MarketClock {
    timestamp: string;
    is_open: boolean;
    next_open: string;
    next_close: string;
}

/**
 * Defines the structure for an Alpaca Order response.
 */
export interface AlpacaOrder {
    id: string;
    client_order_id: string;
    created_at: string;
    updated_at: string;
    submitted_at: string;
    filled_at: string | null;
    expired_at: string | null;
    failed_at: string | null;
    replaced_at: string | null;
    replaced_by: string | null;
    replaces: string | null;
    asset_id: string;
    symbol: string;
    asset_class: string;
    notional: string | null;
    qty: string;
    filled_qty: string;
    filled_avg_price: string | null;
    order_class: string;
    order_type: string;
    type: string;
    side: string;
    time_in_force: string;
    limit_price: string | null;
    stop_price: string | null;
    status: string;
    extended_hours: boolean;
}