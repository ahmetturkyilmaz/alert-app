import axios, { AxiosError } from "axios";
import { CryptoPriceAdapter } from "./CryptoPriceAdapter";
import { PricePayload } from "../../types";

export class BinanceAdapter implements CryptoPriceAdapter {
  private readonly baseURL =
    process.env.BINANCE_API_URL || "https://api.binance.com/api/v3";
  private readonly maxRetries = 3; // Number of retries
  private readonly initialDelay = 1000; // Initial backoff delay in ms (1s)
  private readonly timeout = 5000; // Timeout in ms (5s)

  async fetchPrices(): Promise<PricePayload[]> {
    let attempt = 0;

    while (attempt < this.maxRetries) {
      try {
        const response = await axios.get<PricePayload[]>(
          `${this.baseURL}/ticker/price`,
          {
            timeout: this.timeout,
          },
        );

        return response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          // Inside this block, err is known to be a ValidationError
          attempt++;

          if (attempt >= this.maxRetries) {
            console.error("Binance API request failed after retries:", attempt);
            throw new Error("Failed to fetch Binance prices");
          }

          const status = error.response?.status;

          if (status === 429 || !error.response) {
            const delay = this.initialDelay * 2 ** (attempt - 1);
            console.warn(
              `Rate limited or network error, retrying in ${delay}ms...`,
            );
            await this.sleep(delay);
          } else {
            throw error;
          }
        }
      }
    }
    throw new Error("Unexpected failure in Binance price fetching");
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
