import axios from "axios";
import { binanceService } from "../src/services";

jest.mock("axios");

describe("fetchBinancePrices", () => {
	it("should fetch and return prices from Binance API", async () => {
		(axios.get as jest.Mock).mockResolvedValue({
			data: [{ symbol: "BTCUSDT", price: 45000.0 }],
		});

		const prices = await binanceService.fetchBinancePrices();
		expect(prices).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					symbol: "BTCUSDT",
					price: expect.any(Number),
				}),
			]),
		);
	});
});
