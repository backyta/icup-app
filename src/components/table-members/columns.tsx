/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { InfoCard } from '../info-card/InfoCard';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Member {
  id: string;
  first_name: string;
  last_name: string;
  gender: 'M' | 'F'; // hacer enum con data para value
  date_birth: string;
}

export const columns: Array<ColumnDef<Member, any>> = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'first_name',
    header: ({ column }) => {
      return (
        <Button
          className='text-[13px] lg:text-sm'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Nombres
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'last_name',
    header: ({ column }) => {
      return (
        <Button
          className='text-[13px] lg:text-sm'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Apellidos
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => {
      return (
        <Button
          className='text-[13px] lg:text-sm'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Genero
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'date_birth',
    header: ({ column }) => {
      return (
        <Button
          className='text-[13px] lg:text-sm'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Fecha de Nacimiento
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: (info) => format(new Date(info.getValue()), 'dd/MM/yyyy'),
  },

  {
    id: 'search',
    cell: () => {
      return (
        // <Button
        //   variant='ghost'
        //   className='h-full w-auto px-4 py-2 border border-slate-500 bg-slate-200 hover:bg-slate-300 dark:bg-slate-950 dark:hover:bg-slate-900'
        // >
        //   Ver Información
        // </Button>
        <InfoCard />
      );
    },
  },
];
