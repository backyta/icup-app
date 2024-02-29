/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from '@/components/ui/select';

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

import { formSearchGeneralSchema } from '@/validations/form-search-general-schema';

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
}

export function DataTableSearchGeneral<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});

  const [disabled, setDisabled] = useState(true);

  const currentPath = window.location.pathname;

  const form = useForm<z.infer<typeof formSearchGeneralSchema>>({
    resolver: zodResolver(formSearchGeneralSchema),
    defaultValues: {
      limit: '10',
      offset: '0',
    },
  });

  function onSubmit(values: z.infer<typeof formSearchGeneralSchema>): void {
    setDisabled(false);
    form.reset();
    console.log({ values });
  }

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
    <div className='md:w-full m-auto lg:w-full pt-4'>
      {disabled && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-2 gap-4 gap-y-2 items-end mb-14 md:mb-10 lg:flex lg:gap-6 lg:items-end '
          >
            <FormField
              control={form.control}
              name='limit'
              render={({ field }) => (
                <FormItem className='col-start-1 col-end-2 row-start-1 row-end-2'>
                  <FormLabel className='text-[13px] md:text-sm'>
                    Limite
                  </FormLabel>
                  <FormDescription className='text-[12px] md:text-[13px]'>
                    ¿Cuantos registros necesitas?
                  </FormDescription>
                  <FormControl>
                    <Input
                      className='text-[12px]'
                      placeholder='Limite de registros'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='offset'
              render={({ field }) => (
                <FormItem className='col-start-2 col-end-3 row-start-1 row-end-2'>
                  <FormLabel className='text-[13px] md:text-sm'>
                    Desplazamiento
                  </FormLabel>
                  <FormDescription className='text-[12px] md:text-[13px]'>
                    ¿Cuantos registros quieres saltar?
                  </FormDescription>
                  <FormControl>
                    <Input
                      className='text-[12px] md:text-sm'
                      placeholder='Nro. de registros desplazados'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='order'
              render={({ field }) => (
                <FormItem className='lg:flex lg:flex-col lg:gap-7'>
                  <FormLabel className='text-[13px] md:text-sm'>
                    Orden
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl className='text-[12px] md:text-sm lg:w-[14rem]'>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona un tipo de orden' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        className='text-[12px] md:text-sm'
                        value='ASC'
                      >
                        Mas antiguo a mas nuevo
                      </SelectItem>
                      <SelectItem
                        className='text-[12px] md:text-sm'
                        value='DESC'
                      >
                        Mas nuevo a mas antiguo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              variant='ghost'
              className='mx-auto lg:m-0 col-start-2 col-end-3 row-start-2 row-end-3 w-[8rem] text-[13px] lg:text-[14px] h-[2.5rem] md:w-[8rem] xl:w-[6rem] lg:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500  hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 dark:hover:text-green-950'
            >
              Buscar
            </Button>
          </form>
        </Form>
      )}

      {!disabled &&
        (currentPath === '/disciples/search-disciples' ||
          currentPath === '/pastors/search-pastors' ||
          currentPath === '/copastors/search-copastors' ||
          currentPath === '/leaders/search-leaders') && (
          <div className='pb-8 lg:pb-8 grid grid-cols-1 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
            <Button
              variant='ghost'
              className='w-[8rem] m-auto text-[13px] lg:text-[14px] h-full md:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 dark:hover:text-green-950'
              onClick={() => {
                setDisabled(true);
                table.getColumn('first_name')?.setFilterValue('');
                table.getColumn('last_name')?.setFilterValue('');
              }}
            >
              Nueva Búsqueda
            </Button>
            <Input
              placeholder='Filtro por nombres...'
              value={
                (table.getColumn('first_name')?.getFilterValue() as string) ??
                ''
              }
              onChange={(event) =>
                table
                  .getColumn('first_name')
                  ?.setFilterValue(event.target.value)
              }
              className='text-[13px] lg:text-[14px]  w-full'
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
              className='col-start-1 col-end-2 text-[13px] lg:text-[14px] w-full'
              disabled={disabled}
            />
            <Button
              variant='ghost'
              className='w-[6rem] m-auto text-[13px] lg:text-[14px] h-full md:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400 dark:hover:text-red-950'
              onClick={() => {
                table.getColumn('first_name')?.setFilterValue('');
                table.getColumn('last_name')?.setFilterValue('');
              }}
            >
              Borrar
            </Button>
          </div>
        )}

      {!disabled && currentPath === '/family-houses/search-family-houses' && (
        <div className='pb-8 lg:pb-8 grid grid-cols-1 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
          <Button
            variant='ghost'
            className='w-[8rem] m-auto text-[13px] lg:text-[14px] h-full md:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 dark:hover:text-green-950'
            onClick={() => {
              setDisabled(true);
              table.getColumn('name_house')?.setFilterValue('');
              table.getColumn('code')?.setFilterValue('');
            }}
          >
            Nueva Búsqueda
          </Button>
          <Input
            placeholder='Filtro por nombre de casa...'
            value={
              (table.getColumn('name_house')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('name_house')?.setFilterValue(event.target.value)
            }
            className='text-[13px] lg:text-[14px]  w-full'
            disabled={disabled}
          />
          <Input
            placeholder='Filtro por código de casa...'
            value={(table.getColumn('code')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('code')?.setFilterValue(event.target.value)
            }
            className='col-start-1 col-end-2 text-[13px] lg:text-[14px] w-full'
            disabled={disabled}
          />
          <Button
            variant='ghost'
            className='w-[6rem] m-auto text-[13px] lg:text-[14px] h-full md:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400 dark:hover:text-red-950'
            onClick={() => {
              table.getColumn('name_house')?.setFilterValue('');
              table.getColumn('code')?.setFilterValue('');
            }}
          >
            Borrar
          </Button>
        </div>
      )}

      {!disabled && currentPath === '/offerings/search-offerings' && (
        <div className='pb-8 lg:pb-8 grid grid-cols-1 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
          <Button
            variant='ghost'
            className='w-[8rem] m-auto text-[13px] lg:text-[14px] h-full md:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 dark:hover:text-green-950'
            onClick={() => {
              setDisabled(true);
              table.getColumn('type')?.setFilterValue('');
              table.getColumn('sub_type')?.setFilterValue('');
            }}
          >
            Nueva Búsqueda
          </Button>
          <Input
            placeholder='Filtro por tipo de ofrenda...'
            value={(table.getColumn('type')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('type')?.setFilterValue(event.target.value)
            }
            className='text-[13px] lg:text-[14px] w-full'
            disabled={disabled}
          />
          <Input
            placeholder='Filtro por código de casa...'
            value={
              (table.getColumn('sub_type')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('sub_type')?.setFilterValue(event.target.value)
            }
            className='col-start-1 col-end-2 text-[13px] lg:text-[14px] w-full'
            disabled={disabled}
          />
          <Button
            variant='ghost'
            className='w-[6rem] m-auto text-[13px] lg:text-[14px] h-full md:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400 dark:hover:text-red-950'
            onClick={() => {
              table.getColumn('type')?.setFilterValue('');
              table.getColumn('sub_type')?.setFilterValue('');
            }}
          >
            Borrar
          </Button>
        </div>
      )}

      {!disabled && currentPath === '/users/search-users' && (
        <div className='pb-8 lg:pb-8 grid grid-cols-1 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
          <Button
            variant='ghost'
            className='w-[8rem] m-auto text-[13px] lg:text-[14px] h-full md:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 dark:hover:text-green-950'
            onClick={() => {
              setDisabled(true);
              table.getColumn('email')?.setFilterValue('');
              table.getColumn('roles')?.setFilterValue('');
            }}
          >
            Nueva Búsqueda
          </Button>
          <Input
            placeholder='Filtro por correo electrónico...'
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className='text-[13px] lg:text-[14px] w-full'
            disabled={disabled}
          />
          <Input
            placeholder='Filtro por roles de usuario...'
            value={(table.getColumn('roles')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('roles')?.setFilterValue(event.target.value)
            }
            className='col-start-1 col-end-2 text-[13px] lg:text-[14px] w-full'
            disabled={disabled}
          />
          <Button
            variant='ghost'
            className='w-[6rem] m-auto text-[13px] lg:text-[14px] h-full md:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400 dark:hover:text-red-950'
            onClick={() => {
              table.getColumn('email')?.setFilterValue('');
              table.getColumn('roles')?.setFilterValue('');
            }}
          >
            Borrar
          </Button>
        </div>
      )}
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
