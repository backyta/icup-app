/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { type DiscipleResponse } from '@/app/disciple/interfaces';
import { create, type StateCreator } from 'zustand';

interface DiscipleStore {
  // Properties
  isFiltersSearchGeneralDisabled: boolean;
  isFiltersSearchByTermDisabled: boolean;

  dataSearchGeneralResponse: DiscipleResponse[] | undefined;
  dataSearchByTermResponse: DiscipleResponse[] | undefined;

  // Methods
  setIsFiltersSearchGeneralDisabled: (value: boolean) => void;
  setIsFiltersSearchByTermDisabled: (value: boolean) => void;

  setDataSearchGeneralResponse: (value: DiscipleResponse[] | undefined) => void;
  setDataSearchByTermResponse: (value: DiscipleResponse[] | undefined) => void;
}

export const storeDisciple: StateCreator<DiscipleStore> = (set) => ({
  isFiltersSearchGeneralDisabled: true,
  isFiltersSearchByTermDisabled: true,

  dataSearchGeneralResponse: undefined,
  dataSearchByTermResponse: undefined,

  setIsFiltersSearchGeneralDisabled: (value: boolean) => set( state => ({isFiltersSearchGeneralDisabled: value})),
  setIsFiltersSearchByTermDisabled: (value: boolean) => set( state => ({isFiltersSearchByTermDisabled: value})),

  setDataSearchGeneralResponse: (value: DiscipleResponse[] |  undefined) => set( state => ({dataSearchGeneralResponse: value})),
  setDataSearchByTermResponse: (value: DiscipleResponse[] | undefined) => set( state => ({dataSearchByTermResponse: value})),

})

export const useDiscipleStore = create<DiscipleStore>()(storeDisciple);

