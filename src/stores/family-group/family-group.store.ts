/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { create, type StateCreator } from 'zustand';
import { type FamilyGroupResponse } from '@/app/family-group/interfaces';

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



// import { create, type StateCreator } from 'zustand';

// interface FamilyHouseStore {
//   // Properties
//   isInputTheirPreacherOpen: boolean;
//   isInputTheirZoneOpen: boolean;

//   isInputDisabled: boolean;
//   isInputTheirZoneDisabled: boolean;
//   isInputTheirPreacherDisabled: boolean;

//   isSubmitButtonDisabled: boolean;
//   isZoneButtonsDisabled: boolean;

//   isCreateCardOpen: boolean;
//   isUpdateCardOpen: boolean;
//   isDeleteCardOpen: boolean;
//   isMessageErrorDisabled: boolean;
  

//   // Methods
//   setIsInputTheirPreacherOpen: (value: boolean) => void;
//   setIsInputTheirZoneOpen: (value: boolean) => void;

//   setIsInputDisabled: (value: boolean) => void;
//   setIsInputZoneDisabled: (value: boolean) => void;
//   setIsInputPreacherDisabled: (value: boolean) => void;

//   setIsSubmitButtonDisabled: (value: boolean) => void;
//   setIsZoneButtonsDisabled: (value: boolean) => void;

//   setIsCreateCardOpen: (value: boolean) => void;
//   setIsUpdateCardOpen: (value: boolean) => void;
//   setIsDeleteCardOpen: (value: boolean) => void;
//   setIsMessageErrorDisabled: (value: boolean) => void;
// }

// export const storeFamilyHouse: StateCreator<FamilyHouseStore> = (set) => ({
//   isInputTheirPreacherOpen: false,
//   isInputTheirZoneOpen: false,

//   isInputDisabled: false,
//   isInputTheirZoneDisabled: false,
//   isInputTheirPreacherDisabled: true,

//   isSubmitButtonDisabled: false,
//   isZoneButtonsDisabled: false,

//   isCreateCardOpen: false,
//   isUpdateCardOpen: false,
//   isDeleteCardOpen: false,
//   isMessageErrorDisabled: true,

//   setIsInputTheirPreacherOpen: (value: boolean) => set( state => ({isInputTheirPreacherOpen: value})),
//   setIsInputTheirZoneOpen: (value: boolean) => set( state => ({isInputTheirZoneOpen: value})),

//   setIsInputDisabled: (value: boolean) => set( state => ({isInputDisabled: value})),
//   setIsInputZoneDisabled: (value: boolean) => set( state => ({isInputTheirZoneDisabled: value})),
//   setIsInputPreacherDisabled: (value: boolean) => set( state => ({isInputTheirPreacherDisabled: value})),

//   setIsSubmitButtonDisabled: (value: boolean) => set( state => ({isSubmitButtonDisabled: value})),
//   setIsZoneButtonsDisabled: (value: boolean) => set( state => ({isZoneButtonsDisabled: value})),

//   setIsCreateCardOpen: (value: boolean) => set( state => ({isCreateCardOpen: value})),
//   setIsUpdateCardOpen: (value: boolean) => set( state => ({isUpdateCardOpen: value})),
//   setIsDeleteCardOpen: (value: boolean) => set( state => ({isDeleteCardOpen: value})),

//   setIsMessageErrorDisabled: (value: boolean) => set( state => ({isMessageErrorDisabled: value})),
  
// })

// export const useFamilyHouseStore = create<FamilyHouseStore>()(storeFamilyHouse);

