import axios from "axios";
import type {BinancePayload} from "../types";

export class BinanceService {
    async fetchBinancePrices(): Promise<BinancePayload[]> {
        try {
            const response = await axios.get<BinancePayload[]>("https://api.binance.com/api/v3/ticker/price");

            return response.data;
        } catch (error) {
            console.error("Error fetching or processing data:", error);
            return [];
        }
    }
}
