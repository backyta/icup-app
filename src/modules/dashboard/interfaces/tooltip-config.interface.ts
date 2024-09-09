import { type CurrencyType } from "@/modules/offering/shared/enums";
import {  type TheirDisciple, type TheirPreacher } from "@/shared/interfaces";


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

export interface TooltipConfig {
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
  payload: OfferingData[];
}

//* Payload
export interface Offering {
  offering: number;
  currency: string;
  date: string | Date;
}

interface FamilyGroup {
  id: string;
  familyGroupName: string;
  familyGroupCode: string;
  district: string;
  urbanSector: string;
  theirPreacher: TheirPreacher;
  disciples: TheirDisciple[];
}

export interface OfferingData {
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
    date: string;
    currency: CurrencyType;
    accumulatedOfferingPEN: number;
    accumulatedOfferingUSD: number;
    accumulatedOfferingEUR: number;
    familyGroup: FamilyGroup;
    familyGroupCode: string;
    lastOfferingPEN: number;
    lastOfferingUSD: number;
    lastOfferingEUR: number;
    allOfferings: Offering[];
  };
  chartType?: string | undefined;
  hide: boolean;
}
