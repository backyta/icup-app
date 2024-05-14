/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type OfferingExpensesData } from '@/app/offering/expenses/interfaces';
import { type TypesOfferingExpenses } from '@/app/offering/expenses/enums';
import { Status } from '@/shared/enums';

interface Options {
  formOfferingExpenses: UseFormReturn<OfferingExpensesData, any, OfferingExpensesData>;
  typesOfferingExpenses: typeof TypesOfferingExpenses;

  isInputDisabled: boolean;
  isDropZoneDisabled: boolean;
  isFileButtonDisabled: boolean;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDropZoneDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingExpensesSubmitButtonLogic = ({
  formOfferingExpenses,
  typesOfferingExpenses,
  isInputDisabled,
  isDropZoneDisabled,
  isFileButtonDisabled,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  setIsDropZoneDisabled,
}: Options): void => {
  // watchers
  const type = formOfferingExpenses.watch('type');
  const subType = formOfferingExpenses.watch('subType');
  const amount = formOfferingExpenses.watch('amount');
  const currency = formOfferingExpenses.watch('currency');
  const date = formOfferingExpenses.watch('date');
  const comments = formOfferingExpenses.watch('comments');
  const urlFiles = formOfferingExpenses.watch('urlFile');
  const status = formOfferingExpenses.watch('status');

  // effects
  useEffect(() => {
    if (
      formOfferingExpenses.formState.errors &&
      Object.values(formOfferingExpenses.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      type === typesOfferingExpenses.ExpensesAdjustment &&
      amount &&
      currency &&
      date &&
      comments &&
      Object.values(formOfferingExpenses.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      type === typesOfferingExpenses.ExpensesAdjustment &&
      (!amount || !currency || !date || !comments)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      type !== typesOfferingExpenses.ExpensesAdjustment &&
      subType &&
      amount &&
      currency &&
      date &&
      Object.values(formOfferingExpenses.formState.errors).length === 0 &&
      (!isInputDisabled || !isDropZoneDisabled || !isFileButtonDisabled)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (!type || !amount || !currency || !currency || !date) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // update offering, status button submit block
    if (status === Status.Inactive) {
      setIsSubmitButtonDisabled(true);
      setIsDropZoneDisabled(true);
    }

    // limit images drop zone 3 (create and update offering)
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
    formOfferingExpenses.formState,
    type,
    subType,
    amount,
    currency,
    comments,
    date,
    urlFiles,
    status,
  ]);
};
