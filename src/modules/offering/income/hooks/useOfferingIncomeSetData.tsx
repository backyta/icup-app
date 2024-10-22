/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import {
  type OfferingIncomeResponse,
  type OfferingIncomeFormData,
} from '@/modules/offering/income/interfaces';

import { type FilesProps } from '@/modules/offering/shared/interfaces';

interface Options {
  id: string;
  data: OfferingIncomeResponse | undefined;
  setFiles: React.Dispatch<React.SetStateAction<FilesProps[]>>;
  setIsLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
  offeringIncomeUpdateForm: UseFormReturn<OfferingIncomeFormData, any, OfferingIncomeFormData>;
}

export const useOfferingIncomeSetData = ({
  id,
  data,
  setFiles,
  setIsLoadingData,
  offeringIncomeUpdateForm,
}: Options): void => {
  //* Set data
  console.log(data?.imageUrls);
  useEffect(() => {
    offeringIncomeUpdateForm.setValue('type', data?.type ?? '');
    offeringIncomeUpdateForm.setValue('subType', data?.subType ?? '');
    offeringIncomeUpdateForm.setValue('amount', data?.amount ?? '');
    offeringIncomeUpdateForm.setValue('currency', data?.currency ?? '');
    offeringIncomeUpdateForm.setValue('date', new Date(String(data?.date).replace(/-/g, '/')));
    offeringIncomeUpdateForm.setValue('comments', data?.comments ?? '');
    offeringIncomeUpdateForm.setValue('churchId', data?.church?.id);
    offeringIncomeUpdateForm.setValue('zoneId', data?.zone?.id);
    offeringIncomeUpdateForm.setValue('familyGroupId', data?.familyGroup?.id);
    offeringIncomeUpdateForm.setValue('memberType', data?.memberType ?? '');
    offeringIncomeUpdateForm.setValue(
      'memberId',
      data?.disciple?.id ??
        data?.preacher?.id ??
        data?.supervisor?.id ??
        data?.copastor?.id ??
        data?.pastor?.id
    );
    offeringIncomeUpdateForm.setValue('shift', data?.shift ?? '');
    setFiles(data?.imageUrls as any);
    offeringIncomeUpdateForm.setValue('recordStatus', data?.recordStatus);

    const timeoutId = setTimeout(() => {
      setIsLoadingData(false);
    }, 1200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  //* Generate dynamic url
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);
      url.pathname = `/offerings/income/update/${id}/edit`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);
};
