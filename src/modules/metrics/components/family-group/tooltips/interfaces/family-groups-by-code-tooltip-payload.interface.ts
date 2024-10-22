export interface FamilyGroupsByCodePayload {
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
    familyGroupCode: string,
    preacher:string,
    men: number,
    women: number,
    totalPercentage: string,
  };
  chartType?: string | undefined;
  hide: boolean;
}
