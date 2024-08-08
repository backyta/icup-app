/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { type OfferingIncomeResponse } from '@/app/offering/income/interfaces';
import { create, type StateCreator } from 'zustand';

interface OfferingIncomeStore {
  // Properties
  isFiltersSearchGeneralDisabled: boolean;
  isFiltersSearchByTermDisabled: boolean;

  dataSearchGeneralResponse: OfferingIncomeResponse[] | undefined;
  dataSearchByTermResponse: OfferingIncomeResponse[] | undefined;

  // Methods
  setIsFiltersSearchGeneralDisabled: (value: boolean) => void;
  setIsFiltersSearchByTermDisabled: (value: boolean) => void;

  setDataSearchGeneralResponse: (value: OfferingIncomeResponse[] | undefined) => void;
  setDataSearchByTermResponse: (value: OfferingIncomeResponse[] | undefined) => void;
}

export const storeOfferingIncome: StateCreator<OfferingIncomeStore> = (set) => ({
  isFiltersSearchGeneralDisabled: true,
  isFiltersSearchByTermDisabled: true,

  dataSearchGeneralResponse: undefined,
  dataSearchByTermResponse: undefined,

  setIsFiltersSearchGeneralDisabled: (value: boolean) => set( state => ({isFiltersSearchGeneralDisabled: value})),
  setIsFiltersSearchByTermDisabled: (value: boolean) => set( state => ({isFiltersSearchByTermDisabled: value})),

  setDataSearchGeneralResponse: (value: OfferingIncomeResponse[] |  undefined) => set( state => ({dataSearchGeneralResponse: value})),
  setDataSearchByTermResponse: (value: OfferingIncomeResponse[] | undefined) => set( state => ({dataSearchByTermResponse: value})),
})

export const useOfferingIncomeStore = create<OfferingIncomeStore>()(storeOfferingIncome);

