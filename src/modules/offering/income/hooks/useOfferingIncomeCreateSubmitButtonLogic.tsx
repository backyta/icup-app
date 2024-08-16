/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type OfferingIncomeFormData } from '@/modules/offering/income/interfaces';
import {
  type OfferingIncomeCreationType,
  type OfferingIncomeCreationSubType,
} from '@/modules/offering/income/enums';

interface Options {
  offeringIncomeCreateForm: UseFormReturn<OfferingIncomeFormData, any, OfferingIncomeFormData>;
  offeringIncomeTypes: typeof OfferingIncomeCreationType;
  offeringIncomeSubTypes: typeof OfferingIncomeCreationSubType;
  isInputDisabled: boolean;
  isDropZoneDisabled: boolean;
  isFileButtonDisabled: boolean;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDropZoneDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingIncomeCreateSubmitButtonLogic = ({
  offeringIncomeCreateForm,
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
  const type = offeringIncomeCreateForm.watch('type');
  const subType = offeringIncomeCreateForm.watch('subType');
  const amount = offeringIncomeCreateForm.watch('amount');
  const shift = offeringIncomeCreateForm.watch('shift');
  const currency = offeringIncomeCreateForm.watch('currency');
  const date = offeringIncomeCreateForm.watch('date');
  const comments = offeringIncomeCreateForm.watch('comments');
  const urlFiles = offeringIncomeCreateForm.watch('urlFiles');
  const memberType = offeringIncomeCreateForm.watch('memberType');
  const memberId = offeringIncomeCreateForm.watch('memberId');
  const zoneId = offeringIncomeCreateForm.watch('zoneId');
  const familyGroupId = offeringIncomeCreateForm.watch('familyGroupId');

  //* Effects
  useEffect(() => {
    if (
      offeringIncomeCreateForm.formState.errors &&
      Object.values(offeringIncomeCreateForm.formState.errors).length > 0
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
      Object.values(offeringIncomeCreateForm.formState.errors).length === 0 &&
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
      Object.values(offeringIncomeCreateForm.formState.errors).length === 0 &&
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
      Object.values(offeringIncomeCreateForm.formState.errors).length === 0 &&
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
      Object.values(offeringIncomeCreateForm.formState.errors).length === 0 &&
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
      Object.values(offeringIncomeCreateForm.formState.errors).length === 0 &&
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
      Object.values(offeringIncomeCreateForm.formState.errors).length === 0 &&
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
    if (urlFiles && urlFiles?.length >= 4) {
      setIsDropZoneDisabled(true);
      setIsSubmitButtonDisabled(true);
    }

    if (
      urlFiles &&
      urlFiles?.length < 3 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsDropZoneDisabled(false);
    }

    // if (
    //   urlFiles &&
    //   urlFiles?.length === 0 &&
    //   (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    // ) {

    // }

    // if (
    //   urlFiles &&
    //   urlFiles?.length === 3 &&
    //   (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    // ) {

    // }
  }, [
    offeringIncomeCreateForm.formState,
    type,
    subType,
    amount,
    currency,
    comments,
    memberId,
    date,
    zoneId,
    familyGroupId,
    urlFiles,
  ]);

  //* Reset relations
  useEffect(() => {
    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.SundayWorship ||
        subType === offeringIncomeSubTypes.SundaySchool)
    ) {
      offeringIncomeCreateForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('zoneId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreateForm.resetField('shift', { keepDirty: true });
      offeringIncomeCreateForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreateForm.resetField('date', { keepDirty: true });
      offeringIncomeCreateForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreateForm.resetField('comments', { keepDirty: true });
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.ChurchGround ||
        subType === offeringIncomeSubTypes.Special)
    ) {
      offeringIncomeCreateForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('zoneId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreateForm.resetField('date', { keepDirty: true });
      offeringIncomeCreateForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreateForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreateForm.resetField('shift', { keepDirty: true });
    }

    if (type === offeringIncomeTypes.Offering && subType === offeringIncomeSubTypes.FamilyGroup) {
      offeringIncomeCreateForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreateForm.resetField('zoneId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreateForm.resetField('date', { keepDirty: true });
      offeringIncomeCreateForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreateForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreateForm.resetField('shift', { keepDirty: true });
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.ZonalVigil ||
        subType === offeringIncomeSubTypes.ZonalFasting)
    ) {
      offeringIncomeCreateForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreateForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreateForm.resetField('date', { keepDirty: true });
      offeringIncomeCreateForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreateForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreateForm.resetField('shift', { keepDirty: true });
    }

    if (type === offeringIncomeTypes.IncomeAdjustment) {
      offeringIncomeCreateForm.resetField('subType', { keepDirty: true });
      offeringIncomeCreateForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreateForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('zoneId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreateForm.resetField('date', { keepDirty: true });
      offeringIncomeCreateForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreateForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreateForm.resetField('shift', { keepDirty: true });
    }

    if (
      type === offeringIncomeTypes.Offering &&
      subType !== offeringIncomeSubTypes.Special &&
      subType !== offeringIncomeSubTypes.ChurchGround &&
      subType !== offeringIncomeSubTypes.FamilyGroup &&
      subType !== offeringIncomeSubTypes.ZonalVigil &&
      subType !== offeringIncomeSubTypes.ZonalFasting
    ) {
      offeringIncomeCreateForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreateForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('zoneId', { keepDirty: true });
      offeringIncomeCreateForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreateForm.resetField('date', { keepDirty: true });
      offeringIncomeCreateForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreateForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreateForm.resetField('shift', { keepDirty: true });
    }
  }, [type, subType]);
};
