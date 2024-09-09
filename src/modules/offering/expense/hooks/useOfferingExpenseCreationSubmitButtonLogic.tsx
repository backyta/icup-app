/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type OfferingExpenseSearchType } from '@/modules/offering/expense/enums';
import { type OfferingExpenseFormData } from '@/modules/offering/expense/interfaces';

interface Options {
  isDropZoneDisabled: boolean;
  isDeleteFileButtonDisabled: boolean;
  isInputDisabled: boolean;
  offeringExpenseCreationForm: UseFormReturn<OfferingExpenseFormData, any, OfferingExpenseFormData>;
  offeringExpenseSearchType: typeof OfferingExpenseSearchType;
  setIsDropZoneDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingExpenseCreationSubmitButtonLogic = ({
  isDropZoneDisabled,
  isDeleteFileButtonDisabled,
  isInputDisabled,
  offeringExpenseCreationForm,
  offeringExpenseSearchType,
  setIsDropZoneDisabled,
  setIsMessageErrorDisabled,
  setIsSubmitButtonDisabled,
}: Options): void => {
  //* Watchers
  const type = offeringExpenseCreationForm.watch('type');
  const subType = offeringExpenseCreationForm.watch('subType');
  const amount = offeringExpenseCreationForm.watch('amount');
  const currency = offeringExpenseCreationForm.watch('currency');
  const date = offeringExpenseCreationForm.watch('date');
  const comments = offeringExpenseCreationForm.watch('comments');
  const fileNames = offeringExpenseCreationForm.watch('fileNames');
  const churchId = offeringExpenseCreationForm.watch('churchId');

  //* Effects
  useEffect(() => {
    if (
      offeringExpenseCreationForm.formState.errors &&
      Object.values(offeringExpenseCreationForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Income adjustment
    if (
      type === offeringExpenseSearchType.ExpenseAdjustment &&
      !subType &&
      amount &&
      currency &&
      date &&
      comments &&
      churchId &&
      Object.values(offeringExpenseCreationForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === offeringExpenseSearchType.ExpenseAdjustment &&
      (!churchId || !amount || !currency || !date || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Sunday worship
    if (
      (type === offeringExpenseSearchType.OperationalExpense ||
        type === offeringExpenseSearchType.ActivitiesAndEventsExpense ||
        type === offeringExpenseSearchType.DecorationExpense ||
        type === offeringExpenseSearchType.EquipmentAndTechnologyExpense ||
        type === offeringExpenseSearchType.MaintenanceAndRepairExpense ||
        type === offeringExpenseSearchType.SuppliesExpense) &&
      date &&
      subType &&
      amount &&
      currency &&
      churchId &&
      Object.values(offeringExpenseCreationForm.formState.errors).length === 0 &&
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
    offeringExpenseCreationForm.formState,
    type,
    subType,
    amount,
    currency,
    comments,
    churchId,
    date,
    fileNames,
  ]);

  //* Reset relations
  useEffect(() => {
    if (type === offeringExpenseSearchType.ExpenseAdjustment) {
      offeringExpenseCreationForm.resetField('subType', { keepDirty: true });
      offeringExpenseCreationForm.resetField('churchId', { keepDirty: true });
      offeringExpenseCreationForm.resetField('amount', { keepDirty: true });
      offeringExpenseCreationForm.resetField('date', { keepDirty: true });
      offeringExpenseCreationForm.resetField('currency', { keepDirty: true });
      offeringExpenseCreationForm.resetField('comments', { keepDirty: true });
    }

    if (type === offeringExpenseSearchType.OperationalExpense) {
      offeringExpenseCreationForm.resetField('subType', { keepDirty: true });
      offeringExpenseCreationForm.resetField('churchId', { keepDirty: true });
      offeringExpenseCreationForm.resetField('amount', { keepDirty: true });
      offeringExpenseCreationForm.resetField('date', { keepDirty: true });
      offeringExpenseCreationForm.resetField('currency', { keepDirty: true });
      offeringExpenseCreationForm.resetField('comments', { keepDirty: true });
    }

    if (type === offeringExpenseSearchType.MaintenanceAndRepairExpense) {
      offeringExpenseCreationForm.resetField('subType', { keepDirty: true });
      offeringExpenseCreationForm.resetField('churchId', { keepDirty: true });
      offeringExpenseCreationForm.resetField('amount', { keepDirty: true });
      offeringExpenseCreationForm.resetField('date', { keepDirty: true });
      offeringExpenseCreationForm.resetField('currency', { keepDirty: true });
      offeringExpenseCreationForm.resetField('comments', { keepDirty: true });
    }

    if (type === offeringExpenseSearchType.EquipmentAndTechnologyExpense) {
      offeringExpenseCreationForm.resetField('subType', { keepDirty: true });
      offeringExpenseCreationForm.resetField('churchId', { keepDirty: true });
      offeringExpenseCreationForm.resetField('amount', { keepDirty: true });
      offeringExpenseCreationForm.resetField('date', { keepDirty: true });
      offeringExpenseCreationForm.resetField('currency', { keepDirty: true });
      offeringExpenseCreationForm.resetField('comments', { keepDirty: true });
    }

    if (type === offeringExpenseSearchType.DecorationExpense) {
      offeringExpenseCreationForm.resetField('subType', { keepDirty: true });
      offeringExpenseCreationForm.resetField('churchId', { keepDirty: true });
      offeringExpenseCreationForm.resetField('amount', { keepDirty: true });
      offeringExpenseCreationForm.resetField('date', { keepDirty: true });
      offeringExpenseCreationForm.resetField('currency', { keepDirty: true });
      offeringExpenseCreationForm.resetField('comments', { keepDirty: true });
    }

    if (type === offeringExpenseSearchType.ActivitiesAndEventsExpense) {
      offeringExpenseCreationForm.resetField('subType', { keepDirty: true });
      offeringExpenseCreationForm.resetField('churchId', { keepDirty: true });
      offeringExpenseCreationForm.resetField('amount', { keepDirty: true });
      offeringExpenseCreationForm.resetField('date', { keepDirty: true });
      offeringExpenseCreationForm.resetField('currency', { keepDirty: true });
      offeringExpenseCreationForm.resetField('comments', { keepDirty: true });
    }

    if (type === offeringExpenseSearchType.SuppliesExpense) {
      offeringExpenseCreationForm.resetField('subType', { keepDirty: true });
      offeringExpenseCreationForm.resetField('churchId', { keepDirty: true });
      offeringExpenseCreationForm.resetField('amount', { keepDirty: true });
      offeringExpenseCreationForm.resetField('date', { keepDirty: true });
      offeringExpenseCreationForm.resetField('currency', { keepDirty: true });
      offeringExpenseCreationForm.resetField('comments', { keepDirty: true });
    }
  }, [type]);
};
