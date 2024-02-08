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
      <h1 className='text-center font-sans text-2xl sm:text-3xl font-bold text-blue-500 md:text-3xl lg:text-4xl xl:text-5xl'>
        Panel Administrativo
      </h1>
      <p className='text-center font-sans text-sm sm:text-md font-bold p-1 lg:text-base xl:text-lg'>
        Resumen informativo y gráfico de los últimos registros de la iglesia.
      </p>
      <hr />

      <div className='h-full w-full grid grid-cols-1 gap-y-4 lg:gap-4 xl:gap-10 2xl:gap-4 lg:grid-cols-2 lg:grid-rows-3 xl:grid-cols-6 xl:grid-rows-2 sm:h-[100rem] lg:h-[50rem] xl:h-[55rem] xl-lv1:h-[55rem] 2xl:h-[66rem]'>
        <BarChartOfferings></BarChartOfferings>
        <MembersInfoCard></MembersInfoCard>
        <HousesInfoCard></HousesInfoCard>
        <BarChartHouse></BarChartHouse>
      </div>
    </>
  );
};
