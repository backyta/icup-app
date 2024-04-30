import { offeringExpensesInfoColumns } from '@/app/offering/expenses/components';
import { dataOfferingsExpenses as data } from '@/app/offering/expenses/data';

import { DataTableSearchByTerm } from '@/shared/components';

export const OfferingsExpensesSearchPageByTerm = (): JSX.Element => {
  return (
    <div>
      <h1 className='text-center pt-1 pb-4 font-sans text-2xl sm:text-3xl font-bold text-offering-color text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Ofrendas
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <div className='flex items-center justify-start relative'>
        <h2 className='w-[18.5rem] sm:w-auto flex items-center text-left pl-4 py-2 sm:pt-4 sm:pb-2 sm:pl-[1.5rem] xl:pl-[2rem] 2xl:pt-4 font-sans text-2xl sm:text-2xl font-bold text-sky-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.98rem] xl:text-[2.1rem] 2xl:text-4xl'>
          Buscar registros de salida
        </h2>
        <span className='absolute left-24 sm:left-0 sm:relative sm:ml-3 bg-sky-300 text-slate-600 border text-center text-[10px] mt-[2.2rem] sm:mt-5 -py-1 px-2 rounded-full font-bold uppercase'>
          Por tipo
        </span>
      </div>
      <p className='dark:text-slate-300 text-left font-sans font-bold px-4 text-[12.5px] md:text-[15px] xl:text-base sm:px-[1.5rem] xl:px-[2rem]'>
        Explora, filtra y organiza los registros de salida de ofrendas según tus necesidades.
      </p>

      <div className='px-4 md:-px-2 md:px-[2rem] xl:px-[3rem] py-4 w-full'>
        <DataTableSearchByTerm columns={offeringExpensesInfoColumns} data={data} />
      </div>
    </div>
  );
};
