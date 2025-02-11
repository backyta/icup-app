/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { SelectChurch } from '@/modules/metrics/components/shared/SelectChurch';
import { OfferingIncomeMetricsSkeleton } from '@/modules/metrics/components/shared/OfferingIncomeMetricsSkeleton';

import { getSimpleChurches } from '@/modules/church/services/church.service';

import { OfferingIncomeProportionCard } from '@/modules/metrics/components/offering-income/charts/OfferingIncomeProportionCard';
import { OfferingIncomeReportFormCard } from '@/modules/metrics/components/offering-income/reports/OfferingIncomeReportFormCard';
import { OfferingIncomeAnalysisCardByActivities } from '@/modules/metrics/components/offering-income/charts/OfferingIncomeAnalysisCardByActivities';
import { OfferingIncomeAnalysisCardByFamilyGroup } from '@/modules/metrics/components/offering-income/charts/OfferingIncomeAnalysisCardByFamilyGroup';
// import { OfferingIncomeAnalysisCardByYouthService } from '@/modules/metrics/components/offering-income/charts/OfferingIncomeAnalysisCardByYouthService';
// import { OfferingIncomeAnalysisCardBySundaySchool } from '@/modules/metrics/components/offering-income/charts/OfferingIncomeAnalysisCardBySundaySchool';
import { OfferingIncomeAnalysisCardByChurchGround } from '@/modules/metrics/components/offering-income/charts/OfferingIncomeAnalysisCardByChurchGround';
import { OfferingIncomeAnalysisCardByUnitedService } from '@/modules/metrics/components/offering-income/charts/OfferingIncomeAnalysisCardByUnitedService';
import { OfferingIncomeAnalysisCardBySundayService } from '@/modules/metrics/components/offering-income/charts/OfferingIncomeAnalysisCardBySundayService';
import { OfferingIncomeAnalysisCardByFastingAndVigil } from '@/modules/metrics/components/offering-income/charts/OfferingIncomeAnalysisCardByFastingAndVigil';
import { OfferingIncomeAnalysisCardBySpecialOffering } from '@/modules/metrics/components/offering-income/charts/OfferingIncomeAnalysisCardBySpecialOffering';
import { OfferingIncomeAnalysisCardByIncomeAdjustment } from '@/modules/metrics/components/offering-income/charts/OfferingIncomeAnalysisCardByIncomeAdjustment';

export const OfferingIncomeMetrics = (): JSX.Element => {
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
      <h2 className='text-center text-green-500 pt-2 md:py-2 xl:pt-3 font-sans font-bold text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Métricas de Ofrendas
      </h2>
      <p className='text-center text-green-500 font-bold text-[24px] sm:text-[32px] -mt-2 sm:-mt-3 md:-mt-5 lg:-mt-5 xl:-mt-2'>
        (Ingresos)
      </p>
      <p className='text-center text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-medium'>
        Análisis, comparativas e indicadores de los ingresos de ofrenda
      </p>
      <hr className='p-[0.015rem] bg-slate-500 mt-2 mb-4 w-[90%] mx-auto' />

      <OfferingIncomeProportionCard churchId={churchId} />

      <div className='flex justify-center gap-4 items-center mt-6'>
        <SelectChurch data={data} churchId={churchId} setChurchId={setChurchId} />

        <OfferingIncomeReportFormCard churchId={churchId} />
      </div>

      {!churchId ? (
        <OfferingIncomeMetricsSkeleton />
      ) : (
        <div className='mt-6 px-2 pb-10 sm:pb-10 md:px-6 xl:pb-14 flex flex-col xl:grid xl:grid-cols-2 gap-8 h-auto'>
          <OfferingIncomeAnalysisCardBySundayService churchId={churchId} />
          <OfferingIncomeAnalysisCardByFamilyGroup churchId={churchId} />
          {/* <OfferingIncomeAnalysisCardBySundaySchool churchId={churchId} /> */}
          <OfferingIncomeAnalysisCardByFastingAndVigil churchId={churchId} />
          <OfferingIncomeAnalysisCardByUnitedService churchId={churchId} />
          {/* <OfferingIncomeAnalysisCardByYouthService churchId={churchId} /> */}
          <OfferingIncomeAnalysisCardByChurchGround churchId={churchId} />
          <OfferingIncomeAnalysisCardByActivities churchId={churchId} />
          <OfferingIncomeAnalysisCardBySpecialOffering churchId={churchId} />
          <OfferingIncomeAnalysisCardByIncomeAdjustment churchId={churchId} />
        </div>
      )}
    </div>
  );
};

export default OfferingIncomeMetrics;
