import axios from "axios";

export class BinanceService {
	async fetchBinancePrices() {
		try {
			const response = await axios.get<
				{
					symbol: string;
					price: number;
				}[]
			>("https://api.binance.com/api/v3/ticker/price");
			const fetchedPrices = response.data;
			return fetchedPrices;
		} catch (error) {
			console.error("Error fetching or processing data:", (error as Error).message);
			return [];
		}
	}
}
