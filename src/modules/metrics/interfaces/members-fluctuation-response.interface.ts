interface MonthStats  {
  new: number;
  inactive: number;
}

export type MembersFluctuationResponse = Record<string, MonthStats>;
