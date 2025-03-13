import type {alerts, PrismaClient} from "@prisma/client";

interface AlertData {
    condition: string;
    targetPrice: number;
    symbol: string;
}

export class AlertService {
    private _client: PrismaClient;

    constructor(dbClient: PrismaClient) {
        this._client = dbClient;
    }

    async findAll(user: number): Promise<alerts[]> {
        const entities = await this._client.alerts.findMany({where: {user_id: user}});
        return entities;
    }

    async addAlert(user: number, data: AlertData): Promise<alerts> {
        const entity = await this._client.alerts.create({
            data: {
                user_id: user,
                condition: data.condition,
                target_price: data.targetPrice,
                symbol: data.symbol,
            },
        });
        return entity;
    }
}
