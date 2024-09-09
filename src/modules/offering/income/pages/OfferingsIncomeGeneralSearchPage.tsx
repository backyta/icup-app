/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState, useEffect } from 'react';

import { type z } from 'zod';
import { Toaster } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/shared/lib/utils';

import { useOfferingIncomeStore } from '@/stores/offering-income';

import {
  offeringIncomeInfoColumns as columns,
  GeneralOfferingIncomeSearchDataTable,
} from '@/modules/offering/income/components';
import { type OfferingIncomeResponse } from '@/modules/offering/income/interfaces';

import { type GeneralSearchForm } from '@/shared/interfaces';
import { formSearchGeneralSchema } from '@/shared/validations';
import { RecordOrder, RecordOrderNames } from '@/shared/enums';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/shared/components/ui/select';
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
  FormDescription,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';

const dataFictional: OfferingIncomeResponse[] = [
  {
    id: '',
    type: '',
    subType: '',
    amount: '',
    shift: '',
    currency: '',
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

export const OfferingsIncomeGeneralSearchPage = (): JSX.Element => {
  //* States
  const [searchParams, setSearchParams] = useState<GeneralSearchForm | undefined>();
  const [isDisabledSubmitButton, setIsDisabledSubmitButton] = useState<boolean>(true);

  const isFiltersSearchGeneralDisabled = useOfferingIncomeStore(
    (state) => state.isFiltersSearchGeneralDisabled
  );
  const setIsFiltersSearchGeneralDisabled = useOfferingIncomeStore(
    (state) => state.setIsFiltersSearchGeneralDisabled
  );

  //* Forms
  const form = useForm<z.infer<typeof formSearchGeneralSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSearchGeneralSchema),
    defaultValues: {
      limit: '10',
      offset: '0',
      all: false,
      order: RecordOrder.Ascending,
    },
  });

  //* Watchers
  const limit = form.watch('limit');
  const offset = form.watch('offset');
  const order = form.watch('order');

  //* Effects
  useEffect(() => {
    if (limit !== '' && offset !== '' && order !== '') {
      setIsDisabledSubmitButton(false);
    }

    if (limit === '' || offset === '' || order === '') {
      setIsDisabledSubmitButton(true);
    }
  }, [limit, offset, order]);

  useEffect(() => {
    setIsFiltersSearchGeneralDisabled(true);
  }, []);

  useEffect(() => {
    document.title = 'Modulo Ofrenda - IcupApp';
  }, []);

  //* Form handler
  function onSubmit(formData: z.infer<typeof formSearchGeneralSchema>): void {
    setSearchParams(formData);
    setIsDisabledSubmitButton(true);
    setIsFiltersSearchGeneralDisabled(false);
    form.reset();
    setIsDisabledSubmitButton(false);
  }

  return (
    <div>
      <h1 className='text-center pt-2 pb-4 font-sans text-2xl sm:text-3xl font-bold text-offering-color text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Ofrendas
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <div className='flex items-center justify-start relative'>
        <h2 className='w-[19rem] sm:w-auto flex items-center text-left pl-4 py-2 sm:pt-4 sm:pb-2 sm:pl-[1.5rem] xl:pl-[2rem] 2xl:pt-4 font-sans text-2xl sm:text-2xl font-bold text-sky-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.98rem] xl:text-[2.1rem] 2xl:text-4xl'>
          Buscar registros de ingreso
        </h2>
        <span className='absolute left-28 sm:left-0 sm:relative sm:ml-3 bg-sky-300 text-slate-600 border text-center text-[10px] mt-[2.2rem] sm:mt-5 -py-1 px-2 rounded-full font-bold uppercase'>
          En General
        </span>
      </div>
      <p className='dark:text-slate-300 text-left font-sans font-bold px-4 text-[12.5px] md:text-[15px] xl:text-base sm:px-[1.5rem] xl:px-[2rem]'>
        Explora, filtra y organiza los registros de ingreso de ofrendas según tus necesidades.
      </p>

      <div className='px-4 md:-px-2 md:px-[2rem] xl:px-[3rem] py-4 md:py-7 w-full'>
        {isFiltersSearchGeneralDisabled && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid grid-cols-2 gap-y-2 gap-x-6 items-end mb-16 md:mb-12 lg:flex lg:justify-between 2xl:justify-normal'
            >
              <div className='flex col-start-1 col-end-3 gap-8 sm:gap-10 lg:gap-4'>
                <FormField
                  control={form.control}
                  name='limit'
                  render={({ field }) => (
                    <FormItem className='sm:w-[20rem] md:w-[14rem] lg:w-auto'>
                      <FormLabel className='text-[14px] font-bold'>Limite</FormLabel>
                      <FormDescription className='text-[14px]'>
                        ¿Cuantos registros necesitas?
                      </FormDescription>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={form.getValues('all')}
                          className='text-[13px] md:text-[14px]'
                          value={form.getValues('all') ? '-' : field.value || ''}
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

                  <div className='flex col-start-1 col-end-3 gap-4 sm:gap-6 lg:gap-4  md:justify-start'>
                    <FormField
                      control={form.control}
                      name='offset'
                      render={({ field }) => (
                        <FormItem className='sm:w-[18rem] md:w-[14rem] lg:w-auto'>
                          <FormControl>
                            <Input
                              disabled={form.getValues('all')}
                              className='text-[13px] md:text-[14px]'
                              placeholder='Nro. de registros desplazados'
                              {...field}
                              value={form.getValues('all') ? '-' : field?.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='all'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-end space-x-3 space-y-0 rounded-md border p-3 h-[2.5rem]'>
                          <FormControl>
                            <Checkbox
                              disabled={
                                !form.getValues('limit') ||
                                !form.getValues('offset') ||
                                !!form.formState.errors.limit // transform to boolean
                              }
                              checked={field?.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                              }}
                              className={
                                (form.getValues('limit') || form.getValues('offset')) &&
                                !form.formState.errors.limit &&
                                !form.formState.errors.offset
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
                </div>
              </div>

              <FormField
                control={form.control}
                name='order'
                render={({ field }) => (
                  <FormItem className='w-auto lg:min-w-[22rem] mid-xl:min-w-[27rem]'>
                    <FormLabel className='text-[14px] font-bold'>Orden</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Elige el tipo de orden de los registros
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
                  className={cn(
                    'm-auto md:m-0 mt-8 lg:m-0 w-full text-[13px] lg:text-[14px] h-[2.5rem]  md:w-[15rem] lg:w-[16rem] px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500  dark:bg-green-500 hover:bg-green-500 hover:text-white'
                  )}
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
            <GeneralOfferingIncomeSearchDataTable
              columns={columns}
              data={dataFictional}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          }
        </div>
      </div>
    </div>
  );
};
