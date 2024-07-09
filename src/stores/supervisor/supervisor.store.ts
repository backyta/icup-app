/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { type SupervisorResponse } from '@/app/supervisor/interfaces';
import { create, type StateCreator } from 'zustand';

interface SupervisorStore {
  // Properties
  isFiltersSearchGeneralDisabled: boolean;
  isFiltersSearchByTermDisabled: boolean;

  dataSearchGeneralResponse: SupervisorResponse[] | undefined;
  dataSearchByTermResponse: SupervisorResponse[] | undefined;

  // Methods
  setIsFiltersSearchGeneralDisabled: (value: boolean) => void;
  setIsFiltersSearchByTermDisabled: (value: boolean) => void;

  setDataSearchGeneralResponse: (value: SupervisorResponse[] | undefined) => void;
  setDataSearchByTermResponse: (value: SupervisorResponse[] | undefined) => void;
}

export const storeSupervisor: StateCreator<SupervisorStore> = (set) => ({
  isFiltersSearchGeneralDisabled: true,
  isFiltersSearchByTermDisabled: true,

  dataSearchGeneralResponse: undefined,
  dataSearchByTermResponse: undefined,

  setIsFiltersSearchGeneralDisabled: (value: boolean) => set( state => ({isFiltersSearchGeneralDisabled: value})),
  setIsFiltersSearchByTermDisabled: (value: boolean) => set( state => ({isFiltersSearchByTermDisabled: value})),

  setDataSearchGeneralResponse: (value: SupervisorResponse[] |  undefined) => set( state => ({dataSearchGeneralResponse: value})),
  setDataSearchByTermResponse: (value: SupervisorResponse[] | undefined) => set( state => ({dataSearchByTermResponse: value})),

})

export const useSupervisorStore = create<SupervisorStore>()(storeSupervisor);

