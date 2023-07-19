interface LogEntry {
    data: {
        feed: string;
        product_id: string;
        trades: {
            feed: string;
            product_id: string;
            uid: string;
            side: string;
            type: string;
            seq: number;
            time: number;
            qty: number;
            price: number;
        }[];
    };
}