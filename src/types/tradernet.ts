export interface MarketData {
    data: string[];
    isTrusted: boolean;
}

export interface MarketEvent {
    id: string;
    t: string;
    next: string;
}

export interface Market {
    n: string;
    n2: string;
    s: string;
    o: string;
    c: string;
    dt: string | number;
    ev: MarketEvent[];
}

export interface MarketInfo {
    [key: string]: Market;
}

export interface MarketResponse {
    data: [string, MarketInfo];
    isTrusted: boolean;
}
