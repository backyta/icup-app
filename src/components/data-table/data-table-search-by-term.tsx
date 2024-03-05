/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import Select from 'react-select';

import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { es } from 'date-fns/locale';

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

import { formSearchByTermSchema } from '@/validations/form-search-by-term-schema';

import {
  TypeSearch,
  TypeSearchNames,
  SubTypeSearchNames,
  TermSelectTypeNames,
  SubTypeSearch,
} from '@/enums';

import {
  validationDisableSubTypes,
  validationDisableTermSelect,
  validationDisableTypes,
} from '@/helpers';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
}

export function DataTableSearchByTerm<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});

  const [disabled, setDisabled] = useState(true);

  const [lastValue, setLastValue] = useState<string | undefined>('');

  const currentPath = window.location.pathname;

  const form = useForm<z.infer<typeof formSearchByTermSchema>>({
    resolver: zodResolver(formSearchByTermSchema),
    mode: 'onChange',
    defaultValues: {
      limit: '10',
      termInput: '',
      termNames: '',
      termLastNames: '',
      termSelect: '',
      limitAll: false,
      subType: lastValue as SubTypeSearch,
    },
  });

  const type = form.watch('type');
  const subType = form.watch('subType');

  useEffect(() => {
    setLastValue(subType);
  }, [form.getValues('subType')]);

  useEffect(() => {
    if (form.getValues('limitAll') === true) {
      console.log('change');
      form.setValue('limit', '10');
    }
  }, [form.getValues('limitAll')]);

  // console.log(type);
  // console.log(subType);

  const disabledTypes = validationDisableTypes(currentPath);

  const disabledSubTypes = validationDisableSubTypes(currentPath, type);
  const disabledTermSelect = validationDisableTermSelect(type);

  // TODO : TRABAJAR EL SEARCH BY TERM EN OFRENDAS (aquí) Continuar ....

  function onSubmit(values: z.infer<typeof formSearchByTermSchema>): void {
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
            className='grid grid-cols-2 gap-4 gap-y-4 items-end mb-14 md:mb-10 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 '
          >
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => {
                return (
                  <FormItem className=''>
                    <FormLabel className='text-[13px] md:text-sm'>
                      Tipo
                    </FormLabel>
                    <FormDescription className='text-[12px] md:text-[13px]'>
                      ¿Que tipo de búsqueda desea hacer?
                    </FormDescription>
                    <Select
                      onOpenChange={() => {
                        (type === TypeSearch.firstName ||
                          type === TypeSearch.lastName ||
                          type === TypeSearch.fullName ||
                          type === TypeSearch.tithe ||
                          type === TypeSearch.sunday_worship ||
                          type === TypeSearch.family_house ||
                          type === TypeSearch.general_fasting ||
                          type === TypeSearch.general_vigil ||
                          type === TypeSearch.zonal_fasting ||
                          type === TypeSearch.zonal_vigil ||
                          type === TypeSearch.sunday_school ||
                          type === TypeSearch.youth_worship ||
                          type === TypeSearch.activities ||
                          type === TypeSearch.church_ground ||
                          type === TypeSearch.special) &&
                          form.resetField('subType', {
                            keepError: true, // toma el valor por defecto que es vació y se puede elegir denuedo
                          });

                        type !== TypeSearch.firstName &&
                          form.resetField('termNames', {
                            defaultValue: '',
                          });
                        type !== TypeSearch.lastName &&
                          form.resetField('termLastNames', {
                            defaultValue: '',
                          });
                        type !== TypeSearch.fullName &&
                          form.resetField('termLastNames', {
                            defaultValue: '',
                          });
                        type !== TypeSearch.fullName &&
                          form.resetField('termNames', {
                            defaultValue: '',
                          });

                        (type === TypeSearch.dateBirth ||
                          subType === SubTypeSearch.titheDate) &&
                          form.resetField('termDate', {
                            keepError: true,
                          });

                        (type === TypeSearch.gender ||
                          type === TypeSearch.monthBirth ||
                          type === TypeSearch.maritalStatus ||
                          type === TypeSearch.isActive) &&
                          form.resetField('termSelect', {
                            keepError: true,
                          });

                        (type === TypeSearch.zone ||
                          type === TypeSearch.code ||
                          type === TypeSearch.name_house ||
                          type === TypeSearch.address ||
                          type === TypeSearch.originCountry ||
                          type === TypeSearch.department ||
                          type === TypeSearch.province ||
                          type === TypeSearch.district) &&
                          form.resetField('termInput', {
                            defaultValue: '',
                          });
                      }}
                      onValueChange={field.onChange}
                    >
                      <FormControl className='text-[12px] md:text-[13px]'>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona un tipo' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(TypeSearchNames).map(([key, value]) => (
                          <SelectItem
                            className={`text-[12px] md:text-[13px] ${disabledTypes?.disabledTypes?.includes(value) ? 'hidden' : ''}`}
                            key={key}
                            value={key}
                          >
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {(type === TypeSearch.firstName ||
              type === TypeSearch.lastName ||
              type === TypeSearch.fullName ||
              type === TypeSearch.tithe ||
              type === TypeSearch.sunday_worship ||
              type === TypeSearch.family_house ||
              type === TypeSearch.zonal_fasting ||
              type === TypeSearch.general_fasting ||
              type === TypeSearch.zonal_vigil ||
              type === TypeSearch.general_vigil ||
              type === TypeSearch.sunday_school ||
              type === TypeSearch.youth_worship ||
              type === TypeSearch.activities ||
              type === TypeSearch.church_ground ||
              type === TypeSearch.special) && (
              <FormField
                control={form.control}
                name='subType'
                render={({ field }) => {
                  return (
                    <FormItem className=''>
                      <FormLabel className='text-[13px] md:text-sm'>
                        Sub-tipo
                      </FormLabel>
                      <FormDescription className='text-[12px] md:text-[13px]'>
                        ¿Que sub tipo de búsqueda deseas hacer?
                      </FormDescription>
                      <Select
                        onOpenChange={() => {
                          type !== TypeSearch.firstName &&
                            form.resetField('termNames', {
                              defaultValue: '',
                            });
                          type !== TypeSearch.lastName &&
                            form.resetField('termLastNames', {
                              defaultValue: '',
                            });
                          type !== TypeSearch.fullName &&
                            form.resetField('termLastNames', {
                              defaultValue: '',
                            });
                          type !== TypeSearch.fullName &&
                            form.resetField('termNames', {
                              defaultValue: '',
                            });
                        }}
                        value={field.value}
                        onValueChange={(value) =>
                          value && field.onChange(value)
                        }
                      >
                        <FormControl className='text-[12px] md:text-[13px]'>
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona un sub-tipo' />
                            ) : (
                              'Elige un sub-tipo'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(SubTypeSearchNames).map(
                            ([key, value]) => (
                              <SelectItem
                                className={`text-[12px] md:text-[13px] ${disabledSubTypes?.disabledSubTypes?.includes(value) ? 'hidden' : ''}`}
                                key={key}
                                value={key}
                              >
                                {value}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}

            {type !== TypeSearch.firstName &&
              type !== TypeSearch.lastName &&
              type !== TypeSearch.fullName &&
              type !== TypeSearch.monthBirth &&
              type !== TypeSearch.dateBirth &&
              type !== TypeSearch.gender &&
              type !== TypeSearch.maritalStatus &&
              type !== TypeSearch.isActive &&
              type !== TypeSearch.tithe &&
              type !== undefined && (
                <FormField
                  control={form.control}
                  name='termInput'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[13px] md:text-sm'>
                        Termino
                      </FormLabel>
                      <FormDescription className='text-[12px] md:text-[13px]'>
                        Escribe aquí lo que deseas buscar.
                      </FormDescription>
                      <FormControl>
                        <Input
                          className='text-[12px] md:text-[13px]'
                          placeholder='Eje: C-2, Av.Central 123, Lima ....'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

            {(type === TypeSearch.dateBirth ||
              subType === SubTypeSearch.titheDate) && (
              <FormField
                control={form.control}
                name='termDate'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel className='text-[13px] md:text-sm'>
                      Termino
                    </FormLabel>
                    <FormDescription className='text-[12px] md:text-[13px]'>
                      Buscar por fecha o rango de fechas
                    </FormDescription>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full text-left font-normal justify-center p-4 text-[12px] md:text-[13px]',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className='mr-[0.1rem] h-4 w-4' />
                            {field?.value?.from ? (
                              field?.value.to ? (
                                <>
                                  {format(field?.value.from, 'LLL dd, y', {
                                    locale: es,
                                  })}{' '}
                                  -{' '}
                                  {format(field?.value.to, 'LLL dd, y', {
                                    locale: es,
                                  })}
                                </>
                              ) : (
                                format(field?.value.from, 'LLL dd, y')
                              )
                            ) : (
                              <span className='text-[12px] md:text-[13px]'>
                                Elige una fecha
                              </span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          initialFocus
                          mode='range'
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {(type === TypeSearch.gender ||
              type === TypeSearch.maritalStatus ||
              type === TypeSearch.isActive ||
              type === TypeSearch.monthBirth) && (
              <FormField
                control={form.control}
                name='termSelect'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='text-[13px] md:text-sm'>
                        Termino
                      </FormLabel>
                      <FormDescription className='text-[12px] md:text-[13px]'>
                        Escribe aquí lo que deseas buscar.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl className='text-[12px] md:text-[13px]'>
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue
                                className='text-[12px] md:text-[13px]'
                                placeholder='Elige una opción'
                              />
                            ) : (
                              'Elige una opción'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(TermSelectTypeNames).map(
                            ([key, value]) => (
                              <SelectItem
                                className={`text-[12px] md:text-[13px] ${disabledTermSelect?.disabledTermSelect?.includes(value) ? 'hidden' : ''}`}
                                key={key}
                                value={key}
                              >
                                {value}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}

            {subType &&
              (type === TypeSearch.firstName ||
                type === TypeSearch.fullName ||
                subType === SubTypeSearch.titheNames ||
                subType === SubTypeSearch.titheFullNames) && (
                <FormField
                  control={form.control}
                  name='termNames'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[13px] md:text-sm'>
                        Termino (nombres)
                      </FormLabel>
                      <FormDescription className='text-[12px] md:text-[13px]'>
                        Escribe aquí los nombres que deseas buscar.
                      </FormDescription>
                      <FormControl>
                        <Input
                          className='text-[12px] md:text-[13px]'
                          placeholder='Eje: Rolando Martin...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

            {subType &&
              (type === TypeSearch.lastName ||
                type === TypeSearch.fullName ||
                subType === SubTypeSearch.titheLastNames ||
                subType === SubTypeSearch.titheFullNames) && (
                <FormField
                  control={form.control}
                  name='termLastNames'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[13px] md:text-sm'>
                        Termino (apellidos)
                      </FormLabel>
                      <FormDescription className='text-[12px] md:text-[13px]'>
                        Escribe aquí los apellidos que deseas buscar.
                      </FormDescription>
                      <FormControl>
                        <Input
                          className='text-[12px] md:text-[13px]'
                          placeholder='Eje: Sanchez Torres...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

            <div className='grid grid-cols-2 items-end justify-evenly'>
              <div className='flex flex-col gap-2 col-start-1 col-end-3 pb-2'>
                <FormField
                  control={form.control}
                  name='limit'
                  render={() => (
                    <FormItem>
                      <FormLabel className='text-[13px] md:text-sm'>
                        Limite
                      </FormLabel>
                      <FormDescription className='text-[12px] md:text-[13px]'>
                        ¿Cuantos registros necesitas?
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex col-start-1 col-end-3 gap-2 md:gap-6 lg:gap-4 md:justify-start'>
                <FormField
                  control={form.control}
                  name='limit'
                  render={({ field }) => (
                    <FormItem className='2xl:w-[20rem]'>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!!form.getValues('limitAll')}
                          className='text-[12px] md:text-[13px]'
                          value={
                            form.getValues('limitAll') ? '-' : field.value || ''
                          }
                          placeholder='Limite de registros'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='limitAll'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-end space-x-3 space-y-0 rounded-md border p-3 h-[2.5rem] w-[8rem] justify-center'>
                      <FormControl>
                        <Checkbox
                          disabled={!form.getValues('limit')}
                          checked={field?.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          className={
                            form.getValues('limit') ? '' : 'bg-slate-500'
                          }
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel className='text-[12px] md:text-[13px]'>
                          Todos
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col gap-2 col-start-1 col-end-3'>
                <FormField
                  control={form.control}
                  name='limit'
                  render={() => (
                    <FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name='order'
              render={({ field }) => (
                <FormItem className='w-full col-start-auto col-end-auto lg:col-start-auto lg:col-end-auto'>
                  <FormLabel className='text-[13px] md:text-sm'>
                    Orden
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl className='text-[12px] md:text-[13px] '>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona un tipo de orden' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        className='text-[12px] md:text-[13px]'
                        value='DESC'
                      >
                        Mas nuevo a mas antiguo
                      </SelectItem>
                      <SelectItem
                        className='text-[12px] md:text-[13px]'
                        value='ASC'
                      >
                        Mas antiguo a mas nuevo
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
              className='mx-auto col-start-1 col-end-3 row-start-auto lg:col-start-2 lg:col-end-3 lg:row-start-auto lg:row-end-auto xl:row-start-auto xl:row-end-auto xl:col-start-auto xl:col-end-auto w-[8rem] text-[13px] lg:text-[14px] h-[2.5rem] md:w-[15rem] lg:w-full xl:w-full xl:-ml-0 2xl:w-full 2xl:mx-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500  hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 dark:hover:text-green-950'
            >
              Buscar
            </Button>
          </form>
        </Form>
      )}

      {!disabled &&
        (currentPath === '/disciples/search-by-term-disciples' ||
          currentPath === '/pastors/search-by-term-pastors' ||
          currentPath === '/copastors/search-by-term-copastors' ||
          currentPath === '/leaders/search-by-term-leaders') && (
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

      {!disabled &&
        currentPath === '/family-houses/search-by-term-family-houses' && (
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
                (table.getColumn('name_house')?.getFilterValue() as string) ??
                ''
              }
              onChange={(event) =>
                table
                  .getColumn('name_house')
                  ?.setFilterValue(event.target.value)
              }
              className='text-[13px] lg:text-[14px]  w-full'
              disabled={disabled}
            />
            <Input
              placeholder='Filtro por código de casa...'
              value={
                (table.getColumn('code')?.getFilterValue() as string) ?? ''
              }
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

      {!disabled && currentPath === '/offerings/search-by-term-offerings' && (
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

      {!disabled && currentPath === '/users/search-by-term-users' && (
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
