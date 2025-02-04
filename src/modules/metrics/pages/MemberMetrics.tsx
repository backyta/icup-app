/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getSimpleChurches } from '@/modules/church/services/church.service';

import { SelectChurch } from '@/modules/metrics/components/shared/SelectChurch';
import { MemberMetricsSkeleton } from '@/modules/metrics/components/shared/MemberMetricsSkeleton';

import { MemberReportFormCard } from '@/modules/metrics/components/member/reports/MemberReportFormCard';

import { MemberProportionCard } from '@/modules/metrics/components/member/charts/MemberProportionCard';
import { MemberAnalysisCardByCategory } from '@/modules/metrics/components/member/charts/MemberAnalysisCardByCategory';
import { MemberAnalysisCardByBirthMonth } from '@/modules/metrics/components/member/charts/MemberAnalysisCardByBirthMonth';
import { MemberAnalysisCardByRecordStatus } from '@/modules/metrics/components/member/charts/MemberAnalysisCardByRecordStatus';
import { MemberAnalysisCardByRoleAndGender } from '@/modules/metrics/components/member/charts/MemberAnalysisCardByRoleAndGender';
import { MemberAnalysisCardByMaritalStatus } from '@/modules/metrics/components/member/charts/MemberAnalysisCardByMaritalStatus';
import { DiscipleAnalysisCardByZoneAndGender } from '@/modules/metrics/components/member/charts/DiscipleAnalysisCardByZoneAndGender';
import { PreacherAnalysisCardByZoneAndGender } from '@/modules/metrics/components/member/charts/PreacherAnalysisCardByZoneAndGender';
import { MemberFluctuationAnalysisCardByYear } from '@/modules/metrics/components/member/charts/MemberFluctuationAnalysisCardByYear';
import { MemberAnalysisCardByCategoryAndGender } from '@/modules/metrics/components/member/charts/MemberAnalysisCardByCategoryAndGender';
import { MemberAnalysisCardByDistrictAndGender } from '@/modules/metrics/components/member/charts/MemberAnalysisCardByDistrictAndGender';

export const MemberMetrics = (): JSX.Element => {
  //* States
  const [churchId, setChurchId] = useState<string | undefined>(undefined);

  //* Queries
  const { data } = useQuery({
    queryKey: ['churches-for-member-metrics'],
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
      <h2 className='text-center text-amber-500 pt-2 md:py-2 xl:pt-3 font-sans font-bold text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Métricas de Miembro
      </h2>

      <p className='text-center text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-medium'>
        Indicadores, comparativas y estadísticas de miembros
      </p>
      <hr className='p-[0.015rem] bg-slate-500 mt-2  mb-4 w-[90%] mx-auto' />

      <MemberProportionCard churchId={churchId} />

      <div className='flex justify-center gap-4 items-center mt-6'>
        <SelectChurch data={data} churchId={churchId} setChurchId={setChurchId} />

        <MemberReportFormCard churchId={churchId} />
      </div>

      {!churchId ? (
        <MemberMetricsSkeleton />
      ) : (
        <div className='mt-6 px-2 pb-10 sm:pb-10 md:px-6 xl:pb-14 flex flex-col xl:grid xl:grid-cols-2 gap-8 h-auto'>
          <MemberFluctuationAnalysisCardByYear churchId={churchId} />
          <MemberAnalysisCardByBirthMonth churchId={churchId} />
          <MemberAnalysisCardByCategory churchId={churchId} />
          <MemberAnalysisCardByCategoryAndGender churchId={churchId} />
          <MemberAnalysisCardByRoleAndGender churchId={churchId} />
          <MemberAnalysisCardByMaritalStatus churchId={churchId} />
          <DiscipleAnalysisCardByZoneAndGender churchId={churchId} />
          <PreacherAnalysisCardByZoneAndGender churchId={churchId} />
          <MemberAnalysisCardByDistrictAndGender churchId={churchId} />
          <MemberAnalysisCardByRecordStatus churchId={churchId} />
        </div>
      )}
    </div>
  );
};

export default MemberMetrics;
