/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { ArrowUpDown } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';

import { formatDateToLimaDayMonthYear } from '@/shared/helpers/format-date-to-lima';

import { SupervisorInfoCard } from '@/modules/supervisor/components/cards/info/SupervisorInfoCard';
import { SupervisorInactivateCard } from '@/modules/supervisor/components/cards/inactivate/SupervisorInactivateCard';

import { Button } from '@/shared/components/ui/button';
import { type SupervisorColumns } from '@/modules/supervisor/interfaces/supervisor-columns.interface';

export const supervisorInactivateColumns: Array<ColumnDef<SupervisorColumns, any>> = [
  {
    id: 'id',
    accessorKey: 'id',
    cell: (info) => {
      const id = info.getValue();
      return id.substring(0, 7);
    },
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px]'
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
    id: 'firstNames',
    accessorKey: 'member.firstNames',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px]'
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
    id: 'lastNames',
    accessorKey: 'member.lastNames',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px]'
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
    id: 'gender',
    accessorKey: 'member.gender',
    cell: (info) => {
      const gender = info.getValue();
      return gender === 'male' ? 'M' : 'F';
    },
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Género
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'birthDate',
    accessorKey: 'member.birthDate',
    cell: (info) => {
      const birthDate = info.getValue();
      const adjustedDate = birthDate ? birthDate : null;
      return formatDateToLimaDayMonthYear(adjustedDate);
    },
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Fecha Nacimiento
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },

  {
    id: 'showInfo',
    accessorKey: 'id',
    cell: (info) => {
      const id = info.row.original.id;
      return info.getValue() === '-' ? '-' : <SupervisorInfoCard idRow={id} />;
    },
    header: () => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px] text-blue-500 hover:text-blue-500'
          variant='ghost'
        >
          Info
        </Button>
      );
    },
  },

  {
    id: 'inactivateRecord',
    accessorKey: 'id',
    cell: (info) => {
      const id = info.row.original.id;
      return info.getValue() === '-' ? '-' : <SupervisorInactivateCard idRow={id} />;
    },
    header: () => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px] text-red-500 hover:text-red-500'
          variant='ghost'
        >
          Inactivar
        </Button>
      );
    },
  },
];
