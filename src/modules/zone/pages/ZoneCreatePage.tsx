/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from 'react';

import type * as z from 'zod';
import { Toaster } from 'sonner';
import { useForm } from 'react-hook-form';

import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/shared/lib/utils';
import { LoadingSpinner } from '@/shared/components';

import { zoneFormSchema } from '@/modules/zone/validations';
import { getAllSupervisors } from '@/modules/preacher/services';
import { useZoneCreationSubmitButtonLogic, useZoneCreationMutation } from '@/modules/zone/hooks';

import {
  Country,
  Province,
  Department,
  CountryNames,
  ProvinceNames,
  DistrictNames,
  DepartmentNames,
} from '@/shared/enums';
import { getFullNames, validateDistrictsAllowedByModule } from '@/shared/helpers';

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
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
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

export const ZoneCreatePage = (): JSX.Element => {
  //* States
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isInputTheirSupervisorOpen, setIsInputTheirSupervisorOpen] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);

  //* Hooks (external libraries)
  const { pathname } = useLocation();

  //* Form
  const form = useForm<z.infer<typeof zoneFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(zoneFormSchema),
    defaultValues: {
      zoneName: '',
      country: Country.Peru,
      department: Department.Lima,
      province: Province.Lima,
      district: '',
      theirSupervisor: '',
    },
  });

  //* Helpers
  const disabledDistricts = validateDistrictsAllowedByModule(pathname);

  //* Custom hooks
  useZoneCreationSubmitButtonLogic({
    zoneCreationForm: form,
    isInputDisabled,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
  });

  const zoneCreationMutation = useZoneCreationMutation({
    zoneCreationForm: form,
    setIsInputDisabled,
    setIsSubmitButtonDisabled,
  });

  //* Queries
  const { data, isLoading } = useQuery({
    queryKey: ['supervisors-for-zone'],
    queryFn: () => getAllSupervisors({ isNull: 'true' }),
  });

  if (isLoading) return <LoadingSpinner />;

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof zoneFormSchema>): void => {
    zoneCreationMutation.mutate(formData);
  };

  return (
    <div id='menu' className='animate-fadeInPage'>
      <h1 className='text-center pt-1 md:pt-0 pb-1 font-sans font-bold text-cyan-400 dark:text-cyan-500 text-[2.1rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-[3rem]'>
        Modulo Zona
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h1 className='text-left px-4 sm:px-5 pt-2 2xl:px-24 font-sans font-bold text-green-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.9rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Crear una nueva zona
      </h1>

      <p className='dark:text-slate-300 text-left font-sans font-bold pl-5 sm:pl-7 2xl:px-28 text-[12px] md:text-[15px] xl:text-base'>
        Por favor llena los siguientes datos para crear una nueva zona.
      </p>

      <div className='flex min-h-full flex-col items-center justify-between px-8 py-4 sm:px-10 sm:py-6 2xl:px-36 2xl:py-10'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='max-w-md w-full flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='zoneName'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>Nombre</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Asignar una nombre a la zona.
                    </FormDescription>
                    <FormControl>
                      <Input
                        disabled={isInputDisabled}
                        placeholder='Eje: Jerusalem...'
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
                  <FormItem className=''>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>País</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Asignar el país al que pertenece la zona.
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
                  <FormItem className=''>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                      Departamento
                    </FormLabel>
                    <FormDescription className='text-[14px]'>
                      Asignar el departamento al que pertenece la zona.
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
                  <FormItem>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                      Provincia
                    </FormLabel>
                    <FormDescription className='text-[14px]'>
                      Asignar la provincia a la que pertenece la zona.
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

            <FormField
              control={form.control}
              name='district'
              render={({ field }) => {
                return (
                  <FormItem className=''>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                      Distrito
                    </FormLabel>
                    <FormDescription className='text-[14px]'>
                      Asignar el distrito al que pertenece la zona.
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
                  <FormItem className=''>
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
                            disabled={isInputDisabled}
                            variant='outline'
                            role='combobox'
                            className={cn('w-full justify-between ')}
                          >
                            {field.value
                              ? `${data?.find((supervisor) => supervisor.id === field.value)?.firstName} ${data?.find((supervisor) => supervisor.id === field.value)?.lastName}`
                              : 'Busque y seleccione un supervisor'}
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
                              'max-h-[200px] h-auto',
                              data?.length === 0 && 'w-[340px]'
                            )}
                          >
                            {data?.map((supervisor) => (
                              <CommandItem
                                className='text-[14px]'
                                value={getFullNames({
                                  firstNames: supervisor.firstName,
                                  lastNames: supervisor.lastName,
                                })}
                                key={supervisor?.id}
                                onSelect={() => {
                                  form.setValue('theirSupervisor', supervisor?.id);
                                  setIsInputTheirSupervisorOpen(false);
                                }}
                              >
                                {`${supervisor?.firstName} ${supervisor?.lastName}`}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    supervisor.id === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}

                            {data?.length === 0 && (
                              <p className='text-[14.5px] text-red-500 text-center'>
                                ❌ No se encontró supervisores disponibles, todos están asignados a
                                una zona.
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

            {isMessageErrorDisabled ? (
              <p className='-mb-5 mt-2 md:-mb-2 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 mx-auto md:w-[100%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                ❌ Datos incompletos, completa todos los campos para crear el registro.
              </p>
            ) : (
              <p className='-mt-2 order-last md:-mt-2 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                ¡Campos completados correctamente! <br />
              </p>
            )}

            <div className='mt-2 w-full md:w-[20rem] md:m-auto'>
              <Toaster position='top-center' richColors />
              <Button
                disabled={isSubmitButtonDisabled}
                type='submit'
                className='w-full text-[14px]'
                onClick={() => {
                  setTimeout(() => {
                    if (Object.keys(form.formState.errors).length === 0) {
                      setIsSubmitButtonDisabled(true);
                      setIsInputDisabled(true);
                    }
                  }, 100);
                }}
              >
                Registrar Iglesia
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
