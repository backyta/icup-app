import { userInfoColumns } from '@/app/user/components';

import { DataTableSearchByTerm } from '@/shared/components';
import { dataUsers as data } from '@/shared/data';

export const UsersSearchPageByTerm = (): JSX.Element => {
  return (
    <div>
      <h1 className='text-center pt-1 pb-4 font-sans text-2xl sm:text-3xl font-bold text-user-color text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Usuario
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h2 className='text-left px-4 py-2 sm:pt-4 sm:pb-2 sm:px-[1.5rem] xl:px-[2rem] 2xl:pt-4 font-sans text-2xl sm:text-2xl font-bold text-sky-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.98rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Buscar usuarios por termino
      </h2>
      <p className='dark:text-slate-300 text-left font-sans font-bold px-4 text-[12.5px] md:text-[15px] xl:text-base sm:px-[1.5rem] xl:px-[2rem]'>
        Busca, filtra u ordena los usuarios que necesites.
      </p>

      <div className='px-4 md:-px-2 md:px-[2rem] xl:px-[3rem] py-4 w-full'>
        <DataTableSearchByTerm columns={userInfoColumns} data={data} />
      </div>
    </div>
  );
};

// NOTE : aquí debo hacer el fetch y traer la data y hacer un filter o map para recuperar solo lo necesario
// NOTE: que se presentara en la tabla según las columnas.
