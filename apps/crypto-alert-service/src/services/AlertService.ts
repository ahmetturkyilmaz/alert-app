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

  async findAll(userId: number): Promise<Alerts[]> {
    return this._client.alerts.findMany({ where: { userId } });
  }

  async addAlert(userId: number, data: AlertData): Promise<Alerts> {
    return this._client.alerts.create({
      data: {
        userId,
        triggerCondition: data.triggerCondition,
        targetPrice: data.targetPrice,
        pair: data.pair,
      },
    });
  }

  async deleteAlert(userId: number, id: number): Promise<Alerts> {
    return this._client.alerts.delete({
      where: { userId, id },
    });
  }
}
