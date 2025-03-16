export enum TriggerCondition {
  LESS_THAN = 1, // <
  GREATER_THAN = 2, // >
}
export const allowedTriggerConditions = [
  TriggerCondition.LESS_THAN,
  TriggerCondition.GREATER_THAN,
];
