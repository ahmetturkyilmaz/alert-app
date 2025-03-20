import axios from "axios";
import { BinanceAdapter } from "../src/services/adapters/BinanceAdapter";
import { PricePayload } from "../src/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("BinanceAdapter", () => {
  let binanceAdapter: BinanceAdapter;

  beforeEach(() => {
    jest.clearAllMocks();
    binanceAdapter = new BinanceAdapter();
  });

  it("fetches prices successfully", async () => {
    const mockData: PricePayload[] = [
      { symbol: "BTCUSDT", price: 50000.0 },
      { symbol: "ETHUSDT", price: 3500.0 },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await binanceAdapter.fetchPrices();
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it("retries on rate limiting (429) and eventually succeeds", async () => {
    const mockData: PricePayload[] = [{ symbol: "BTCUSDT", price: 50000.0 }];

    mockedAxios.get
      .mockRejectedValueOnce({ response: { status: 429 } })
      .mockResolvedValueOnce({ data: mockData });

    const result = await binanceAdapter.fetchPrices();
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });

  it("retries on network errors (no response) and eventually succeeds", async () => {
    const mockData: PricePayload[] = [{ symbol: "BTCUSDT", price: 50000.0 }];

    mockedAxios.get
      .mockRejectedValueOnce(new Error("Network Error"))
      .mockResolvedValueOnce({ data: mockData });

    const result = await binanceAdapter.fetchPrices();
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });

  it("throws an error after max retries", async () => {
    mockedAxios.get.mockRejectedValue({ response: { status: 500 } });

    await expect(binanceAdapter.fetchPrices()).rejects.toThrow(
      "Failed to fetch Binance prices",
    );

    expect(mockedAxios.get).toHaveBeenCalledTimes(3);
  });
});
