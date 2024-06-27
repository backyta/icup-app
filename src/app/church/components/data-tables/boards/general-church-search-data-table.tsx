/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState } from 'react';

import {
  type ColumnDef,
  flexRender,
  type SortingState,
  getPaginationRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  type VisibilityState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useChurchStore } from '@/stores/church';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
  mutation: any;
}

export function GeneralChurchSearchDataTable<TData, TValue>({
  columns,
  data,
  mutation,
}: DataTableProps<TData, TValue>): JSX.Element {
  //* States
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const isFiltersSearchGeneralDisabled = useChurchStore(
    (state) => state.isFiltersSearchGeneralDisabled
  );
  const setIsFiltersSearchGeneralDisabled = useChurchStore(
    (state) => state.setIsFiltersSearchGeneralDisabled
  );

  //* Table
  const table = useReactTable({
    data,
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
    <div>
      {!isFiltersSearchGeneralDisabled && (
        <div>
          <span className='text-offering-color font-bold text-[14px] md:text-[16px]'>
            Búsqueda actual:
          </span>{' '}
          <span className='font-medium text-[13px] md:text-[15px]'>Iglesias y anexos (Todas)</span>
          <div className='pb-8 lg:pb-8 grid grid-cols-2 gap-3 lg:flex lg:items-center py-4 md:py-6 lg:py-4 lg:gap-6'>
            <Input
              placeholder='Filtro por nombre de iglesia...'
              value={(table.getColumn('churchName')?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                table.getColumn('churchName')?.setFilterValue(event.target.value)
              }
              className='text-[13px] lg:text-[14px] w-full col-start-1 col-end-2 row-start-1 row-end-2'
              disabled={isFiltersSearchGeneralDisabled}
            />
            <Input
              placeholder='Filtro por distrito...'
              value={(table.getColumn('district')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('district')?.setFilterValue(event.target.value)}
              className='col-start-2 col-end-3 row-start-1 row-end-2 text-[13px] lg:text-[14px] w-full'
              disabled={isFiltersSearchGeneralDisabled}
            />
            <Button
              variant='ghost'
              className='col-start-2 col-end-3 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-500 hover:text-white'
              onClick={() => {
                table.getColumn('churchName')?.setFilterValue('');
                table.getColumn('district')?.setFilterValue('');
              }}
            >
              Borrar
            </Button>
            <Button
              variant='ghost'
              className='col-start-1 col-end-2 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-500 hover:text-white'
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

          {!isFiltersSearchGeneralDisabled && !mutation.isPending && (
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

      {!isFiltersSearchGeneralDisabled && !mutation.isPending && (
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
    </div>
  );
}
