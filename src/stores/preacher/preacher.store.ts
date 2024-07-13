/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { type PreacherResponse } from '@/app/preacher/interfaces';
import { create, type StateCreator } from 'zustand';

interface PreacherStore {
  // Properties
  isFiltersSearchGeneralDisabled: boolean;
  isFiltersSearchByTermDisabled: boolean;

  dataSearchGeneralResponse: PreacherResponse[] | undefined;
  dataSearchByTermResponse: PreacherResponse[] | undefined;

  // Methods
  setIsFiltersSearchGeneralDisabled: (value: boolean) => void;
  setIsFiltersSearchByTermDisabled: (value: boolean) => void;

  setDataSearchGeneralResponse: (value: PreacherResponse[] | undefined) => void;
  setDataSearchByTermResponse: (value: PreacherResponse[] | undefined) => void;
}

export const storePreacher: StateCreator<PreacherStore> = (set) => ({
  isFiltersSearchGeneralDisabled: true,
  isFiltersSearchByTermDisabled: true,

  dataSearchGeneralResponse: undefined,
  dataSearchByTermResponse: undefined,

  setIsFiltersSearchGeneralDisabled: (value: boolean) => set( state => ({isFiltersSearchGeneralDisabled: value})),
  setIsFiltersSearchByTermDisabled: (value: boolean) => set( state => ({isFiltersSearchByTermDisabled: value})),

  setDataSearchGeneralResponse: (value: PreacherResponse[] |  undefined) => set( state => ({dataSearchGeneralResponse: value})),
  setDataSearchByTermResponse: (value: PreacherResponse[] | undefined) => set( state => ({dataSearchByTermResponse: value})),

})

export const usePreacherStore = create<PreacherStore>()(storePreacher);

