/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { SelectChurch } from '@/modules/metrics/components/shared/SelectChurch';
import { OfferingExpenseMetricsSkeleton } from '@/modules/metrics/components/shared/OfferingExpenseMetricsSkeleton';

import { getSimpleChurches } from '@/modules/church/services/church.service';

import { OfferingExpenseProportionCard } from '@/modules/metrics/components/offering-expense/charts/OfferingExpenseProportionCard';
import { OfferingExpenseReportFormCard } from '@/modules/metrics/components/offering-expense/reports/OfferingExpenseReportFormCard';
import { OfferingExpenseAnalysisCardByOthersExpenses } from '@/modules/metrics/components/offering-expense/charts/OfferingExpenseAnalysisCardByOtherExpenses';
import { OfferingExpenseAnalysisCardBySuppliesExpenses } from '@/modules/metrics/components/offering-expense/charts/OfferingExpenseAnalysisCardBySuppliesExpenses';
import { OfferingExpenseAnalysisCardByExpensesAdjustment } from '@/modules/metrics/components/offering-expense/charts/OfferingExpenseAnalysisCardByExpensesAdjustment';
import { OfferingExpenseAnalysisCardByDecorationExpenses } from '@/modules/metrics/components/offering-expense/charts/OfferingExpenseAnalysisCardByDecorationExpenses';
import { OfferingExpenseAnalysisCardByOperationalExpenses } from '@/modules/metrics/components/offering-expense/charts/OfferingExpenseAnalysisCardByOperationalExpenses';
import { OfferingExpenseAnalysisCardByPlaningEventsExpenses } from '@/modules/metrics/components/offering-expense/charts/OfferingExpenseAnalysisCardByPlaningEventsExpenses';
import { OfferingExpenseAnalysisCardByMaintenanceAndRepairExpenses } from '@/modules/metrics/components/offering-expense/charts/OfferingExpenseAnalysisCardByMaintenanceAndRepairExpenses';
import { OfferingExpenseAnalysisCardByEquipmentAndTechnologyExpenses } from '@/modules/metrics/components/offering-expense/charts/OfferingExpenseAnalysisCardByEquipmentAndTechnologyExpenses';

export const OfferingExpenseMetrics = (): JSX.Element => {
  //* States
  const [churchId, setChurchId] = useState<string | undefined>(undefined);

  //* Queries
  const { data } = useQuery({
    queryKey: ['churches-for-offering-income-metrics'],
    queryFn: () => getSimpleChurches({ isSimpleQuery: true }),
    staleTime: 1000 * 60,
    retry: false,
  });

  //* Effects
  useEffect(() => {
    const church = data?.map((church) => church?.id)[0];
    setChurchId(church);
  }, [data]);

  useEffect(() => {
    document.title = 'Modulo Métricas - IcupApp';
  }, []);

  return (
    <div className='animate-fadeInPage'>
      <h2 className='text-center leading-12 sm:leading-none text-red-500 pt-2 md:py-2 xl:pt-3 font-sans font-bold text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Métricas de Ofrendas
      </h2>

      <p className='text-center text-red-500 font-bold text-[24px] sm:text-[32px] -mt-2 sm:-mt-3 md:-mt-5 lg:-mt-5 xl:-mt-2'>
        (Gastos)
      </p>

      <p className='text-center text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-medium'>
        Análisis, comparativas e indicadores de los salidas de ofrenda
      </p>
      <hr className='p-[0.015rem] bg-slate-500 mt-2 mb-4 w-[90%] mx-auto' />

      <OfferingExpenseProportionCard churchId={churchId} />

      <div className='flex justify-center gap-4 items-center mt-6'>
        <SelectChurch data={data} churchId={churchId} setChurchId={setChurchId} />

        <OfferingExpenseReportFormCard churchId={churchId} />
      </div>

      {!churchId ? (
        <OfferingExpenseMetricsSkeleton />
      ) : (
        <div className='mt-6 px-2 pb-10 sm:pb-10 md:px-6 xl:pb-14 flex flex-col gap-8 h-auto'>
          <OfferingExpenseAnalysisCardByOperationalExpenses churchId={churchId} />
          <OfferingExpenseAnalysisCardByMaintenanceAndRepairExpenses churchId={churchId} />
          <OfferingExpenseAnalysisCardByDecorationExpenses churchId={churchId} />
          <OfferingExpenseAnalysisCardByEquipmentAndTechnologyExpenses churchId={churchId} />
          <OfferingExpenseAnalysisCardBySuppliesExpenses churchId={churchId} />
          <OfferingExpenseAnalysisCardByPlaningEventsExpenses churchId={churchId} />
          <OfferingExpenseAnalysisCardByOthersExpenses churchId={churchId} />
          <OfferingExpenseAnalysisCardByExpensesAdjustment churchId={churchId} />
        </div>
      )}
    </div>
  );
};

export default OfferingExpenseMetrics;
