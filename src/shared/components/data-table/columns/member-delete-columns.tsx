/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';

import { Button } from '@/shared/components/ui/button';
import { MemberDeleteCard, MemberInfoCard } from '@/shared/components';

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  gender: 'M' | 'F'; // hacer enum con data para value
  date_birth: string;
  zone: string;
}

// TODO : lo otro seria pasar el id de la DB del registro aca y que lo tome el button y con eso hacer la solicitud
// TODO : y tmb ocultar ese ID con un map para que se enumero de 1, 2....

// NOTE: usar este mismo método para la data del dashboard en el botón.
export const memberDeleteColumns: Array<ColumnDef<Member, any>> = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          ID
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'first_name',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px]'
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
          className='font-bold text-[13px] md:text-[14px]'
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
          className='font-bold text-[13px] md:text-[14px]'
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
          className='font-bold text-[13px] md:text-[14px]'
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
    accessorKey: 'zone',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Zona
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'showInfo',
    cell: () => {
      return <MemberInfoCard />;
    },
  },
  {
    id: 'deleteInfo',
    cell: () => {
      return <MemberDeleteCard />;
    },
  },
];
