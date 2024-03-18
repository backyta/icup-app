import { type CurrencyType } from "@/enums";


export interface OfferingData {
  type: string,
  subType: string,
  amount: string,
  currency: CurrencyType,
  comments: string,
  urlFile: string[],
  familyHouseID?: string,
  memberID?: string,
  copastorID?: string,
}

export type DataOfferingKeys =
  |'zoneName' 
  |'houseName' 
  |'country' 
  |'department' 
  |'province' 
  |'district' 
  |'address' 
  |'theirPreacher';