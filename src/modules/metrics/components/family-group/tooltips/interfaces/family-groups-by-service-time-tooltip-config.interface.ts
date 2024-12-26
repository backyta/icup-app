//* Payload
export interface FamilyGroupsByServiceTimePayload {
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
    serviceTime: string;
    serviceTimesCount: number;
    copastor: string;
    supervisor: string;
    church:{
      isAnexe: boolean;
      abbreviatedChurchName: string;
    }
    totalPercentage: string;
  };
  chartType?: string | undefined;
  hide: boolean;
}



