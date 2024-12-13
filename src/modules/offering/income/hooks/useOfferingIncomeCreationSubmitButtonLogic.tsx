/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { OfferingIncomeCreationType } from '@/modules/offering/income/enums/offering-income-creation-type.enum';
import { OfferingIncomeCreationCategory } from '@/modules/offering/income/enums/offering-income-creation-category.enum';
import { OfferingIncomeCreationSubType } from '@/modules/offering/income/enums/offering-income-creation-sub-type.enum';

import { type OfferingIncomeFormData } from '@/modules/offering/income/interfaces/offering-income-form-data.interface';

interface Options {
  isDropZoneDisabled: boolean;
  isDeleteFileButtonDisabled: boolean;
  isInputDisabled: boolean;
  offeringIncomeCreationForm: UseFormReturn<OfferingIncomeFormData, any, OfferingIncomeFormData>;
  setIsDropZoneDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingIncomeCreationSubmitButtonLogic = ({
  isDropZoneDisabled,
  isDeleteFileButtonDisabled,
  isInputDisabled,
  offeringIncomeCreationForm,
  setIsDropZoneDisabled,
  setIsMessageErrorDisabled,
  setIsSubmitButtonDisabled,
}: Options): void => {
  //* Watchers
  const type = offeringIncomeCreationForm.watch('type');
  const subType = offeringIncomeCreationForm.watch('subType');
  const category = offeringIncomeCreationForm.watch('category');
  const isNewDonor = offeringIncomeCreationForm.watch('isNewDonor');
  const donorId = offeringIncomeCreationForm.watch('donorId');
  const donorFirstName = offeringIncomeCreationForm.watch('donorFirstName');
  const donorLastName = offeringIncomeCreationForm.watch('donorLastName');
  const donorGender = offeringIncomeCreationForm.watch('donorGender');
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
      type === OfferingIncomeCreationType.IncomeAdjustment &&
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
      type === OfferingIncomeCreationType.IncomeAdjustment &&
      (!churchId || !amount || !currency || !date || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Sunday service
    if (
      churchId &&
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.OfferingBox &&
      subType === OfferingIncomeCreationSubType.SundayService &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.OfferingBox &&
      subType === OfferingIncomeCreationSubType.SundayService &&
      (!churchId || !date || !amount || !currency || !shift)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Sunday School
    //* Sunday School (external donation)
    if (
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.SundaySchool &&
      isNewDonor &&
      donorFirstName &&
      donorLastName &&
      donorGender &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.SundaySchool &&
      !isNewDonor &&
      donorId &&
      !donorFirstName &&
      !donorLastName &&
      !donorGender &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.SundaySchool &&
      isNewDonor &&
      (!churchId ||
        !date ||
        !amount ||
        !donorFirstName ||
        !donorLastName ||
        !donorGender ||
        !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.SundaySchool &&
      !isNewDonor &&
      (!churchId || !donorId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Sunday school (offering box)
    if (
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.OfferingBox &&
      subType === OfferingIncomeCreationSubType.SundaySchool &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.OfferingBox &&
      subType === OfferingIncomeCreationSubType.SundaySchool &&
      (!churchId || !date || !amount || !currency || !shift)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Sunday school (activities)
    if (
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.Activities &&
      subType === OfferingIncomeCreationSubType.SundaySchool &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.Activities &&
      subType === OfferingIncomeCreationSubType.SundaySchool &&
      (!churchId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Sunday school (internal donation)
    if (
      churchId &&
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === OfferingIncomeCreationSubType.SundaySchool &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === OfferingIncomeCreationSubType.SundaySchool &&
      (!churchId || !memberType || !memberId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Youth Service
    //* Youth Service (external donation)
    if (
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.YouthService &&
      (isNewDonor || !isNewDonor) &&
      donorFirstName &&
      donorLastName &&
      donorGender &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.YouthService &&
      !isNewDonor &&
      donorId &&
      !donorFirstName &&
      !donorLastName &&
      !donorGender &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.YouthService &&
      isNewDonor &&
      (!churchId ||
        !date ||
        !amount ||
        !donorFirstName ||
        !donorLastName ||
        !donorGender ||
        !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.YouthService &&
      !isNewDonor &&
      (!churchId || !donorId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Youth Service (offering box and activities)
    if (
      type === OfferingIncomeCreationType.Offering &&
      (category === OfferingIncomeCreationCategory.OfferingBox ||
        category === OfferingIncomeCreationCategory.Activities) &&
      subType === OfferingIncomeCreationSubType.YouthService &&
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
      type === OfferingIncomeCreationType.Offering &&
      (category === OfferingIncomeCreationCategory.OfferingBox ||
        category === OfferingIncomeCreationCategory.Activities) &&
      subType === OfferingIncomeCreationSubType.YouthService &&
      (!churchId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Youth Service (internal donation)
    if (
      churchId &&
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === OfferingIncomeCreationSubType.YouthService &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === OfferingIncomeCreationSubType.YouthService &&
      (!churchId || !memberType || !memberId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Church Ground
    //* Church ground (external donation)
    if (
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.ChurchGround &&
      isNewDonor &&
      donorFirstName &&
      donorLastName &&
      donorGender &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.ChurchGround &&
      !isNewDonor &&
      donorId &&
      !donorFirstName &&
      !donorLastName &&
      !donorGender &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.ChurchGround &&
      isNewDonor &&
      (!churchId ||
        !date ||
        !amount ||
        !donorFirstName ||
        !donorLastName ||
        !donorGender ||
        !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.ChurchGround &&
      !isNewDonor &&
      (!churchId || !date || !donorId || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Church Ground (activities)
    if (
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.Activities &&
      subType === OfferingIncomeCreationSubType.ChurchGround &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.Activities &&
      subType === OfferingIncomeCreationSubType.ChurchGround &&
      (!churchId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Church Ground (internal donation)
    if (
      churchId &&
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === OfferingIncomeCreationSubType.ChurchGround &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === OfferingIncomeCreationSubType.ChurchGround &&
      (!churchId || !memberType || !memberId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Special offering
    //* Special offering (external donation)
    if (
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.Special &&
      isNewDonor &&
      donorFirstName &&
      donorLastName &&
      donorGender &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.Special &&
      !isNewDonor &&
      donorId &&
      !donorFirstName &&
      !donorLastName &&
      !donorGender &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.Special &&
      isNewDonor &&
      (!churchId ||
        !date ||
        !amount ||
        !donorFirstName ||
        !donorLastName ||
        !donorGender ||
        !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.ExternalDonation &&
      subType === OfferingIncomeCreationSubType.Special &&
      !isNewDonor &&
      (!churchId || !date || !donorId || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Special (internal donation)
    if (
      churchId &&
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === OfferingIncomeCreationSubType.Special &&
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
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.InternalDonation &&
      subType === OfferingIncomeCreationSubType.Special &&
      (!churchId || !memberType || !memberId || !date || !amount || !currency)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Family group
    if (
      churchId &&
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.OfferingBox &&
      subType === OfferingIncomeCreationSubType.FamilyGroup &&
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
      type === OfferingIncomeCreationType.Offering &&
      subType === OfferingIncomeCreationSubType.FamilyGroup &&
      (!churchId || !date || !amount || !currency || !familyGroupId)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Zone
    if (
      churchId &&
      type === OfferingIncomeCreationType.Offering &&
      category === OfferingIncomeCreationCategory.OfferingBox &&
      (subType === OfferingIncomeCreationSubType.ZonalVigil ||
        subType === OfferingIncomeCreationSubType.ZonalFasting) &&
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
      type === OfferingIncomeCreationType.Offering &&
      (subType === OfferingIncomeCreationSubType.ZonalVigil ||
        subType === OfferingIncomeCreationSubType.ZonalFasting) &&
      (!churchId || !date || !amount || !currency || !zoneId)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // ? Others
    if (
      type === OfferingIncomeCreationType.Offering &&
      (category === OfferingIncomeCreationCategory.OfferingBox ||
        category === OfferingIncomeCreationCategory.General) &&
      subType !== OfferingIncomeCreationSubType.Special &&
      subType !== OfferingIncomeCreationSubType.ChurchGround &&
      subType !== OfferingIncomeCreationSubType.ZonalFasting &&
      subType !== OfferingIncomeCreationSubType.ZonalVigil &&
      subType !== OfferingIncomeCreationSubType.FamilyGroup &&
      subType !== OfferingIncomeCreationSubType.SundaySchool &&
      subType !== OfferingIncomeCreationSubType.SundayService &&
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
    donorId,
    isNewDonor,
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
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
      offeringIncomeCreationForm.resetField('isNewDonor', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorFirstName', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorLastName', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorGender', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorBirthDate', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorOriginCountry', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorResidenceCountry', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorEmail', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorPhoneNumber', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorResidenceCity', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorPostalCode', { keepDirty: true });
    }
    if (category === OfferingIncomeCreationCategory.OfferingBox) {
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreationForm.resetField('isNewDonor', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorFirstName', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorLastName', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorGender', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorBirthDate', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorOriginCountry', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorResidenceCountry', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorEmail', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorPhoneNumber', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorResidenceCity', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorPostalCode', { keepDirty: true });
    }
    if (category === OfferingIncomeCreationCategory.Activities) {
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreationForm.resetField('isNewDonor', { keepDirty: true });
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorFirstName', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorLastName', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorGender', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorBirthDate', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorOriginCountry', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorResidenceCountry', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorEmail', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorPhoneNumber', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorResidenceCity', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorPostalCode', { keepDirty: true });
    }
    if (category === OfferingIncomeCreationCategory.ExternalDonation) {
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreationForm.resetField('isNewDonor', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorFirstName', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorLastName', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorGender', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorBirthDate', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorOriginCountry', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorResidenceCountry', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorEmail', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorPhoneNumber', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorResidenceCity', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorPostalCode', { keepDirty: true });
    }
    if (category === OfferingIncomeCreationCategory.General) {
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreationForm.resetField('isNewDonor', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorFirstName', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorLastName', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorGender', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorBirthDate', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorOriginCountry', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorResidenceCountry', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorEmail', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorPhoneNumber', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorResidenceCity', { keepDirty: true });
      offeringIncomeCreationForm.resetField('donorPostalCode', { keepDirty: true });
    }
  }, [category]);

  useEffect(() => {
    if (
      type === OfferingIncomeCreationType.Offering &&
      (subType === OfferingIncomeCreationSubType.SundayService ||
        subType === OfferingIncomeCreationSubType.SundaySchool)
    ) {
      offeringIncomeCreationForm.resetField('category', { keepDirty: true });
      offeringIncomeCreationForm.resetField('isNewDonor', { keepDirty: true });
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
      type === OfferingIncomeCreationType.Offering &&
      (subType === OfferingIncomeCreationSubType.ChurchGround ||
        subType === OfferingIncomeCreationSubType.Special)
    ) {
      offeringIncomeCreationForm.resetField('category', { keepDirty: true });
      offeringIncomeCreationForm.resetField('isNewDonor', { keepDirty: true });
      offeringIncomeCreationForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('zoneId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
    }

    if (
      type === OfferingIncomeCreationType.Offering &&
      subType === OfferingIncomeCreationSubType.FamilyGroup
    ) {
      offeringIncomeCreationForm.resetField('category', { keepDirty: true });
      offeringIncomeCreationForm.resetField('isNewDonor', { keepDirty: true });
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
      type === OfferingIncomeCreationType.Offering &&
      (subType === OfferingIncomeCreationSubType.ZonalVigil ||
        subType === OfferingIncomeCreationSubType.ZonalFasting)
    ) {
      offeringIncomeCreationForm.resetField('category', { keepDirty: true });
      offeringIncomeCreationForm.resetField('isNewDonor', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('memberType', { keepDirty: true });
      offeringIncomeCreationForm.resetField('familyGroupId', { keepDirty: true });
      offeringIncomeCreationForm.resetField('amount', { keepDirty: true });
      offeringIncomeCreationForm.resetField('date', { keepDirty: true });
      offeringIncomeCreationForm.resetField('currency', { keepDirty: true });
      offeringIncomeCreationForm.resetField('comments', { keepDirty: true });
      offeringIncomeCreationForm.resetField('shift', { keepDirty: true });
    }

    if (type === OfferingIncomeCreationType.IncomeAdjustment) {
      offeringIncomeCreationForm.resetField('category', { keepDirty: true });
      offeringIncomeCreationForm.resetField('isNewDonor', { keepDirty: true });
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
      type === OfferingIncomeCreationType.Offering &&
      subType !== OfferingIncomeCreationSubType.Special &&
      subType !== OfferingIncomeCreationSubType.ChurchGround &&
      subType !== OfferingIncomeCreationSubType.FamilyGroup &&
      subType !== OfferingIncomeCreationSubType.ZonalVigil &&
      subType !== OfferingIncomeCreationSubType.ZonalFasting
    ) {
      offeringIncomeCreationForm.resetField('category', { keepDirty: true });
      offeringIncomeCreationForm.resetField('isNewDonor', { keepDirty: true });
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
