import { WhiteCard } from '@/components/shared/white-cards/WhiteCard';
import {
  FcCancel,
  FcClearFilters,
  FcReadingEbook,
  FcSearch,
  FcSupport,
} from 'react-icons/fc';

import { NavLink } from 'react-router-dom';

export const PastorPage = (): JSX.Element => {
  // const totalBears = useBearStore((state) => state.totalBears);
  // const firstName = usePersonStore((state) => state.firstName);
  // const tasks = useTaskStore((state) => state.tasks);
  // const userName = useAuthStore((state) => state.user?.fullName || 'No user');

  // const taskCount = Object.keys(tasks).length;

  return (
    <>
      <h1 className='text-center p-4 font-sans text-2xl sm:text-3xl font-bold text-blue-600 md:text-3xl lg:text-4xl xl:text-5xl'>
        Modulo Pastor
      </h1>
      <p className='text-center font-sans text-sm sm:text-md font-bold px-4 pb-4 lg:text-base xl:text-lg'>
        Bienvenido al modulo Pastor, por favor elige una opción.
      </p>
      <hr />

      <div className='h-full w-full grid grid-cols-1 gap-y-4 lg:gap-4 xl:gap-4 2xl:gap-4 lg:grid-cols-2 lg:grid-rows-3 xl:grid-cols-2 xl:grid-rows-2 2xl:grid-cols-4 2xl:grid-rows-1 2xl:h-[60rem] xl:mt-[2rem] 2xl:mt-[4rem]'>
        <NavLink
          key='/'
          to='/'
          end
          className='2xl:row-start-1 2xl:row-end-3 2xl:col-start-1 2xl:col-end-2'
        >
          <WhiteCard
            centered
            className='h-full gap-2 p-8 justify-center xl:gap-4'
          >
            <FcReadingEbook className='text-[12rem]' />
            <h2 className='text-green-500 font-bold xl:text-4xl'>
              Crear Pastor
            </h2>
            <p className='font-bold xl:text-md'>
              Registrar información de un nuevo pastor.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/'
          to='/'
          end
          className='h-[28rem] 2xl:row-start-1 2xl:row-end-2 2xl:col-start-2 2xl:col-end-3'
        >
          <WhiteCard
            centered
            className='h-full gap-2 p-8 justify-center xl:gap-4'
          >
            <FcSearch className='text-[10rem]' />
            <h2 className='text-blue-500 font-bold xl:text-4xl'>
              Buscar Pastor
            </h2>
            <p className='font-bold xl:text-md'>
              Búsqueda de pastores en general.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/'
          to='/'
          end
          className='h-[30rem] 2xl:row-start-2 2xl:row-end-3 2xl:col-start-2 2xl:col-end-3'
        >
          <WhiteCard
            centered
            className='h-full gap-2 p-8 justify-center xl:gap-4'
          >
            <FcClearFilters className='text-[10rem]' />
            <h2 className='text-sky-500 font-bold xl:text-4xl'>
              Buscar Pastor
            </h2>
            <p className='font-bold xl:text-md'>
              Búsqueda de pastores por termino o filtro.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/'
          to='/'
          end
          className='2xl:row-start-1 2xl:row-end-3 2xl:col-start-3 2xl:col-end-4'
        >
          <WhiteCard
            centered
            className='h-full gap-2 p-8 justify-center xl:gap-4'
          >
            <FcSupport className='text-[12rem]' />
            <h2 className='text-orange-500 font-bold xl:text-4xl'>
              Actualizar Pastor
            </h2>
            <p className='font-bold xl:text-md'>
              Actualizar información del registro de un pastor.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/'
          to='/'
          end
          className='2xl:row-start-1 2xl:row-end-3 2xl:col-start-4 2xl:col-end-5'
        >
          <WhiteCard
            centered
            className='h-full gap-2 p-8 justify-center xl:gap-4'
          >
            <FcCancel className='text-[12rem]' />
            <h2 className='text-red-500 font-bold xl:text-4xl'>
              Eliminar Pastor
            </h2>
            <p className='font-bold xl:text-md'>
              Marcar como inactivo el registro de un pastor.
            </p>
          </WhiteCard>
        </NavLink>
      </div>
    </>
  );
};
