/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useEffect, useState } from 'react';

import { Toaster, toast } from 'sonner';
import { cn } from '@/shared/lib/utils';
import { useNavigate } from 'react-router-dom';
import { FaRegFilePdf } from 'react-icons/fa6';
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

import { getChurches, getGeneralChurchesReport } from '@/modules/church/services/church.service';
import { type ChurchQueryParams } from '@/modules/church/interfaces/church-query-params.interface';

import { useChurchStore } from '@/stores/church/church.store';

import { LoadingSpinner } from '@/shared/components/spinner/LoadingSpinner';
import { type GeneralSearchForm } from '@/shared/interfaces/search-general-form.interface';

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

export function GeneralChurchSearchDataTable<TData, TValue>({
  columns,
  searchParams,
  setSearchParams,
}: DataTableProps<TData, TValue>): JSX.Element {
  //* States
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const isFiltersSearchGeneralDisabled = useChurchStore(
    (state) => state.isFiltersSearchGeneralDisabled
  );
  const setIsFiltersSearchGeneralDisabled = useChurchStore(
    (state) => state.setIsFiltersSearchGeneralDisabled
  );
  const setDataSearchGeneralResponse = useChurchStore(
    (state) => state.setDataSearchGeneralResponse
  );

  const [isDisabledButton, setIsDisabledButton] = useState(false);

  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* Queries
  const query = useQuery({
    queryKey: ['general-churches', searchParams],
    queryFn: () => getChurches(searchParams as ChurchQueryParams),
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

  //* Query Report and Event trigger
  const generateReportQuery = useQuery({
    queryKey: ['general-churches-report', searchParams],
    queryFn: () => getGeneralChurchesReport(searchParams as ChurchQueryParams),
    retry: 1,
    enabled: false,
  });

  const handleGenerateReport = (): void => {
    generateReportQuery.refetch();
  };

  return (
    <div>
      <Toaster position='top-center' richColors />
      {!isFiltersSearchGeneralDisabled && (
        <div>
          <span className='text-offering-color font-bold text-[14px] md:text-[16px]'>
            Búsqueda actual:
          </span>{' '}
          <span className='font-medium text-[13px] md:text-[15px]'>Iglesias y anexos (Todas)</span>
          <div className='pb-8 lg:pb-8 grid grid-cols-2 gap-3 lg:flex lg:items-center py-4 md:py-6 lg:py-4 lg:gap-6'>
            <Input
              disabled={isDisabledButton}
              placeholder='Filtro por nombre de iglesia...'
              value={(table.getColumn('abbreviatedChurchName')?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                table.getColumn('abbreviatedChurchName')?.setFilterValue(event.target.value)
              }
              className='text-[13px] lg:text-[14px] w-full col-start-1 col-end-2 row-start-1 row-end-2'
            />
            <Input
              disabled={isDisabledButton}
              placeholder='Filtro por distrito...'
              value={(table.getColumn('district')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('district')?.setFilterValue(event.target.value)}
              className='col-start-2 col-end-3 row-start-1 row-end-2 text-[13px] lg:text-[14px] w-full'
            />
            <Button
              disabled={isDisabledButton}
              variant='ghost'
              className='col-start-2 col-end-3 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-[8rem] px-4 py-2 border-1 border-red-500 bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white hover:text-red-100 hover:from-red-500 hover:via-red-600 hover:to-red-700 dark:from-red-600 dark:via-red-700 dark:to-red-800 dark:text-gray-100 dark:hover:text-gray-200 dark:hover:from-red-700 dark:hover:via-red-800 dark:hover:to-red-900'
              onClick={() => {
                table.getColumn('abbreviatedChurchName')?.setFilterValue('');
                table.getColumn('district')?.setFilterValue('');
              }}
            >
              Borrar
            </Button>

            <Button
              disabled={isDisabledButton}
              variant='ghost'
              className='col-start-1 col-end-2 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-auto px-4 py-2 border-1 border-green-500 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:text-green-100 hover:from-green-500 hover:via-green-600 hover:to-green-700 dark:from-green-600 dark:via-green-700 dark:to-green-800 dark:text-gray-100 dark:hover:text-gray-200 dark:hover:from-green-700 dark:hover:via-green-800 dark:hover:to-green-900'
              onClick={() => {
                setIsFiltersSearchGeneralDisabled(true);
                table.getColumn('churchName')?.setFilterValue('');
                table.getColumn('district')?.setFilterValue('');
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
        <div className='flex items-center justify-between space-x-2 py-4'>
          {!query.isPending && (
            <Button
              type='submit'
              variant='ghost'
              className={cn(
                'px-4 py-3 text-[15px] font-semibold rounded-lg shadow-lg transition-transform transform focus:outline-none focus:ring-red-300',
                !generateReportQuery.isFetching &&
                  'text-white hover:text-white dark:text-white bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-700 hover:to-amber-800',
                generateReportQuery.isFetching &&
                  'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-200 cursor-not-allowed animate-pulse'
              )}
              onClick={handleGenerateReport}
            >
              <FaRegFilePdf
                className={cn(
                  'mr-2 text-[1.5rem] text-white',
                  generateReportQuery.isFetching && 'text-gray-600 dark:text-gray-200'
                )}
              />
              {generateReportQuery.isFetching ? 'Generando Reporte...' : 'Generar Reporte'}
            </Button>
          )}

          <div>
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
