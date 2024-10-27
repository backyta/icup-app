//* Payload
export interface FamilyGroupByZonePayload {
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
    familyGroupsCount: number;
    church:{
      isAnexe: boolean;
      abbreviatedChurchName: string;
    }
    totalPercentage: string;
  };
  chartType?: string | undefined;
  hide: boolean;
}