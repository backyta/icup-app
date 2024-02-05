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

export const Dashboard = (): JSX.Element => {
  // const totalBears = useBearStore( state => state.totalBears );
  // const firstName = usePersonStore( state => state.firstName );
  // const tasks = useTaskStore( state => state.tasks );
  // const userName = useAuthStore( state => state.user?.fullName || 'No user');

  // const taskCount = Object.keys(tasks).length;

  return (
    <>
      <h1 className='text-center font-sans text-5xl font-bold text-blue-500'>
        Panel Administrativo
      </h1>
      <p className='text-center font-sans text-lg font-bold p-1'>
        Resumen informativo y gráfico de los últimos registros de la iglesia.
      </p>
      <hr />

      <div className='min-h-screen w-full grid gap-2 grid-cols-2 grid-rows-2'>
        <BarChartOfferings></BarChartOfferings>
        <MembersInfoCard></MembersInfoCard>
        <HousesInfoCard></HousesInfoCard>
        <BarChartHouse></BarChartHouse>
      </div>
    </>
  );
};

// TODO : hacer grid para ubicar bien los 4 elementos.
