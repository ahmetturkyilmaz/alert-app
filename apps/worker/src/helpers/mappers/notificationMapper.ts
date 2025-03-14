import type {Alert} from "../../types";

export function mapNotifications(rows: any[]): Alert[] {
    return rows.map((row) => ({
        symbol: row.symbol,
        targetPrice: row.target_price,
        condition: row.condition,
        userId: row.user_id,
        currentPrice: row.current_price, // Ensure case matches DB column alias
    }));
}
