/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { cn } from '@/shared/lib/utils';
import { useForm } from 'react-hook-form';
import { FaRegFilePdf } from 'react-icons/fa6';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { generateYearOptions } from '@/shared/helpers/generate-year-options.helper';

import {
  MetricFamilyGroupSearchType,
  MetricFamilyGroupSearchTypeNames,
} from '@/modules/metrics/enums/metrics-search-type.enum';
import { familyGroupReportFormSchema } from '@/modules/metrics/validations/report-form-schema';
import { getFamilyGroupMetricsReport } from '@/modules/metrics/services/family-group-metrics.service';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
  FormDescription,
} from '@/shared/components/ui/form';
import {
  Command,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from '@/shared/components/ui/command';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

interface Props {
  churchId: string | undefined;
  dialogClose: () => void;
}

export const FamilyGroupReportForm = ({ churchId, dialogClose }: Props): JSX.Element => {
  //* States
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);
  const [isInputSearchYearOpen, setIsInputSearchYearOpen] = useState<boolean>(false);

  //* Form
  const form = useForm<z.infer<typeof familyGroupReportFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(familyGroupReportFormSchema),
    defaultValues: {
      types: Object.values(MetricFamilyGroupSearchType),
      church: churchId,
      year: new Date().getFullYear().toString(),
    },
  });

  //* Helpers
  const years = generateYearOptions();

  //* Watchers
  const types = form.watch('types');
  const year = form.watch('year');
  const church = form.watch('church');

  //* Effects
  useEffect(() => {
    form.setValue('church', churchId ?? '');
  }, [churchId]);

  //* Effects
  useEffect(() => {
    if (form.formState.errors && Object.values(form.formState.errors).length > 0) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (types && types.length > 0) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (!types.length) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [form.formState, churchId, types]);

  //* Query Report and Event trigger
  const generateReportQuery = useQuery({
    queryKey: ['family-group-metrics-report', church],
    queryFn: () =>
      getFamilyGroupMetricsReport({
        churchId: church ?? '',
        year: year ?? '',
        types,
        dialogClose,
      }),
    retry: 1,
    enabled: false,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof familyGroupReportFormSchema>): void => {
    generateReportQuery.refetch();
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[480px] md:w-[550px] lg:w-[550px] xl:w-[600px]'
    >
      <h2 className='text-center text-yellow-500  leading-6 pb-1 font-bold text-[24px] sm:text-[26px] md:text-[28px]'>
        Generar Reporte
      </h2>

      <TabsContent value='general-info' className='overflow-y-auto'>
        <Card className='w-full f-full'>
          <CardContent className='py-3 px-3'>
            <span className='text-[12.5px] md:text-[14px] font-medium dark:text-slate-400 text-slate-500'>
              👋🏻 Bienvenido al generador de reportes, por favor selecciona las opciones que quieres
              agregar al reporte.
            </span>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-full pt-2 flex flex-col gap-x-10 gap-y-5 md:gap-y-5 px-2 md:px-4'
              >
                <FormField
                  control={form.control}
                  name='year'
                  render={({ field }) => {
                    return (
                      <FormItem className='flex justify-start gap-5 items-center'>
                        <div className='w-auto'>
                          <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                            Año de búsqueda
                          </FormLabel>
                          <FormDescription className='text-[12px] md:text-[13px] font-medium'>
                            Selecciona el año de búsqueda que tendrán los reportes.
                          </FormDescription>
                        </div>
                        <Popover
                          open={isInputSearchYearOpen}
                          onOpenChange={setIsInputSearchYearOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isInputDisabled}
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'justify-center w-auto text-center px-2 text-[12px] md:text-[14px] ',
                                  !field.value &&
                                    'text-slate-500  dark:text-slate-200 font-normal px-2'
                                )}
                              >
                                {field.value
                                  ? years.find((year) => year.value === field.value)?.label
                                  : 'Elige un año'}
                                <CaretSortIcon className='h-4 w-4 shrink-0' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align='center' className='w-auto px-4 py-2'>
                            <Command>
                              <CommandInput
                                placeholder='Busque un año...'
                                className='h-9 text-[12px] md:text-[14px]'
                              />
                              <CommandEmpty>Año no encontrado.</CommandEmpty>
                              <CommandGroup className='max-h-[100px] h-auto'>
                                {years.map((year) => (
                                  <CommandItem
                                    className='text-[12px] md:text-[14px]'
                                    value={year.label}
                                    key={year.value}
                                    onSelect={() => {
                                      form.setValue('year', year.value);
                                      setIsInputSearchYearOpen(false);
                                    }}
                                  >
                                    {year.label}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        year.value === field.value ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name='types'
                  render={() => (
                    <FormItem>
                      <div>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Opciones
                        </FormLabel>
                      </div>
                      <div className='flex flex-col md:grid md:grid-cols-2 items-start md:items-center mx-auto gap-x-[5rem] justify-between gap-y-2 cursor-pointer'>
                        {Object.values(MetricFamilyGroupSearchType).map((type) => (
                          <FormField
                            key={type}
                            control={form.control}
                            name='types'
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={type}
                                  className='flex flex-row items-center space-x-3 space-y-0'
                                >
                                  <FormControl>
                                    <Checkbox
                                      disabled={isInputDisabled}
                                      checked={field.value?.includes(type)}
                                      onCheckedChange={(checked) => {
                                        let updatedTypes: MetricFamilyGroupSearchType[] = [];
                                        checked
                                          ? (updatedTypes = field.value
                                              ? [...field.value, type]
                                              : [type])
                                          : (updatedTypes =
                                              field.value?.filter((value) => value !== type) ?? []);

                                        field.onChange(updatedTypes);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel
                                    className={`text-[12px] md:text-[13px] font-medium cursor-pointer`}
                                  >
                                    {MetricFamilyGroupSearchTypeNames[type]}
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

                {isMessageErrorDisabled ? (
                  <p className='-mb-2 md:-mb-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                    ❌ Datos incompletos, completa los campos requeridos.
                  </p>
                ) : (
                  <p className='-mt-1 order-last md:-mt-3 md:row-start-6 md:row-end-7 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                    ¡Campos completados correctamente!
                  </p>
                )}

                <div className='w-full md:w-[20rem] md:mx-auto col-start-1 col-end-3 text-sm md:text-md xl:text-base'>
                  <Button
                    disabled={isSubmitButtonDisabled}
                    type='submit'
                    variant='ghost'
                    className={cn(
                      'w-full px-4 py-3 text-[15px] font-semibold rounded-lg shadow-lg transition-transform transform focus:outline-none focus:ring-red-300',
                      !generateReportQuery.isFetching &&
                        'text-white hover:text-white dark:text-white bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-700 hover:to-amber-800',
                      generateReportQuery.isFetching &&
                        'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-200 cursor-not-allowed animate-pulse'
                    )}
                    onClick={() => {
                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          setIsInputDisabled(true);
                          setIsSubmitButtonDisabled(true);
                        }
                      }, 100);
                    }}
                  >
                    <FaRegFilePdf
                      className={cn(
                        'mr-2 text-[1.5rem] text-white',
                        generateReportQuery.isFetching && 'text-gray-600 dark:text-gray-200'
                      )}
                    />
                    {generateReportQuery.isFetching ? 'Generando Reporte...' : 'Generar Reporte'}
                  </Button>
                </div>
              </form>
            </Form>
            <div className='mt-3'>
              <p className='text-blue-500 text-[13px] md:text-[14px] font-bold mb-2'>
                Consideraciones
              </p>
              <p className='text-[12px] md:text-[13px] font-medium'>
                ✅ Se generara el reporte pdf con la iglesia actual de la búsqueda.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
