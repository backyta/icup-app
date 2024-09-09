/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import {
  type OfferingIncomeCreationType,
  type OfferingIncomeCreationSubType,
} from '@/modules/offering/income/enums';
import { type OfferingIncomeFormData } from '@/modules/offering/income/interfaces';

import { type FilesProps } from '@/modules/offering/shared/interfaces';

interface Options {
  files: FilesProps[];
  isDeleteFileButtonDisabled: boolean;
  isDropZoneDisabled: boolean;
  isInputDisabled: boolean;
  OfferingIncomeCreationSubType: typeof OfferingIncomeCreationSubType;
  OfferingIncomeCreationType: typeof OfferingIncomeCreationType;
  offeringIncomeUpdateForm: UseFormReturn<OfferingIncomeFormData, any, OfferingIncomeFormData>;
  setIsDropZoneDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingIncomeUpdateSubmitButtonLogic = ({
  files,
  isDeleteFileButtonDisabled,
  isDropZoneDisabled,
  isInputDisabled,
  OfferingIncomeCreationSubType,
  OfferingIncomeCreationType,
  offeringIncomeUpdateForm,
  setIsDropZoneDisabled,
  setIsMessageErrorDisabled,
  setIsSubmitButtonDisabled,
}: Options): void => {
  //* Watchers
  const type = offeringIncomeUpdateForm.watch('type');
  const subType = offeringIncomeUpdateForm.watch('subType');
  const amount = offeringIncomeUpdateForm.watch('amount');
  const shift = offeringIncomeUpdateForm.watch('shift');
  const currency = offeringIncomeUpdateForm.watch('currency');
  const date = offeringIncomeUpdateForm.watch('date');
  const comments = offeringIncomeUpdateForm.watch('comments');
  const memberType = offeringIncomeUpdateForm.watch('memberType');
  const churchId = offeringIncomeUpdateForm.watch('churchId');
  const memberId = offeringIncomeUpdateForm.watch('memberId');
  const zoneId = offeringIncomeUpdateForm.watch('zoneId');
  const familyGroupId = offeringIncomeUpdateForm.watch('familyGroupId');

  //* Effects
  useEffect(() => {
    if (
      offeringIncomeUpdateForm.formState.errors &&
      Object.values(offeringIncomeUpdateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Income adjustment
    if (
      type === OfferingIncomeCreationType.IncomeAdjustment &&
      !subType &&
      amount &&
      currency &&
      date &&
      comments &&
      churchId &&
      Object.values(offeringIncomeUpdateForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === OfferingIncomeCreationType.IncomeAdjustment &&
      (!churchId || !amount || !currency || !date || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Sunday worship
    if (
      type === OfferingIncomeCreationType.Offering &&
      (subType === OfferingIncomeCreationSubType.SundayWorship ||
        subType === OfferingIncomeCreationSubType.SundaySchool) &&
      amount &&
      currency &&
      shift &&
      comments &&
      churchId &&
      Object.values(offeringIncomeUpdateForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === OfferingIncomeCreationType.Offering &&
      (subType === OfferingIncomeCreationSubType.SundayWorship ||
        subType === OfferingIncomeCreationSubType.SundaySchool) &&
      (!churchId || !amount || !currency || !shift || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Family group
    if (
      type === OfferingIncomeCreationType.Offering &&
      subType === OfferingIncomeCreationSubType.FamilyGroup &&
      amount &&
      currency &&
      familyGroupId &&
      comments &&
      Object.values(offeringIncomeUpdateForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === OfferingIncomeCreationType.Offering &&
      subType === OfferingIncomeCreationSubType.FamilyGroup &&
      (!amount || !currency || !familyGroupId || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Zone
    if (
      type === OfferingIncomeCreationType.Offering &&
      (subType === OfferingIncomeCreationSubType.ZonalVigil ||
        subType === OfferingIncomeCreationSubType.ZonalFasting) &&
      amount &&
      currency &&
      zoneId &&
      comments &&
      Object.values(offeringIncomeUpdateForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === OfferingIncomeCreationType.Offering &&
      (subType === OfferingIncomeCreationSubType.ZonalVigil ||
        subType === OfferingIncomeCreationSubType.ZonalFasting) &&
      (!amount || !currency || !zoneId || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Member
    if (
      type === OfferingIncomeCreationType.Offering &&
      (subType === OfferingIncomeCreationSubType.Special ||
        subType === OfferingIncomeCreationSubType.ChurchGround) &&
      memberType &&
      amount &&
      currency &&
      memberId &&
      comments &&
      Object.values(offeringIncomeUpdateForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === OfferingIncomeCreationType.Offering &&
      (subType === OfferingIncomeCreationSubType.Special ||
        subType === OfferingIncomeCreationSubType.ChurchGround) &&
      (!amount || !currency || !memberId || !memberType || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Others types
    if (
      type === OfferingIncomeCreationType.Offering &&
      subType !== OfferingIncomeCreationSubType.Special &&
      subType !== OfferingIncomeCreationSubType.ChurchGround &&
      subType !== OfferingIncomeCreationSubType.ZonalFasting &&
      subType !== OfferingIncomeCreationSubType.ZonalVigil &&
      subType !== OfferingIncomeCreationSubType.FamilyGroup &&
      subType !== OfferingIncomeCreationSubType.SundaySchool &&
      subType !== OfferingIncomeCreationSubType.SundayWorship &&
      amount &&
      currency &&
      churchId &&
      comments &&
      !shift &&
      !memberId &&
      !familyGroupId &&
      !zoneId &&
      Object.values(offeringIncomeUpdateForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    //* Others validations
    if (!amount || !currency || !date || !comments) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Limit images drop zone 3 (create income offering)
    if (files && files?.length >= 4) {
      setIsDropZoneDisabled(true);
      setIsSubmitButtonDisabled(true);
    }

    if (
      files &&
      files?.length < 3 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsDropZoneDisabled(false);
    }
  }, [
    offeringIncomeUpdateForm.formState,
    type,
    subType,
    amount,
    currency,
    comments,
    memberId,
    churchId,
    date,
    zoneId,
    familyGroupId,
    files,
  ]);
};
