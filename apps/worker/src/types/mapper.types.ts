export type Alert = {
    symbol: string;
    targetPrice: number;
    condition: ">" | "<";
    userId: string;
    currentPrice: number;
};