/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import {
  OfferingIncomeCreationCategory,
  type OfferingIncomeCreationType,
  type OfferingIncomeCreationSubType,
} from '@/modules/offering/income/enums';
import { type OfferingIncomeFormData } from '@/modules/offering/income/interfaces';

interface Options {
  isDropZoneDisabled: boolean;
  isDeleteFileButtonDisabled: boolean;
  isInputDisabled: boolean;
  offeringIncomeCreationForm: UseFormReturn<OfferingIncomeFormData, any, OfferingIncomeFormData>;
  offeringIncomeCreationSubType: typeof OfferingIncomeCreationSubType;
  offeringIncomeCreationType: typeof OfferingIncomeCreationType;
  setIsDropZoneDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingIncomeCreationSubmitButtonLogic = ({
  isDropZoneDisabled,
  isDeleteFileButtonDisabled,
  isInputDisabled,
  offeringIncomeCreationForm,
  offeringIncomeCreationSubType,
  offeringIncomeCreationType,
  setIsDropZoneDisabled,
  setIsMessageErrorDisabled,
  setIsSubmitButtonDisabled,
}: Options): void => {
  //* Watchers
  const type = offeringIncomeCreationForm.watch('type');
  const subType = offeringIncomeCreationForm.watch('subType');
  const category = offeringIncomeCreationForm.watch('category');
  const amount = offeringIncomeCreationForm.watch('amount');
  const shift = offeringIncomeCreationForm.watch('shift');
  const currency = offeringIncomeCreationForm.watch('currency');
  const date = offeringIncomeCreationForm.watch('date');
  const comments = offeringIncomeCreationForm.watch('comments');
  const fileNames = offeringIncomeCreationForm.watch('fileNames');
  const memberType = offeringIncomeCreationForm.watch('memberType');
  const memberId = offeringIncomeCreationForm.watch('memberId');
  const churchId = offeringIncomeCreationForm.watch('churchId');
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
      type === offeringIncomeCreationType.IncomeAdjustment &&
      !subType &&
      !category &&
      amount &&
      currency &&
      date &&
      comments &&
      churchId &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeCreationType.IncomeAdjustment &&
      (!churchId || !amount || !currency || !date || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Sunday service
    if (
      churchId &&
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.OfferingBox &&
      subType === offeringIncomeCreationSubType.SundayService &&
      amount &&
      date &&
      currency &&
      shift &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.OfferingBox &&
      subType === offeringIncomeCreationSubType.SundayService &&
      (!churchId || !date || !amount || !currency || !shift)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Sunday School
    //* Sunday school (offering box)
    if (
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.OfferingBox &&
      subType === offeringIncomeCreationSubType.SundaySchool &&
      amount &&
      date &&
      currency &&
      shift &&
      churchId &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.OfferingBox &&
      subType === offeringIncomeCreationSubType.SundaySchool &&
      (!churchId || !date || !amount || !currency || !shift)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Sunday school (activities and external donation)
    if (
      type === offeringIncomeCreationType.Offering &&
      (category === OfferingIncomeCreationCategory.Activities ||
        category === OfferingIncomeCreationCategory.ExternalDonation) &&
      subType === offeringIncomeCreationSubType.SundaySchool &&
      amount &&
      date &&
      currency &&
      churchId &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeCreationType.Offering &&
      (category === OfferingIncomeCreationCategory.Activities ||
        category === OfferingIncomeCreationCategory.ExternalDonation) &&
      subType === offeringIncomeCreationSubType.SundaySchool &&
      (!churchId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Sunday school (internal donation)
    if (
      churchId &&
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === offeringIncomeCreationSubType.SundaySchool &&
      amount &&
      date &&
      currency &&
      memberType &&
      memberId &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === offeringIncomeCreationSubType.SundaySchool &&
      (!churchId || !memberType || !memberId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Youth Service
    //* Youth Service (general and activities and external donation)
    if (
      type === offeringIncomeCreationType.Offering &&
      (category === OfferingIncomeCreationCategory.OfferingBox ||
        category === OfferingIncomeCreationCategory.Activities ||
        category === OfferingIncomeCreationCategory.ExternalDonation) &&
      subType === offeringIncomeCreationSubType.YouthService &&
      amount &&
      date &&
      currency &&
      churchId &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeCreationType.Offering &&
      (category === OfferingIncomeCreationCategory.OfferingBox ||
        category === OfferingIncomeCreationCategory.Activities ||
        category === OfferingIncomeCreationCategory.ExternalDonation) &&
      subType === offeringIncomeCreationSubType.YouthService &&
      (!churchId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Youth Service (internal donation)
    if (
      churchId &&
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === offeringIncomeCreationSubType.YouthService &&
      amount &&
      date &&
      currency &&
      memberType &&
      memberId &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === offeringIncomeCreationSubType.YouthService &&
      (!churchId || !memberType || !memberId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Church Ground
    //* Church Ground (external donation and activities)
    if (
      type === offeringIncomeCreationType.Offering &&
      (category === OfferingIncomeCreationCategory.ExternalDonation ||
        category === OfferingIncomeCreationCategory.Activities) &&
      subType === offeringIncomeCreationSubType.ChurchGround &&
      amount &&
      date &&
      currency &&
      churchId &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeCreationType.Offering &&
      (category === OfferingIncomeCreationCategory.ExternalDonation ||
        category === OfferingIncomeCreationCategory.Activities) &&
      subType === offeringIncomeCreationSubType.ChurchGround &&
      (!churchId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Church Ground (internal donation)
    if (
      churchId &&
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === offeringIncomeCreationSubType.ChurchGround &&
      amount &&
      date &&
      currency &&
      memberType &&
      memberId &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === offeringIncomeCreationSubType.ChurchGround &&
      (!churchId || !memberType || !memberId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Special offering
    //* Special offering (external donation)
    if (
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === offeringIncomeCreationSubType.Special &&
      amount &&
      date &&
      currency &&
      churchId &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === offeringIncomeCreationSubType.Special &&
      (!churchId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Special (internal external donation)
    if (
      churchId &&
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === offeringIncomeCreationSubType.Special &&
      amount &&
      date &&
      currency &&
      memberType &&
      memberId &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === offeringIncomeCreationSubType.Special &&
      (!churchId || !memberType || !memberId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Family group
    if (
      churchId &&
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.OfferingBox &&
      subType === offeringIncomeCreationSubType.FamilyGroup &&
      amount &&
      date &&
      currency &&
      familyGroupId &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeCreationType.Offering &&
      subType === offeringIncomeCreationSubType.FamilyGroup &&
      (!churchId || !date || !amount || !currency || !familyGroupId)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Zone
    if (
      churchId &&
      type === offeringIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.OfferingBox &&
      (subType === offeringIncomeCreationSubType.ZonalVigil ||
        subType === offeringIncomeCreationSubType.ZonalFasting) &&
      amount &&
      currency &&
      zoneId &&
      date &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringIncomeCreationType.Offering &&
      (subType === offeringIncomeCreationSubType.ZonalVigil ||
        subType === offeringIncomeCreationSubType.ZonalFasting) &&
      (!churchId || !date || !amount || !currency || !zoneId)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Others
    if (
      type === offeringIncomeCreationType.Offering &&
      (category === OfferingIncomeCreationCategory.OfferingBox ||
        category === OfferingIncomeCreationCategory.General) &&
      subType !== offeringIncomeCreationSubType.Special &&
      subType !== offeringIncomeCreationSubType.ChurchGround &&
      subType !== offeringIncomeCreationSubType.ZonalFasting &&
      subType !== offeringIncomeCreationSubType.ZonalVigil &&
      subType !== offeringIncomeCreationSubType.FamilyGroup &&
      subType !== offeringIncomeCreationSubType.SundaySchool &&
      subType !== offeringIncomeCreationSubType.SundayService &&
      amount &&
      currency &&
      churchId &&
      !shift &&
      !memberId &&
      !familyGroupId &&
      !zoneId &&
      date &&
      Object.values(offeringIncomeCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    //* Others values
    if (!churchId || !amount || !currency || !date) {
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
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
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
    churchId,
    familyGroupId,
    fileNames,
  ]);

  //* Reset relations
  useEffect(() => {
    if (category === OfferingIncomeCreationCategory.InternalDonation) {
      offeringIncomeCreationForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
    }
    if (category === OfferingIncomeCreationCategory.OfferingBox) {
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
    }
    if (category === OfferingIncomeCreationCategory.Activities) {
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
    }
  }, [category]);

  useEffect(() => {
    if (
      type === offeringIncomeCreationType.Offering &&
      (subType === offeringIncomeCreationSubType.SundayService ||
        subType === offeringIncomeCreationSubType.SundaySchool)
    ) {
      offeringIncomeCreationForm.resetField('category', { keepDirty: true });
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
      type === offeringIncomeCreationType.Offering &&
      (subType === offeringIncomeCreationSubType.ChurchGround ||
        subType === offeringIncomeCreationSubType.Special)
    ) {
      offeringIncomeCreationForm.resetField('category', { keepDirty: true });
      offeringIncomeCreationForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('zoneId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
    }

    if (
      type === offeringIncomeCreationType.Offering &&
      subType === offeringIncomeCreationSubType.FamilyGroup
    ) {
      offeringIncomeCreationForm.resetField('category', { keepDirty: true });
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
      type === offeringIncomeCreationType.Offering &&
      (subType === offeringIncomeCreationSubType.ZonalVigil ||
        subType === offeringIncomeCreationSubType.ZonalFasting)
    ) {
      offeringIncomeCreationForm.resetField('category', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreationForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
    }

    if (type === offeringIncomeCreationType.IncomeAdjustment) {
      offeringIncomeCreationForm.resetField('category', { keepDirty: true });
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
      type === offeringIncomeCreationType.Offering &&
      subType !== offeringIncomeCreationSubType.Special &&
      subType !== offeringIncomeCreationSubType.ChurchGround &&
      subType !== offeringIncomeCreationSubType.FamilyGroup &&
      subType !== offeringIncomeCreationSubType.ZonalVigil &&
      subType !== offeringIncomeCreationSubType.ZonalFasting
    ) {
      offeringIncomeCreationForm.resetField('category', { keepDirty: true });
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
