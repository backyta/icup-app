/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type FamilyGroupPreacherUpdateFormData } from '@/modules/family-group/interfaces/family-group-preacher-update-form-data.interface';

interface Options {
  familyGroupPreacherUpdateForm: UseFormReturn<FamilyGroupPreacherUpdateFormData, any, undefined>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputTheirPreacherDisabled: boolean;
}

export const useFamilyGroupPreacherUpdateSubmitButtonLogic = ({
  familyGroupPreacherUpdateForm,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputTheirPreacherDisabled,
}: Options): void => {
  //* Watchers
  const newTheirPreacher = familyGroupPreacherUpdateForm.watch('newTheirPreacher');
  const newFamilyGroup = familyGroupPreacherUpdateForm.watch('newFamilyGroup');

  //* Effects
  useEffect(() => {
    if (
      familyGroupPreacherUpdateForm.formState.errors &&
      Object.values(familyGroupPreacherUpdateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (newTheirPreacher && newFamilyGroup && !isInputTheirPreacherDisabled) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (!newTheirPreacher || !newFamilyGroup) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [familyGroupPreacherUpdateForm.formState, newTheirPreacher, newFamilyGroup]);
};
