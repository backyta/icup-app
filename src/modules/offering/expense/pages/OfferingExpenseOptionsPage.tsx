/* eslint-disable @typescript-eslint/no-floating-promises */

import { useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import { GiExpense } from 'react-icons/gi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FcClearFilters, FcSearch, FcSupport } from 'react-icons/fc';

import { useAuthStore } from '@/stores/auth/auth.store';
import { WhiteCard } from '@/shared/components/card/WhiteCard';

export const OfferingExpenseOptionsPage = (): JSX.Element => {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    document.title = 'Modulo Ofrenda - IcupApp';
  }, []);

  return (
    <div className='animate-fadeIn'>
      <h1 className='text-center pb-2 pt-2 md:pt-2 md:pb-2 font-sans text-2xl sm:text-3xl font-bold text-red-600 text-[2rem] sm:text-[2.4rem] md:text-[2.6rem] lg:text-5xl xl:text-5xl'>
        Modulo de Salida
      </h1>
      <p className='text-center font-sans text-sm sm:text-md md:text-[15px] font-bold px-4 pb-4 lg:text-base xl:text-lg'>
        Bienvenido, por favor elige una opción.
      </p>
      <hr className='p-[0.015rem] bg-slate-500' />

      <div className='w-full pt-6 pb-10 px-[2rem] sm:px-[7rem] md:px-[4rem] lg:px-[3rem] xl:px-[3rem] 2xl:px-[4rem] grid gap-8 md:gap-6 2xl:gap-4 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 lg:grid-rows-3 2xl:grid-rows-3 h-auto lg:h-[58rem] xl:min-h-screen'>
        <NavLink
          key='/offerings/expenses/create'
          to='/offerings/expenses/create'
          end
          className='row-start-1 row-end-2 md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-2 lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2 xl:row-start-1 xl:row-end-2 xl:col-start-1 xl:col-end-2 2xl:row-start-1 2xl:row-end-4 2xl:col-start-1 2xl:col-end-2'
        >
          <WhiteCard centered>
            <GiExpense className='text-[10rem] md:text-[6rem] xl:text-[7rem] text-amber-500' />
            <h2 className='text-green-500 font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl'>
              Registrar Salida
            </h2>
            <p className='font-bold text-xs sm:text-sm lg:text-[15px] xl:text-[16px]'>
              Crear nuevo registro de salida de una ofrenda
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/offerings/expenses/general-search'
          to='/offerings/expenses/general-search'
          end
          className='row-start-2 row-end-3 lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-2 xl:row-start-1 xl:row-end-3 xl:col-start-2 xl:col-end-3 2xl:row-start-1 2xl:row-end-3 2xl:col-start-2 2xl:col-end-3'
        >
          <WhiteCard centered>
            <FcSearch className='text-[10rem] md:text-[6rem] xl:text-[7rem]' />
            <h2 className='text-blue-500 font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl'>
              Consultar Salidas
            </h2>
            <p className='font-bold text-xs sm:text-sm lg:text-[15px] xl:text-[16px]'>
              Consultar registros de salida de ofrendas en general
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/offerings/expenses/search-by-term'
          to='/offerings/expenses/search-by-term'
          end
          className='row-start-3 row-end-4 lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3 xl:row-start-3 xl:row-end-4 xl:col-start-2 xl:col-end-3 2xl:row-start-3 2xl:row-end-4 2xl:col-start-2 2xl:col-end-3'
        >
          <WhiteCard centered>
            <FcClearFilters className='text-[10rem] md:text-[6rem] xl:text-[7rem]' />
            <h2 className='text-sky-500 font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl break-words'>
              Consultar <span className='2xl:block'>Salidas</span>
            </h2>
            <p className='font-bold text-xs sm:text-sm lg:text-[15px] xl:text-[16px]'>
              Consultar registros de salida de ofrendas por filtros
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/offerings/expenses/update'
          to='/offerings/expenses/update'
          end
          className='row-start-4 row-end-5 lg:h-full lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3 xl:row-start-2 xl:row-end-3 xl:col-start-1 xl:col-end-2 2xl:row-start-1 2xl:row-end-4 2xl:col-start-3 2xl:col-end-4'
        >
          <WhiteCard centered>
            <FcSupport className='text-[10rem] md:text-[6rem] xl:text-[7rem]' />
            <h2 className='text-orange-500 font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl'>
              Actualizar Salida
            </h2>
            <p className='font-bold text-xs sm:text-sm lg:text-[15px] xl:text-[16px]'>
              Actualizar registro de salida de una ofrenda
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/offerings/expenses/inactivate'
          to='/offerings/expenses/inactivate'
          end
          className='row-start-5 row-end-6 lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-3 xl:row-start-3 xl:row-end-4 xl:col-start-1 xl:col-end-2 2xl:row-start-1 2xl:row-end-4 2xl:col-start-4 2xl:col-end-5'
        >
          <WhiteCard centered>
            <RiDeleteBin2Fill className='text-[4rem] md:text-[6rem] xl:text-[7rem] text-red-500' />
            <h2 className='text-red-500 font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl'>
              Inactivar Salida
            </h2>
            <p className='font-bold text-xs sm:text-sm lg:text-[15px] xl:text-[16px]'>
              Inactivar registro de salida de una ofrenda
            </p>
          </WhiteCard>
        </NavLink>
      </div>
    </div>
  );
};

export default OfferingExpenseOptionsPage;
