import { dbClient } from "../config/database";

export class NotificationService {
	async getTriggeredNotifications(fetchedPrices: { symbol: string; price: number }[]): Promise<
		{
			symbol: string;
			target_price: number;
			condition: ">" | "<";
			user_id: string;
		}[]
	> {
		const values = fetchedPrices.map(({ symbol, price }) => `('${symbol}', ${price})`).join(", ");
		const query = `
        WITH prices AS (VALUES ${values})
        SELECT ut.symbol, ut.target_price, ut.condition, ut.user_id, p.column2 AS currentPrice
        FROM alerts ut
                 JOIN prices p ON ut.symbol = p.column1
        WHERE (ut.condition = '>' AND p.column2 > ut.target_price)
           OR (ut.condition = '<' AND p.column2 < ut.target_price);
    `;
		const res = await dbClient.query(query);
		return res.rows;
	}
}
