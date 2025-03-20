import { dbClient } from "../config/database";
import { mapNotifications } from "../helpers/mappers/notificationMapper";
import type { Alert, PricePayload } from "../types";
import {
  TriggerCondition,
  TriggerConditionSymbols,
} from "../enums/tradingConditions";

export class NotificationService {
  async getTriggeredNotifications(
    fetchedPrices: PricePayload[],
  ): Promise<Alert[]> {
    if (fetchedPrices.length === 0) return [];

    const symbols = fetchedPrices.map(({ symbol }) => symbol);
    const prices = fetchedPrices.map(({ price }) => price);

    const query = `
            WITH prices AS (SELECT unnest($1::text[]) AS symbol, unnest($2::numeric[]) AS current_price)
            SELECT ut.pair,
                   ut.target_price,
                   ut.trigger_condition,
                   ut.user_id,
                   p.current_price
            FROM alerts ut
                     JOIN prices p ON ut.pair = p.symbol
            WHERE (ut.trigger_condition = $3 AND p.current_price ${TriggerConditionSymbols[TriggerCondition.LESS_THAN]} ut.target_price)
               OR (ut.trigger_condition = $4 AND p.current_price ${TriggerConditionSymbols[TriggerCondition.GREATER_THAN]} ut.target_price);
        `;

    const queryParams = [
      symbols,
      prices,
      TriggerCondition.LESS_THAN,
      TriggerCondition.GREATER_THAN,
    ];

    const res = await dbClient.query(query, queryParams);
    return mapNotifications(res.rows);
  }
}
