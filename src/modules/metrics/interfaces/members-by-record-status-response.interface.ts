interface RecordStatusStats  {
  active: number;
  inactive: number;
}

export type MembersByRecordStatusResponse = Record<string, RecordStatusStats>;