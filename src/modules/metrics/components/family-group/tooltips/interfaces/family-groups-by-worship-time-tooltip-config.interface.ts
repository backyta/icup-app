//* Payload
export interface FamilyGroupsByWorshipTimePayload {
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
    worshipsTimes: string,
    supervisor: string,
    totalPercentage: string,
  };
  chartType?: string | undefined;
  hide: boolean;
}



