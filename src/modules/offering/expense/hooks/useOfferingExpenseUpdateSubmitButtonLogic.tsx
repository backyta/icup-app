/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type OfferingExpenseSearchType } from '@/modules/offering/expense/enums';
import { type OfferingExpenseFormData } from '@/modules/offering/expense/interfaces';

interface Options {
  isDropZoneDisabled: boolean;
  isDeleteFileButtonDisabled: boolean;
  isInputDisabled: boolean;
  offeringExpenseUpdateForm: UseFormReturn<OfferingExpenseFormData, any, OfferingExpenseFormData>;
  offeringExpenseSearchType: typeof OfferingExpenseSearchType;
  setIsDropZoneDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingExpenseUpdateSubmitButtonLogic = ({
  isDropZoneDisabled,
  isDeleteFileButtonDisabled,
  isInputDisabled,
  offeringExpenseUpdateForm,
  offeringExpenseSearchType,
  setIsDropZoneDisabled,
  setIsMessageErrorDisabled,
  setIsSubmitButtonDisabled,
}: Options): void => {
  //* Watchers
  const type = offeringExpenseUpdateForm.watch('type');
  const subType = offeringExpenseUpdateForm.watch('subType');
  const amount = offeringExpenseUpdateForm.watch('amount');
  const currency = offeringExpenseUpdateForm.watch('currency');
  const date = offeringExpenseUpdateForm.watch('date');
  const comments = offeringExpenseUpdateForm.watch('comments');
  const fileNames = offeringExpenseUpdateForm.watch('fileNames');
  const churchId = offeringExpenseUpdateForm.watch('churchId');

  //* Effects
  useEffect(() => {
    if (
      offeringExpenseUpdateForm.formState.errors &&
      Object.values(offeringExpenseUpdateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Expense adjustment
    if (
      type === offeringExpenseSearchType.ExpenseAdjustment &&
      !subType &&
      amount &&
      currency &&
      date &&
      comments &&
      churchId &&
      Object.values(offeringExpenseUpdateForm.formState.errors).length === 0 &&
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

    //* Others types
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
      comments &&
      Object.values(offeringExpenseUpdateForm.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isDeleteFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    //* Others values
    if (!churchId || !amount || !currency || !date || !comments) {
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
    offeringExpenseUpdateForm.formState,
    type,
    subType,
    amount,
    currency,
    comments,
    churchId,
    date,
    fileNames,
  ]);
};
