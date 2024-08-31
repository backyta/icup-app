/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import {
  type OfferingIncomeCreationType,
  type OfferingIncomeCreationSubType,
} from '@/modules/offering/income/enums';
import { type OfferingIncomeFormData } from '@/modules/offering/income/interfaces';

interface Options {
  offeringIncomeCreationForm: UseFormReturn<OfferingIncomeFormData, any, OfferingIncomeFormData>;
  offeringIncomeTypes: typeof OfferingIncomeCreationType;
  offeringIncomeSubTypes: typeof OfferingIncomeCreationSubType;
  isInputDisabled: boolean;
  isDropZoneDisabled: boolean;
  isFileButtonDisabled: boolean;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDropZoneDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingIncomeCreationSubmitButtonLogic = ({
  offeringIncomeCreationForm,
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
  const type = offeringIncomeCreationForm.watch('type');
  const subType = offeringIncomeCreationForm.watch('subType');
  const amount = offeringIncomeCreationForm.watch('amount');
  const shift = offeringIncomeCreationForm.watch('shift');
  const currency = offeringIncomeCreationForm.watch('currency');
  const date = offeringIncomeCreationForm.watch('date');
  const comments = offeringIncomeCreationForm.watch('comments');
  const fileNames = offeringIncomeCreationForm.watch('fileNames');
  const memberType = offeringIncomeCreationForm.watch('memberType');
  const memberId = offeringIncomeCreationForm.watch('memberId');
  const zoneId = offeringIncomeCreationForm.watch('zoneId');
  const familyGroupId = offeringIncomeCreationForm.watch('familyGroupId');

  //* Effects
  useEffect(() => {
    if (
      offeringIncomeCreationForm.formState.errors &&
      Object.values(offeringIncomeCreationForm.formState.errors).length > 0
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
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
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
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.SundayWorship ||
        subType === offeringIncomeSubTypes.SundaySchool) &&
      (!amount || !currency || !shift)
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
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeTypes.Offering &&
      subType === offeringIncomeSubTypes.FamilyGroup &&
      (!amount || !currency || !familyGroupId)
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
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.ZonalVigil ||
        subType === offeringIncomeSubTypes.ZonalFasting) &&
      (!amount || !currency || !zoneId)
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
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.Special ||
        subType === offeringIncomeSubTypes.ChurchGround) &&
      (!amount || !currency || !memberId || !memberType)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

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
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    //* Others values
    if (!amount || !currency || !date) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Limit images drop zone 3 (create income offering)
    if (fileNames && fileNames?.length >= 4) {
      setIsDropZoneDisabled(true);
      setIsSubmitButtonDisabled(true);
    }

    if (
      fileNames &&
      fileNames?.length < 3 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsDropZoneDisabled(false);
    }
  }, [
    offeringIncomeCreationForm.formState,
    type,
    subType,
    amount,
    currency,
    comments,
    memberId,
    date,
    zoneId,
    familyGroupId,
    fileNames,
  ]);

  //* Reset relations
  useEffect(() => {
    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.SundayWorship ||
        subType === offeringIncomeSubTypes.SundaySchool)
    ) {
      offeringIncomeCreationForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('zoneId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.ChurchGround ||
        subType === offeringIncomeSubTypes.Special)
    ) {
      offeringIncomeCreationForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('zoneId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
    }

    if (type === offeringIncomeTypes.Offering && subType === offeringIncomeSubTypes.FamilyGroup) {
      offeringIncomeCreationForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreationForm.resetField('zoneId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.ZonalVigil ||
        subType === offeringIncomeSubTypes.ZonalFasting)
    ) {
      offeringIncomeCreationForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreationForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
    }

    if (type === offeringIncomeTypes.IncomeAdjustment) {
      offeringIncomeCreationForm.resetField('subType', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreationForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('zoneId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
    }

    if (
      type === offeringIncomeTypes.Offering &&
      subType !== offeringIncomeSubTypes.Special &&
      subType !== offeringIncomeSubTypes.ChurchGround &&
      subType !== offeringIncomeSubTypes.FamilyGroup &&
      subType !== offeringIncomeSubTypes.ZonalVigil &&
      subType !== offeringIncomeSubTypes.ZonalFasting
    ) {
      offeringIncomeCreationForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreationForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('zoneId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
    }
  }, [type, subType]);
};
