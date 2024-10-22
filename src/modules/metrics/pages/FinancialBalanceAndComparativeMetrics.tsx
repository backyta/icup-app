/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/promise-function-async */

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getSimpleChurches } from '@/modules/church/services';

import {
  SelectChurch,
  ComparisonMetricsSkeleton,
  OfferingIncomeReportFormCard,
} from '@/modules/metrics/components/shared';

import {
  ComparativeOfferingExpensesAnalysisCard,
  ComparativeOfferingIncomeAnalysisCardByType,
  GeneralComparativeOfferingIncomeAnalysisCard,
  ComparativeOfferingExpensesAnalysisCardByType,
  ComparativeOfferingExpensesAnalysisCardBySubType,
  OfferingComparativeAnalysisCardByIncomeAndExpenses,
  OfferingExpensesAndOfferingIncomeComparativeProportionCard,
} from '@/modules/metrics/components/financial-balance-comparative/charts';

export const FinancialBalanceAndComparativeMetrics = (): JSX.Element => {
  //* States
  const [churchId, setChurchId] = useState<string | undefined>(undefined);

  const { data } = useQuery({
    queryKey: ['churches-for-overall-balance-and-financial-comparative-metrics'],
    queryFn: () => getSimpleChurches({ isSimpleQuery: true }),
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    const church = data?.map((church) => church?.id)[0];
    setChurchId(church);
  }, [data]);

  useEffect(() => {
    document.title = 'Modulo Métricas - IcupApp';
  }, []);

  return (
    <div className='animate-fadeInPage'>
      <h2 className='text-center leading-12 sm:leading-none text-yellow-500 py-2 md:py-2 xl:pt-3 font-sans font-bold text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Métricas de Ofrenda
      </h2>
      <p className='text-center text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-medium'>
        Análisis comparativos y balance financiero de ingresos y salidas de ofrenda
      </p>

      <hr className='p-[0.015rem] bg-slate-500 mt-2 mb-4 w-[90%] mx-auto' />

      <OfferingExpensesAndOfferingIncomeComparativeProportionCard churchId={churchId} />

      <div className='flex justify-center gap-4 items-center mt-6'>
        <SelectChurch data={data} churchId={churchId} setChurchId={setChurchId} />

        <OfferingIncomeReportFormCard churchId={churchId} />
      </div>

      {!churchId ? (
        <ComparisonMetricsSkeleton />
      ) : (
        <div className='mt-6 px-2 pb-10 sm:pb-10 md:px-6 xl:pb-14 flex flex-col xl:grid xl:grid-cols-2 gap-8 h-auto'>
          <OfferingComparativeAnalysisCardByIncomeAndExpenses churchId={churchId} />
          <GeneralComparativeOfferingIncomeAnalysisCard churchId={churchId} />
          <ComparativeOfferingIncomeAnalysisCardByType churchId={churchId} />
          <ComparativeOfferingExpensesAnalysisCard churchId={churchId} />
          <ComparativeOfferingExpensesAnalysisCardByType churchId={churchId} />
          <ComparativeOfferingExpensesAnalysisCardBySubType churchId={churchId} />
        </div>
      )}
    </div>
  );
};
