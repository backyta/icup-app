export interface FamilyGroupsByRecordStatusPayload {
  fill: string;
  radius: number;
  dataKey: string;
  unit?: string | undefined;
  formatter?: ((value: number) => string) | undefined;
  name: string;
  color: string;
  value: number;
  type?: string | undefined;
  payload: {
    zoneName: string;
    supervisor: string;
    active: number;
    inactive: number;
  };
  chartType?: string | undefined;
  hide: boolean;
}

