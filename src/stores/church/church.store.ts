/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { create, type StateCreator } from 'zustand';
import { type ChurchResponse } from '@/modules/church/interfaces/church-response.interface';

interface ChurchStore {
  // Properties
  isFiltersSearchGeneralDisabled: boolean;
  isFiltersSearchByTermDisabled: boolean;

  dataSearchGeneralResponse: ChurchResponse[] | undefined;
  dataSearchByTermResponse: ChurchResponse[] | undefined;

  // Methods
  setIsFiltersSearchGeneralDisabled: (value: boolean) => void;
  setIsFiltersSearchByTermDisabled: (value: boolean) => void;

  setDataSearchGeneralResponse: (value: ChurchResponse[] | undefined) => void;
  setDataSearchByTermResponse: (value: ChurchResponse[] | undefined) => void;
}

export const storeChurch: StateCreator<ChurchStore> = (set) => ({
  isFiltersSearchGeneralDisabled: true,
  isFiltersSearchByTermDisabled: true,

  dataSearchGeneralResponse: undefined,
  dataSearchByTermResponse: undefined,

  setIsFiltersSearchGeneralDisabled: (value: boolean) => set( state => ({isFiltersSearchGeneralDisabled: value})),
  setIsFiltersSearchByTermDisabled: (value: boolean) => set( state => ({isFiltersSearchByTermDisabled: value})),

  setDataSearchGeneralResponse: (value: ChurchResponse[] |  undefined) => set( state => ({dataSearchGeneralResponse: value})),
  setDataSearchByTermResponse: (value: ChurchResponse[] | undefined) => set( state => ({dataSearchByTermResponse: value})),

})

export const useChurchStore = create<ChurchStore>()(storeChurch);

