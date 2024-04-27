import { NavLink } from 'react-router-dom';

import { WhiteCard } from '@/shared/components';
import { FcClearFilters, FcPodiumWithSpeaker, FcSearch, FcSupport } from 'react-icons/fc';
import { RiDeleteBin2Fill } from 'react-icons/ri';

export const CopastorOptionsPage = (): JSX.Element => {
  return (
    <>
      <h1 className='text-center pb-2 pt-3 md:pt-2 md:pb-2 font-sans text-2xl sm:text-3xl font-bold text-copastor-color text-[2rem] sm:text-[2.4rem] md:text-[2.6rem] lg:text-5xl xl:text-5xl'>
        Modulo Co-Pastor
      </h1>
      <p className='text-center font-sans text-[15px] sm:text-md md:text-[15px] font-bold px-4 pb-4 lg:text-base xl:text-lg'>
        Bienvenido, por favor elige una opción.
      </p>
      <hr className='p-[0.015rem] bg-slate-500' />

      <div className='w-full px-[2rem] py-6 sm:px-[7rem] md:px-[4rem] lg:px-[3rem] xl:px-[3rem] 2xl:px-16 grid gap-8 md:gap-6 xl:gap-5 2xl:gap-4 grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 2xl:grid-cols-4 2xl:grid-rows-1 h-auto 2xl:h-[43rem]'>
        <NavLink
          key='/copastors/create-copastor'
          to='/copastors/create-copastor'
          end
          className='row-start-1 row-end-2 md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-2 lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2 xl:row-start-1 xl:row-end-2 xl:col-start-1 xl:col-end-2 2xl:row-start-1 2xl:row-end-3 2xl:col-start-1 2xl:col-end-2'
        >
          <WhiteCard className='md:h-[11rem]' centered>
            <FcPodiumWithSpeaker className='text-[10rem] lg:text-[8rem] xl:text-[7rem]' />
            <h2 className='text-green-500 font-bold text-[22px] sm:text-2xl lg:text-3xl xl:text-4xl'>
              Registrar Co-Pastor
            </h2>
            <p className='font-bold text-[14px] lg:text-[15px] xl:text-[16px]'>
              Crear nuevo registro de un co-pastor.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/copastors/search-copastors'
          to='/copastors/search-copastors'
          end
          className='row-start-2 row-end-3 lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-2 xl:row-start-1 xl:row-end-3 xl:col-start-2 xl:col-end-3 2xl:row-start-1 2xl:row-end-2 2xl:col-start-2 2xl:col-end-3 '
        >
          <WhiteCard className='md:h-[11rem]' centered>
            <FcSearch className='text-[10rem] lg:text-[7rem] xl:text-[8rem]' />
            <h2 className='text-blue-500 font-bold text-[22px] sm:text-2xl lg:text-3xl xl:text-4xl'>
              Consultar Co-Pastores
            </h2>
            <p className='font-bold text-[14px] lg:text-[15px] xl:text-[16px]'>
              Consultar registros de co-pastores en general.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/copastors/search-by-term-copastors'
          to='/copastors/search-by-term-copastors'
          end
          className='row-start-3 row-end-4 lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3 xl:row-start-3 xl:row-end-4 xl:col-start-2 xl:col-end-3 2xl:row-start-2 2xl:row-end-3 2xl:col-start-2 2xl:col-end-3'
        >
          <WhiteCard className='md:h-[11rem]' centered>
            <FcClearFilters className='text-[10rem] lg:text-[6rem] xl:text-[6rem]' />
            <h2 className='text-sky-500 font-bold text-[22px] sm:text-2xl lg:text-3xl xl:text-4xl'>
              Consultar Co-Pastores
            </h2>
            <p className='font-bold text-[14px] lg:text-[15px] xl:text-[16px]'>
              Consultar registros de co-pastores por tipo.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/copastors/update-copastor'
          to='/copastors/update-copastor'
          end
          className='row-start-4 row-end-5 lg:h-full lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3 xl:row-start-2 xl:row-end-3 xl:col-start-1 xl:col-end-2 2xl:row-start-1 2xl:row-end-3 2xl:col-start-3 2xl:col-end-4'
        >
          <WhiteCard className='md:h-[11rem]' centered>
            <FcSupport className='text-[10rem] lg:text-[8rem] xl:text-[6rem]' />
            <h2 className='text-orange-500 font-bold text-[22px] sm:text-2xl lg:text-3xl xl:text-4xl'>
              Actualizar Co-Pastor
            </h2>
            <p className='font-bold text-[14px] lg:text-[15px] xl:text-[16px]'>
              Actualizar información del registro de un co-pastor.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/copastors/delete-copastor'
          to='/copastors/delete-copastor'
          end
          className='row-start-5 row-end-6 lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-3 xl:row-start-3 xl:row-end-4 xl:col-start-1 xl:col-end-2 2xl:row-start-1 2xl:row-end-3 2xl:col-start-4 2xl:col-end-5'
        >
          <WhiteCard className='md:h-[11rem]' centered>
            <RiDeleteBin2Fill className='text-[10rem] lg:text-[7rem] xl:text-[6rem] text-red-500' />
            <h2 className='text-red-500 font-bold text-[22px] sm:text-2xl lg:text-3xl xl:text-4xl'>
              Eliminar Co-Pastor
            </h2>
            <p className='font-bold text-[14px] lg:text-[15px] xl:text-[16px]'>
              Eliminar el registro de un co-pastor.
            </p>
          </WhiteCard>
        </NavLink>
      </div>
    </>
  );
};
