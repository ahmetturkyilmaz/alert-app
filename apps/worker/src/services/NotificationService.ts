import { dbClient } from "../config/database";
import { mapNotifications } from "../helpers/mappers/notificationMapper";
import type { Alert, BinancePayload } from "../types";
import {
  TriggerCondition,
  TriggerConditionSymbols,
} from "../enums/tradingConditions";

export class NotificationService {
  async getTriggeredNotifications(
    fetchedPrices: BinancePayload[],
  ): Promise<Alert[]> {
    const values = fetchedPrices
      .map(({ symbol, price }) => `('${symbol}', ${price})`)
      .join(", ");

    const query = `
      WITH prices (symbol, current_price) AS (VALUES ${values})
      SELECT
        ut.pair,
        ut.target_price,
        ut.trigger_condition,
        ut.user_id,
        p.current_price
      FROM alerts ut
             JOIN prices p ON ut.pair = p.symbol
      WHERE
        (ut.trigger_condition = 1 AND p.current_price ${TriggerConditionSymbols[TriggerCondition.LESS_THAN]} ut.target_price)
         OR (ut.trigger_condition = 4 AND p.current_price ${TriggerConditionSymbols[TriggerCondition.GREATER_THAN]} ut.target_price);
    `;

    const res = await dbClient.query(query);
    return mapNotifications(res.rows);
  }
}
