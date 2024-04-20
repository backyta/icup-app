/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { create, type StateCreator } from 'zustand';

interface FamilyHouseStore {
  // Properties
  isInputPreacherOpen: boolean;
  isInputSearchZoneOpen: boolean;

  isInputDisabled: boolean;
  isInputZoneDisabled: boolean;
  isInputPreacherDisabled: boolean;

  isSubmitButtonDisabled: boolean;
  isZoneButtonsDisabled: boolean;

  isCreateCardOpen: boolean;
  isUpdateCardOpen: boolean;
  isDeleteCardOpen: boolean;
  isMessageErrorDisabled: boolean;

  // Methods
  setIsPreacherOpen: (value: boolean) => void;
  setIsSearchZoneOpen: (value: boolean) => void;

  setIsInputDisabled: (value: boolean) => void;
  setIsInputZoneDisabled: (value: boolean) => void;
  setIsInputPreacherDisabled: (value: boolean) => void;

  setIsSubmitButtonDisabled: (value: boolean) => void;
  setIsZoneButtonsDisabled: (value: boolean) => void;

  setIsCreateCardOpen: (value: boolean) => void;
  setIsUpdateCardOpen: (value: boolean) => void;
  setIsDeleteCardOpen: (value: boolean) => void;
  setIsMessageErrorDisabled: (value: boolean) => void;
}

export const storeFamilyHouse: StateCreator<FamilyHouseStore> = (set) => ({
  isInputPreacherOpen: false,
  isInputSearchZoneOpen: false,

  isInputDisabled: true,
  isInputZoneDisabled: false,
  isInputPreacherDisabled: true,

  isSubmitButtonDisabled: false,
  isZoneButtonsDisabled: false,

  isCreateCardOpen: false,
  isUpdateCardOpen: false,
  isDeleteCardOpen: false,
  isMessageErrorDisabled: true,

  setIsPreacherOpen: (value: boolean) => set( state => ({isInputPreacherOpen: value})),
  setIsSearchZoneOpen: (value: boolean) => set( state => ({isInputSearchZoneOpen: value})),

  setIsInputDisabled: (value: boolean) => set( state => ({isInputDisabled: value})),
  setIsInputZoneDisabled: (value: boolean) => set( state => ({isInputZoneDisabled: value})),
  setIsInputPreacherDisabled: (value: boolean) => set( state => ({isInputPreacherDisabled: value})),

  setIsSubmitButtonDisabled: (value: boolean) => set( state => ({isSubmitButtonDisabled: value})),
  setIsZoneButtonsDisabled: (value: boolean) => set( state => ({isZoneButtonsDisabled: value})),

  setIsCreateCardOpen: (value: boolean) => set( state => ({isCreateCardOpen: value})),
  setIsUpdateCardOpen: (value: boolean) => set( state => ({isUpdateCardOpen: value})),
  setIsDeleteCardOpen: (value: boolean) => set( state => ({isDeleteCardOpen: value})),

  setIsMessageErrorDisabled: (value: boolean) => set( state => ({isMessageErrorDisabled: value})),
  
})

export const useFamilyHouseStore = create<FamilyHouseStore>()(storeFamilyHouse);

