/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

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

import {
  DiscipleSearchType,
  DiscipleSearchTypeNames,
  DiscipleSearchSubTypeNames,
  DiscipleSearchSelectOptionNames,
} from '@/modules/disciple/enums';
import { getDisciplesByTerm, getDisciplesReportByTerm } from '@/modules/disciple/services';
import {
  type DiscipleQueryParams,
  type DiscipleSearchFormByTerm,
} from '@/modules/disciple/interfaces';

import { useDiscipleStore } from '@/stores/disciple';
import { LoadingSpinner } from '@/shared/components';
import { dateFormatterToDDMMYYYY } from '@/shared/helpers';

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
import { getSimpleChurches } from '@/modules/church/services';

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
  searchParams: DiscipleSearchFormByTerm | undefined;
  setSearchParams: React.Dispatch<React.SetStateAction<DiscipleSearchFormByTerm | undefined>>;
  dataForm: DiscipleSearchFormByTerm | undefined;
}

export function SearchByTermDiscipleDataTable<TData, TValue>({
  columns,
  searchParams,
  setSearchParams,
  dataForm,
}: DataTableProps<TData, TValue>): JSX.Element {
  //* States
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const isFiltersSearchByTermDisabled = useDiscipleStore(
    (state) => state.isFiltersSearchByTermDisabled
  );
  const setIsFiltersSearchByTermDisabled = useDiscipleStore(
    (state) => state.setIsFiltersSearchByTermDisabled
  );
  const setDataSearchByTermResResponse = useDiscipleStore(
    (state) => state.setDataSearchByTermResponse
  );

  const [isDisabledButton, setIsDisabledButton] = useState(false);

  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* Queries
  const query = useQuery({
    queryKey: ['disciples-by-term', searchParams],
    queryFn: () => getDisciplesByTerm(searchParams as DiscipleQueryParams),
    enabled: !!searchParams,
    retry: 1,
  });

  const churchesQuery = useQuery({
    queryKey: ['churches'],
    queryFn: () => getSimpleChurches({ isSimpleQuery: true }),
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
    queryKey: ['disciples-report-by-term', searchParams],
    queryFn: () => getDisciplesReportByTerm(searchParams as DiscipleQueryParams),
    retry: 1,
    enabled: false,
  });

  const handleGenerateReport = (): void => {
    generateReportQuery.refetch();
  };

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
                Object.entries(DiscipleSearchTypeNames).find(
                  ([key, value]) => key === dataForm?.searchType && value
                )?.[1]
              }`}
            </span>
            {(dataForm?.searchType === DiscipleSearchType.FirstName ||
              dataForm?.searchType === DiscipleSearchType.LastName ||
              dataForm?.searchType === DiscipleSearchType.FullName) && (
              <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                {' '}
                -{' '}
                {`${
                  Object.entries(DiscipleSearchSubTypeNames).find(
                    ([key, value]) => key === dataForm?.searchSubType && value
                  )?.[1]
                }`}
              </span>
            )}
          </div>

          {/* Search Terms */}
          <div>
            <span className='text-indigo-500 font-bold text-[14px] md:text-[15.5px]'>
              Término de búsqueda:
            </span>{' '}
            {(dataForm?.searchType === DiscipleSearchType.OriginCountry ||
              dataForm?.searchType === DiscipleSearchType.Department ||
              dataForm?.searchType === DiscipleSearchType.ZoneName ||
              dataForm?.searchType === DiscipleSearchType.FamilyGroupCode ||
              dataForm?.searchType === DiscipleSearchType.FamilyGroupName ||
              dataForm?.searchType === DiscipleSearchType.Province ||
              dataForm?.searchType === DiscipleSearchType.District ||
              dataForm?.searchType === DiscipleSearchType.UrbanSector ||
              dataForm?.searchType === DiscipleSearchType.Address) && (
              <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                {`${dataForm?.inputTerm}`}
              </span>
            )}
            {dataForm?.searchType === DiscipleSearchType.FirstName && (
              <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                {`${dataForm?.namesTerm}`}
              </span>
            )}
            {dataForm?.searchType === DiscipleSearchType.LastName && (
              <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                {`${dataForm?.lastNamesTerm}`}
              </span>
            )}
            {dataForm?.searchType === DiscipleSearchType.FullName && (
              <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                {`${dataForm?.namesTerm} - ${dataForm?.lastNamesTerm} `}
              </span>
            )}
            {dataForm?.searchType === DiscipleSearchType.BirthDate && (
              <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                {`${dataForm?.dateTerm?.from ? dateFormatterToDDMMYYYY(dataForm?.dateTerm?.from) : ''} ${dataForm?.dateTerm?.to ? ` - ${dateFormatterToDDMMYYYY(dataForm?.dateTerm?.to)}` : ''}`}
              </span>
            )}
            {(dataForm?.searchType === DiscipleSearchType.BirthMonth ||
              dataForm?.searchType === DiscipleSearchType.Gender ||
              dataForm?.searchType === DiscipleSearchType.MaritalStatus ||
              dataForm?.searchType === DiscipleSearchType.RecordStatus) && (
              <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                {`${
                  Object.entries(DiscipleSearchSelectOptionNames).find(
                    ([key, value]) => key === dataForm?.selectTerm && value
                  )?.[1]
                }`}
              </span>
            )}
          </div>

          {/* Search Church */}
          <div>
            <span className='dark:text-emerald-500 text-emerald-600 font-bold text-[14px] md:text-[15.5px]'>
              Iglesia de Busqueda:
            </span>{' '}
            <span className='font-medium text-[13px] md:text-[14.5px] italic'>
              {`${
                churchesQuery?.data?.find((church) => church.id === dataForm?.churchId)
                  ?.abbreviatedChurchName ?? 'Todas las Iglesias'
              }`}
            </span>
          </div>

          {/* Inputs Filters */}
          <div className='pb-8 pt-4 lg:pb-8 grid grid-cols-2 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
            <Input
              disabled={isDisabledButton}
              placeholder='Filtro por nombres...'
              value={(table.getColumn('firstName')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('firstName')?.setFilterValue(event.target.value)}
              className='text-[13px] lg:text-[14px] w-full col-start-1 col-end-2 row-start-1 row-end-2'
            />
            <Input
              disabled={isDisabledButton}
              placeholder='Filtro por apellidos...'
              value={(table.getColumn('lastName')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('lastName')?.setFilterValue(event.target.value)}
              className='col-start-2 col-end-3 row-start-1 row-end-2 text-[13px] lg:text-[14px] w-full'
            />
            <Button
              disabled={isDisabledButton}
              variant='ghost'
              className='col-start-2 col-end-3 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-[8rem] px-4 py-2 border-1 border-red-500 bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white hover:text-red-100 hover:from-red-500 hover:via-red-600 hover:to-red-700 dark:from-red-600 dark:via-red-700 dark:to-red-800 dark:text-gray-100 dark:hover:text-gray-200 dark:hover:from-red-700 dark:hover:via-red-800 dark:hover:to-red-900'
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
              className='col-start-1 col-end-2 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-auto px-4 py-2 border-1 border-green-500 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:text-green-100 hover:from-green-500 hover:via-green-600 hover:to-green-700 dark:from-green-600 dark:via-green-700 dark:to-green-800 dark:text-gray-100 dark:hover:text-gray-200 dark:hover:from-green-700 dark:hover:via-green-800 dark:hover:to-green-900'
              onClick={() => {
                setIsFiltersSearchByTermDisabled(true);
                table.getColumn('firstName')?.setFilterValue('');
                table.getColumn('lastName')?.setFilterValue('');
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
