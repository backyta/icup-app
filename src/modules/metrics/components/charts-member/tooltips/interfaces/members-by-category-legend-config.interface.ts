interface TooltipPayload {
  name: string;
  value: number;
  payload: {
    ageRange: string;
    category: string;
    membersNumber: number;
    fill: string;
  };
  dataKey: string;
  type?: string;
}

//* Payload
interface PayloadData {
  percent: number;
  cornerRadius?: number;
  name: string;
  tooltipPayload: TooltipPayload[];
  midAngle: number;
  middleRadius: number;
  tooltipPosition: {
    x: number;
    y: number;
  };
  payload: {
    ageRange: string;
    category: string;
    membersNumber: number;
    fill: string;
  };
  strokeWidth: number;
  stroke: string;
  fill: string;
  cx: number | string;
  cy: number | string;
  ageRange: string;
  category: string;
  membersNumber: number;
  innerRadius: number;
  outerRadius: number;
  maxRadius: number;
  value: number;
  startAngle: number;
  endAngle: number;
  paddingAngle: number;
}

export interface MembersByCategoryLegendConfig {
  type: string;
  value: string;
  color: string;
  payload: PayloadData;
}
