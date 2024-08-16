import { SubTypesOfferingExpenseNames, TypesOfferingExpenseNames } from '@/modules/offering/expenses/enums';

import { CurrencyType } from '@/modules/offering/shared/enums';
import { type OfferingColumns } from '@/modules/offering/shared/interfaces';

export const dataOfferingsExpenses: OfferingColumns[] = 
[
  {
    id: '1',
    type: TypesOfferingExpenseNames.operative_expenses,
    sub_type: SubTypesOfferingExpenseNames.venue_rental,
    amount: 25,
    currency: CurrencyType.Soles,
    date: `12/10/2022`,
    updated_by: 'Maria Flores'
  },
  {
    id: '2',
    type: TypesOfferingExpenseNames.equipment_and_technology_expenses,
    sub_type: SubTypesOfferingExpenseNames.computer_equipment,
    amount: 25,
    currency: CurrencyType.Dollars,
    date: '03/05/2023',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '3',
    type: TypesOfferingExpenseNames.operative_expenses,
    sub_type: SubTypesOfferingExpenseNames.travel_and_transportation,
    amount: 150,
    currency: CurrencyType.Euros,
    date: '07/12/2024',
    updated_by: 'Maria Flores'
  },
  {
    id: '4',
    type: TypesOfferingExpenseNames.decoration_expenses,
    sub_type: SubTypesOfferingExpenseNames.purchase_decorative_furniture,
    amount: 120,
    currency: CurrencyType.Soles,
    date: '09/30/2023',
    updated_by: 'Maria Flores'
  },
  {
    id: '5',
    type: TypesOfferingExpenseNames.equipment_and_technology_expenses,
    sub_type: SubTypesOfferingExpenseNames.security_equipment,
    amount: 50,
    currency: CurrencyType.Dollars,
    date: '12/15/2023',
    updated_by: 'Maria Flores'
  },
  {
    id: '6',
    type: TypesOfferingExpenseNames.decoration_expenses,
    sub_type: SubTypesOfferingExpenseNames.decorations_and_ambiance,
    
    amount: 180,
    currency: CurrencyType.Euros,
    date: '05/09/2024',
    updated_by: 'Maria Flores'
  },
  {
    id: '7',
    type: TypesOfferingExpenseNames.supplies_expenses,
    sub_type: SubTypesOfferingExpenseNames.kitchen_utensils,
    amount: 100,
    currency: CurrencyType.Soles,
    date: '08/27/2022',
    updated_by: 'Maria Flores'
  },
  {
    id: '8',
    type: TypesOfferingExpenseNames.supplies_expenses,
    sub_type: SubTypesOfferingExpenseNames.cooking_ingredients,
    amount: 90,
    currency: CurrencyType.Dollars,
    date: '10/03/2022',
    updated_by: 'Maria Flores'
  },
  {
    id: '9',
    type: TypesOfferingExpenseNames.supplies_expenses,
    sub_type: SubTypesOfferingExpenseNames.kitchen_utensils,
    amount: 300,
    currency: CurrencyType.Euros,
    date: '02/18/2023',
    updated_by: 'Maria Flores'
  },
  {
    id: '10',
    type: TypesOfferingExpenseNames.maintenance_and_repair_expenses,
    sub_type: SubTypesOfferingExpenseNames.furniture_repair_and_maintenance,
    amount: 250,
    currency: CurrencyType.Soles,
    date: '05/02/2024',
    updated_by: 'Maria Flores'
  },
  {
    id: '11',
    type: TypesOfferingExpenseNames.maintenance_and_repair_expenses,
    sub_type: SubTypesOfferingExpenseNames.garden_and_exterior_maintenance,
    amount: 180,
    currency: CurrencyType.Dollars,
    date: '08/07/2023',
    updated_by: 'Maria Flores'
  },
  {
    id: '12',
    type: TypesOfferingExpenseNames.equipment_and_technology_expenses,
    sub_type: SubTypesOfferingExpenseNames.decorations_and_ambiance,
    amount: 150,
    currency: CurrencyType.Soles,
    date: '12/01/2022',
    updated_by: 'Maria Flores'
  },
  {
    id: '13',
    type: TypesOfferingExpenseNames.equipment_and_technology_expenses,
    sub_type: SubTypesOfferingExpenseNames.decorations_and_ambiance,
    amount: 80,
    currency: CurrencyType.Euros,
    date: '10/03/2023',
    updated_by: 'Maria Flores'
  },
  {
    id: '14',
    type: TypesOfferingExpenseNames.decoration_expenses,
    sub_type: SubTypesOfferingExpenseNames.decorations_and_ambiance,
    amount: 100,
    currency: CurrencyType.Dollars,
    date: '11/11/2022',
    updated_by: 'Maria Flores'
  },
  {
    id: '15',
    type: TypesOfferingExpenseNames.equipment_and_technology_expenses,
    sub_type: SubTypesOfferingExpenseNames.decorations_and_ambiance,
    amount: 250,
    currency: CurrencyType.Soles,
    date: '07/30/2023',
    updated_by: 'Maria Flores'
  },
  {
    id: '16',
    type: TypesOfferingExpenseNames.equipment_and_technology_expenses,
    sub_type: SubTypesOfferingExpenseNames.decorations_and_ambiance,
    amount: 70,
    currency: CurrencyType.Euros,
    date: '06/20/2024',
    updated_by: 'Maria Flores'
  },
  {
    id: '17',
    type: TypesOfferingExpenseNames.activities_and_events_expenses,
    sub_type: SubTypesOfferingExpenseNames.decorations_and_ambiance,
    amount: 120,
    currency: CurrencyType.Dollars,
    date: '02/14/2024',
    updated_by: 'Maria Flores'
  },
  {
    id: '18',
    type: TypesOfferingExpenseNames.activities_and_events_expenses,
    sub_type: SubTypesOfferingExpenseNames.decorations_and_ambiance,
    amount: 200,
    currency: CurrencyType.Euros,
    date: '03/18/2022',
    updated_by: 'Maria Flores'
  },
  {
    id: '19',
    type: TypesOfferingExpenseNames.activities_and_events_expenses,
    sub_type: SubTypesOfferingExpenseNames.decorations_and_ambiance,
    amount: 90,
    currency: CurrencyType.Soles,
    date: '08/09/2023',
    updated_by: 'Maria Flores'
  },
  {
    id: '20',
    type: TypesOfferingExpenseNames.activities_and_events_expenses,
    sub_type: SubTypesOfferingExpenseNames.decorations_and_ambiance,
    amount: 300,
    currency: CurrencyType.Dollars,
    date: '04/17/2024',
    updated_by: 'Maria Flores'
  }
];
