// import {
//   IoAccessibilityOutline,
//   IoHeartOutline,
//   IoListOutline,
//   IoLockClosedOutline,
//   IoPawOutline }
//   from 'react-icons/io5';
// import { WhiteCard } from '../../components/shared/cards/WhiteCard';
// import { useAuthStore, useBearStore, usePersonStore, useTaskStore } from '../../stores';

import { BarChartHouse } from '@/components/cards/graphic/BarChartHouses';
import { BarChartOfferings } from '@/components/cards/graphic/BarChartOferrings';
import { HousesInfoCard } from '@/components/cards/info/HousesInfoCard';
import { MembersInfoCard } from '@/components/cards/info/MembersInfoCard';

export const DashboardPage = (): JSX.Element => {
  // const totalBears = useBearStore( state => state.totalBears );
  // const firstName = usePersonStore( state => state.firstName );
  // const tasks = useTaskStore( state => state.tasks );
  // const userName = useAuthStore( state => state.user?.fullName || 'No user');

  // const taskCount = Object.keys(tasks).length;

  return (
    <>
      <h1 className='text-center p-2 md:p-4 font-sans font-bold text-blue-600 text-[2rem] sm:text-[2.4rem] md:text-[2.6rem] lg:text-5xl xl:text-5xl'>
        Panel Administrativo
      </h1>
      <p className='text-center font-sans text-sm sm:text-md font-bold px-4 pb-4 lg:text-base xl:text-lg'>
        Resumen informativo y gráfico de los últimos registros de la iglesia.
      </p>
      <hr className='p-[0.02rem] bg-slate-500' />

      <div className='h-full w-full grid grid-cols-1 gap-y-4 xl:gap-10 2xl:gap-4 lg:grid-rows-3 xl:grid-cols-6 xl:grid-rows-2 sm:h-[100rem] md:h-auto lg:h-auto xl:h-auto 2xl:h-auto'>
        <BarChartOfferings></BarChartOfferings>
        <MembersInfoCard></MembersInfoCard>
        <HousesInfoCard></HousesInfoCard>
        <BarChartHouse></BarChartHouse>
      </div>
    </>
  );
};
