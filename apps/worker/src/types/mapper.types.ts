export type Alert = {
  pair: string;
  targetPrice: number;
  triggerCondition: number;
  userId: number;
  currentPrice: number;
};

export type AlertEntity = {
  pair: string;
  target_price: number;
  trigger_condition: number;
  user_id: number;
  current_price: number;
};
