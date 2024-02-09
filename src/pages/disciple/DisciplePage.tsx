import { WhiteCard } from '@/components/shared/white-cards/WhiteCard';
import {
  FcCancel,
  FcClearFilters,
  FcSearch,
  FcSportsMode,
  FcSupport,
} from 'react-icons/fc';
import { NavLink } from 'react-router-dom';

export const DisciplePage = (): JSX.Element => {
  // const totalBears = useBearStore((state) => state.totalBears);
  // const firstName = usePersonStore((state) => state.firstName);
  // const tasks = useTaskStore((state) => state.tasks);
  // const userName = useAuthStore((state) => state.user?.fullName || 'No user');

  // const taskCount = Object.keys(tasks).length;

  return (
    <>
      <h1 className='text-center p-2 md:p-4 font-sans text-2xl sm:text-3xl font-bold text-blue-600 text-[2rem] sm:text-[2.4rem] md:text-[2.6rem] lg:text-5xl xl:text-5xl'>
        Modulo Discípulo
      </h1>
      <p className='text-center font-sans text-sm sm:text-md font-bold px-4 pb-4 lg:text-base xl:text-lg'>
        Bienvenido al modulo Discípulo, por favor elige una opción.
      </p>
      <hr className='p-[0.02rem] bg-slate-500' />

      <div className='w-full grid gap-4 grid-cols-2 grid-rows-3 md:grid-cols-2 md:grid-rows-4 lg:grid-cols-2 lg:grid-rows-5 2xl:grid-cols-4 2xl:grid-rows-1 h-[50rem] sm:h-[67rem] md:h-[70rem] lg:h-[68rem] xl:h-[63rem] 2xl:h-[63rem] mt-[2rem]'>
        <NavLink
          key='/'
          to='/'
          end
          className='md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-3 lg:row-start-2 lg:row-end-5 lg:col-start-1 lg:col-end-2 xl:row-start-1 xl:row-end-4 xl:col-start-1 xl:col-end-2 2xl:row-start-1 2xl:row-end-3 2xl:col-start-1 2xl:col-end-2'
        >
          <WhiteCard
            centered
            className='h-full md:h-full gap-2 p-8 justify-center xl:gap-4'
          >
            <FcSportsMode className='text-[12rem]' />
            <h2 className='text-green-500 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
              Crear Discípulo
            </h2>
            <p className='font-bold text-sm sm:text-md'>
              Registrar información de un nuevo discípulo.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/'
          to='/'
          end
          className='md:row-start-2 md:row-end-4 md:col-start-1 md:col-end-2 lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-3 xl:row-start-1 xl:row-end-3 xl:col-start-2 xl:col-end-3 2xl:row-start-1 2xl:row-end-2 2xl:col-start-2 2xl:col-end-3'
        >
          <WhiteCard
            centered
            className='gap-2 p-8 justify-center xl:gap-4 h-full xl:h-full 2xl:h-full'
          >
            <FcSearch className='text-[12rem]' />
            <h2 className='text-blue-500 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
              Buscar Discípulo
            </h2>
            <p className='font-bold text-sm sm:text-md'>
              Búsqueda de discípulos en general.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/'
          to='/'
          end
          className='lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3 xl:row-start-3 xl:row-end-5 xl:col-start-2 xl:col-end-3 2xl:row-start-2 2xl:row-end-3 2xl:col-start-2 2xl:col-end-3'
        >
          <WhiteCard
            centered
            className='gap-2 p-8 justify-center h-full xl:h-full xl:gap-4'
          >
            <FcClearFilters className='text-[10rem]' />
            <h2 className='text-sky-500 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
              Buscar Discípulo
            </h2>
            <p className='font-bold text-sm sm:text-md'>
              Búsqueda de discípulos por termino o filtro.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/'
          to='/'
          end
          className='lg:h-full lg:row-start-3 lg:row-end-5 lg:col-start-2 lg:col-end-3 xl:row-start-4 xl:row-end-7 xl:col-start-1 xl:col-end-2 2xl:row-start-1 2xl:row-end-3 2xl:col-start-3 2xl:col-end-4'
        >
          <WhiteCard
            centered
            className='h-full gap-2 p-8 justify-center xl:gap-4'
          >
            <FcSupport className='text-[12rem]' />
            <h2 className='text-orange-500 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
              Actualizar Discípulo
            </h2>
            <p className='font-bold text-sm sm:text-md'>
              Actualizar información del registro de un discípulo.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/'
          to='/'
          end
          className='md:h-full col-start-1 col-end-3  md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 lg:h-full lg:row-start-5 lg:row-end-6 lg:col-start-1 lg:col-end-3 xl:row-start-5 xl:row-end-7 xl:col-start-2 xl:col-end-3 2xl:row-start-1 2xl:row-end-3 2xl:col-start-4 2xl:col-end-5'
        >
          <WhiteCard
            centered
            className='h-[12.5rem] sm:h-[18rem] md:h-full gap-2 p-8 justify-center xl:gap-4'
          >
            <FcCancel className='text-[12rem]' />
            <h2 className='text-red-500 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
              Eliminar Discípulo
            </h2>
            <p className='font-bold text-sm sm:text-md'>
              Marcar como inactivo el registro de un discípulo.
            </p>
          </WhiteCard>
        </NavLink>
      </div>
    </>
  );
};
