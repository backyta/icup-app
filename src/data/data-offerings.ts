
import { type Offering } from "@/components/table-members/offering-columns";
import { CurrencyType } from "@/enums/currency-type.enum";
import { SubTypesOfferingNames } from "@/enums/sub-type-offering.enum";


export const dataOfferings: Offering[] = 
[
  {
    id: '1',
    type: 'Ofrenda',
    sub_type: SubTypesOfferingNames.special,
    amount: 25,
    currency: CurrencyType.soles,
  },
  {
    id: '2',
    type: 'Diezmo',
    amount: 200,
    sub_type:'-',
    currency: CurrencyType.dollars,
  },
  {
    id: '3',
    type: 'Ofrenda',
    sub_type: SubTypesOfferingNames.youth_worship,
    amount: 150,
    currency: CurrencyType.euros,
  },
  {
    id: '4',
    type: 'Diezmo',
    sub_type:'-',
    amount: 120,
    currency: CurrencyType.soles,
  },
  {
    id: '5',
    type: 'Ofrenda',
    sub_type: SubTypesOfferingNames.zonal_fasting,
    amount: 50,
    currency: CurrencyType.dollars,
  },
  {
    id: '6',
    type: 'Diezmo',
    sub_type:'-',
    amount: 180,
    currency: CurrencyType.euros,
  },
  {
    id: '7',
    type: 'Ofrenda',
    sub_type: SubTypesOfferingNames.sunday_worship,
    amount: 100,
    currency: CurrencyType.soles,
  },
  {
    id: '8',
    type: 'Diezmo',
    sub_type:'-',
    amount: 90,
    currency: CurrencyType.dollars,
  },
  {
    id: '9',
    type: 'Ofrenda',
    sub_type: SubTypesOfferingNames.activities,
    amount: 300,
    currency: CurrencyType.euros,
  },
  {
    id: '10',
    type: 'Diezmo',
    sub_type:'-',
    amount: 250,
    currency: CurrencyType.soles,
  },
  {
    id: '11',
    type: 'Ofrenda',
    sub_type: SubTypesOfferingNames.general_vigil,
    amount: 180,
    currency: CurrencyType.dollars,
  },
  {
    id: '12',
    type: 'Diezmo',
    sub_type:'-',
    amount: 150,
    currency: CurrencyType.soles,
  },
  {
    id: '13',
    type: 'Ofrenda',
    sub_type: SubTypesOfferingNames.church_ground,
    amount: 80,
    currency: CurrencyType.euros,
  },
  {
    id: '14',
    type: 'Diezmo',
    sub_type:'-',
    amount: 100,
    currency: CurrencyType.dollars,
  },
  {
    id: '15',
    type: 'Ofrenda',
    sub_type: SubTypesOfferingNames.sunday_school,
    amount: 250,
    currency: CurrencyType.soles,
  },
  {
    id: '16',
    type: 'Diezmo',
    sub_type:'-',
    amount: 70,
    currency: CurrencyType.euros,
  },
  {
    id: '17',
    type: 'Ofrenda',
    sub_type: SubTypesOfferingNames.family_house,
    amount: 120,
    currency: CurrencyType.dollars,
  },
  {
    id: '18',
    type: 'Diezmo',
    sub_type:'-',
    amount: 200,
    currency: CurrencyType.euros,
  },
  {
    id: '19',
    type: 'Ofrenda',
    sub_type: SubTypesOfferingNames.zonal_vigil,
    amount: 90,
    currency: CurrencyType.soles,
  },
  {
    id: '20',
    type: 'Diezmo',
    sub_type:'-',
    amount: 300,
    currency: CurrencyType.dollars,
  },
  
];
