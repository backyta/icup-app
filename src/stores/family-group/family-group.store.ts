/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { create, type StateCreator } from 'zustand';
import { type FamilyGroupResponse } from '@/modules/family-group/interfaces';

interface FamilyGroupStore {
  // Properties
  isFiltersSearchGeneralDisabled: boolean;
  isFiltersSearchByTermDisabled: boolean;

  dataSearchGeneralResponse: FamilyGroupResponse[] | undefined;
  dataSearchByTermResponse: FamilyGroupResponse[] | undefined;

  // Methods
  setIsFiltersSearchGeneralDisabled: (value: boolean) => void;
  setIsFiltersSearchByTermDisabled: (value: boolean) => void;

  setDataSearchGeneralResponse: (value: FamilyGroupResponse[] | undefined) => void;
  setDataSearchByTermResponse: (value: FamilyGroupResponse[] | undefined) => void;
}

export const storeFamilyGroup: StateCreator<FamilyGroupStore> = (set) => ({
  isFiltersSearchGeneralDisabled: true,
  isFiltersSearchByTermDisabled: true,

  dataSearchGeneralResponse: undefined,
  dataSearchByTermResponse: undefined,

  setIsFiltersSearchGeneralDisabled: (value: boolean) => set( state => ({isFiltersSearchGeneralDisabled: value})),
  setIsFiltersSearchByTermDisabled: (value: boolean) => set( state => ({isFiltersSearchByTermDisabled: value})),

  setDataSearchGeneralResponse: (value: FamilyGroupResponse[] |  undefined) => set( state => ({dataSearchGeneralResponse: value})),
  setDataSearchByTermResponse: (value: FamilyGroupResponse[] | undefined) => set( state => ({dataSearchByTermResponse: value})),
})

export const useFamilyGroupStore = create<FamilyGroupStore>()(storeFamilyGroup);