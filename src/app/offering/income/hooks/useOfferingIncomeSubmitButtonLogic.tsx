/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type OfferingIncomeData } from '@/app/offering/income/interfaces';
import { type TypesOfferingIncome, type SubTypesOfferingIncome } from '@/app/offering/income/enums';

import { Status } from '@/shared/enums';

interface Options {
  formOfferingIncome: UseFormReturn<OfferingIncomeData, any, OfferingIncomeData>;
  typesOfferingIncome: typeof TypesOfferingIncome;
  subTypesOffering: typeof SubTypesOfferingIncome;

  isInputDisabled: boolean;
  isDropZoneDisabled: boolean;
  isFileButtonDisabled: boolean;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDropZoneDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingIncomeSubmitButtonLogic = ({
  formOfferingIncome,
  typesOfferingIncome,
  subTypesOffering,
  isDropZoneDisabled,
  isInputDisabled,
  isFileButtonDisabled,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  setIsDropZoneDisabled,
}: Options): void => {
  // watchers
  const type = formOfferingIncome.watch('type');
  const subType = formOfferingIncome.watch('subType');
  const amount = formOfferingIncome.watch('amount');
  const currency = formOfferingIncome.watch('currency');
  const date = formOfferingIncome.watch('date');
  const comments = formOfferingIncome.watch('comments');
  const urlFiles = formOfferingIncome.watch('urlFile');
  const memberID = formOfferingIncome.watch('memberID');
  const zoneID = formOfferingIncome.watch('zoneID');
  const familyHouseID = formOfferingIncome.watch('familyHouseID');
  const status = formOfferingIncome.watch('status');

  // effects
  useEffect(() => {
    if (
      formOfferingIncome.formState.errors &&
      Object.values(formOfferingIncome.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      type === typesOfferingIncome.Tithe &&
      !subType &&
      amount &&
      currency &&
      date &&
      memberID &&
      Object.values(formOfferingIncome.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === typesOfferingIncome.IncomeAdjustment &&
      !subType &&
      amount &&
      currency &&
      date &&
      comments &&
      Object.values(formOfferingIncome.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === typesOfferingIncome.IncomeAdjustment &&
      (!amount || !currency || !date || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      type === 'offering' &&
      subType === subTypesOffering.FamilyHouse &&
      amount &&
      currency &&
      familyHouseID &&
      Object.values(formOfferingIncome.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === typesOfferingIncome.Offering &&
      (subType === subTypesOffering.ZonalVigil || subType === subTypesOffering.ZonalFasting) &&
      amount &&
      currency &&
      zoneID &&
      Object.values(formOfferingIncome.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === typesOfferingIncome.Offering &&
      (subType === subTypesOffering.Special || subType === subTypesOffering.ChurchGround) &&
      amount &&
      currency &&
      memberID &&
      Object.values(formOfferingIncome.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === typesOfferingIncome.Offering &&
      subType !== subTypesOffering.Special &&
      subType !== subTypesOffering.ZonalFasting &&
      subType !== subTypesOffering.ChurchGround &&
      subType !== subTypesOffering.ZonalVigil &&
      subType !== subTypesOffering.FamilyHouse &&
      amount &&
      currency &&
      !memberID &&
      !familyHouseID &&
      !zoneID &&
      Object.values(formOfferingIncome.formState.errors).length === 0 &&
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
    if (status === Status.Inactive) {
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
      status === Status.Active &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsDropZoneDisabled(false);
    }
  }, [
    formOfferingIncome.formState,
    type,
    subType,
    amount,
    currency,
    comments,
    memberID,
    date,
    zoneID,
    familyHouseID,
    urlFiles,
    status,
  ]);

  // reset relations
  useEffect(() => {
    if (type === typesOfferingIncome.Tithe) {
      formOfferingIncome.resetField('subType', { keepDirty: true });
      formOfferingIncome.resetField('familyHouseID', { keepDirty: true });
      formOfferingIncome.resetField('zoneID', { keepDirty: true });
    }

    if (
      type === typesOfferingIncome.Offering &&
      (subType === subTypesOffering.ChurchGround || subType === subTypesOffering.Special)
    ) {
      formOfferingIncome.resetField('familyHouseID', { keepDirty: true });
      formOfferingIncome.resetField('zoneID', { keepDirty: true });
    }

    if (type === typesOfferingIncome.Offering && subType === subTypesOffering.FamilyHouse) {
      formOfferingIncome.resetField('memberID', { keepDirty: true });
      formOfferingIncome.resetField('zoneID', { keepDirty: true });
    }

    if (
      type === typesOfferingIncome.Offering &&
      (subType === subTypesOffering.ZonalVigil || subType === subTypesOffering.ZonalFasting)
    ) {
      formOfferingIncome.resetField('memberID', { keepDirty: true });
      formOfferingIncome.resetField('familyHouseID', { keepDirty: true });
    }

    if (type === typesOfferingIncome.IncomeAdjustment) {
      formOfferingIncome.resetField('subType', { keepDirty: true });
      formOfferingIncome.resetField('memberID', { keepDirty: true });
      formOfferingIncome.resetField('familyHouseID', { keepDirty: true });
      formOfferingIncome.resetField('zoneID', { keepDirty: true });
    }

    if (
      type === typesOfferingIncome.Offering &&
      subType !== subTypesOffering.Special &&
      subType !== subTypesOffering.ChurchGround &&
      subType !== subTypesOffering.FamilyHouse &&
      subType !== subTypesOffering.ZonalVigil &&
      subType !== subTypesOffering.ZonalFasting
    ) {
      formOfferingIncome.resetField('memberID', { keepDirty: true });
      formOfferingIncome.resetField('familyHouseID', { keepDirty: true });
      formOfferingIncome.resetField('zoneID', { keepDirty: true });
    }
  }, [type, subType]);
};
