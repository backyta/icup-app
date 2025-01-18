export interface FamilyGroupsByZonePayload {
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
    familyGroupCode: string;
    supervisor: string;
    preacher: string;
    men: number;
    women: number;
    church: {
      isAnexe: boolean;
      abbreviatedChurchName: string;
    };
    totalPercentage: string;
  };
  chartType?: string | undefined;
  hide: boolean;
}
