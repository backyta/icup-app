/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type ColumnFiltersState,
} from '@tanstack/react-table';

import { getDisciples } from '@/modules/disciple/services';
import { type DiscipleQueryParams } from '@/modules/disciple/interfaces';

import { useDiscipleStore } from '@/stores/disciple';
import { LoadingSpinner } from '@/shared/components';
import { type GeneralSearchForm } from '@/shared/interfaces';

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/shared/components/ui/table';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
  searchParams: GeneralSearchForm | undefined;
  setSearchParams: React.Dispatch<React.SetStateAction<GeneralSearchForm | undefined>>;
}

export function GeneralDiscipleSearchDataTable<TData, TValue>({
  columns,
  searchParams,
  setSearchParams,
}: DataTableProps<TData, TValue>): JSX.Element {
  //* States
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const isFiltersSearchGeneralDisabled = useDiscipleStore(
    (state) => state.isFiltersSearchGeneralDisabled
  );
  const setIsFiltersSearchGeneralDisabled = useDiscipleStore(
    (state) => state.setIsFiltersSearchGeneralDisabled
  );
  const setDataSearchGeneralResponse = useDiscipleStore(
    (state) => state.setDataSearchGeneralResponse
  );

  const [isDisabledButton, setIsDisabledButton] = useState(false);

  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* Queries
  const query = useQuery({
    queryKey: ['general-disciples', searchParams],
    queryFn: () => getDisciples(searchParams as DiscipleQueryParams),
    enabled: !!searchParams,
    retry: 1,
  });

  //* Set data result query
  useEffect(() => {
    setDataSearchGeneralResponse(query.data);
  }, [query?.isFetching]);

  useEffect(() => {
    if (query.error?.message && query.error?.message !== 'Unauthorized') {
      toast.error(query?.error?.message, {
        position: 'top-center',
        className: 'justify-center',
      });

      setSearchParams(undefined);
      setIsFiltersSearchGeneralDisabled(true);
    }

    if (query.error?.message === 'Unauthorized') {
      toast.error('Operación rechazada, el token expiro ingresa nuevamente.', {
        position: 'top-center',
        className: 'justify-center',
      });

      setSearchParams(undefined);
      setIsFiltersSearchGeneralDisabled(true);

      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [query?.error]);

  //* Disabled button while query is pending
  useEffect(() => {
    if (query?.isPending) {
      setIsDisabledButton(true);
      return;
    }

    setIsDisabledButton(false);
  }, [query?.isPending]);

  //* Table
  const table = useReactTable({
    data: query.data as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
      <Toaster position='top-center' richColors />
      {!isFiltersSearchGeneralDisabled && (
        <div>
          <span className='text-offering-color font-bold text-[14px] md:text-[16px]'>
            Búsqueda actual:
          </span>{' '}
          <span className='font-medium text-[13px] md:text-[15px]'>Discípulos (Todos)</span>
          <div className='pb-8 lg:pb-8 grid grid-cols-2 gap-3 lg:flex lg:items-center py-4 md:py-6 lg:py-4 lg:gap-6'>
            <Input
              placeholder='Filtro por nombres..'
              value={(table.getColumn('firstName')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('firstName')?.setFilterValue(event.target.value)}
              className='text-[13px] lg:text-[14px] w-full col-start-1 col-end-2 row-start-1 row-end-2'
              disabled={isFiltersSearchGeneralDisabled}
            />
            <Input
              placeholder='Filtro por apellidos...'
              value={(table.getColumn('lastName')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('lastName')?.setFilterValue(event.target.value)}
              className='col-start-2 col-end-3 row-start-1 row-end-2 text-[13px] lg:text-[14px] w-full'
              disabled={isFiltersSearchGeneralDisabled}
            />
            <Button
              disabled={isDisabledButton}
              variant='ghost'
              className='col-start-2 col-end-3 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-500 hover:text-white'
              onClick={() => {
                table.getColumn('firstName')?.setFilterValue('');
                table.getColumn('lastName')?.setFilterValue('');
              }}
            >
              Borrar
            </Button>
            <Button
              disabled={isDisabledButton}
              variant='ghost'
              className='col-start-1 col-end-2 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-500 hover:text-white'
              onClick={() => {
                setIsFiltersSearchGeneralDisabled(true);
                table.getColumn('firstName')?.setFilterValue('');
                table.getColumn('lastName')?.setFilterValue('');
              }}
            >
              Nueva Búsqueda
            </Button>
          </div>
        </div>
      )}

      <div className='rounded-md border '>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className='text-center text-slate-700 dark:text-slate-200'
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {!query?.error && !isFiltersSearchGeneralDisabled && !query.isPending && (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className='text-center font-normal text-[13px] md:text-[14px]'
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className='px-2 lg:px-4 py-2.5' key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns?.length} className='h-24 text-center'>
                    Sin resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {!query?.error && !isFiltersSearchGeneralDisabled && !query.isPending && (
        <div className='flex items-center justify-end space-x-2 py-4'>
          <Button
            className='text-[13px] lg:text-[14px]'
            variant='outline'
            size='sm'
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            className='text-[13px] lg:text-sm'
            variant='outline'
            size='sm'
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      )}

      {searchParams && query?.isPending && (
        <div className='py-10'>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
