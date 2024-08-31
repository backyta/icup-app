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
  offeringIncomeUpdateForm: UseFormReturn<OfferingIncomeFormData, any, OfferingIncomeFormData>;
  offeringIncomeTypes: typeof OfferingIncomeCreationType;
  offeringIncomeSubTypes: typeof OfferingIncomeCreationSubType;
  files: FilesProps[];
  isInputDisabled: boolean;
  isDropZoneDisabled: boolean;
  isFileButtonDisabled: boolean;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDropZoneDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingIncomeUpdateSubmitButtonLogic = ({
  files,
  offeringIncomeUpdateForm,
  offeringIncomeTypes,
  offeringIncomeSubTypes,
  isDropZoneDisabled,
  isInputDisabled,
  isFileButtonDisabled,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  setIsDropZoneDisabled,
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
      type === offeringIncomeTypes.IncomeAdjustment &&
      !subType &&
      amount &&
      currency &&
      date &&
      comments &&
      Object.values(offeringIncomeUpdateForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeTypes.IncomeAdjustment &&
      (!amount || !currency || !date || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Sunday worship
    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.SundayWorship ||
        subType === offeringIncomeSubTypes.SundaySchool) &&
      amount &&
      currency &&
      shift &&
      comments &&
      Object.values(offeringIncomeUpdateForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.SundayWorship ||
        subType === offeringIncomeSubTypes.SundaySchool) &&
      (!amount || !currency || !shift || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Family group
    if (
      type === offeringIncomeTypes.Offering &&
      subType === offeringIncomeSubTypes.FamilyGroup &&
      amount &&
      currency &&
      familyGroupId &&
      comments &&
      Object.values(offeringIncomeUpdateForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeTypes.Offering &&
      subType === offeringIncomeSubTypes.FamilyGroup &&
      (!amount || !currency || !familyGroupId || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Zone
    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.ZonalVigil ||
        subType === offeringIncomeSubTypes.ZonalFasting) &&
      amount &&
      currency &&
      zoneId &&
      comments &&
      Object.values(offeringIncomeUpdateForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.ZonalVigil ||
        subType === offeringIncomeSubTypes.ZonalFasting) &&
      (!amount || !currency || !zoneId || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Member
    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.Special ||
        subType === offeringIncomeSubTypes.ChurchGround) &&
      memberType &&
      amount &&
      currency &&
      memberId &&
      comments &&
      Object.values(offeringIncomeUpdateForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.Special ||
        subType === offeringIncomeSubTypes.ChurchGround) &&
      (!amount || !currency || !memberId || !memberType || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Others types
    if (
      type === offeringIncomeTypes.Offering &&
      subType !== offeringIncomeSubTypes.Special &&
      subType !== offeringIncomeSubTypes.ChurchGround &&
      subType !== offeringIncomeSubTypes.ZonalFasting &&
      subType !== offeringIncomeSubTypes.ZonalVigil &&
      subType !== offeringIncomeSubTypes.FamilyGroup &&
      subType !== offeringIncomeSubTypes.SundaySchool &&
      subType !== offeringIncomeSubTypes.SundayWorship &&
      amount &&
      currency &&
      !shift &&
      !memberId &&
      !familyGroupId &&
      !zoneId &&
      Object.values(offeringIncomeUpdateForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    //* Others validations
    if (!amount || !currency || !date) {
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
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
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
    date,
    zoneId,
    familyGroupId,
    files,
  ]);
};
