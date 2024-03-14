import {
  memberUpdateColumns,
  DataTableSearchByTerm,
} from '@/components/data-table';
import { dataMembers as data } from '../../data';

export const UpdateCopastorPage = (): JSX.Element => {
  return (
    <div>
      <h1 className='text-center pt-1 pb-4 font-sans text-2xl sm:text-3xl font-bold text-blue-500 text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Co-Pastor
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h2 className='text-left px-4 py-2 sm:px-2 sm:pt-4 sm:pb-2 xl:px-[2rem] 2xl:px-24 2xl:pt-4 font-sans text-2xl sm:text-2xl font-bold text-green-500 text-[1.55rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.9rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Buscar co-pastores para actualizar
      </h2>
      <p className='dark:text-slate-300 text-left font-sans font-bold px-4 sm:px-2 text-sm md:text-[15px] xl:text-base xl:px-[2rem] 2xl:px-24'>
        Busca los co-pastores que serán actualizados.
      </p>

      <div className='px-4 md:-px-2 lg:px-[2rem] xl:px-[3rem] 2xl:px-36 py-4 w-full'>
        <DataTableSearchByTerm columns={memberUpdateColumns} data={data} />
      </div>
    </div>
  );
};
