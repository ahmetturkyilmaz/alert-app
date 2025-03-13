import { dbClient } from "../db/client";

export class AlertService {
	async findAll(user: string) {
		const entity = await dbClient.query("SELECT * FROM alerts WHERE user_id = $1", [user]);
		return entity.rows;
	}

	async addAlert(
		user: string,
		data: {
			condition: string;
			targetPrice: string;
			symbol: string;
		},
	) {
		const entity = await dbClient.query(
			`INSERT INTO alerts (user_id, condition, target_price, symbol)
             VALUES ($1, $2, $3, $4);`,
			[user, data.condition, data.targetPrice, data.symbol],
		);
		return entity.rows;
	}
}
