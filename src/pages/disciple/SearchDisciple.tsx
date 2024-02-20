import { type Member, columns } from '@/components/members/columns';
import { DataTable } from '@/components/members/data-table';

async function getData(): Promise<Member[]> {
  // Fetch data from your API here.
  return [
    {
      first_name: 'Roberto Carlos',
      last_name: 'García',
      date_birth: '1985-03-15',
      gender: 'male',
    },
    {
      first_name: 'María Fernanda',
      last_name: 'Martínez',
      date_birth: '1990-07-21',
      gender: 'female',
    },
    {
      first_name: 'Juan Pablo',
      last_name: 'López',
      date_birth: '1988-12-10',
      gender: 'male',
    },
    {
      first_name: 'Ana María',
      last_name: 'Sánchez',
      date_birth: '1983-05-02',
      gender: 'female',
    },
    {
      first_name: 'Pedro José',
      last_name: 'Hernández',
      date_birth: '1995-09-28',
      gender: 'male',
    },
    {
      first_name: 'Luisa Fernanda',
      last_name: 'Gómez',
      date_birth: '1998-11-17',
      gender: 'female',
    },
    {
      first_name: 'Diego Alejandro',
      last_name: 'Díaz',
      date_birth: '1987-04-09',
      gender: 'male',
    },
    {
      first_name: 'Camila Andrea',
      last_name: 'Alvarez',
      date_birth: '1992-08-03',
      gender: 'female',
    },
    {
      first_name: 'José Antonio',
      last_name: 'Pérez',
      date_birth: '1980-01-25',
      gender: 'male',
    },
    {
      first_name: 'Laura Alejandra',
      last_name: 'Castro',
      date_birth: '1994-06-12',
      gender: 'female',
    },
    {
      first_name: 'Laura Alejandra',
      last_name: 'Castro',
      date_birth: '1994-06-12',
      gender: 'female',
    },
    // ...
  ];
}

const data = await getData();
export default function SearchDisciple(): JSX.Element {
  return (
    <div>
      <h1 className='text-center pt-1 pb-4 font-sans text-2xl sm:text-3xl font-bold text-blue-500 text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Discípulo
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h2 className='text-left px-4 py-2 sm:px-5 sm:pt-4 sm:pb-2 2xl:px-24 2xl:pt-4 font-sans text-2xl sm:text-2xl font-bold text-green-500 text-[1.55rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.9rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Buscar discípulos
      </h2>
      <p className='dark:text-slate-300 text-left font-sans font-bold px-4 sm:px-5 text-sm md:text-[15px] xl:text-base 2xl:px-24'>
        Busca, filtra u ordena los discípulos que necesites.
      </p>

      <div className='container mx-auto py-2'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
