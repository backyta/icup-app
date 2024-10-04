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

export interface TooltipConfig<TPayload> {
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
  payload: TPayload[]; // Payload genérico
}