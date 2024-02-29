import {
  BarChartHouse,
  BarChartOfferings,
  HousesInfoCard,
  MembersInfoCard,
} from '@/components/cards';

export const DashboardPage = (): JSX.Element => {
  // const totalBears = useBearStore( state => state.totalBears );
  // const firstName = usePersonStore( state => state.firstName );
  // const tasks = useTaskStore( state => state.tasks );
  // const userName = useAuthStore( state => state.user?.fullName || 'No user');

  // const taskCount = Object.keys(tasks).length;

  return (
    <>
      <h1 className='text-center pb-1 md:pt-1 md:pb-2 font-sans font-bold text-blue-600 text-[2.1rem] sm:text-[2.6rem] md:text-[2.8rem] lg:text-5xl xl:text-5xl'>
        Panel Administrativo
      </h1>
      <p className='text-center font-sans font-bold px-4 pb-4 text-sm sm:text-[15px] lg:text-base xl:text-lg'>
        Resumen informativo y gráfico de los últimos registros de la iglesia.
      </p>
      <hr className='p-[0.02rem] bg-slate-500' />

      <div
        className='h-auto w-full grid grid-cols-1 gap-y-5 xl:gap-6 2xl:gap-6 lg:grid-rows-1 lg:grid-cols-1 xl:grid-rows-1 xl:grid-cols-6 
                   py-5 px-2 sm:py-6 sm:px-4 lg:py-6 lg:px-4 xl:px-4 2xl:px-10 xl:pt-6 '
      >
        <BarChartOfferings></BarChartOfferings>
        <MembersInfoCard></MembersInfoCard>
        <HousesInfoCard></HousesInfoCard>
        <BarChartHouse></BarChartHouse>
      </div>
    </>
  );
};
