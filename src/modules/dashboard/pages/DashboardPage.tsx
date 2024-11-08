/* eslint-disable @typescript-eslint/no-floating-promises */

import { useEffect } from 'react';

import {
  HousesInfoCard,
  MembersInfoCard,
  LastSundayOfferingsCard,
  TopFamilyGroupsOfferingsCard,
} from '@/modules/dashboard/components';
import { useAuthStore } from '@/stores';

export const DashboardPage = (): JSX.Element => {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    document.title = 'Panel Administrativo';
  }, []);

  return (
    <div className='animate-fadeIn'>
      <h1 className='text-center pb-2 pt-3 md:pt-2 md:pb-2 font-sans text-2xl sm:text-3xl font-bold text-blue-500 text-[2rem] sm:text-[2.4rem] md:text-[2.6rem] lg:text-5xl xl:text-5x'>
        Panel Administrativo
      </h1>
      <p className='text-center font-sans font-bold px-4 pb-4 text-sm sm:text-[15px] lg:text-base xl:text-lg'>
        Resumen informativo y gráfico de los últimos registros de la iglesia.
      </p>
      <hr className='p-[0.02rem] bg-slate-500' />

      <div
        className='h-auto sm:h-[163rem] mb-5 md:h-auto w-full grid grid-cols-1 gap-y-5 xl:gap-6 2xl:gap-6 lg:grid-rows-1 lg:grid-cols-1 xl:grid-rows-1 xl:grid-cols-6 
                   py-5 px-2 sm:py-6 sm:px-4 lg:py-6 lg:px-4 xl:px-4 xl:pt-6 '
      >
        <LastSundayOfferingsCard />
        <MembersInfoCard />
        <HousesInfoCard />
        <TopFamilyGroupsOfferingsCard />
      </div>
    </div>
  );
};
