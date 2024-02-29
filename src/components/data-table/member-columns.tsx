/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { format } from 'date-fns';

import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { InfoCard } from '../info-card/InfoCard';

export interface Member {
  id: string;
  first_name: string;
  last_name: string;
  gender: 'M' | 'F'; // hacer enum con data para value
  date_birth: string;
}

// TODO : lo otro seria pasar el id de la DB del registro aca y que lo tome el button y con eso hacer la solicitud
// TODO : y tmb ocultar ese ID con un map para que se enumero de 1, 2....

// NOTE: usar este mismo método para la data del dashboard en el botón.
export const memberColumns: Array<ColumnDef<Member, any>> = [
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
      return <InfoCard />;
    },
  },
];
