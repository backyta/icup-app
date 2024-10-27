export interface FamilyGroupsFluctuationByYearPayload {
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
    month: string;
    newFamilyGroups: number;
    inactiveFamilyGroups: number;
    church:{
      isAnexe: boolean;
      abbreviatedChurchName: string;
    }
  };
  chartType?: string | undefined;
  hide: boolean;
}



