/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});

  const [disabled, setDisabled] = useState(true);

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

  const handleClick = (): void => {
    setDisabled(false);
  };

  return (
    <div className='md:w-full m-auto lg:w-full'>
      <div className='pb-4 md:p-0 grid grid-cols-2 gap-x-16 gap-y-3 md:flex md:items-center md:py-4 md:gap-6'>
        <Input
          placeholder='Filtro por nombres...'
          value={
            (table.getColumn('first_name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('first_name')?.setFilterValue(event.target.value)
          }
          className='text-[13px] lg:text-[14px] max-w-sm w-[12rem] lg:w-full'
          disabled={disabled}
        />
        <Input
          placeholder='Filtro por apellidos...'
          value={
            (table.getColumn('last_name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('last_name')?.setFilterValue(event.target.value)
          }
          className='col-start-1 col-end-2 text-[13px] lg:text-[14px] max-w-sm w-[12rem] lg:w-full'
          disabled={disabled}
        />

        {disabled && (
          <Button
            variant='ghost'
            className='w-[6rem] col-start-2 col-end-3 row-start-1 row-end-2 text-[13px] lg:text-[14px] h-full md:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500  hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 dark:hover:text-green-950'
            onClick={handleClick}
          >
            Buscar
          </Button>
        )}

        {!disabled && (
          <Button
            variant='ghost'
            className='w-[6rem]  col-start-2 col-end-3 row-start-1 row-end-2 text-[13px] lg:text-[14px] h-full md:w-auto px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400 dark:hover:text-red-950'
            onClick={() => {
              table.getColumn('first_name')?.setFilterValue('');
              table.getColumn('last_name')?.setFilterValue('');
            }}
          >
            Borrar
          </Button>
        )}
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
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
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {!disabled && (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className='text-center font-normal text-[12px] lg:text-sm'
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className='px-2 lg:px-4 py-2.5' key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    Sin resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
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
    </div>
  );
}
