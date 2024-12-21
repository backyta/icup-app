/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { ArrowUpDown } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';

import { Button } from '@/shared/components/ui/button';

import { type FamilyGroupColumns } from '@/modules/family-group/interfaces/family-group-columns.interface';

import { FamilyGroupInfoCard } from '@/modules/family-group/components/cards/info/FamilyGroupInfoCard';
import { FamilyGroupUpdateCard } from '@/modules/family-group/components/cards/update/FamilyGroupUpdateCard';
import { FamilyGroupPreacherUpdateCard } from '@/modules/family-group/components/cards/update/FamilyGroupPreacherUpdateCard';

export const familyGroupUpdateColumns: Array<ColumnDef<FamilyGroupColumns, any>> = [
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
    id: 'familyGroupName',
    accessorKey: 'familyGroupName',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Nombre
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'familyGroupCode',
    accessorKey: 'familyGroupCode',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px]'
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
    id: 'district',
    accessorKey: 'district',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Distrito
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'urbanSector',
    accessorKey: 'urbanSector',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Sec. Urbano
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
      return info.getValue() === '-' ? '-' : <FamilyGroupInfoCard idRow={id} />;
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
    id: 'editInfo',
    accessorKey: 'id',
    cell: (info) => {
      const id = info.row.original.id;
      return info.getValue() === '-' ? '-' : <FamilyGroupUpdateCard idRow={id} />;
    },
    header: () => {
      return (
        <Button
          className='font-bold text-[14px] md:text-[14px] text-orange-500 hover:text-orange-500'
          variant='ghost'
        >
          Actualizar
        </Button>
      );
    },
  },
  {
    id: 'exchangePreacher',
    accessorKey: 'id',
    cell: (info) => {
      const id = info.row.original.id;
      return info.getValue() === '-' ? '-' : <FamilyGroupPreacherUpdateCard idRow={id} />;
    },
    header: () => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px] text-emerald-500 hover:text-emerald-500'
          variant='ghost'
        >
          Predicador
        </Button>
      );
    },
  },
];
