/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getSimpleChurches } from '@/modules/church/services';

import {
  OfferingIncomeProportionCard,
  OfferingIncomeAnalysisCardByActivities,
  OfferingIncomeAnalysisCardByGroundChurch,
  OfferingIncomeAnalysisCardByYoungWorship,
  OfferingIncomeAnalysisCardByUnitedWorship,
  OfferingIncomeAnalysisCardBySpecialOffering,
  OfferingIncomeAnalysisCardByIncomeAdjustment,
} from '@/modules/metrics/components/offering-income';

import {
  OfferingIncomeAnalysisCardByFamilyGroup,
  OfferingIncomeAnalysisCardBySundaySchool,
  OfferingIncomeAnalysisCardBySundayService,
  OfferingIncomeAnalysisCardByFastingAndVigil,
} from '@/modules/metrics/components/offering-income/charts';

import {
  SelectChurch,
  MetricsSkeleton,
  OfferingIncomeReportFormCard,
} from '@/modules/metrics/components/shared';

export const MetricsOfferingIncome = (): JSX.Element => {
  const [churchId, setChurchId] = useState<string | undefined>(undefined);

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
      <h2 className='text-center leading-12 sm:leading-none text-green-500 py-2 md:py-2 xl:pt-3 font-sans font-bold text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Métricas de Ofrendas
      </h2>
      <p className='text-center text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-medium'>
        Análisis, comparativas e indicadores de los ingresos de ofrenda
      </p>
      <hr className='p-[0.015rem] bg-slate-500 mt-2  mb-4 w-[90%] mx-auto' />

      <OfferingIncomeProportionCard churchId={churchId} />

      <div className='flex justify-center gap-4 items-center mt-6'>
        <SelectChurch data={data} churchId={churchId} setChurchId={setChurchId} />

        <OfferingIncomeReportFormCard churchId={churchId} />
      </div>

      {/* Gráficos independientes */}
      {!churchId ? (
        <MetricsSkeleton />
      ) : (
        <div className='mt-6 px-2 sm:pb-10 md:px-6 xl:pb-14 flex flex-col xl:grid xl:grid-cols-2 gap-10 h-[148rem] sm:h-[148rem] md:h-[148.5rem] lg:h-[166rem] xl:h-auto'>
          <OfferingIncomeAnalysisCardBySundayService churchId={churchId} />
          <OfferingIncomeAnalysisCardByFamilyGroup churchId={churchId} />
          <OfferingIncomeAnalysisCardBySundaySchool churchId={churchId} />
          <OfferingIncomeAnalysisCardByFastingAndVigil churchId={churchId} />
          <OfferingIncomeAnalysisCardByYoungWorship />
          <OfferingIncomeAnalysisCardBySpecialOffering />
          <OfferingIncomeAnalysisCardByGroundChurch />
          <OfferingIncomeAnalysisCardByUnitedWorship />
          <OfferingIncomeAnalysisCardByActivities />
          <OfferingIncomeAnalysisCardByIncomeAdjustment />
        </div>
      )}
    </div>
  );
};
