/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/shared/lib/utils';

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

import { formSearchGeneralSchema } from '@/shared/validations';
import { RecordOrder, RecordOrderNames } from '@/shared/enums';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from '@/shared/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
}

export function DataTableSearchGeneral<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>): JSX.Element {
  //* States
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});

  const [isDisabled, setIsDisabled] = useState(true);

  //* Library hooks
  const { pathname } = useLocation();

  //* Forms
  const form = useForm<z.infer<typeof formSearchGeneralSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSearchGeneralSchema),
    defaultValues: {
      limit: '10',
      offset: '0',
      limitAll: false,
      order: RecordOrder.Ascending,
    },
  });

  //* Form handler
  function onSubmit(values: z.infer<typeof formSearchGeneralSchema>): void {
    setIsDisabled(false);
    form.reset();
    console.log({ values });
  }

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
    <div className='md:w-full m-auto lg:w-full pt-4'>
      {isDisabled && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-2 gap-y-2 gap-x-6 items-end mb-16 md:mb-12 md:flex md:gap-4'
          >
            <div className='flex justify-between col-start-1 col-end-3 gap-8 sm:gap-10 md:gap-4'>
              <FormField
                control={form.control}
                name='limit'
                render={({ field }) => (
                  <FormItem className='sm:w-[20rem] md:w-auto'>
                    <FormLabel className='text-[14px] font-bold'>Limite</FormLabel>
                    <FormDescription className='text-[14px]'>
                      ¿Cuantos registros necesitas?
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!!form.getValues('limitAll')}
                        className='text-[13px] md:text-[14px]'
                        value={form.getValues('limitAll') ? '-' : field.value || ''}
                        placeholder='Limite de registros'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-2 items-end justify-evenly'>
                <div className='flex flex-col gap-2 col-start-1 col-end-3 pb-2'>
                  <FormField
                    control={form.control}
                    name='offset'
                    render={() => (
                      <FormItem>
                        <FormLabel className='text-[14px] font-bold'>Desplazamiento</FormLabel>
                        <FormDescription className='text-[14px]'>
                          ¿Cuantos registros quieres saltar?
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex col-start-1 col-end-3 gap-2 sm:gap-4 md:justify-start'>
                  <FormField
                    control={form.control}
                    name='offset'
                    render={({ field }) => (
                      <FormItem className='sm:w-[18rem] md:w-auto'>
                        <FormControl>
                          <Input
                            disabled={!!form.getValues('limitAll')}
                            className='text-[13px] md:text-[14px]'
                            placeholder='Nro. de registros desplazados'
                            {...field}
                            value={form.getValues('limitAll') ? '-' : field?.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='limitAll'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 space-y-0 rounded-md border p-3 h-[2.5rem]'>
                        <FormControl>
                          <Checkbox
                            disabled={!form.getValues('limit') || !form.getValues('offset')}
                            checked={field?.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                            }}
                            className={
                              !form.getValues('limit') || !form.getValues('offset')
                                ? 'bg-slate-500'
                                : ''
                            }
                          />
                        </FormControl>
                        <div className='space-y-1 leading-none'>
                          <FormLabel className='text-[13px] md:text-[14px]'>Todos</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name='order'
              render={({ field }) => (
                <FormItem className='lg:min-w-[23rem]'>
                  <FormLabel className='text-[14px] font-bold'>Orden</FormLabel>
                  <FormDescription className='text-[14px]'>
                    Selecciona el tipo de orden de los registros
                  </FormDescription>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl className='text-[13px] md:text-[14px] lg:w-full'>
                      <SelectTrigger>
                        {field.value ? (
                          <SelectValue
                            className='text-[13px] md:text-[14px]'
                            placeholder='Selecciona un tipo de orden'
                          />
                        ) : (
                          'Selecciona un tipo de orden'
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(RecordOrderNames).map(([key, value]) => (
                        <SelectItem className={`text-[13px] md:text-[14px]`} key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              variant='ghost'
              className={cn(
                'm-auto md:m-0 mt-8 lg:m-0 w-full text-[13px] lg:text-[14px] h-[2.5rem] md:w-[16rem] px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500  dark:bg-green-500 hover:bg-green-500 hover:text-white'
              )}
            >
              Buscar
            </Button>
          </form>
        </Form>
      )}

      {/* Disciples, Pastors, Co-Pastors, Leaders  */}

      {!isDisabled &&
        (pathname === '/disciples/search-disciples' ||
          pathname === '/pastors/search-pastors' ||
          pathname === '/copastors/search-copastors' ||
          pathname === '/leaders/search-leaders') && (
          <div className='pb-8 lg:pb-8 grid grid-cols-2 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
            <Input
              placeholder='Filtro por nombres...'
              value={(table.getColumn('first_name')?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                table.getColumn('first_name')?.setFilterValue(event.target.value)
              }
              className='text-[13px] lg:text-[14px] w-full col-start-1 col-end-2 row-start-1 row-end-2'
              disabled={isDisabled}
            />
            <Input
              placeholder='Filtro por apellidos...'
              value={(table.getColumn('last_name')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('last_name')?.setFilterValue(event.target.value)}
              className='col-start-2 col-end-3 row-start-1 row-end-2 text-[13px] lg:text-[14px] w-full'
              disabled={isDisabled}
            />

            <Button
              variant='ghost'
              className='col-start-2 col-end-3 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-500 hover:text-white'
              onClick={() => {
                table.getColumn('first_name')?.setFilterValue('');
                table.getColumn('last_name')?.setFilterValue('');
              }}
            >
              Borrar
            </Button>
            <Button
              variant='ghost'
              className='col-start-1 col-end-2 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-500 hover:text-white'
              onClick={() => {
                setIsDisabled(true);
                table.getColumn('first_name')?.setFilterValue('');
                table.getColumn('last_name')?.setFilterValue('');
              }}
            >
              Nueva Búsqueda
            </Button>
          </div>
        )}

      {/* Family Houses */}

      {!isDisabled && pathname === '/family-houses/search-family-houses' && (
        <div className='pb-8 lg:pb-8 grid grid-cols-2 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
          <Input
            placeholder='Filtro por nombre de casa...'
            value={(table.getColumn('name_house')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name_house')?.setFilterValue(event.target.value)}
            className='text-[13px] lg:text-[14px] w-full col-start-1 col-end-2 row-start-1 row-end-2'
            disabled={isDisabled}
          />
          <Input
            placeholder='Filtro por código de casa...'
            value={(table.getColumn('code')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('code')?.setFilterValue(event.target.value)}
            className='col-start-2 col-end-3 row-start-1 row-end-2 text-[13px] lg:text-[14px] w-full'
            disabled={isDisabled}
          />
          <Button
            variant='ghost'
            className='col-start-2 col-end-3 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-500 hover:text-white'
            onClick={() => {
              table.getColumn('name_house')?.setFilterValue('');
              table.getColumn('code')?.setFilterValue('');
            }}
          >
            Borrar
          </Button>
          <Button
            variant='ghost'
            className='col-start-1 col-end-2 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-500 hover:text-white'
            onClick={() => {
              setIsDisabled(true);
              table.getColumn('name_house')?.setFilterValue('');
              table.getColumn('code')?.setFilterValue('');
            }}
          >
            Nueva Búsqueda
          </Button>
        </div>
      )}

      {/* Offerings */}

      {!isDisabled && pathname === '/offerings/search-offerings' && (
        <div className='pb-8 lg:pb-8 grid grid-cols-2 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
          <Input
            placeholder='Filtro por tipo de ofrenda...'
            value={(table.getColumn('type')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('type')?.setFilterValue(event.target.value)}
            className='text-[13px] lg:text-[14px] w-full col-start-1 col-end-2 row-start-1 row-end-2'
            disabled={isDisabled}
          />
          <Input
            placeholder='Filtro por código de casa...'
            value={(table.getColumn('sub_type')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('sub_type')?.setFilterValue(event.target.value)}
            className='col-start-2 col-end-3 row-start-1 row-end-2 text-[13px] lg:text-[14px] w-full'
            disabled={isDisabled}
          />
          <Button
            variant='ghost'
            className='col-start-2 col-end-3 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-500 hover:text-white'
            onClick={() => {
              table.getColumn('type')?.setFilterValue('');
              table.getColumn('sub_type')?.setFilterValue('');
            }}
          >
            Borrar
          </Button>
          <Button
            variant='ghost'
            className='col-start-1 col-end-2 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-500 hover:text-white'
            onClick={() => {
              setIsDisabled(true);
              table.getColumn('type')?.setFilterValue('');
              table.getColumn('sub_type')?.setFilterValue('');
            }}
          >
            Nueva Búsqueda
          </Button>
        </div>
      )}

      {/* Users */}

      {!isDisabled && pathname === '/users/search-users' && (
        <div className='pb-8 lg:pb-8 grid grid-cols-2 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
          <Input
            placeholder='Filtro por correo electrónico...'
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
            className='text-[13px] lg:text-[14px] w-full col-start-1 col-end-2 row-start-1 row-end-2'
            disabled={isDisabled}
          />
          <Input
            placeholder='Filtro por roles de usuario...'
            value={(table.getColumn('roles')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('roles')?.setFilterValue(event.target.value)}
            className='col-start-2 col-end-3 row-start-1 row-end-2 text-[13px] lg:text-[14px] w-full'
            disabled={isDisabled}
          />
          <Button
            variant='ghost'
            className='col-start-2 col-end-3 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-[8rem] px-4 py-2 border-1 text-red-950 border-red-500 bg-red-500 hover:bg-red-500 hover:text-white'
            onClick={() => {
              table.getColumn('email')?.setFilterValue('');
              table.getColumn('roles')?.setFilterValue('');
            }}
          >
            Borrar
          </Button>
          <Button
            variant='ghost'
            className='col-start-1 col-end-2 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500 hover:bg-green-500 hover:text-white'
            onClick={() => {
              setIsDisabled(true);
              table.getColumn('email')?.setFilterValue('');
              table.getColumn('roles')?.setFilterValue('');
            }}
          >
            Nueva Búsqueda
          </Button>
        </div>
      )}

      {/* Table */}

      <div className='rounded-md border'>
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
          {!isDisabled && (
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
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
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
  );
}
