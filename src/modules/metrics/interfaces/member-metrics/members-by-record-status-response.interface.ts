interface RecordStatusStats  {
  active: number;
  inactive: number;
  church:{
    isAnexe: boolean;
    abbreviatedChurchName: string;
  }
}

export type MembersByRecordStatusResponse = Record<string, RecordStatusStats>;