/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type OfferingIncomeFormData } from '@/modules/offering/income/interfaces';
import {
  type OfferingIncomeCreationType,
  type OfferingIncomeCreationSubType,
} from '@/modules/offering/income/enums';

import { RecordStatus } from '@/shared/enums';

interface Options {
  offeringIncomeForm: UseFormReturn<OfferingIncomeFormData, any, OfferingIncomeFormData>;
  offeringIncomeTypes: typeof OfferingIncomeCreationType;
  offeringIncomeSubTypes: typeof OfferingIncomeCreationSubType;
  isInputDisabled: boolean;
  isDropZoneDisabled: boolean;
  isFileButtonDisabled: boolean;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDropZoneDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingIncomeSubmitButtonLogic = ({
  offeringIncomeForm,
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
  const type = offeringIncomeForm.watch('type');
  const subType = offeringIncomeForm.watch('subType');
  const amount = offeringIncomeForm.watch('amount');
  const shift = offeringIncomeForm.watch('shift');
  const currency = offeringIncomeForm.watch('currency');
  const date = offeringIncomeForm.watch('date');
  const comments = offeringIncomeForm.watch('comments');
  const urlFiles = offeringIncomeForm.watch('urlFiles');
  const memberType = offeringIncomeForm.watch('memberType');
  const member = offeringIncomeForm.watch('member');
  const zone = offeringIncomeForm.watch('zone');
  const familyGroup = offeringIncomeForm.watch('familyGroup');
  const recordStatus = offeringIncomeForm.watch('recordStatus');

  //* Effects
  useEffect(() => {
    if (
      offeringIncomeForm.formState.errors &&
      Object.values(offeringIncomeForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // if (
    //   type === offeringIncomeTypes.Tithe &&
    //   !subType &&
    //   amount &&
    //   currency &&
    //   date &&
    //   member &&
    //   Object.values(offeringIncomeForm.formState.errors).length === 0 &&
    //   (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    // ) {
    //   setIsSubmitButtonDisabled(false);
    //   setIsMessageErrorDisabled(false);
    // }

    if (
      type === offeringIncomeTypes.IncomeAdjustment &&
      !subType &&
      amount &&
      currency &&
      date &&
      comments &&
      Object.values(offeringIncomeForm.formState.errors).length === 0 &&
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

    if (
      type === offeringIncomeTypes.Offering &&
      subType === offeringIncomeSubTypes.FamilyGroup &&
      amount &&
      currency &&
      familyGroup &&
      Object.values(offeringIncomeForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.ZonalVigil ||
        subType === offeringIncomeSubTypes.ZonalFasting) &&
      amount &&
      currency &&
      zone &&
      Object.values(offeringIncomeForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.Special ||
        subType === offeringIncomeSubTypes.ChurchGround) &&
      amount &&
      currency &&
      member &&
      Object.values(offeringIncomeForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeTypes.Offering &&
      subType !== offeringIncomeSubTypes.Special &&
      subType !== offeringIncomeSubTypes.ZonalFasting &&
      subType !== offeringIncomeSubTypes.ChurchGround &&
      subType !== offeringIncomeSubTypes.ZonalVigil &&
      subType !== offeringIncomeSubTypes.FamilyGroup &&
      amount &&
      currency &&
      !member &&
      !familyGroup &&
      !zone &&
      Object.values(offeringIncomeForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (!amount || !currency) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // update offering, status button submit block
    if (recordStatus === RecordStatus.Inactive) {
      setIsSubmitButtonDisabled(true);
      setIsDropZoneDisabled(true);
    }

    // limit images drop zone 3 (create income offering)
    if (urlFiles && urlFiles?.length >= 4) {
      setIsDropZoneDisabled(true);
      setIsSubmitButtonDisabled(true);
    }

    if (
      urlFiles &&
      urlFiles?.length < 3 &&
      recordStatus === RecordStatus.Active &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsDropZoneDisabled(false);
    }
  }, [
    offeringIncomeForm.formState,
    type,
    subType,
    amount,
    currency,
    comments,
    member,
    date,
    zone,
    familyGroup,
    urlFiles,
    recordStatus,
  ]);

  // reset relations
  useEffect(() => {
    if (type === offeringIncomeTypes.Tithe) {
      offeringIncomeForm.resetField('searchSubType', { keepDirty: true });
      offeringIncomeForm.resetField('familyGroup', { keepDirty: true });
      offeringIncomeForm.resetField('zone', { keepDirty: true });
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.ChurchGround ||
        subType === offeringIncomeSubTypes.Special)
    ) {
      offeringIncomeForm.resetField('familyGroup', { keepDirty: true });
      offeringIncomeForm.resetField('zone', { keepDirty: true });
    }

    if (type === offeringIncomeTypes.Offering && subType === offeringIncomeSubTypes.FamilyGroup) {
      offeringIncomeForm.resetField('member', { keepDirty: true });
      offeringIncomeForm.resetField('zone', { keepDirty: true });
    }

    if (
      type === offeringIncomeTypes.Offering &&
      (subType === offeringIncomeSubTypes.ZonalVigil ||
        subType === offeringIncomeSubTypes.ZonalFasting)
    ) {
      offeringIncomeForm.resetField('member', { keepDirty: true });
      offeringIncomeForm.resetField('familyGroup', { keepDirty: true });
    }

    if (type === offeringIncomeTypes.IncomeAdjustment) {
      offeringIncomeForm.resetField('subType', { keepDirty: true });
      offeringIncomeForm.resetField('member', { keepDirty: true });
      offeringIncomeForm.resetField('familyGroup', { keepDirty: true });
      offeringIncomeForm.resetField('zone', { keepDirty: true });
    }

    if (
      type === offeringIncomeTypes.Offering &&
      subType !== offeringIncomeSubTypes.Special &&
      subType !== offeringIncomeSubTypes.ChurchGround &&
      subType !== offeringIncomeSubTypes.FamilyGroup &&
      subType !== offeringIncomeSubTypes.ZonalVigil &&
      subType !== offeringIncomeSubTypes.ZonalFasting
    ) {
      offeringIncomeForm.resetField('member', { keepDirty: true });
      offeringIncomeForm.resetField('familyGroup', { keepDirty: true });
      offeringIncomeForm.resetField('zone', { keepDirty: true });
    }
  }, [type, subType]);
};
