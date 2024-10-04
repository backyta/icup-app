/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { Toaster } from 'sonner';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { CalendarIcon } from 'lucide-react';

import {
  SearchByTermOfferingIncomeDataTable,
  offeringIncomeDeleteColumns as columns,
} from '@/modules/offering/income/components';
import {
  OfferingIncomeSearchType,
  OfferingIncomeSearchSubType,
  OfferingIncomeSearchTypeNames,
  OfferingIncomeSearchNamesByShift,
  OfferingIncomeSearchNamesByMemberType,
  OfferingIncomeSearchNamesByRecordStatus,
  SubTypeNamesOfferingIncomeSearchByActivities,
  SubTypeNamesOfferingIncomeSearchByFamilyGroup,
  SubTypeNamesOfferingIncomeSearchByYoungWorship,
  SubTypeNamesOfferingIncomeSearchByUnitedWorship,
  SubTypeNamesOfferingIncomeSearchByIncomeAdjustment,
  SubTypeNamesOfferingIncomeSearchByFastingAndVigilZonal,
  SubTypeNamesOfferingIncomeSearchByFastingAndVigilGeneral,
  SubTypeNamesOfferingIncomeSearchByGroundChurchAndSpecial,
  SubTypeNamesOfferingIncomeSearchBySundayWorshipAndSundaySchool,
} from '@/modules/offering/income/enums';
import {
  type OfferingIncomeResponse,
  type OfferingIncomeSearchFormByTerm,
} from '@/modules/offering/income/interfaces';
import { offeringIncomeSearchByTermFormSchema } from '@/modules/offering/income/validations';

import { useOfferingIncomeStore } from '@/stores/offering-income';

import { getSimpleChurches } from '@/modules/church/services';

import { cn } from '@/shared/lib/utils';

import { PageTitle } from '@/shared/components/page';
import { RecordOrder, RecordOrderNames } from '@/shared/enums';
import { dateFormatterTermToTimestamp, namesFormatter, lastNamesFormatter } from '@/shared/helpers';

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
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

const dataFictional: OfferingIncomeResponse[] = [
  {
    id: '',
    type: '',
    subType: '',
    amount: '',
    currency: '',
    shift: '',
    date: new Date('2024-05-21'),
    comments: '',
    imageUrls: [],
    recordStatus: '',
    memberType: '',
    familyGroup: null,
    zone: null,
    disciple: null,
    preacher: null,
    supervisor: null,
    copastor: null,
    pastor: null,
    church: null,
  },
];

export const OfferingIncomeDeletePage = (): JSX.Element => {
  //* States
  const [isDisabledSubmitButton, setIsDisabledSubmitButton] = useState<boolean>(true);

  const isFiltersSearchByTermDisabled = useOfferingIncomeStore(
    (state) => state.isFiltersSearchByTermDisabled
  );
  const setIsFiltersSearchByTermDisabled = useOfferingIncomeStore(
    (state) => state.setIsFiltersSearchByTermDisabled
  );

  const [dataForm, setDataForm] = useState<OfferingIncomeSearchFormByTerm>();
  const [searchParams, setSearchParams] = useState<OfferingIncomeSearchFormByTerm | undefined>();

  //* Forms
  const form = useForm<z.infer<typeof offeringIncomeSearchByTermFormSchema>>({
    resolver: zodResolver(offeringIncomeSearchByTermFormSchema),
    mode: 'onChange',
    defaultValues: {
      searchSubType: '' as any,
      limit: '10',
      inputTerm: '',
      namesTerm: '',
      lastNamesTerm: '',
      selectTerm: '',
      dateTerm: undefined,
      all: false,
      order: RecordOrder.Ascending,
    },
  });

  //* Watchers
  const searchType = form.watch('searchType');
  const searchSubType = form.watch('searchSubType');
  const limit = form.watch('limit');
  const order = form.watch('order');

  //* Effects
  useEffect(() => {
    if (form.getValues('all')) {
      form.setValue('limit', '10');
    }
  }, [form.getValues('all')]);

  useEffect(() => {
    if (limit !== '' && order !== '') {
      setIsDisabledSubmitButton(false);
    }

    if (limit === '' || order === '') {
      setIsDisabledSubmitButton(true);
    }
  }, [limit, order]);

  useEffect(() => {
    setIsFiltersSearchByTermDisabled(true);
  }, []);

  useEffect(() => {
    form.setValue('searchSubType', undefined);
  }, [searchType]);

  useEffect(() => {
    document.title = 'Modulo Ofrenda - IcupApp';
  }, []);

  //* Queries
  const churchesQuery = useQuery({
    queryKey: ['churches'],
    queryFn: () => getSimpleChurches({ isSimpleQuery: true }),
  });

  //* Form handler
  function onSubmit(formData: z.infer<typeof offeringIncomeSearchByTermFormSchema>): void {
    let newDateTermTo;
    if (!formData.dateTerm?.to) {
      newDateTermTo = formData.dateTerm?.from;
    }

    const newDateTerm = dateFormatterTermToTimestamp({
      from: formData.dateTerm?.from,
      to: formData.dateTerm?.to ? formData.dateTerm?.to : newDateTermTo,
    });

    const newNamesTerm = namesFormatter(formData?.namesTerm);
    const newLastNamesTerm = lastNamesFormatter(formData?.lastNamesTerm);

    setSearchParams({
      ...formData,
      namesTerm: newNamesTerm,
      lastNamesTerm: newLastNamesTerm,
      dateTerm: newDateTerm as any,
    });

    setIsDisabledSubmitButton(true);
    setIsFiltersSearchByTermDisabled(false);
    setDataForm(formData);
    form.reset();
    setIsDisabledSubmitButton(false);
  }

  return (
    <div className='animate-fadeInPage'>
      <PageTitle className='text-green-600'>Modulo de Ingreso</PageTitle>

      <div className='flex items-center justify-start relative'>
        <h2 className='w-[19rem] sm:w-auto flex items-center text-left pl-4 py-2 sm:pt-4 sm:pb-2 sm:pl-[1.5rem] xl:pl-[2rem] 2xl:pt-4 font-sans text-2xl sm:text-2xl font-bold text-red-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.98rem] xl:text-[2.1rem] 2xl:text-4xl'>
          Buscar registros de ingreso
        </h2>
        <span className='absolute left-28 sm:left-0 sm:relative sm:ml-3 bg-red-300 text-slate-600 border text-center text-[10px] mt-[2.2rem] sm:mt-5 -py-1 px-2 rounded-full font-bold uppercase'>
          Eliminar
        </span>
      </div>
      <p className='dark:text-slate-300 text-left font-sans font-bold px-4 text-[12.5px] md:text-[15px] xl:text-base sm:px-[1.5rem] xl:px-[2rem]'>
        Elige tus opciones de búsqueda para eliminar registros de ingreso de ofrendas.
      </p>

      <div className='px-4 md:-px-2 md:px-[2rem] xl:px-[3rem] py-4 md:py-7 w-full'>
        {isFiltersSearchByTermDisabled && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid grid-cols-1 gap-4 gap-y-4 items-end mb-8 md:mb-12 md:grid-cols-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 w-auto'
            >
              <FormField
                control={form.control}
                name='searchType'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='text-[14px] font-bold'>Tipo</FormLabel>
                      <FormDescription className='text-[14px]'>
                        ¿Qué tipo de búsqueda desea hacer?
                      </FormDescription>
                      <Select
                        onOpenChange={() => {
                          form.resetField('dateTerm', {
                            keepError: true,
                          });
                          form.resetField('selectTerm', {
                            keepError: true,
                          });
                          form.resetField('inputTerm', {
                            keepError: true,
                          });
                          form.resetField('searchSubType', {
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
                          {Object.entries(OfferingIncomeSearchTypeNames).map(
                            ([key, value]) =>
                              key !== OfferingIncomeSearchType.RecordStatus && (
                                <SelectItem
                                  className={`text-[13px] md:text-[14px]`}
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

              {(searchType === OfferingIncomeSearchType.Activities ||
                searchType === OfferingIncomeSearchType.ChurchGround ||
                searchType === OfferingIncomeSearchType.FamilyGroup ||
                searchType === OfferingIncomeSearchType.GeneralFasting ||
                searchType === OfferingIncomeSearchType.GeneralVigil ||
                searchType === OfferingIncomeSearchType.IncomeAdjustment ||
                searchType === OfferingIncomeSearchType.Special ||
                searchType === OfferingIncomeSearchType.SundaySchool ||
                searchType === OfferingIncomeSearchType.SundayWorship ||
                searchType === OfferingIncomeSearchType.UnitedWorship ||
                searchType === OfferingIncomeSearchType.YouthWorship ||
                searchType === OfferingIncomeSearchType.ZonalFasting ||
                searchType === OfferingIncomeSearchType.ZonalVigil) && (
                <FormField
                  control={form.control}
                  name='searchSubType'
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
                            form.resetField('namesTerm', {
                              defaultValue: '',
                            });
                            form.resetField('lastNamesTerm', {
                              defaultValue: '',
                            });
                            form.resetField('dateTerm', {
                              keepError: true,
                            });
                            form.resetField('selectTerm', {
                              keepError: true,
                            });
                            form.resetField('inputTerm', {
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
                            {Object.entries(
                              searchType === OfferingIncomeSearchType.SundayWorship ||
                                searchType === OfferingIncomeSearchType.SundaySchool
                                ? SubTypeNamesOfferingIncomeSearchBySundayWorshipAndSundaySchool
                                : searchType === OfferingIncomeSearchType.FamilyGroup
                                  ? SubTypeNamesOfferingIncomeSearchByFamilyGroup
                                  : searchType === OfferingIncomeSearchType.ZonalVigil ||
                                      searchType === OfferingIncomeSearchType.ZonalFasting
                                    ? SubTypeNamesOfferingIncomeSearchByFastingAndVigilZonal
                                    : searchType === OfferingIncomeSearchType.GeneralFasting ||
                                        searchType === OfferingIncomeSearchType.GeneralVigil
                                      ? SubTypeNamesOfferingIncomeSearchByFastingAndVigilGeneral
                                      : searchType === OfferingIncomeSearchType.YouthWorship
                                        ? SubTypeNamesOfferingIncomeSearchByYoungWorship
                                        : searchType === OfferingIncomeSearchType.UnitedWorship
                                          ? SubTypeNamesOfferingIncomeSearchByUnitedWorship
                                          : searchType === OfferingIncomeSearchType.Activities
                                            ? SubTypeNamesOfferingIncomeSearchByActivities
                                            : searchType === OfferingIncomeSearchType.Special ||
                                                searchType === OfferingIncomeSearchType.ChurchGround
                                              ? SubTypeNamesOfferingIncomeSearchByGroundChurchAndSpecial
                                              : SubTypeNamesOfferingIncomeSearchByIncomeAdjustment
                            ).map(([key, value]) => (
                              <SelectItem
                                className={cn(`text-[13px] md:text-[14px]`)}
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

              {(searchType === OfferingIncomeSearchType.FamilyGroup ||
                searchType === OfferingIncomeSearchType.ZonalFasting ||
                searchType === OfferingIncomeSearchType.ZonalVigil) &&
                (searchSubType === OfferingIncomeSearchSubType.OfferingByGroupCode ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingByGroupCodeDate ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingByZone ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingByZoneDate) && (
                  <FormField
                    control={form.control}
                    name='inputTerm'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-[14px] font-bold'>Termino</FormLabel>
                        <FormDescription className='text-[14px]'>
                          Escribe aquí lo que deseas buscar.
                        </FormDescription>
                        <FormControl>
                          <Input
                            className='text-[13px] md:text-[14px]'
                            placeholder='Ejem: C-2, Av.Central 123, Lima ....'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

              {(searchType === OfferingIncomeSearchType.Activities ||
                searchType === OfferingIncomeSearchType.ChurchGround ||
                searchType === OfferingIncomeSearchType.FamilyGroup ||
                searchType === OfferingIncomeSearchType.GeneralFasting ||
                searchType === OfferingIncomeSearchType.GeneralVigil ||
                searchType === OfferingIncomeSearchType.IncomeAdjustment ||
                searchType === OfferingIncomeSearchType.Special ||
                searchType === OfferingIncomeSearchType.SundaySchool ||
                searchType === OfferingIncomeSearchType.SundayWorship ||
                searchType === OfferingIncomeSearchType.UnitedWorship ||
                searchType === OfferingIncomeSearchType.YouthWorship ||
                searchType === OfferingIncomeSearchType.ZonalFasting ||
                searchType === OfferingIncomeSearchType.ZonalVigil) &&
                (searchSubType === OfferingIncomeSearchSubType.OfferingByDate ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingByGroupCodeDate ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingByShiftDate ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingByChurchDate ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingByZoneDate) && (
                  <FormField
                    control={form.control}
                    name='dateTerm'
                    render={({ field }) => (
                      <FormItem className=''>
                        <FormLabel className='text-[14px] font-bold'>Termino (fecha)</FormLabel>
                        <FormDescription className='text-[14px]'>
                          Buscar por fecha o rango de fechas.
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
                                  <span className='text-[13px] md:text-[14px]'>
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

              {(searchType === OfferingIncomeSearchType.RecordStatus ||
                ((searchType === OfferingIncomeSearchType.SundaySchool ||
                  searchType === OfferingIncomeSearchType.SundayWorship ||
                  searchType === OfferingIncomeSearchType.GeneralFasting ||
                  searchType === OfferingIncomeSearchType.GeneralVigil ||
                  searchType === OfferingIncomeSearchType.Activities ||
                  searchType === OfferingIncomeSearchType.UnitedWorship ||
                  searchType === OfferingIncomeSearchType.YouthWorship ||
                  searchType === OfferingIncomeSearchType.IncomeAdjustment ||
                  searchType === OfferingIncomeSearchType.Special ||
                  searchType === OfferingIncomeSearchType.ChurchGround) &&
                  (searchSubType === OfferingIncomeSearchSubType.OfferingByShift ||
                    searchSubType === OfferingIncomeSearchSubType.OfferingByShiftDate ||
                    searchSubType === OfferingIncomeSearchSubType.OfferingByChurch ||
                    searchSubType === OfferingIncomeSearchSubType.OfferingByChurchDate ||
                    searchSubType === OfferingIncomeSearchSubType.OfferingByContributorNames ||
                    searchSubType === OfferingIncomeSearchSubType.OfferingByContributorLastNames ||
                    searchSubType ===
                      OfferingIncomeSearchSubType.OfferingByContributorFullName))) && (
                <FormField
                  control={form.control}
                  name='selectTerm'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] font-bold'>Termino</FormLabel>
                        <FormDescription className='text-[14px]'>
                          Selecciona una opción de búsqueda.
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
                            {searchSubType !== OfferingIncomeSearchSubType.OfferingByChurchDate &&
                            searchSubType !== OfferingIncomeSearchSubType.OfferingByChurch
                              ? Object.entries(
                                  searchType === OfferingIncomeSearchType.RecordStatus
                                    ? OfferingIncomeSearchNamesByRecordStatus
                                    : searchSubType ===
                                          OfferingIncomeSearchSubType.OfferingByShift ||
                                        searchSubType ===
                                          OfferingIncomeSearchSubType.OfferingByShiftDate
                                      ? OfferingIncomeSearchNamesByShift
                                      : OfferingIncomeSearchNamesByMemberType
                                ).map(([key, value]) => (
                                  <SelectItem
                                    className={cn(`text-[13px] md:text-[14px]`)}
                                    key={key}
                                    value={key}
                                  >
                                    {value}
                                  </SelectItem>
                                ))
                              : churchesQuery?.data?.map((church) => (
                                  <SelectItem
                                    className={cn(`text-[13px] md:text-[14px]`)}
                                    key={church.id}
                                    value={church.id}
                                  >
                                    {church.churchName}
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

              {(searchType === OfferingIncomeSearchType.ChurchGround ||
                searchType === OfferingIncomeSearchType.FamilyGroup ||
                searchType === OfferingIncomeSearchType.Special ||
                searchType === OfferingIncomeSearchType.ZonalFasting ||
                searchType === OfferingIncomeSearchType.ZonalVigil) &&
                (searchSubType === OfferingIncomeSearchSubType.OfferingByContributorNames ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingByContributorFullName ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingByPreacherNames ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingByPreacherFullName ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingBySupervisorNames ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingBySupervisorFullName) && (
                  <FormField
                    control={form.control}
                    name='namesTerm'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-[14px] font-bold'>Termino (nombres)</FormLabel>
                        <FormDescription className='text-[14px]'>
                          Escribe los nombres que deseas buscar.
                        </FormDescription>
                        <FormControl>
                          <Input
                            className='text-[13px] md:text-[14px]'
                            placeholder='Ejem: Rolando Martin...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

              {(searchType === OfferingIncomeSearchType.ChurchGround ||
                searchType === OfferingIncomeSearchType.FamilyGroup ||
                searchType === OfferingIncomeSearchType.Special ||
                searchType === OfferingIncomeSearchType.ZonalFasting ||
                searchType === OfferingIncomeSearchType.ZonalVigil) &&
                (searchSubType === OfferingIncomeSearchSubType.OfferingByContributorLastNames ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingByContributorFullName ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingByPreacherLastNames ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingByPreacherFullName ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingBySupervisorLastNames ||
                  searchSubType === OfferingIncomeSearchSubType.OfferingBySupervisorFullName) && (
                  <FormField
                    control={form.control}
                    name='lastNamesTerm'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-[14px] font-bold'>Termino (apellidos)</FormLabel>
                        <FormDescription className='text-[14px]'>
                          Escribe los apellidos que deseas buscar.
                        </FormDescription>
                        <FormControl>
                          <Input
                            className='text-[13px] md:text-[14px]'
                            placeholder='Ejem: Sanchez Torres...'
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
                <div className='flex col-start-1 col-end-3 justify-between sm:justify-normal sm:gap-6 md:gap-6 lg:gap-4 md:justify-start'>
                  <FormField
                    control={form.control}
                    name='limit'
                    render={({ field }) => (
                      <FormItem className='w-[12rem] 2xl:w-[20rem]'>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={form.getValues('all')}
                            className='text-[13px] md:text-[14px]'
                            value={form.getValues('all') ? '-' : field.value ?? ''}
                            placeholder='Limite de registros'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='all'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 space-y-0 rounded-md border p-3 h-[2.5rem] w-[8rem] justify-center'>
                        <FormControl>
                          <Checkbox
                            disabled={!form.getValues('limit') || !!form.formState.errors.limit} // transform to boolean
                            checked={field?.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                            }}
                            className={
                              form.getValues('limit') && !form.formState.errors.limit
                                ? ''
                                : 'bg-slate-500'
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
                  <FormItem className='w-full row-start-3 row-end-4 md:col-start-auto md:col-end-auto md:row-start-auto md:row-end-auto '>
                    <FormLabel className='text-[14px] font-bold'>Orden</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Elige el tipo de orden de los registros.
                    </FormDescription>
                    <Select
                      onOpenChange={() => {}}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
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
                          <SelectItem
                            className={`text-[13px] md:text-[14px]`}
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
                )}
              />
              <div>
                <Toaster position='top-center' richColors />
                <Button
                  disabled={isDisabledSubmitButton}
                  type='submit'
                  variant='ghost'
                  className='mx-auto mt-2 md:mt-3 xl:mt-0 md:col-start-2 md:col-end-3 lg:col-start-2 lg:col-end-3 lg:row-start-auto lg:row-end-auto xl:row-start-auto xl:row-end-auto xl:col-start-auto xl:col-end-auto w-full text-[13px] lg:text-[14px] h-[2.5rem] md:w-[15rem] lg:w-full xl:w-full xl:-ml-0 2xl:w-full 2xl:mx-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500  hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 hover:text-white'
                >
                  Buscar
                </Button>
              </div>
            </form>
          </Form>
        )}

        {/* Table */}
        <div className='w-full'>
          {
            <SearchByTermOfferingIncomeDataTable
              columns={columns}
              data={dataFictional}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              dataForm={dataForm}
            />
          }
        </div>
      </div>
    </div>
  );
};
