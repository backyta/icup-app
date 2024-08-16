/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { create, type StateCreator } from 'zustand';
import { type PastorResponse } from '@/modules/pastor/interfaces';

interface PastorStore {
  // Properties
  isFiltersSearchGeneralDisabled: boolean;
  isFiltersSearchByTermDisabled: boolean;

  dataSearchGeneralResponse: PastorResponse[] | undefined;
  dataSearchByTermResponse: PastorResponse[] | undefined;

  // Methods
  setIsFiltersSearchGeneralDisabled: (value: boolean) => void;
  setIsFiltersSearchByTermDisabled: (value: boolean) => void;

  setDataSearchGeneralResponse: (value: PastorResponse[] | undefined) => void;
  setDataSearchByTermResponse: (value: PastorResponse[] | undefined) => void;
}

export const storePastor: StateCreator<PastorStore> = (set) => ({
  isFiltersSearchGeneralDisabled: true,
  isFiltersSearchByTermDisabled: true,

  dataSearchGeneralResponse: undefined,
  dataSearchByTermResponse: undefined,

  setIsFiltersSearchGeneralDisabled: (value: boolean) => set( state => ({isFiltersSearchGeneralDisabled: value})),
  setIsFiltersSearchByTermDisabled: (value: boolean) => set( state => ({isFiltersSearchByTermDisabled: value})),

  setDataSearchGeneralResponse: (value: PastorResponse[] |  undefined) => set( state => ({dataSearchGeneralResponse: value})),
  setDataSearchByTermResponse: (value: PastorResponse[] | undefined) => set( state => ({dataSearchByTermResponse: value})),

})

export const usePastorStore = create<PastorStore>()(storePastor);

