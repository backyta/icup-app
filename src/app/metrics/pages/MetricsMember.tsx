import {
  MemberProportionCards,
  MemberFluctuationAnalysisCardByMonth,
  MemberAnalysisCardByBirthMonth,
  MemberAnalysisCardByCategoryAndGender,
  MemberAnalysisCardByMaritalStatus,
  MemberAnalysisCardByRole,
  MemberAnalysisCardByCategory,
  MembersAnalysisCardByDistrict,
} from '@/app/metrics/components/graphics-member';

import {
  MemberAnalysisCardByZone,
  PreacherAnalysisCardByZone,
} from '@/app/metrics/components/shared';

export const MetricsMember = (): JSX.Element => {
  return (
    <div>
      <h2 className='text-center text-amber-500 text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-sans font-bold pt-2 leading-tight'>
        Métricas de Miembros
      </h2>
      <p className='text-center text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-medium'>
        Análisis, comparativas e indicadores de los miembros
      </p>
      <hr className='p-[0.015rem] bg-slate-500 mt-2  mb-4 w-[90%] mx-auto' />

      {/* Header Cards Member Proportion */}
      <MemberProportionCards />

      {/* Gráficos independientes */}
      <div className='mt-10 px-2 md:px-6 xl:pb-14 flex flex-col xl:grid xl:grid-cols-2 gap-10 h-[200rem] lg:h-[222rem] xl:h-auto'>
        <MemberFluctuationAnalysisCardByMonth />
        <MemberAnalysisCardByBirthMonth />
        <MemberAnalysisCardByCategory />
        <MemberAnalysisCardByCategoryAndGender />
        <MemberAnalysisCardByRole />
        <MemberAnalysisCardByMaritalStatus />
        <MemberAnalysisCardByZone />
        <PreacherAnalysisCardByZone />
        <MembersAnalysisCardByDistrict />
      </div>
    </div>
  );
};
