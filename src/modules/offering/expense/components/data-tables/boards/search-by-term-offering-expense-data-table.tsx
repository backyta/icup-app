/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
  OfferingExpenseSearchType,
  OfferingExpenseSearchTypeNames,
  OfferingExpenseSearchSubTypeNames,
  OfferingExpenseSearchSelectOptionNames,
} from '@/modules/offering/expense/enums';
import {
  type OfferingExpenseQueryParams,
  type OfferingExpenseSearchFormByTerm,
} from '@/modules/offering/expense/interfaces';
import { getOfferingsExpensesByTerm } from '@/modules/offering/expense/services';

import { getAllChurches } from '@/modules/pastor/services';

import { LoadingSpinner } from '@/shared/components';
import { dateFormatterToDDMMYYYY } from '@/shared/helpers';

import { useOfferingExpenseStore } from '@/stores/offering-expense';

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
  searchParams: OfferingExpenseSearchFormByTerm | undefined;
  setSearchParams: React.Dispatch<
    React.SetStateAction<OfferingExpenseSearchFormByTerm | undefined>
  >;
  dataForm: OfferingExpenseSearchFormByTerm | undefined;
}

export function SearchByTermOfferingExpenseDataTable<TData, TValue>({
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

  const isFiltersSearchByTermDisabled = useOfferingExpenseStore(
    (state) => state.isFiltersSearchByTermDisabled
  );
  const setIsFiltersSearchByTermDisabled = useOfferingExpenseStore(
    (state) => state.setIsFiltersSearchByTermDisabled
  );
  const setDataSearchByTermResResponse = useOfferingExpenseStore(
    (state) => state.setDataSearchByTermResponse
  );

  const [translatedData, setTranslatedData] = useState([]);
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* Queries
  const query = useQuery({
    queryKey: ['offerings-expenses-by-term', searchParams],
    queryFn: () => getOfferingsExpensesByTerm(searchParams as OfferingExpenseQueryParams),
    enabled: !!searchParams,
    retry: 1,
  });

  const churchesQuery = useQuery({
    queryKey: ['churches'],
    queryFn: getAllChurches,
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

  //* Transform data to Spanish
  useEffect(() => {
    if (query.data) {
      const transformedData = query.data.map((item) => ({
        ...item,
        type: Object.entries(OfferingExpenseSearchTypeNames).find(
          ([key]) => key === item.type
        )?.[1],
        subType:
          Object.entries(OfferingExpenseSearchSubTypeNames).find(
            ([key]) => key === item.subType
          )?.[1] ?? '-',
      }));
      setTranslatedData(transformedData as any);
    }
  }, [query.data]);

  //* Table
  const table = useReactTable({
    data: translatedData as TData[],
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
                Object.entries(OfferingExpenseSearchTypeNames).find(
                  ([key, value]) => key === dataForm?.searchType && value
                )?.[1]
              }`}
            </span>
            {dataForm?.searchSubType &&
              (dataForm?.searchType === OfferingExpenseSearchType.ActivitiesAndEventsExpense ||
                dataForm?.searchType === OfferingExpenseSearchType.DecorationExpense ||
                dataForm?.searchType === OfferingExpenseSearchType.EquipmentAndTechnologyExpense ||
                dataForm?.searchType === OfferingExpenseSearchType.MaintenanceAndRepairExpense ||
                dataForm?.searchType === OfferingExpenseSearchType.OperationalExpense ||
                dataForm?.searchType === OfferingExpenseSearchType.SuppliesExpense) && (
                <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                  {' '}
                  -{' '}
                  {`${
                    Object.entries(OfferingExpenseSearchSubTypeNames).find(
                      ([key, value]) => key === dataForm?.searchSubType && value
                    )?.[1]
                  }`}
                </span>
              )}
          </div>

          {/* Search Terms */}
          <div>
            <span className='text-indigo-500 font-bold text-[14px] md:text-[15.5px]'>
              Termino de búsqueda:
            </span>{' '}
            {(dataForm?.searchType === OfferingExpenseSearchType.ActivitiesAndEventsExpense ||
              dataForm?.searchType === OfferingExpenseSearchType.DecorationExpense ||
              dataForm?.searchType === OfferingExpenseSearchType.EquipmentAndTechnologyExpense ||
              dataForm?.searchType === OfferingExpenseSearchType.MaintenanceAndRepairExpense ||
              dataForm?.searchType === OfferingExpenseSearchType.OperationalExpense ||
              dataForm?.searchType === OfferingExpenseSearchType.SuppliesExpense ||
              dataForm?.searchType === OfferingExpenseSearchType.ExpenseAdjustment) && (
              <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                {`${churchesQuery?.data?.find((item) => item?.id === dataForm?.selectTerm)?.churchName}`}
              </span>
            )}
            {(dataForm?.searchType === OfferingExpenseSearchType.ActivitiesAndEventsExpense ||
              dataForm?.searchType === OfferingExpenseSearchType.DecorationExpense ||
              dataForm?.searchType === OfferingExpenseSearchType.EquipmentAndTechnologyExpense ||
              dataForm?.searchType === OfferingExpenseSearchType.MaintenanceAndRepairExpense ||
              dataForm?.searchType === OfferingExpenseSearchType.OperationalExpense ||
              dataForm?.searchType === OfferingExpenseSearchType.SuppliesExpense ||
              dataForm?.searchType === OfferingExpenseSearchType.ExpenseAdjustment) && (
              <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                {` - ${dataForm?.dateTerm?.from ? dateFormatterToDDMMYYYY(dataForm?.dateTerm?.from) : ''} ${dataForm?.dateTerm?.to ? ` - ${dateFormatterToDDMMYYYY(dataForm?.dateTerm?.to)}` : ''}`}
              </span>
            )}
            {dataForm?.searchType === OfferingExpenseSearchType.RecordStatus && (
              <span className='font-medium text-[13px] md:text-[14.5px] italic'>
                {`${
                  Object.entries(OfferingExpenseSearchSelectOptionNames).find(
                    ([key, value]) => key === dataForm?.selectTerm && value
                  )?.[1]
                }`}
              </span>
            )}
          </div>

          {/* Inputs Filters */}
          <div className='pb-8 pt-4 lg:pb-8 grid grid-cols-2 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
            <Input
              placeholder='Filtro por tipo..'
              value={(table.getColumn('type')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('type')?.setFilterValue(event.target.value)}
              className='text-[13px] lg:text-[14px] w-full col-start-1 col-end-2 row-start-1 row-end-2'
              disabled={isFiltersSearchByTermDisabled}
            />
            <Input
              placeholder='Filtro por sub-tipo...'
              value={(table.getColumn('subType')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('subType')?.setFilterValue(event.target.value)}
              className='col-start-2 col-end-3 row-start-1 row-end-2 text-[13px] lg:text-[14px] w-full'
              disabled={isFiltersSearchByTermDisabled}
            />
            <Button
              disabled={isDisabledButton}
              variant='ghost'
              className='col-start-2 col-end-3 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-[8rem] px-4 py-2 border-1 bg-red-500 text-red-950 border-red-500 hover:bg-red-500 hover:text-white'
              onClick={() => {
                table.getColumn('type')?.setFilterValue('');
                table.getColumn('subType')?.setFilterValue('');
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
                table.getColumn('type')?.setFilterValue('');
                table.getColumn('subType')?.setFilterValue('');
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