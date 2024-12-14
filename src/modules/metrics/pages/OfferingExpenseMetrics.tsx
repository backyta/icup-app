/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { SelectChurch } from '@/modules/metrics/components/shared/SelectChurch';
import { MetricsSkeleton } from '@/modules/metrics/components/shared/MetricsSkeleton';

import { getSimpleChurches } from '@/modules/church/services/church.service';

import { OfferingExpenseProportionCard } from '@/modules/metrics/components/offering-expense/charts/OfferingExpenseProportionCard';
import { OfferingExpenseReportFormCard } from '@/modules/metrics/components/offering-expense/reports/OfferingExpenseReportFormCard';
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

  //* Library hooks
  const { pathname } = useLocation();

  const { data } = useQuery({
    queryKey: ['churches-for-offering-income-metrics'],
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
      <h2 className='text-center text-red-500 text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-sans font-bold pt-2 leading-tight'>
        Métricas de Ofrendas
      </h2>

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
        <MetricsSkeleton pathname={pathname} />
      ) : (
        <div className='mt-6 px-2 pb-10 sm:pb-10 md:px-6 xl:pb-14 flex flex-col gap-8 h-auto'>
          <OfferingExpenseAnalysisCardByOperationalExpenses churchId={churchId} />
          <OfferingExpenseAnalysisCardByMaintenanceAndRepairExpenses churchId={churchId} />
          <OfferingExpenseAnalysisCardByDecorationExpenses churchId={churchId} />
          <OfferingExpenseAnalysisCardByEquipmentAndTechnologyExpenses churchId={churchId} />
          <OfferingExpenseAnalysisCardBySuppliesExpenses churchId={churchId} />
          <OfferingExpenseAnalysisCardByPlaningEventsExpenses churchId={churchId} />
          <OfferingExpenseAnalysisCardByExpensesAdjustment churchId={churchId} />
        </div>
      )}
    </div>
  );
};

export default OfferingExpenseMetrics;
