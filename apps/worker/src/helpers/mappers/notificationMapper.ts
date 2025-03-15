import { Alert, AlertEntity } from "../../types";

export function mapNotifications(rows: AlertEntity[]): Alert[] {
  return rows.map((row) => ({
    pair: row.pair,
    targetPrice: row.target_price,
    triggerCondition: row.trigger_condition,
    userId: row.user_id,
    currentPrice: row.current_price, // Ensure case matches DB column alias
  }));
}
