import { PricePayload } from "../../types";

export interface CryptoPriceAdapter {
  fetchPrices(): Promise<PricePayload[]>;
}
