/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type OfferingExpenseSearchType } from '@/modules/offering/expense/enums/offering-expense-search-type.enum';
import { type OfferingExpenseFormData } from '@/modules/offering/expense/interfaces/offering-expense-form-data.interface';

interface Options {
  isDropZoneDisabled: boolean;
  isDeleteFileButtonDisabled: boolean;
  isInputDisabled: boolean;
  offeringExpenseUpdateForm: UseFormReturn<OfferingExpenseFormData, any, undefined>;
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
      type === offeringExpenseSearchType.ExpensesAdjustment &&
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
      type === offeringExpenseSearchType.ExpensesAdjustment &&
      (!churchId || !amount || !currency || !date || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    //* Others types
    if (
      (type === offeringExpenseSearchType.OperationalExpenses ||
        type === offeringExpenseSearchType.PlaningEventsExpenses ||
        type === offeringExpenseSearchType.DecorationExpenses ||
        type === offeringExpenseSearchType.EquipmentAndTechnologyExpenses ||
        type === offeringExpenseSearchType.MaintenanceAndRepairExpenses ||
        type === offeringExpenseSearchType.SuppliesExpenses) &&
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
