/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { GiCardExchange } from 'react-icons/gi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { updateZone } from '@/app/zone/services';
import { type ZoneResponse } from '@/app/zone/interfaces';
import { zoneSupervisorUpdateFormSchema } from '@/app/zone/validations';
import { useZoneSupervisorUpdateSubmitButtonLogic } from '@/app/zone/hooks';

import { getAllSupervisors } from '@/app/preacher/services';

import { cn } from '@/shared/lib/utils';
import { getFullNames } from '@/shared/helpers';
import { type ErrorResponse } from '@/shared/interfaces';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

interface ZoneSupervisorFormUpdateProps {
  id: string;
  onSubmit: () => void;
  onScroll: () => void;
  data: ZoneResponse | undefined;
}

export const ZoneSupervisorUpdateForm = ({
  id,
  onSubmit,
  onScroll,
  data,
}: ZoneSupervisorFormUpdateProps): JSX.Element => {
  //* States
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);
  const [isInputTheirSupervisorOpen, setIsInputTheirSupervisorOpen] = useState<boolean>(false);
  const [isInputTheirSupervisorDisabled, setIsInputTheirSupervisorDisabled] =
    useState<boolean>(false);

  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* Form
  const form = useForm<z.infer<typeof zoneSupervisorUpdateFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(zoneSupervisorUpdateFormSchema),
    defaultValues: {
      currentZone: '',
      currentTheirSupervisor: '',
      newTheirSupervisor: '',
      newZone: '',
    },
  });

  //* Watchers
  const newTheirSupervisor = form.watch('newTheirSupervisor');

  //* Set data
  useEffect(() => {
    form.setValue(
      'currentTheirSupervisor',
      `${data?.theirSupervisor?.firstName} ${data?.theirSupervisor?.lastName}` ?? ''
    );
    form.setValue('currentZone', data?.zoneName ?? '');
  }, []);

  //* Custom Hooks
  useZoneSupervisorUpdateSubmitButtonLogic({
    zoneSupervisorUpdateForm: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
    isInputTheirSupervisorDisabled,
  });

  //* Effects
  useEffect(() => {
    if (newTheirSupervisor) {
      const zoneBySupervisor = supervisorsQuery?.data?.find(
        (supervisor) => newTheirSupervisor === supervisor.id
      );
      form.setValue('newZone', zoneBySupervisor?.theirZone?.zoneName ?? 'No existe zona.');
    }
  }, [newTheirSupervisor]);

  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);
      url.pathname = `/family-groups/update-family-group/${id}/exchange-preacher`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: updateZone,
    onError: (error: ErrorResponse) => {
      if (error.message !== 'Unauthorized') {
        toast.error(error.message, {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          setIsInputDisabled(true);
          setIsSubmitButtonDisabled(false);
          setIsInputTheirSupervisorDisabled(false);
        }, 1500);
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
      toast.success('Cambios guardados correctamente', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        onScroll();
      }, 150);

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['zones-by-term'] });
        queryClient.invalidateQueries({ queryKey: ['supervisors'] });
      }, 500);

      setTimeout(() => {
        onSubmit();
        setIsInputDisabled(false);
      }, 1500);
    },
  });

  //* Querys
  const supervisorsQuery = useQuery({
    queryKey: ['supervisors'],
    queryFn: () =>
      getAllSupervisors({
        isNull: 'false',
      }),
    retry: 1,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof zoneSupervisorUpdateFormSchema>): void => {
    mutation.mutate({
      id: id ?? '',
      formData: {
        newTheirSupervisor: formData.newTheirSupervisor,
      },
    });
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[480px] md:w-[550px] lg:w-[500px] xl:w-[600px]'
    >
      <h2 className='text-center text-emerald-500 pb-2 font-bold text-[20px] md:text-[24px]'>
        Intercambiar Supervisores
      </h2>

      <TabsContent value='general-info' className='overflow-y-auto'>
        <Card className='w-full'>
          <CardContent className='py-4 px-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-full flex flex-col gap-x-10 gap-y-3 md:gap-y-5 px-2 sm:px-4 '
              >
                <div className='grid grid-cols-7 gap-2'>
                  <div className='flex flex-col gap-4 col-start-1 col-end-4'>
                    <FormField
                      control={form.control}
                      name='currentTheirSupervisor'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='text-[14px] font-bold'>
                              Supervisor Actual
                            </FormLabel>
                            <FormControl>
                              <Input
                                className='text-[14px] font-medium'
                                disabled={isInputDisabled}
                                placeholder='Supervisor actual...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name='currentZone'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='text-[14px] font-bold'>Zona Actual</FormLabel>
                            <FormControl>
                              <Input
                                className='font-medium'
                                disabled={isInputDisabled}
                                placeholder='Zona actual...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <div className='col-start-4 col-end-5 text-center justify-center flex items-center'>
                    <GiCardExchange className='text-[2.5rem] text-amber-500' />
                  </div>

                  <div className='flex flex-col gap-4 col-start-5 col-end-8'>
                    <FormField
                      control={form.control}
                      name='newTheirSupervisor'
                      render={({ field }) => {
                        return (
                          <FormItem className=''>
                            <FormLabel className='text-[14px] font-bold'>
                              Supervisor Nuevo
                            </FormLabel>

                            <Popover
                              open={isInputTheirSupervisorOpen}
                              onOpenChange={setIsInputTheirSupervisorOpen}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    disabled={isInputTheirSupervisorDisabled}
                                    variant='outline'
                                    role='combobox'
                                    className={cn('w-full justify-between font-medium text-[14px]')}
                                  >
                                    {field.value
                                      ? `${supervisorsQuery?.data?.find((supervisor) => supervisor.id === field.value)?.firstName} ${supervisorsQuery.data?.find((supervisor) => supervisor.id === field.value)?.lastName}`
                                      : 'Seleccione un supervisor'}
                                    <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent align='center' className='w-auto px-4 py-2'>
                                <Command>
                                  <CommandInput
                                    placeholder='Busque un supervisor...'
                                    className='h-9 text-[14px]'
                                  />

                                  <CommandEmpty>Supervisor no encontrado.</CommandEmpty>

                                  <CommandGroup
                                    className={cn(
                                      'max-h-[200px] h-auto ',
                                      !supervisorsQuery.data && 'w-[320px]'
                                    )}
                                  >
                                    {supervisorsQuery.data?.map((supervisor) =>
                                      supervisor.id !== data?.theirSupervisor?.id ? (
                                        <CommandItem
                                          className='text-[14px]'
                                          value={getFullNames({
                                            firstNames: supervisor.firstName,
                                            lastNames: supervisor.lastName,
                                          })}
                                          key={supervisor.id}
                                          onSelect={() => {
                                            form.setValue('newTheirSupervisor', supervisor.id);
                                            setIsInputTheirSupervisorOpen(false);
                                          }}
                                        >
                                          {`${supervisor?.firstName} ${supervisor?.lastName}`}
                                          <CheckIcon
                                            className={cn(
                                              'ml-auto h-4 w-4',
                                              supervisor.id === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                            )}
                                          />
                                        </CommandItem>
                                      ) : null
                                    ) ?? (
                                      <p className='text-[14.5px] text-red-500 text-center'>
                                        ❌ No se encontró predicadores disponibles, todos están
                                        asignados a un grupo familiar.
                                      </p>
                                    )}
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
                      name='newZone'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='text-[14px] font-bold'>Zona Nueva</FormLabel>
                            <FormControl>
                              <Input
                                className='font-medium'
                                disabled={isInputDisabled}
                                placeholder='Zona nueva...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>

                {isMessageErrorDisabled ? (
                  <p className='-mb-2 md:-mb-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                    ❌ Datos incompletos, completa todos los campos para actualizar el registro.
                  </p>
                ) : (
                  <p className='-mt-1 order-last md:-mt-3 md:row-start-6 md:row-end-7 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                    ¡Campos completados correctamente! <br /> Para finalizar por favor guarde los
                    cambios.
                  </p>
                )}

                <div className='w-full md:w-[20rem] md:mx-auto col-start-1 col-end-3 text-sm md:text-md xl:text-base'>
                  <Button
                    disabled={isSubmitButtonDisabled}
                    type='submit'
                    className={cn(
                      'w-full text-[14px]',
                      mutation?.isPending &&
                        'bg-emerald-500 disabled:opacity-100 disabled:text-[16px] text-white'
                    )}
                    onClick={() => {
                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          setIsSubmitButtonDisabled(true);
                          setIsInputDisabled(true);
                          setIsInputTheirSupervisorDisabled(true);
                        }
                      }, 100);
                    }}
                  >
                    {mutation?.isPending ? 'Procesando...' : 'Guardar cambios'}
                  </Button>
                </div>
              </form>
            </Form>
            <div className='mt-3'>
              <p className='text-red-500 text-[13px] md:text-[14px] font-bold mb-2'>
                Consideraciones
              </p>

              <p className='text-[12px] md:text-[13px] mb-2 font-medium '>
                ✅ Al ejecutar el intercambio el supervisor, los grupos familiares y los discípulos
                pasaran a la otra Zona y viceversa.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
