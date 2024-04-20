/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { type z } from 'zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';

import { es } from 'date-fns/locale';
import { format } from 'date-fns';

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

import { formSearchByTermSchema } from '@/shared/validations';
import { Calendar } from '@/shared/components/ui/calendar';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';

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
  validationDisableSubTypes,
  validationDisableTermSelect,
  validationDisableTypes,
} from '@/shared/helpers';
import {
  TypeSearch,
  TypeSearchNames,
  SubTypeSearchNames,
  TermSelectOptionsNames,
  SubTypeSearch,
  UserRoles,
  UserRoleNames,
  RecordOrder,
  RecordOrderNames,
} from '@/shared/enums';

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
}
// NOTE : del componente padre que llama a este, hacer el fetch y mandar el ID, y el onDelete
// NOTE : para que actualize la lista. (pero tmb ver la manera de transformar el id a serial)

export function DataTableSearchByTerm<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>): JSX.Element {
  //* States
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  //* Library hooks
  const { pathname } = useLocation();

  //* Forms
  const form = useForm<z.infer<typeof formSearchByTermSchema>>({
    resolver: zodResolver(formSearchByTermSchema),
    mode: 'onChange',
    defaultValues: {
      limit: '10',
      termInput: '',
      termNames: '',
      termLastNames: '',
      termSelect: '',
      subType: '',
      limitAll: false,
      order: RecordOrder.Ascending,
    },
  });

  //* Form handler
  function onSubmit(values: z.infer<typeof formSearchByTermSchema>): void {
    setIsDisabled(false);
    form.reset();
    console.log({ values });
  }

  //* Watchers
  const type = form.watch('type');
  const subType = form.watch('subType');

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

  //* Effects
  useEffect(() => {
    if (form.getValues('limitAll')) {
      form.setValue('limit', '10');
    }
  }, [form.getValues('limitAll')]);

  //* Helpers
  const disabledTypes = validationDisableTypes(pathname);
  const disabledSubTypes = validationDisableSubTypes(pathname, type);
  const disabledTermSelect = validationDisableTermSelect(type, subType);

  return (
    <div className='md:w-full m-auto lg:w-full pt-4'>
      {isDisabled && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-1 gap-4 gap-y-4 items-end mb-16 md:mb-12 md:grid-cols-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 w-auto'
          >
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] font-bold'>Tipo</FormLabel>
                    <FormDescription className='text-[14px]'>
                      ¿Qué tipo de búsqueda desea hacer?
                    </FormDescription>
                    <Select
                      onOpenChange={() => {
                        form.resetField('subType', {
                          keepError: true,
                        });
                        form.resetField('termNames', {
                          keepError: true,
                        });
                        form.resetField('termLastNames', {
                          keepError: true,
                        });
                        form.resetField('termDate', {
                          keepError: true,
                        });
                        form.resetField('termSelect', {
                          keepError: true,
                        });
                        form.resetField('termInput', {
                          keepError: true,
                        });
                      }}
                      onValueChange={field.onChange}
                    >
                      <FormControl className='text-[13px] md:text-[14px]'>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona un tipo' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(TypeSearchNames).map(([key, value]) => (
                          <SelectItem
                            className={`text-[13px] md:text-[14px] ${disabledTypes?.disabledTypes?.includes(value) ? 'hidden' : ''}`}
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

            {(type === TypeSearch.FirstName ||
              type === TypeSearch.LastName ||
              type === TypeSearch.FullName ||
              type === TypeSearch.Tithe ||
              type === TypeSearch.Sunday_worship ||
              type === TypeSearch.Family_house ||
              type === TypeSearch.Zonal_fasting ||
              type === TypeSearch.General_fasting ||
              type === TypeSearch.Zonal_vigil ||
              type === TypeSearch.General_vigil ||
              type === TypeSearch.Sunday_school ||
              type === TypeSearch.Youth_worship ||
              type === TypeSearch.Activities ||
              type === TypeSearch.Church_ground ||
              type === TypeSearch.Special) && (
              <FormField
                control={form.control}
                name='subType'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='text-[14px] font-bold'>Sub-tipo</FormLabel>
                      <FormDescription className='text-[14px]'>
                        ¿Qué sub tipo de búsqueda deseas hacer?
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        onOpenChange={() => {
                          form.resetField('termNames', {
                            defaultValue: '',
                          });
                          form.resetField('termLastNames', {
                            defaultValue: '',
                          });
                          form.resetField('termDate', {
                            keepError: true,
                          });
                          form.resetField('termSelect', {
                            keepError: true,
                          });
                          form.resetField('termInput', {
                            keepError: true,
                          });
                        }}
                      >
                        <FormControl className='text-[13px] md:text-[14px]'>
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona un sub-tipo' />
                            ) : (
                              'Elige un sub-tipo'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(SubTypeSearchNames).map(([key, value]) => (
                            <SelectItem
                              className={`text-[13px] md:text-[14px] ${disabledSubTypes?.disabledSubTypes?.includes(key) ? 'hidden' : ''}`}
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
            )}

            {((type !== TypeSearch.FirstName &&
              type !== TypeSearch.LastName &&
              type !== TypeSearch.FullName &&
              type !== TypeSearch.MonthBirth &&
              type !== TypeSearch.DateBirth &&
              type !== TypeSearch.Gender &&
              type !== TypeSearch.MaritalStatus &&
              type !== TypeSearch.Status &&
              type !== TypeSearch.Tithe &&
              type !== TypeSearch.Sunday_worship &&
              type !== TypeSearch.Family_house &&
              type !== TypeSearch.General_fasting &&
              type !== TypeSearch.Zonal_fasting &&
              type !== TypeSearch.Zonal_vigil &&
              type !== TypeSearch.General_vigil &&
              type !== TypeSearch.Sunday_school &&
              type !== TypeSearch.Youth_worship &&
              type !== TypeSearch.Activities &&
              type !== TypeSearch.Church_ground &&
              type !== TypeSearch.Special &&
              type !== TypeSearch.Roles &&
              type !== undefined) ||
              subType === SubTypeSearch.OfferingZone ||
              subType === SubTypeSearch.OfferingDateZone ||
              subType === SubTypeSearch.OfferingCodeHouse ||
              subType === SubTypeSearch.OfferingDateCodeHouse) && (
              <FormField
                control={form.control}
                name='termInput'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[14px] font-bold'>Termino</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Escribe aquí lo que deseas buscar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className='text-[13px] md:text-[14px]'
                        placeholder='Eje: C-2, Av.Central 123, Lima ....'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {(type === TypeSearch.DateBirth ||
              subType === SubTypeSearch.TitheDate ||
              subType === SubTypeSearch.TitheDateNames ||
              subType === SubTypeSearch.TitheDateLastNames ||
              subType === SubTypeSearch.TitheDateFullName ||
              subType === SubTypeSearch.OfferingDate ||
              subType === SubTypeSearch.OfferingDateShift ||
              subType === SubTypeSearch.OfferingDateZone ||
              subType === SubTypeSearch.OfferingDateCodeHouse) && (
              <FormField
                control={form.control}
                name='termDate'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel className='text-[14px] font-bold'>Termino</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Buscar por fecha o rango de fechas
                    </FormDescription>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full text-left font-normal justify-center p-4 text-[13px] md:text-[14px]',
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
                              <span className='text-[13px] md:text-[14px]'>Elige una fecha</span>
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

            {(type === TypeSearch.Gender ||
              type === TypeSearch.MaritalStatus ||
              type === TypeSearch.Status ||
              type === TypeSearch.MonthBirth ||
              subType === SubTypeSearch.OfferingShift ||
              subType === SubTypeSearch.OfferingDateShift) && (
              <FormField
                control={form.control}
                name='termSelect'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='text-[14px] font-bold'>Termino</FormLabel>
                      <FormDescription className='text-[14px]'>
                        Escribe aquí lo que deseas buscar.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl className='text-[13px] md:text-[14px]'>
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue
                                className='text-[13px] md:text-[14px]'
                                placeholder='Elige una opción'
                              />
                            ) : (
                              'Elige una opción'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(TermSelectOptionsNames).map(([key, value]) => (
                            <SelectItem
                              className={`text-[13px] md:text-[14px] ${disabledTermSelect?.disabledTermSelect?.includes(value) ? 'hidden' : ''}`}
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
            )}

            {type === TypeSearch.Roles && (
              <FormField
                control={form.control}
                name='termMultiSelect'
                render={() => (
                  <FormItem>
                    <FormLabel className='text-[14px] font-bold'>Roles</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Seleccione los roles que desea buscar
                    </FormDescription>

                    <div className='flex flex-wrap gap-y-1 justify-start sm:justify-around items-center'>
                      {Object.values(UserRoles).map((role) => (
                        <FormField
                          key={role}
                          control={form.control}
                          name='termMultiSelect'
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={role}
                                className='flex flex-row items-start space-x-3 space-y-0'
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(role)}
                                    onCheckedChange={(checked) => {
                                      let updatedRoles: UserRoles[] = [];
                                      checked
                                        ? (updatedRoles = field.value
                                            ? [...field.value, role]
                                            : [role])
                                        : (updatedRoles =
                                            field.value?.filter((value) => value !== role) ?? []);

                                      field.onChange(updatedRoles);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className='text-[13px] md:text-[14px] font-normal'>
                                  {UserRoleNames[role]}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {((subType && (type === TypeSearch.FirstName || type === TypeSearch.FullName)) ||
              subType === SubTypeSearch.TitheNames ||
              subType === SubTypeSearch.TitheFullNames ||
              subType === SubTypeSearch.TitheDateNames ||
              subType === SubTypeSearch.TitheDateFullName ||
              subType === SubTypeSearch.OfferingPreacherNames ||
              subType === SubTypeSearch.OfferingPreacherFullName ||
              subType === SubTypeSearch.OfferingSupervisorNames ||
              subType === SubTypeSearch.OfferingSupervisorFullName ||
              subType === SubTypeSearch.OfferingNames ||
              subType === SubTypeSearch.OfferingFullNames ||
              subType === SubTypeSearch.UserNames ||
              subType === SubTypeSearch.UserFullName) && (
              <FormField
                control={form.control}
                name='termNames'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[14px] font-bold'>Termino (nombres)</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Escribe los nombres que deseas buscar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className='text-[13px] md:text-[14px]'
                        placeholder='Eje: Rolando Martin...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {((subType && (type === TypeSearch.LastName || type === TypeSearch.FullName)) ||
              subType === SubTypeSearch.TitheLastNames ||
              subType === SubTypeSearch.TitheFullNames ||
              subType === SubTypeSearch.TitheDateLastNames ||
              subType === SubTypeSearch.TitheDateFullName ||
              subType === SubTypeSearch.OfferingPreacherLastNames ||
              subType === SubTypeSearch.OfferingPreacherFullName ||
              subType === SubTypeSearch.OfferingSupervisorLastNames ||
              subType === SubTypeSearch.OfferingSupervisorFullName ||
              subType === SubTypeSearch.OfferingLastNames ||
              subType === SubTypeSearch.OfferingFullNames) && (
              <FormField
                control={form.control}
                name='termLastNames'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[14px] font-bold'>Termino (apellidos)</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Escribe los apellidos que deseas buscar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className='text-[13px] md:text-[14px]'
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
                      <FormLabel className='text-[14px] font-bold'>Limite</FormLabel>
                      <FormDescription className='text-[14px]'>
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
                          className='text-[13px] md:text-[14px]'
                          value={form.getValues('limitAll') ? '-' : field.value || ''}
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
                          className={form.getValues('limit') ? '' : 'bg-slate-500'}
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel className='text-[13px] md:text-[14px]'>Todos</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={cn(
                  'flex flex-col gap-2 col-start-1 col-end-3',
                  form.formState.errors.limit && 'mt-2'
                )}
              >
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
                  <FormLabel className='text-[14px] font-bold'>Orden</FormLabel>
                  <FormDescription className='text-[14px]'>
                    Selecciona el tipo de orden de los registros
                  </FormDescription>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl className='text-[14px]'>
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
              className='mx-auto mt-14 lg:mt-4 xl:mt-0 md:mt-0 md:col-start-2 md:col-end-3 lg:col-start-2 lg:col-end-3 lg:row-start-auto lg:row-end-auto xl:row-start-auto xl:row-end-auto xl:col-start-auto xl:col-end-auto w-[8rem] text-[13px] lg:text-[14px] h-[2.5rem] md:w-[15rem] lg:w-full xl:w-full xl:-ml-0 2xl:w-full 2xl:mx-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500  hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 hover:text-white'
            >
              Buscar
            </Button>
          </form>
        </Form>
      )}

      {!isDisabled &&
        (pathname === '/disciples/search-by-term-disciples' ||
          pathname === '/disciples/update-disciple' ||
          pathname === '/disciples/delete-disciple' ||
          pathname === '/pastors/search-by-term-pastors' ||
          pathname === '/pastors/update-pastor' ||
          pathname === '/pastors/delete-pastor' ||
          pathname === '/copastors/search-by-term-copastors' ||
          pathname === '/copastors/update-copastor' ||
          pathname === '/copastors/delete-copastor' ||
          pathname === '/leaders/search-by-term-leaders' ||
          pathname === '/leaders/update-leader' ||
          pathname === '/leaders/delete-leader') && (
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

      {!isDisabled &&
        (pathname === '/family-houses/search-by-term-family-houses' ||
          pathname === '/family-houses/update-family-house' ||
          pathname === '/family-houses/delete-family-house') && (
          <div className='pb-8 lg:pb-8 grid grid-cols-2 gap-3 lg:flex lg:items-center lg:py-4 lg:gap-6'>
            <Input
              placeholder='Filtro por nombre de casa...'
              value={(table.getColumn('name_house')?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                table.getColumn('name_house')?.setFilterValue(event.target.value)
              }
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
              className='col-start-2 col-end-3 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-[8rem] px-4 py-2 border-1 bg-red-500 text-red-950 border-red-500 hover:bg-red-500 hover:text-white'
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

      {!isDisabled &&
        (pathname === '/offerings/search-by-term-offerings' ||
          pathname === '/offerings/update-offering' ||
          pathname === '/offerings/delete-offering') && (
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
              className='col-start-2 col-end-3 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-[8rem] px-4 py-2 border-1 bg-red-500 text-red-950 border-red-500 hover:bg-red-500 hover:text-white'
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

      {!isDisabled &&
        (pathname === '/users/search-by-term-users' ||
          pathname === '/users/update-user' ||
          pathname === '/users/delete-user') && (
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
              className='col-start-2 col-end-3 row-start-2 row-end-3 w-full m-auto text-[13px] lg:text-[14px] h-full md:w-[15rem] lg:w-[8rem] px-4 py-2 border-1 bg-red-500 text-red-950 border-red-500 hover:bg-red-500 hover:text-white'
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
