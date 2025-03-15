import type { Alerts, PrismaClient } from "@prisma/client";

interface AlertData {
  triggerCondition: number;
  targetPrice: number;
  pair: string;
}

export class AlertService {
  private _client: PrismaClient;

  constructor(dbClient: PrismaClient) {
    this._client = dbClient;
  }

  async findAll(user: number): Promise<Alerts[]> {
    return this._client.alerts.findMany({ where: { userId: user } });
  }

  async addAlert(user: number, data: AlertData): Promise<Alerts> {
    return this._client.alerts.create({
      data: {
        userId: user,
        triggerCondition: data.triggerCondition,
        targetPrice: data.targetPrice,
        pair: data.pair,
      },
    });
  }
}
