import { NavLink } from 'react-router-dom';

import { WhiteCard } from '@/shared/components/white-cards';
import { FcCancel, FcClearFilters, FcReadingEbook, FcSearch, FcSupport } from 'react-icons/fc';

export const UserOptionsPage = (): JSX.Element => {
  return (
    <>
      <h1 className='text-center pb-2 pt-1 md:pt-2 md:pb-2 font-sans text-2xl sm:text-3xl font-bold text-user-color text-[2rem] sm:text-[2.4rem] md:text-[2.6rem] lg:text-5xl xl:text-5xl'>
        Modulo Usuarios
      </h1>
      <p className='text-center font-sans text-sm sm:text-md md:text-[15px] font-bold px-4 pb-4 lg:text-base xl:text-lg'>
        Bienvenido al modulo Usuario, por favor elige una opción.
      </p>
      <hr className='p-[0.015rem] bg-slate-500' />

      <div className='w-full px-[2rem] py-6 sm:px-[7rem] md:px-[4rem] lg:px-[3rem] xl:px-[3rem] 2xl:px-16 grid gap-8 md:gap-6 xl:gap-5 2xl:gap-4 grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 2xl:grid-cols-4 2xl:grid-rows-1 h-auto 2xl:h-[43rem]'>
        <NavLink
          key='/users/create-user'
          to='/users/create-user'
          end
          className='row-start-1 row-end-2 md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-2 lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2 xl:row-start-1 xl:row-end-2 xl:col-start-1 xl:col-end-2 2xl:row-start-1 2xl:row-end-3 2xl:col-start-1 2xl:col-end-2'
        >
          <WhiteCard centered>
            <FcReadingEbook className='text-[10rem] lg:text-[8rem] xl:text-[7rem]' />
            <h2 className='text-green-500 font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl'>
              Crear Usuario
            </h2>
            <p className='font-bold text-xs sm:text-sm lg:text-[15px] xl:text-[16px]'>
              Registrar información de un nuevo usuario.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/users/search-users'
          to='/users/search-users'
          end
          className='row-start-2 row-end-3 lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-2 xl:row-start-1 xl:row-end-3 xl:col-start-2 xl:col-end-3 2xl:row-start-1 2xl:row-end-2 2xl:col-start-2 2xl:col-end-3 '
        >
          <WhiteCard centered>
            <FcSearch className='text-[10rem] lg:text-[7rem] xl:text-[8rem]' />
            <h2 className='text-blue-500 font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl'>
              Buscar Usuario
            </h2>
            <p className='font-bold text-xs sm:text-sm lg:text-[15px] xl:text-[16px]'>
              Búsqueda de usuarios en general.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/users/search-by-term-users'
          to='/users/search-by-term-users'
          end
          className='row-start-3 row-end-4 lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3 xl:row-start-3 xl:row-end-4 xl:col-start-2 xl:col-end-3 2xl:row-start-2 2xl:row-end-3 2xl:col-start-2 2xl:col-end-3'
        >
          <WhiteCard centered>
            <FcClearFilters className='text-[10rem] lg:text-[6rem] xl:text-[6rem]' />
            <h2 className='text-sky-500 font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl'>
              Buscar Usuario
            </h2>
            <p className='font-bold text-xs sm:text-sm lg:text-[15px] xl:text-[16px]'>
              Búsqueda de usuarios por termino o filtro.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/users/update-user'
          to='/users/update-user'
          end
          className='row-start-4 row-end-5 lg:h-full lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3 xl:row-start-2 xl:row-end-3 xl:col-start-1 xl:col-end-2 2xl:row-start-1 2xl:row-end-3 2xl:col-start-3 2xl:col-end-4'
        >
          <WhiteCard centered>
            <FcSupport className='text-[10rem] lg:text-[8rem] xl:text-[6rem]' />
            <h2 className='text-orange-500 font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl'>
              Actualizar Usuario
            </h2>
            <p className='font-bold text-xs sm:text-sm lg:text-[15px] xl:text-[16px]'>
              Actualizar información del registro de un usuario.
            </p>
          </WhiteCard>
        </NavLink>

        <NavLink
          key='/users/delete-user'
          to='/users/delete-user'
          end
          className='row-start-5 row-end-6 lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-3 xl:row-start-3 xl:row-end-4 xl:col-start-1 xl:col-end-2 2xl:row-start-1 2xl:row-end-3 2xl:col-start-4 2xl:col-end-5'
        >
          <WhiteCard centered>
            <FcCancel className='text-[10rem] lg:text-[7rem] xl:text-[6rem]' />
            <h2 className='text-red-500 font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl'>
              Eliminar Usuario
            </h2>
            <p className='font-bold text-xs sm:text-sm lg:text-[15px] xl:text-[16px]'>
              Marcar como inactivo el registro de un usuario.
            </p>
          </WhiteCard>
        </NavLink>
      </div>
    </>
  );
};
