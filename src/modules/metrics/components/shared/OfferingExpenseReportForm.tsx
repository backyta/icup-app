/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { offeringIncomeReportFormSchema } from '@/modules/metrics/validations';
import {
  MetricOfferingIncomeSearchTypeNames,
  MetricOfferingIncomeSearchType,
} from '@/modules/metrics/enums';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from '@/shared/components/ui/form';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';

interface Props {
  churchId: string | undefined;
  dialogClose: () => void;
  scrollToTop: () => void;
}

export const OfferingExpenseReportForm = ({
  churchId,
  dialogClose,
  scrollToTop,
}: Props): JSX.Element => {
  //* States
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);

  //* Form
  const form = useForm<z.infer<typeof offeringIncomeReportFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(offeringIncomeReportFormSchema),
    defaultValues: {
      types: Object.values(MetricOfferingIncomeSearchType),
      church: churchId,
    },
  });

  //* Watchers
  const types = form.watch('types');

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

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof offeringIncomeReportFormSchema>): void => {
    console.log(formData);
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
        <Card className='w-full'>
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
                <div className='flex'>
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
                          {Object.values(MetricOfferingIncomeSearchType).map((type) => (
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
                                          let updatedTypes: MetricOfferingIncomeSearchType[] = [];
                                          checked
                                            ? (updatedTypes = field.value
                                                ? [...field.value, type]
                                                : [type])
                                            : (updatedTypes =
                                                field.value?.filter((value) => value !== type) ??
                                                []);

                                          field.onChange(updatedTypes);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel
                                      className={`text-[12px] md:text-[13px] font-medium cursor-pointer`}
                                    >
                                      {MetricOfferingIncomeSearchTypeNames[type]}
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
                </div>

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
                    // className={cn(
                    //   'w-full text-[14px]',
                    //   familyGroupPreacherUpdateMutation?.isPending &&
                    //     'bg-emerald-500 disabled:opacity-100 disabled:text-[16px] text-white'
                    // )}
                    className='w-full text-[13.5px] md:text-[14px]'
                    onClick={() => {
                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          setIsSubmitButtonDisabled(true);
                          setIsInputDisabled(true);
                        }
                      }, 100);
                    }}
                  >
                    {/* {familyGroupPreacherUpdateMutation?.isPending
                      ? 'Procesando...'
                      : 'Guardar cambios'} */}
                    Generar Reporte PDF
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
