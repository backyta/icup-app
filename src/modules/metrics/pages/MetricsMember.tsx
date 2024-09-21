/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import {
  MemberProportionCard,
  MemberAnalysisCardByCategory,
  MemberAnalysisCardByBirthMonth,
  MemberAnalysisCardByRecordStatus,
  MemberAnalysisCardByMaritalStatus,
  MemberAnalysisCardByRoleAndGender,
  MemberFluctuationAnalysisCardByYear,
  MemberAnalysisCardByCategoryAndGender,
  MembersAnalysisCardByDistrictAndGender,
} from '@/modules/metrics/components/charts-member/charts';

import {
  MemberAnalysisCardByZoneAndGender,
  PreacherAnalysisCardByZoneAndGender,
} from '@/modules/metrics/components/shared';

export const MetricsMember = (): JSX.Element => {
  useEffect(() => {
    document.title = 'Modulo Métricas - IcupApp';
  }, []);

  return (
    <div className='animate-fadeInPage'>
      <h2 className='text-center text-amber-500 py-2 md:py-2 xl:pt-3 font-sans font-bold text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Métricas de Miembro
      </h2>

      <p className='text-center text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-medium'>
        Indicadores, comparativas y estadísticas de miembros
      </p>
      <hr className='p-[0.015rem] bg-slate-500 mt-2  mb-4 w-[90%] mx-auto' />

      {/* Header Cards Member Proportion */}
      <MemberProportionCard />

      {/* Gráficos independientes */}
      <div className='mt-10 px-2 sm:pb-10 md:px-6 xl:pb-14 flex flex-col xl:grid xl:grid-cols-2 gap-10 h-[246rem] sm:h-[245rem] md:h-[253rem] lg:h-[275rem] xl:h-auto'>
        <MemberFluctuationAnalysisCardByYear />
        <MemberAnalysisCardByBirthMonth />
        <MemberAnalysisCardByCategory />
        <MemberAnalysisCardByCategoryAndGender />
        <MemberAnalysisCardByRoleAndGender />
        <MemberAnalysisCardByMaritalStatus />
        <MemberAnalysisCardByZoneAndGender />
        <PreacherAnalysisCardByZoneAndGender />
        <MembersAnalysisCardByDistrictAndGender />
        <MemberAnalysisCardByRecordStatus />
      </div>
    </div>
  );
};
