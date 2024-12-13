/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { addDays, format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';

import { OfferingIncomeInfoCard } from '@/modules/offering/income/components/cards/info/OfferingIncomeInfoCard';
import { OfferingIncomeUpdateCard } from '@/modules/offering/income/components/cards/update/OfferingIncomeUpdateCard';
import { OfferingIncomeCurrencyExchangeCard } from '@/modules/offering/income/components/cards/update/OfferingIncomeCurrencyExchangeCard';

import { type OfferingIncomeColumns } from '@/modules/offering/income/interfaces/offering-income-columns.interface';

import { Button } from '@/shared/components/ui/button';
import { CurrencyTypeNames } from '@/modules/offering/shared/enums/currency-type.enum';

export const offeringIncomeUpdateColumns: Array<ColumnDef<OfferingIncomeColumns, any>> = [
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
    id: 'type',
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Tipo
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'subType',
    accessorKey: 'subType',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Sub-tipo
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'amount',
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Monto
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'currency',
    accessorKey: 'currency',
    cell: (info) => {
      const currency = info.getValue();
      const entry = Object.entries(CurrencyTypeNames).find(([key]) => key === currency);
      return entry ? entry[1] : 'Moneda desconocida';
    },
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Divisa
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'date',
    accessorKey: 'date',
    cell: (info) => {
      const date = info.getValue();
      const adjustedDate = date ? addDays(date, 1) : null;
      return format(new Date(adjustedDate), 'dd/MM/yyyy');
    },
    header: ({ column }) => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px]'
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Fecha
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
      return info.getValue() === '-' ? '-' : <OfferingIncomeInfoCard idRow={id} />;
    },
    header: () => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px] text-blue-500 hover:text-blue-500'
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
      return info.getValue() === '-' ? '-' : <OfferingIncomeUpdateCard idRow={id} />;
    },
    header: () => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px] text-orange-500 hover:text-orange-500'
          variant='ghost'
        >
          Actualizar
        </Button>
      );
    },
  },
  {
    id: 'currencyExchange',
    accessorKey: 'id',
    cell: (info) => {
      const id = info.row.original.id;
      return info.getValue() === '-' ? '-' : <OfferingIncomeCurrencyExchangeCard idRow={id} />;
    },
    header: () => {
      return (
        <Button
          className='font-bold text-[13px] md:text-[14px] text-teal-500 hover:text-teal-500'
          variant='ghost'
        >
          Cambio
        </Button>
      );
    },
  },
];
