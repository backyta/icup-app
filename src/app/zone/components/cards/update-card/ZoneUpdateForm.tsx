/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useEffect } from 'react';

import { type z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { updateZone } from '@/app/zone/services';
import { zoneFormSchema } from '@/app/zone/validations';
import { ZoneFormSkeleton } from '@/app/zone/components';
import { type ZoneResponse } from '@/app/zone/interfaces';
import { useZoneUpdateSubmitButtonLogic } from '@/app/zone/hooks';

import { getAllSupervisors } from '@/app/preacher/services';

import { cn } from '@/shared/lib/utils';
import { type ErrorResponse } from '@/shared/interfaces';
import { getFullNames, validateDistrictsAllowedByModule } from '@/shared/helpers';
import { CountryNames, DepartmentNames, DistrictNames, ProvinceNames } from '@/shared/enums';

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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

interface ZoneFormUpdateProps {
  id: string;
  onSubmit: () => void;
  onScroll: () => void;
  data: ZoneResponse | undefined;
}

export const ZoneUpdateForm = ({
  id,
  data,
  onSubmit,
  onScroll,
}: ZoneFormUpdateProps): JSX.Element => {
  //* States
  const [isInputTheirSupervisorOpen, setIsInputTheirSupervisorOpen] = useState<boolean>(false);
  const [isInputTheirSupervisorDisabled, setIsInputTheirSupervisorDisabled] =
    useState<boolean>(true);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  //* Hooks (external libraries)
  const { pathname } = useLocation();
  const navigate = useNavigate();

  //* Form
  const form = useForm<z.infer<typeof zoneFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(zoneFormSchema),
    defaultValues: {
      zoneName: '',
      country: '',
      department: '',
      province: '',
      district: '',
      recordStatus: '',
      theirSupervisor: '',
    },
  });

  useEffect(() => {
    form.setValue('zoneName', data?.zoneName ?? '');
    form.setValue('country', data?.country ?? '');
    form.setValue('department', data?.department ?? '');
    form.setValue('province', data?.province ?? '');
    form.setValue('district', data?.district ?? '');
    form.setValue('theirSupervisor', data?.theirSupervisor?.id);
    form.setValue('recordStatus', data?.recordStatus);

    setTimeout(() => {
      setIsLoadingData(false);
    }, 1200);
  }, []);

  //* Custom hooks
  useZoneUpdateSubmitButtonLogic({
    zoneUpdateForm: form,
    isInputDisabled,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
  });

  //* Effects
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);
      url.pathname = `/zones/update-zone/${id}/edit`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);

  //* Helpers
  const disabledDistricts = validateDistrictsAllowedByModule(pathname);

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
          setIsInputDisabled(false);
          setIsSubmitButtonDisabled(false);
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
    queryFn: () => getAllSupervisors({ isNull: 'false' }),
    staleTime: 5 * 60 * 1000,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof zoneFormSchema>): void => {
    mutation.mutate({ id, formData });
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[990px] xl:w-[1100px]'
    >
      <h2 className='text-center text-orange-500 pb-2 font-bold text-[20px] md:text-[24px]'>
        Actualizar información de la Iglesia
      </h2>

      <TabsContent value='general-info'>
        <Card className='w-full'>
          {isLoadingData && <ZoneFormSkeleton />}

          {!isLoadingData && (
            <CardContent className='py-3 px-4'>
              <div className='dark:text-slate-300 text-slate-500 font-bold text-[16px] mb-4 pl-4'>
                Zona: {data?.zoneName} - {data?.district}
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='w-full flex flex-col md:grid md:grid-cols-2 gap-x-10 gap-y-5 px-2 sm:px-12'
                >
                  <div className='col-start-1 col-end-2'>
                    <FormField
                      control={form.control}
                      name='zoneName'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Nombre
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar una nombre a la zona.
                            </FormDescription>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                placeholder='Eje: Iglesia Roca Fuerte...'
                                type='text'
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
                      name='country'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              País
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar el país al que pertenece la iglesia.
                            </FormDescription>
                            <Select
                              disabled={isInputDisabled}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  {field.value ? (
                                    <SelectValue placeholder='Selecciona el país' />
                                  ) : (
                                    'Selecciona el país'
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(CountryNames).map(([key, value]) => (
                                  <SelectItem className={`text-[14px]`} key={key} value={key}>
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

                    <FormField
                      control={form.control}
                      name='department'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Departamento
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar el departamento al que pertenece la casa familiar.
                            </FormDescription>
                            <Select
                              disabled={isInputDisabled}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  {field.value ? (
                                    <SelectValue placeholder='Selecciona el departamento' />
                                  ) : (
                                    'Selecciona el departamento'
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(DepartmentNames).map(([key, value]) => (
                                  <SelectItem className={`text-[14px]`} key={key} value={key}>
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

                    <FormField
                      control={form.control}
                      name='province'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Provincia
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar la provincia a la que pertenece la iglesia.
                            </FormDescription>
                            <Select
                              disabled={isInputDisabled}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  {field.value ? (
                                    <SelectValue placeholder='Selecciona la provincia' />
                                  ) : (
                                    'Selecciona la provincia'
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(ProvinceNames).map(([key, value]) => (
                                  <SelectItem className={`text-[14px]`} key={key} value={key}>
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
                  </div>

                  <div className='col-start-2 col-end-3'>
                    <FormField
                      control={form.control}
                      name='district'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Distrito
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar el distrito al que pertenece la iglesia.
                            </FormDescription>
                            <Select
                              disabled={isInputDisabled}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  {field.value ? (
                                    <SelectValue placeholder='Selecciona el distrito' />
                                  ) : (
                                    'Selecciona el distrito'
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(DistrictNames).map(([key, value]) => (
                                  <SelectItem
                                    className={`text-[14px] ${disabledDistricts?.disabledDistricts?.includes(value) ? 'hidden' : ''}`}
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

                    <FormField
                      control={form.control}
                      name='theirSupervisor'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Supervisor
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Seleccione un supervisor para esta zona.
                            </FormDescription>
                            <Popover
                              open={isInputTheirSupervisorOpen}
                              onOpenChange={setIsInputTheirSupervisorOpen}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    value={field.value}
                                    disabled={isInputTheirSupervisorDisabled}
                                    variant='outline'
                                    role='combobox'
                                    className={cn(
                                      'w-full justify-between',
                                      !field.value && 'font-normal',
                                      isInputTheirSupervisorDisabled &&
                                        'dark:bg-gray-100  dark:text-black bg-gray-200'
                                    )}
                                  >
                                    {field.value
                                      ? `${supervisorsQuery?.data?.find((supervisor) => supervisor.id === field.value)?.firstName} ${supervisorsQuery?.data?.find((supervisor) => supervisor.id === field.value)?.lastName}`
                                      : 'Busque y seleccione una iglesia'}
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
                                  <CommandGroup className='max-h-[200px] h-auto'>
                                    {supervisorsQuery?.data?.map((supervisor) => (
                                      <CommandItem
                                        className='text-[14px]'
                                        value={getFullNames({
                                          firstNames: supervisor.firstName,
                                          lastNames: supervisor.lastName,
                                        })}
                                        key={supervisor.id}
                                        onSelect={() => {
                                          form.setValue('theirSupervisor', supervisor.id);
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
                                    ))}
                                    {supervisorsQuery.data?.length === 0 && (
                                      <p className='text-[14.5px] text-red-500 text-center'>
                                        ❌ No se encontró supervisores disponibles, todos están
                                        asignados a una zona.
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
                      name='recordStatus'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px]'>Estado</FormLabel>
                            <Select
                              disabled={isInputDisabled}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl className='text-[14px]'>
                                <SelectTrigger>
                                  {field.value === 'active' ? (
                                    <SelectValue placeholder='Activo' />
                                  ) : (
                                    <SelectValue placeholder='Inactivo' />
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem className='text-[14px]' value='active'>
                                  Activo
                                </SelectItem>
                                <SelectItem className='text-[14px]' value='inactive'>
                                  Inactivo
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            {form.getValues('recordStatus') === 'active' && (
                              <FormDescription className='pl-2 text-[12px] xl:text-[13px] font-bold'>
                                *El registro esta <span className='text-green-500'>Activo</span>,
                                para colocarla como <span className='text-red-500'>Inactivo</span>{' '}
                                debe eliminar el registro desde la pestaña{' '}
                                <span className='font-bold text-red-500'>Eliminar Iglesia. </span>
                              </FormDescription>
                            )}
                            {form.getValues('recordStatus') === 'inactive' && (
                              <FormDescription className='pl-2 text-[12px] xl:text-[13px] font-bold'>
                                * El registro esta <span className='text-red-500 '>Inactivo</span>,
                                puede modificar el estado eligiendo otra opción.
                              </FormDescription>
                            )}
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  {isMessageErrorDisabled ? (
                    <p className='-mb-5 mt-4 md:mt-1 md:-mb-3 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                      ❌ Datos incompletos, completa todos los campos para guardar el registro.
                    </p>
                  ) : (
                    <p className='-mt-3 order-last md:-mt-2 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                      ¡Campos completados correctamente! <br /> Para finalizar por favor guarde los
                      cambios.
                    </p>
                  )}

                  <div className='mt-2 md:mt-1 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-4 w-full md:w-[20rem] md:m-auto'>
                    <Button
                      disabled={isSubmitButtonDisabled}
                      type='submit'
                      className={cn(
                        'w-full text-[14px]',
                        mutation?.isPending &&
                          'bg-emerald-500 disabled:opacity-100 disabled:md:text-[15px] text-white'
                      )}
                      onClick={() => {
                        setTimeout(() => {
                          if (Object.keys(form.formState.errors).length === 0) {
                            setIsSubmitButtonDisabled(true);
                            setIsInputTheirSupervisorDisabled(true);
                            setIsInputDisabled(true);
                          }
                        }, 100);
                      }}
                    >
                      {mutation?.isPending ? 'Procesando...' : 'Guardar cambios'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
};
