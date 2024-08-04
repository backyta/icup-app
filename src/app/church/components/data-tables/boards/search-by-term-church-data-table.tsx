/* eslint-disable @typescript-eslint/promise-function-async */
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

import {
  ChurchSearchSelectOptionNames,
  ChurchSearchType,
  ChurchSearchTypeNames,
} from '@/app/church/enums';
import { getChurchesByTerm } from '@/app/church/services';
import { type ChurchSearchFormByTerm, type ChurchQueryParams } from '@/app/church/interfaces';

import { useChurchStore } from '@/stores/church';

import { LoadingSpinner } from '@/shared/components';
import { formatterDateToDDMMYYYY } from '@/shared/helpers';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
  searchParams: ChurchSearchFormByTerm | undefined;
  setSearchParams: React.Dispatch<React.SetStateAction<ChurchSearchFormByTerm | undefined>>;
  dataForm: ChurchSearchFormByTerm | undefined;
}

export function SearchByTermChurchDataTable<TData, TValue>({
  columns,
  searchParams,
  setSearchParams,
  dataForm,
}: DataTableProps<TData, TValue>): JSX.Element {
  //* States
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const isFiltersSearchByTermDisabled = useChurchStore(
    (state) => state.isFiltersSearchByTermDisabled
  );
  const setIsFiltersSearchByTermDisabled = useChurchStore(
    (state) => state.setIsFiltersSearchByTermDisabled
  );
  const setDataSearchByTermResResponse = useChurchStore(
    (state) => state.setDataSearchByTermResponse
  );

  const [isDisabledButton, setIsDisabledButton] = useState(false);

  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* Querys
  const query = useQuery({
    queryKey: ['churches-by-term', searchParams],
    queryFn: () => getChurchesByTerm(searchParams as ChurchQueryParams),
    enabled: !!searchParams,
    retry: 1,
  });

  //* Set data result query
  useEffect(() => {
    setDataSearchByTermResResponse(query.data);
  }, [query?.isFetching]);

  useEffect(() => {
    if (query.error?.message && query.error?.message !== 'Unauthorized') {
      toast.error(query?.error?.message, {
        position: 'top-center',
        className: 'justify-center',
      });

      setSearchParams(undefined);
      setIsFiltersSearchByTermDisabled(true);
    }

    if (query.error?.message === 'Unauthorized') {
      toast.error('Operación rechazada, el token expiro ingresa nuevamente.', {
        position: 'top-center',
        className: 'justify-center',
      });

      setSearchParams(undefined);
      setIsFiltersSearchByTermDisabled(true);

      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [query?.error]);

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
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='md:w-full m-auto lg:w-full'>
      <Toaster position='top-center' richColors />

      {!isFiltersSearchByTermDisabled && (
        <div>
          {/* Search Types */}
          <div>
            <span className='dark:text-offering-color text-search-color font-bold text-[14px] md:text-[15.5px]'>
              Tipo de búsqueda:
            </span>{' '}
            <span className='font-medium text-[13px] md:text-[14.5px] italic'>
              {`${
                Object.entries(ChurchSearchTypeNames).find(
                  ([key, value]) => key === dataForm?.searchType && value
                )?.[1] ?? ''
              }`}
            </span>
          </div>

          {/* Search Terms */}
          <div>
            <span className='text-indigo-500 font-bold text-[14px] md:text-[15.5px]'>
              Termino de búsqueda:
            </span>{' '}
            {(dataForm?.searchType === ChurchSearchType.ChurchName ||
              dataForm?.searchType === ChurchSearchType.Department ||
              dataForm?.searchType === ChurchSearchType.Province ||
              dataForm?.searchType === ChurchSearchType.Address ||
              dataForm?.searchType === ChurchSearchType.UrbanSector ||
              dataForm?.searchType === ChurchSearchType.District) && (
              <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                {`${dataForm?.inputTerm}`}
              </span>
            )}
            {dataForm?.searchType === ChurchSearchType.FoundingDate && (
              <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                {`${dataForm?.dateTerm?.from ? formatterDateToDDMMYYYY(dataForm?.dateTerm?.from) : ''} ${dataForm?.dateTerm?.to ? ` - ${formatterDateToDDMMYYYY(dataForm?.dateTerm?.to)}` : ''}`}
              </span>
            )}
            {dataForm?.searchType === ChurchSearchType.RecordStatus && (
              <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                {`${
                  Object.entries(ChurchSearchSelectOptionNames).find(
                    ([key, value]) => key === dataForm?.selectTerm && value
                  )?.[1]
                }`}
              </span>
            )}
          </div>

          {/* Inputs Filters */}
          <div className='pb-8 pt-4 lg:pb-8 grid grid-cols-2 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
            <Input
              placeholder='Filtro por nombre de iglesia...'
              value={(table.getColumn('churchName')?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                table.getColumn('churchName')?.setFilterValue(event.target.value)
              }
              className='text-[13px] lg:text-[14px] w-full col-start-1 col-end-2 row-start-1 row-end-2'
              disabled={isFiltersSearchByTermDisabled}
            />
            <Input
              placeholder='Filtro por distrito de la iglesia...'
              value={(table.getColumn('district')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('district')?.setFilterValue(event.target.value)}
              className='col-start-2 col-end-3 row-start-1 row-end-2 text-[13px] lg:text-[14px] w-full'
              disabled={isFiltersSearchByTermDisabled}
            />
            <Button
              disabled={isDisabledButton}
              variant='ghost'
              className='col-start-2 col-end-3 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-[8rem] px-4 py-2 border-1 bg-red-500 text-red-950 border-red-500 hover:bg-red-500 hover:text-white'
              onClick={() => {
                table.getColumn('churchName')?.setFilterValue('');
                table.getColumn('district')?.setFilterValue('');
              }}
            >
              Borrar
            </Button>
            <Button
              disabled={isDisabledButton}
              variant='ghost'
              className='col-start-1 col-end-2 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-500 hover:text-white'
              onClick={() => {
                setIsFiltersSearchByTermDisabled(true);
                table.getColumn('churchName')?.setFilterValue('');
                table.getColumn('district')?.setFilterValue('');
              }}
            >
              Nueva Búsqueda
            </Button>
          </div>
        </div>
      )}

      {/* Render data table */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader className='px-2'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className='text-center text-slate-700 dark:text-slate-200 font-bold text-[13px] lg:text-sm'
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

          {!query?.error && !isFiltersSearchByTermDisabled && !query.isPending && (
            <TableBody>
              {table?.getRowModel()?.rows?.length ? (
                table?.getRowModel()?.rows.map((row) => (
                  <TableRow
                    className='text-center font-normal text-[13px] lg:text-[14px]'
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
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    Sin resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {!query?.error && !isFiltersSearchByTermDisabled && !query.isPending && (
        <div className='flex items-center justify-end space-x-2 py-4'>
          <Button
            className='text-[13px] lg:text-sm'
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
