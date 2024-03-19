/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { InfoCard } from '../info-card/InfoCard';
import { UpdateCard } from '..';

export interface User {
  id: string;
  first_name: string; // hacer mapping
  last_name: string;
  email: string;
  roles: string;
}

// TODO : lo otro seria pasar el id de la DB del registro aca y que lo tome el button y con eso hacer la solicitud
// TODO : y tmb ocultar ese ID con un map para que se enumero de 1, 2....

// NOTE: usar este mismo método para la data del dashboard en el botón.
export const userUpdateColumns: Array<ColumnDef<User, any>> = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          className='text-[13px] lg:text-sm'
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
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          className='text-[13px] lg:text-sm'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Correo Electrónico
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'roles',
    header: ({ column }) => {
      return (
        <Button
          className='text-[13px] lg:text-sm'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Roles
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'search',
    cell: () => {
      return <InfoCard />;
    },
  },
  {
    id: 'updateInfo',
    cell: () => {
      return <UpdateCard />;
    },
  },
];
