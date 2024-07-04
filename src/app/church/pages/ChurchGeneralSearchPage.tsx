/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState, useEffect } from 'react';

import { type z } from 'zod';
import { Toaster } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/shared/lib/utils';

import { type FormSearchByTerm } from '@/shared/interfaces';
import { formSearchGeneralSchema } from '@/shared/validations';
import { RecordOrder, RecordOrderNames } from '@/shared/enums';

import { useChurchStore } from '@/stores/church';

import {
  churchInfoColumns as columns,
  GeneralChurchSearchDataTable,
} from '@/app/church/components';
import { type ChurchResponse } from '@/app/church/interfaces';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
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

const dataFictional: ChurchResponse[] = [
  {
    id: '',
    churchName: '',
    isAnexe: false,
    worshipTimes: ['16:00'],
    foundingDate: new Date('2024-05-31'),
    email: 'iglesia.central@gmail.com',
    phoneNumber: '',
    country: '',
    department: '',
    province: '',
    district: '',
    urbanSector: '',
    address: '',
    referenceAddress: '',
    status: 'active',
    theirMainChurch: null,
  },
];

export const ChurchGeneralSearchPage = (): JSX.Element => {
  //* States
  const [isDisabledSubmitButton, setIsDisabledSubmitButton] = useState<boolean>(true);

  const isFiltersSearchGeneralDisabled = useChurchStore(
    (state) => state.isFiltersSearchGeneralDisabled
  );
  const setIsFiltersSearchGeneralDisabled = useChurchStore(
    (state) => state.setIsFiltersSearchGeneralDisabled
  );

  const [searchParams, setSearchParams] = useState<FormSearchByTerm | undefined>();

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

  //* Form handler
  function onSubmit(formData: z.infer<typeof formSearchGeneralSchema>): void {
    setSearchParams(formData);
    setIsDisabledSubmitButton(true);
    setIsFiltersSearchGeneralDisabled(false);
    form.reset();
    setIsDisabledSubmitButton(false);
  }

  return (
    <div className='animate-fadeInPage'>
      <h1 className='text-center pt-2 pb-4 font-sans text-2xl sm:text-3xl font-bold text-slate-500 dark:text-slate-400 text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Iglesia
      </h1>
      <hr className='md:p-[0.02rem] bg-slate-500' />
      <div className='flex items-center justify-start'>
        <h2 className='flex items-center text-left pl-4 py-2 sm:pt-4 sm:pb-2 sm:pl-[1.5rem] xl:pl-[2rem] 2xl:pt-4 font-sans text-2xl sm:text-2xl font-bold text-sky-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.98rem] xl:text-[2.1rem] 2xl:text-4xl'>
          Buscar iglesias
        </h2>
        <span className='ml-5 bg-sky-300 text-slate-600 border text-center text-[10px] mt-[.6rem] sm:mt-5 -py-1 px-2 rounded-full font-bold uppercase'>
          En general
        </span>
      </div>
      <p className='dark:text-slate-300 text-left font-sans font-bold px-4 text-[12.5px] md:text-[15px] xl:text-base sm:px-[1.5rem] xl:px-[2rem]'>
        Explora, filtra y organiza los registros de iglesias según tus necesidades.
      </p>

      <div className='px-4 md:-px-2 md:px-[2rem] xl:px-[3rem] py-4 md:py-7 w-full'>
        {isFiltersSearchGeneralDisabled && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=' grid grid-cols-2 gap-y-2 gap-x-6 items-end mb-16 md:mb-12 md:flex md:gap-4'
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

                  <div className='flex col-start-1 col-end-3 gap-2 sm:gap-4 md:justify-start'>
                    <FormField
                      control={form.control}
                      name='offset'
                      render={({ field }) => (
                        <FormItem className='sm:w-[18rem] md:w-auto'>
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
                  <FormItem className='lg:min-w-[23rem]'>
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
                    'm-auto md:m-0 mt-8 lg:m-0 w-full text-[13px] lg:text-[14px] h-[2.5rem] md:w-[16rem] px-4 py-2 border-1 text-green-950 border-green-500 bg-green-500  dark:bg-green-500 hover:bg-green-500 hover:text-white'
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
            <GeneralChurchSearchDataTable
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
