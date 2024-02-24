/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { InfoCard } from '../info-card/InfoCard';

export interface FamilyHouse {
  id: string;
  zone: string;
  code: string;
  name_house: string;
  count_members: number;
}

// TODO : crear las demás cols para las otras search de tables

export const familyHouseColumns: Array<ColumnDef<FamilyHouse, any>> = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'zone',
    header: ({ column }) => {
      return (
        <Button
          className='text-[13px] lg:text-sm'
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
    accessorKey: 'code',
    header: ({ column }) => {
      return (
        <Button
          className='text-[13px] lg:text-sm'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Código
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'name_house',
    header: ({ column }) => {
      return (
        <Button
          className='text-[13px] lg:text-sm'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Nombre de Casa Familiar
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'count_members',
    header: ({ column }) => {
      return (
        <Button
          className='text-[13px] lg:text-sm'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Cantidad de Miembros
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
];
