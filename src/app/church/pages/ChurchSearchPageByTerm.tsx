/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Toaster, toast } from 'sonner';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';

import { getChurchesByTerm } from '@/app/church/services';
import { churchFormTermSearchSchema } from '@/app/church/validations';
import { type ErrorResponse, type ChurchResponse } from '@/app/church/interfaces';
import { churchInfoColumns as columns, SearchByTermChurchDataTable } from '@/app/church/components';

import { cn } from '@/shared/lib/utils';

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
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from '@/shared/components/ui/select';

import { type FormSearchByTerm } from '@/shared/interfaces';
import {
  RecordOrder,
  RecordOrderNames,
  SearchSelectionOptionNames,
  SearchType,
  SearchTypeNames,
} from '@/shared/enums';
import {
  validateSelectTermByTypeAndSubtype,
  validateTypesAllowedByModule,
  formatDateTermToTimestamp,
} from '@/shared/helpers';

import { useChurchStore } from '@/stores/church';
import { LoadingSpinner } from '@/layouts/components';

const dataFictional: ChurchResponse[] = [
  {
    id: '-',
    churchName: '-',
    isAnexe: false,
    worshipTimes: ['16:00'],
    foundingDate: '2024-05-31',
    email: 'iglesia.central@gmail.com',
    phoneNumber: '-',
    country: '-',
    department: '-',
    province: '-',
    district: '-',
    urbanSector: '-',
    address: '-',
    referenceAddress: '-',
    status: 'active',
    theirMainChurch: '940f1910-a490-4604-8725-56c8e2d412ba',
  },
];

export const ChurchSearchPageByTerm = (): JSX.Element => {
  //* States
  const [isDisabledSubmitButton, setIsDisabledSubmitButton] = useState<boolean>(true);

  const isFiltersSearchByTermDisabled = useChurchStore(
    (state) => state.isFiltersSearchByTermDisabled
  );
  const setIsFiltersSearchByTermDisabled = useChurchStore(
    (state) => state.setIsFiltersSearchByTermDisabled
  );
  const setDataSearchByTermResResponse = useChurchStore(
    (state) => state.setDataSearchByTermResponse
  );

  const [dataForm, setDataForm] = useState<FormSearchByTerm>();

  //* Hooks (external library)
  const { pathname } = useLocation();

  const navigate = useNavigate();

  //* Forms
  const form = useForm<z.infer<typeof churchFormTermSearchSchema>>({
    resolver: zodResolver(churchFormTermSearchSchema),
    mode: 'onChange',
    defaultValues: {
      limit: '10',
      inputTerm: '',
      selectTerm: '',
      dateTerm: undefined,
      all: false,
      order: RecordOrder.Ascending,
    },
  });

  //* Watchers
  const searchType = form.watch('searchType');
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

  //* Helpers
  const disabledTypes = validateTypesAllowedByModule(pathname);
  const disabledSelectTerm = validateSelectTermByTypeAndSubtype(searchType);

  //* Mutation
  const mutation = useMutation({
    mutationFn: getChurchesByTerm,
    onError: (error: ErrorResponse) => {
      if (error.message !== 'Unauthorized') {
        toast.error(error.message, {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          setIsDisabledSubmitButton(false);
        }, 1300);
      }

      if (error.message === 'Unauthorized') {
        toast.error('Operación rechazada, el token expiro ingresa nuevamente.', {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          navigate('/');
        }, 3500);
      }
    },
    onSuccess: () => {
      setIsFiltersSearchByTermDisabled(false);
      setIsDisabledSubmitButton(false);
      form.reset();
    },
  });

  //* Aquí manda la data ficticia cuando vuele a entrar
  useEffect(() => {
    setDataSearchByTermResResponse(mutation.data);
  }, [mutation.isPending]);

  //* Form handler
  function onSubmit(formData: z.infer<typeof churchFormTermSearchSchema>): void {
    let newDateTermTo;
    if (!formData.dateTerm?.to) {
      newDateTermTo = formData.dateTerm?.from;
    }

    const newDateTerm = formatDateTermToTimestamp({
      from: formData.dateTerm?.from,
      to: formData.dateTerm?.to ? formData.dateTerm?.to : newDateTermTo,
    });

    mutation.mutate({ ...formData, dateTerm: newDateTerm });
    setIsDisabledSubmitButton(true);
    setDataForm(formData);
  }

  return (
    <div className='animate-fadeInPage'>
      <h1 className='text-center pt-3 md:pt-2 pb-4 font-sans text-2xl sm:text-3xl font-bold text-slate-500 dark:text-slate-400 text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Iglesia
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <div className='flex items-center justify-start'>
        <h2 className='flex items-center text-left pl-4 py-2 sm:pt-4 sm:pb-2 sm:pl-[1.5rem] xl:pl-[2rem] 2xl:pt-4 font-sans text-2xl sm:text-2xl font-bold text-sky-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.98rem] xl:text-[2.1rem] 2xl:text-4xl'>
          Buscar iglesias o anexos
        </h2>
        <span className='ml-3 bg-sky-300 text-slate-600 border text-center text-[10px] mt-[.6rem] sm:mt-5 -py-1 px-2 rounded-full font-bold uppercase'>
          Por tipo
        </span>
      </div>
      <p className='dark:text-slate-300 text-left font-sans font-bold px-4 text-[12.5px] md:text-[15px] xl:text-base sm:px-[1.5rem] xl:px-[2rem]'>
        Explora, filtra y organiza los registros de iglesias según tus necesidades.
      </p>

      <div className='px-4 md:-px-2 md:px-[2rem] xl:px-[3rem] py-4 w-full'>
        {isFiltersSearchByTermDisabled && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid grid-cols-1 gap-4 gap-y-4 items-end mb-16 md:mb-12 md:grid-cols-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 w-auto'
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
                        }}
                        onValueChange={field.onChange}
                      >
                        <FormControl className='text-[13px] md:text-[14px]'>
                          <SelectTrigger>
                            <SelectValue placeholder='Selecciona un tipo' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(SearchTypeNames).map(([key, value]) => (
                            <SelectItem
                              className={`text-[13px] md:text-[14px] ${disabledTypes?.disabledSearchTypes?.includes(value) ? 'hidden' : ''}`}
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

              {(searchType === SearchType.ChurchName ||
                searchType === SearchType.Department ||
                searchType === SearchType.Province ||
                searchType === SearchType.District ||
                searchType === SearchType.UrbanSector ||
                searchType === SearchType.Address) && (
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
                          placeholder='Eje: C-2, Av.Central 123, Lima ....'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {searchType === SearchType.FoundingDate && (
                <FormField
                  control={form.control}
                  name='dateTerm'
                  render={({ field }) => (
                    <FormItem className=''>
                      <FormLabel className='text-[14px] font-bold'>Termino (fecha)</FormLabel>
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

              {searchType === SearchType.Status && (
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
                            {Object.entries(SearchSelectionOptionNames).map(([key, value]) => (
                              <SelectItem
                                className={`text-[13px] md:text-[14px] ${disabledSelectTerm?.disabledSelectTerm?.includes(value) ? 'hidden' : ''}`}
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
                            disabled={form.getValues('all')}
                            className='text-[13px] md:text-[14px]'
                            value={form.getValues('all') ? '-' : field.value || ''}
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
                  <FormItem className='w-full col-start-auto col-end-auto lg:col-start-auto lg:col-end-auto'>
                    <FormLabel className='text-[14px] font-bold'>Orden</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Elige el tipo de orden de los registros
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
                  className='mx-auto mt-14 lg:mt-4 xl:mt-0 md:mt-0 md:col-start-2 md:col-end-3 lg:col-start-2 lg:col-end-3 lg:row-start-auto lg:row-end-auto xl:row-start-auto xl:row-end-auto xl:col-start-auto xl:col-end-auto w-[8rem] text-[13px] lg:text-[14px] h-[2.5rem] md:w-[15rem] lg:w-full xl:w-full xl:-ml-0 2xl:w-full 2xl:mx-auto px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500  hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400 hover:text-white'
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
            <SearchByTermChurchDataTable
              columns={columns}
              data={mutation.data ?? dataFictional}
              mutation={mutation}
              dataForm={dataForm}
            />
          }

          {/* Spinner */}
          {mutation.isPending && (
            <div className='py-10'>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
