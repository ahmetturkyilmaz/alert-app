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
        return this._client.alerts.findMany({where: {userId: user}});
    }

    async addAlert(user: number, data: AlertData): Promise<alerts> {
        return this._client.alerts.create({
            data: {
                userId: user,
                condition: data.condition,
                targetPrice: data.targetPrice,
                symbol: data.symbol,
            },
        });
    }
}
