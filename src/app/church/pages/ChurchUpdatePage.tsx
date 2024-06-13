import { dataChurches as data } from '@/app/church/data';

import { DataTableSearchByTerm } from '@/shared/components';
import { churchUpdateColumns } from '@/app/church/components';

export const ChurchUpdatePage = (): JSX.Element => {
  return (
    <div>
      <h1 className='text-center pt-3 md:pt-2 pb-4 font-sans text-2xl sm:text-3xl font-bold text-slate-500 dark:text-slate-400 text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Iglesia
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <div className='flex items-center justify-start'>
        <h2 className='flex items-center text-left pl-4 py-2 sm:pt-4 sm:pb-2 sm:pl-[1.5rem] xl:pl-[2rem] 2xl:pt-4 font-sans text-2xl sm:text-2xl font-bold text-orange-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.98rem] xl:text-[2.1rem] 2xl:text-4xl'>
          Buscar iglesias o anexos
        </h2>
        <span className='ml-3 bg-orange-300 text-slate-600 border text-center text-[10px] mt-[.6rem] sm:mt-5 -py-1 px-2 rounded-full font-bold uppercase'>
          Actualizar
        </span>
      </div>
      <p className='dark:text-slate-300 text-left font-sans font-bold px-4 text-[12.5px] md:text-[15px] xl:text-base sm:px-[1.5rem] xl:px-[2rem]'>
        Elige tus opciones de búsqueda para actualizar registros de iglesias.
      </p>

      <div className='px-4 md:-px-2 md:px-[2rem] xl:px-[3rem] py-4 w-full'>
        <DataTableSearchByTerm columns={churchUpdateColumns} data={data} />
      </div>
    </div>
  );
};
