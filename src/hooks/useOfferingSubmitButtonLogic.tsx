/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type TypesOffering, type SubTypesOffering } from '@/app/offering/enums';
import { type OfferingData } from '@/app/offering/interfaces';
import { Status } from '@/shared/enums';

interface Options {
  formOffering: UseFormReturn<OfferingData, any, OfferingData>;
  typesOffering: typeof TypesOffering;
  subTypesOffering: typeof SubTypesOffering;

  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDropZoneDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingSubmitButtonLogic = ({
  formOffering,
  typesOffering,
  subTypesOffering,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  setIsDropZoneDisabled,
}: Options): void => {
  // watchers
  const type = formOffering.watch('type');
  const subType = formOffering.watch('subType');
  const amount = formOffering.watch('amount');
  const currency = formOffering.watch('currency');
  const comments = formOffering.watch('comments');
  const urlFiles = formOffering.watch('urlFile');
  const memberID = formOffering.watch('memberID');
  const zoneID = formOffering.watch('zoneID');
  const familyHouseID = formOffering.watch('familyHouseID');
  const status = formOffering.watch('status');

  // effects
  useEffect(() => {
    if (type === typesOffering.Tithe && !subType && amount && currency && memberID) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === 'offering' &&
      subType === subTypesOffering.FamilyHouse &&
      amount &&
      currency &&
      familyHouseID
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === typesOffering.Offering &&
      (subType === subTypesOffering.ZonalVigil || subType === subTypesOffering.ZonalFasting) &&
      amount &&
      currency &&
      zoneID
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === typesOffering.Offering &&
      (subType === subTypesOffering.Special || subType === subTypesOffering.ChurchGround) &&
      amount &&
      currency &&
      memberID
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === typesOffering.Offering &&
      subType !== subTypesOffering.Special &&
      subType !== subTypesOffering.ZonalFasting &&
      subType !== subTypesOffering.ChurchGround &&
      subType !== subTypesOffering.ZonalVigil &&
      subType !== subTypesOffering.FamilyHouse &&
      amount &&
      currency &&
      !memberID &&
      !familyHouseID &&
      !zoneID
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
    }

    // limit images drop zone 3 (create offering)
    if (urlFiles && urlFiles?.length >= 4) {
      setIsDropZoneDisabled(true);
      setIsSubmitButtonDisabled(true);
    }

    if (urlFiles && urlFiles?.length < 3) {
      setIsDropZoneDisabled(false);
    }
  }, [
    type,
    subType,
    amount,
    currency,
    comments,
    memberID,
    zoneID,
    familyHouseID,
    urlFiles,
    status,
  ]);

  // reset relations
  useEffect(() => {
    if (type === typesOffering.Tithe) {
      formOffering.resetField('subType', { keepDirty: true });
      formOffering.resetField('familyHouseID', { keepDirty: true });
      formOffering.resetField('zoneID', { keepDirty: true });
    }

    if (
      type === typesOffering.Offering &&
      (subType === subTypesOffering.ChurchGround || subType === subTypesOffering.Special)
    ) {
      formOffering.resetField('familyHouseID', { keepDirty: true });
      formOffering.resetField('zoneID', { keepDirty: true });
    }

    if (type === typesOffering.Offering && subType === subTypesOffering.FamilyHouse) {
      formOffering.resetField('memberID', { keepDirty: true });
      formOffering.resetField('zoneID', { keepDirty: true });
    }

    if (
      type === typesOffering.Offering &&
      (subType === subTypesOffering.ZonalVigil || subType === subTypesOffering.ZonalFasting)
    ) {
      formOffering.resetField('memberID', { keepDirty: true });
      formOffering.resetField('familyHouseID', { keepDirty: true });
    }

    if (
      type === typesOffering.Offering &&
      subType !== subTypesOffering.Special &&
      subType !== subTypesOffering.ChurchGround &&
      subType !== subTypesOffering.FamilyHouse &&
      subType !== subTypesOffering.ZonalVigil &&
      subType !== subTypesOffering.ZonalFasting
    ) {
      formOffering.resetField('memberID', { keepDirty: true });
      formOffering.resetField('familyHouseID', { keepDirty: true });
      formOffering.resetField('zoneID', { keepDirty: true });
    }
  }, [type, subType]);
};
