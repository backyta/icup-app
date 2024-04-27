/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type OfferingExpensesData } from '@/app/offering/expenses/interfaces';
import { Status } from '@/shared/enums';

interface Options {
  formOfferingExpenses: UseFormReturn<OfferingExpensesData, any, OfferingExpensesData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDropZoneDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingExpensesSubmitButtonLogic = ({
  formOfferingExpenses,
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
    if (type && subType && amount && currency && date) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (!type || !subType || !amount || !currency || !currency || !date) {
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
  }, [type, subType, amount, currency, comments, date, urlFiles, status]);
};
