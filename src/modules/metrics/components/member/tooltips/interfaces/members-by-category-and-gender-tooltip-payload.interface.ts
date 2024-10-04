//* Payload
export interface MembersByCategoryAndGenderPayload {
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
    category: string,
    men: number,
    women: number,
    totalPercentage: string,
  };
  chartType?: string | undefined;
  hide: boolean;
}



