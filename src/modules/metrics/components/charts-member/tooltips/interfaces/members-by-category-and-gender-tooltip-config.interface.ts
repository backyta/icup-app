interface Coordinate {
  x: number;
  y: number;
}

interface ViewBox {
  brushBottom: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface MembersByCategoryAndGenderTooltipConfig {
  cursor: boolean;
  accessibilityLayer: boolean;
  allowEscapeViewBox: {
    x: boolean;
    y: boolean;
  };
  animationDuration: number;
  animationEasing: string;
  contentStyle: object;
  coordinate: Coordinate;
  cursorStyle: object;
  filterNull: boolean;
  isAnimationActive: boolean;
  itemStyle: object;
  labelStyle: object;
  offset: number;
  reverseDirection: {
    x: boolean;
    y: boolean;
  };
  separator: string;
  trigger: string;
  useTranslate3d: boolean;
  viewBox: ViewBox;
  wrapperStyle: object;
  active: boolean;
  label: string;
  payload: MembersByCategoryAndGenderData[];
}

//* Payload
interface MembersByCategoryAndGenderData {
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



