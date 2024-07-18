/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { type UserResponse } from '@/app/user/interfaces';
import { create, type StateCreator } from 'zustand';

interface UserStore {
  // Properties
  isFiltersSearchGeneralDisabled: boolean;
  isFiltersSearchByTermDisabled: boolean;

  dataSearchGeneralResponse: UserResponse[] | undefined;
  dataSearchByTermResponse: UserResponse[] | undefined;

  // Methods
  setIsFiltersSearchGeneralDisabled: (value: boolean) => void;
  setIsFiltersSearchByTermDisabled: (value: boolean) => void;

  setDataSearchGeneralResponse: (value: UserResponse[] | undefined) => void;
  setDataSearchByTermResponse: (value: UserResponse[] | undefined) => void;
}

export const storeUser: StateCreator<UserStore> = (set) => ({
  isFiltersSearchGeneralDisabled: true,
  isFiltersSearchByTermDisabled: true,

  dataSearchGeneralResponse: undefined,
  dataSearchByTermResponse: undefined,

  setIsFiltersSearchGeneralDisabled: (value: boolean) => set( state => ({isFiltersSearchGeneralDisabled: value})),
  setIsFiltersSearchByTermDisabled: (value: boolean) => set( state => ({isFiltersSearchByTermDisabled: value})),

  setDataSearchGeneralResponse: (value: UserResponse[] |  undefined) => set( state => ({dataSearchGeneralResponse: value})),
  setDataSearchByTermResponse: (value: UserResponse[] | undefined) => set( state => ({dataSearchByTermResponse: value})),

})

export const useUserStore = create<UserStore>()(storeUser);

