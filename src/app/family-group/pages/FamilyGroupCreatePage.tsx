/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from 'react';

import type * as z from 'zod';
import { Toaster, toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { useFamilyGroupCreateSubmitButtonLogic } from '@/app/family-group/hooks';

import { FamilyGroupWorshipTimeNames } from '@/app/family-group/enums';
import { familyGroupFormSchema } from '@/app/family-group/validations';
import { createFamilyGroup, getPreachersByZone, getAllZones } from '@/app/family-group/services';

import { PreacherSearchType } from '@/app/preacher/enums';

import { LoadingSpinner } from '@/shared/components';

import { cn } from '@/shared/lib/utils';
import { type ErrorResponse } from '@/shared/interfaces';

import {
  Country,
  CountryNames,
  Department,
  DepartmentNames,
  District,
  DistrictNames,
  Province,
  ProvinceNames,
  UrbanSectorNames,
} from '@/shared/enums';
import {
  validateDistrictsAllowedByModule,
  validateUrbanSectorsAllowedByDistrict,
} from '@/shared/helpers';

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
import { Textarea } from '@/shared/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

export const FamilyGroupCreatePage = (): JSX.Element => {
  //* States
  const [isInputTheirPreacherOpen, setIsInputTheirPreacherOpen] = useState<boolean>(false);
  const [isInputTheirZoneOpen, setIsInputTheirZoneOpen] = useState<boolean>(false);

  const [isInputTheirPreacherDisabled, setIsInputTheirPreacherDisabled] = useState<boolean>(true);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);

  //* Library hooks
  const { pathname } = useLocation();
  const navigate = useNavigate();

  //* Form
  const form = useForm<z.infer<typeof familyGroupFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(familyGroupFormSchema),
    defaultValues: {
      familyGroupName: '',
      country: Country.Peru,
      department: Department.Lima,
      province: Province.Lima,
      district: District.Independencia,
      urbanSector: '',
      address: '',
      worshipTime: '',
      referenceAddress: '',
      theirPreacher: '',
      theirZone: '',
    },
  });

  //* Watchers
  const district = form.watch('district');
  const theirZone = form.watch('theirZone');

  //* Custom hooks
  useFamilyGroupCreateSubmitButtonLogic({
    familyGroupCreateForm: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
    isInputDisabled,
  });

  //* Effects
  useEffect(() => {
    form.resetField('urbanSector', {
      keepError: true,
    });
  }, [district]);

  useEffect(() => {
    if (theirZone) {
      setIsInputTheirPreacherDisabled(false);
    }

    form.resetField('theirPreacher', {
      keepError: true,
    });
  }, [theirZone]);

  //* Helpers
  const disabledUrbanSectors = validateUrbanSectorsAllowedByDistrict(district);
  const disabledDistricts = validateDistrictsAllowedByModule(pathname);

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: createFamilyGroup,
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
      toast.success('Registro creado exitosamente.', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        setIsInputDisabled(false);
        setIsSubmitButtonDisabled(false);
      }, 1500);

      setTimeout(() => {
        form.reset();
      }, 1600);

      setTimeout(() => {
        navigate('/family-groups');
      }, 2600);

      setTimeout(() => {
        queryClient.removeQueries({ queryKey: ['preachers-by-zone', theirZone] });
      }, 2700);
    },
  });

  //* Querys
  const zonesQuery = useQuery({
    queryKey: ['zones'],
    queryFn: getAllZones,
    staleTime: 5 * 60 * 1000,
  });

  const preachersQuery = useQuery({
    queryKey: ['preachers-by-zone', theirZone],
    queryFn: () =>
      getPreachersByZone({
        searchType: PreacherSearchType.ZoneId,
        zoneId: theirZone ?? '',
        isNull: 'true',
      }),
    enabled: !!theirZone,
    retry: 1,
  });

  if (zonesQuery.isLoading) return <LoadingSpinner />;

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof familyGroupFormSchema>): void => {
    mutation.mutate(formData);
  };

  return (
    <div className='animate-fadeInPage'>
      <h1 className='text-center pt-1 md:pt-0 pb-1 font-sans font-bold text-family-group-color text-[2.1rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-[3rem]'>
        Modulo Grupo Familiar
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h1 className='text-left px-4 sm:px-5 pt-2 2xl:px-24 font-sans font-bold text-green-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.9rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Crear un nuevo grupo familiar
      </h1>

      <p className='dark:text-slate-300 text-left font-sans font-bold pl-5 sm:pl-7 2xl:px-28 text-[12px] md:text-[15px] xl:text-base'>
        Por favor llena los siguientes datos para crear un nuevo grupo familiar.
      </p>

      <div className='flex flex-col items-center gap-y-8 md:gap-y-8 px-8 py-6 sm:px-8 sm:py-6 lg:py-6 xl:px-14 2xl:px-36'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='w-full flex flex-col md:grid grid-cols-2 gap-x-10 gap-y-4'
          >
            <div className='col-start-1 col-end-2'>
              <FormField
                control={form.control}
                name='familyGroupName'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Nombre
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar una nombre al grupo familiar.
                      </FormDescription>
                      <FormControl>
                        <Input
                          className={cn(
                            isInputDisabled && 'dark:bg-gray-100 text-black bg-gray-200'
                          )}
                          disabled={isInputDisabled}
                          placeholder='Eje: Los Guerreros de Dios...'
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
                name='worshipTime'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-4'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Horario de culto
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar un horario de culto del grupo familiar.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isInputDisabled}
                      >
                        <FormControl
                          className={cn(
                            isInputDisabled && 'dark:bg-gray-100 text-slate-500 bg-gray-200'
                          )}
                        >
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona un horario' />
                            ) : (
                              'Selecciona un horario'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(FamilyGroupWorshipTimeNames).map(([key, value]) => (
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
                name='country'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-4'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>País</FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar el país al que pertenece el grupo familiar.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isInputDisabled}
                      >
                        <FormControl
                          className={cn(
                            isInputDisabled && 'dark:bg-gray-100 text-slate-500 bg-gray-200'
                          )}
                        >
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
                    <FormItem className='mt-4'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Departamento
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar el departamento al que pertenece el grupo familiar.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isInputDisabled}
                      >
                        <FormControl
                          className={cn(
                            isInputDisabled && 'dark:bg-gray-100 text-slate-500 bg-gray-200'
                          )}
                        >
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
                    <FormItem className='mt-4'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Provincia
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar la provincia a la que pertenece el grupo familiar.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isInputDisabled}
                      >
                        <FormControl
                          className={cn(
                            isInputDisabled && 'dark:bg-gray-100 text-slate-500 bg-gray-200'
                          )}
                        >
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
                    <FormItem className='mt-4'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Distrito
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar el distrito al que pertenece el grupo familiar.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isInputDisabled}
                      >
                        <FormControl
                          className={cn(
                            isInputDisabled && 'dark:bg-gray-100 text-slate-500 bg-gray-200'
                          )}
                        >
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
            </div>

            <div className='col-start-2 col-end-3'>
              <FormField
                control={form.control}
                name='urbanSector'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Sector Urbano
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar el sector urbano al que pertenece el grupo familiar.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isInputDisabled}
                      >
                        <FormControl
                          className={cn(
                            isInputDisabled && 'dark:bg-gray-100 text-slate-500 bg-gray-200'
                          )}
                        >
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona el sector urbano' />
                            ) : (
                              'Selecciona el sector urbano'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(UrbanSectorNames).map(([key, value]) => (
                            <SelectItem
                              className={`text-[14px] ${disabledUrbanSectors?.disabledUrbanSectors?.includes(value) ?? !district ? 'hidden' : ''}`}
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
                name='address'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-4'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Dirección
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar la dirección al que pertenece el grupo familiar.
                      </FormDescription>
                      <FormControl
                        className={cn(isInputDisabled && 'dark:bg-gray-100 text-black bg-gray-200')}
                      >
                        <Input
                          disabled={isInputDisabled}
                          placeholder='Ej: Av. Central 123 - Mz.A Lt.3'
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
                name='referenceAddress'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-4'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Referencia de dirección
                      </FormLabel>
                      <FormControl
                        className={cn(isInputDisabled && 'dark:bg-gray-100 text-black bg-gray-200')}
                      >
                        <Textarea
                          disabled={isInputDisabled}
                          placeholder='Comentarios sobre la referencia de ubicación del grupo familiar...'
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
                name='theirZone'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-4'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>Zona</FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar la zona a la que pertenecerá el grupo familiar.
                      </FormDescription>
                      <Popover open={isInputTheirZoneOpen} onOpenChange={setIsInputTheirZoneOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={isInputDisabled}
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-full justify-between',
                                !field.value && 'text-slate-500 dark:text-slate-200 font-normal'
                              )}
                            >
                              {field.value
                                ? zonesQuery?.data?.find((zone) => zone.id === field.value)
                                    ?.zoneName
                                : 'Busque y seleccione una zona'}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align='center' className='w-auto px-4 py-2'>
                          <Command>
                            <CommandInput
                              placeholder='Busque una zona...'
                              className='h-9 text-[14px]'
                            />
                            <CommandEmpty>Zona no encontrada.</CommandEmpty>
                            <CommandGroup className='max-h-[200px] h-auto'>
                              {zonesQuery?.data?.map((zone) => (
                                <CommandItem
                                  className='text-[14px]'
                                  value={zone.id}
                                  key={zone.id}
                                  onSelect={() => {
                                    form.setValue('theirZone', zone?.id);
                                    setIsInputTheirZoneOpen(false);
                                  }}
                                >
                                  {zone.zoneName}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      zone?.id === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                      <FormDescription className='text-[12px] md:text-[13px] text-blue-500 font-bold'>
                        <p>
                          *Si no hay zonas disponibles o necesitas una nueva zona, debes crearla en{' '}
                          <Link className='text-red-500 underline' to={'/zones/create-zone'}>
                            Crear Zona
                          </Link>{' '}
                          .
                        </p>
                      </FormDescription>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name='theirPreacher'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-4'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Predicador
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Seleccione un predicador para esta grupo familiar.
                      </FormDescription>
                      {preachersQuery?.isFetching ? (
                        <div className='pt-2 font-black text-[16px] text-center dark:text-gray-300 text-gray-500'>
                          <span>Cargando predicadores...</span>
                        </div>
                      ) : (
                        <Popover
                          open={isInputTheirPreacherOpen}
                          onOpenChange={setIsInputTheirPreacherOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isInputTheirPreacherDisabled}
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between ',
                                  !field.value && 'font-normal',
                                  isInputTheirPreacherDisabled &&
                                    'dark:bg-gray-100  dark:text-black bg-gray-200'
                                )}
                              >
                                {field.value
                                  ? `${preachersQuery.data?.find((preacher) => preacher.id === field.value)?.firstName} ${preachersQuery.data?.find((preacher) => preacher.id === field.value)?.lastName}`
                                  : 'Busque y seleccione un predicador'}
                                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align='center' className='w-auto px-4 py-2'>
                            <Command>
                              <CommandInput
                                placeholder='Busque un predicador...'
                                className='h-9 text-[14px]'
                              />
                              {preachersQuery?.data && (
                                <CommandEmpty>Predicador no encontrado.</CommandEmpty>
                              )}
                              <CommandGroup
                                className={cn(
                                  'max-h-[200px] h-auto ',
                                  !preachersQuery.data && 'w-[320px]'
                                )}
                              >
                                {preachersQuery.data?.map((preacher) => (
                                  <CommandItem
                                    className='text-[14px]'
                                    value={preacher.id}
                                    key={preacher.id}
                                    onSelect={() => {
                                      form.setValue('theirPreacher', preacher.id);
                                      setIsInputTheirPreacherOpen(false);
                                    }}
                                  >
                                    {`${preacher?.firstName} ${preacher?.lastName}`}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        preacher.id === field.value ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                )) ?? (
                                  <p className='text-[14.5px] text-red-500 text-center'>
                                    ❌ No se encontró predicadores disponibles, todos están
                                    asignados a un grupo familiar.
                                  </p>
                                )}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      )}

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            {isMessageErrorDisabled ? (
              <p className='-mb-5 mt-2 md:-mb-2 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 mx-auto md:w-[100%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                ❌ Datos incompletos, completa todos los campos para crear el registro.
              </p>
            ) : (
              <p className='-mt-2 order-last md:-mt-2 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                ¡Campos completados correctamente! <br />
              </p>
            )}

            <div className='mt-2 md:mt-1 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-4 w-full md:w-[20rem] md:m-auto'>
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
                      setIsInputTheirPreacherDisabled(true);
                    }
                  }, 100);
                }}
              >
                Registrar Casa Familiar
              </Button>
            </div>
          </form>
        </Form>

        {/* Zone, create, update, delete */}
        {/* <div className='max-w-[90%] w-full flex flex-col gap-6'>
          <hr className='md:p-[0.02rem] bg-slate-500 w-full' />

          <div className='flex flex-col gap-4 xl:grid xl:grid-cols-3 justify-center items-center'>
            <div className='w-full flex flex-col md:grid md:grid-cols-2 xl:flex gap-2 items-center lg:mx-auto lg:w-[90%]'>
              <div className='text-center'>
                <h1 className='text-center font-bold text-green-500 text-[22px] sm:text-[1.3rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[1.6rem] 2xl:text-[1.7rem]'>
                  Crear
                </h1>
                <p className='font-bold text-[13px] md:text-[14px]'>
                  Crear el registro de una nueva zona.
                </p>
              </div>
              <div className='mx-auto w-[70%] md:w-[60%]'>
                <ZoneCreateCard formFamilyHouse={form} isDisabled={isZoneButtonsDisabled} />
              </div>
            </div>

            <div className='w-full flex flex-col md:grid md:grid-cols-2 xl:flex gap-2 items-center lg:m-auto lg:w-[90%]'>
              <div className='text-center'>
                <h1 className='text-center font-bold text-orange-500 text-[22px] sm:text-[1.3rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[1.6rem] 2xl:text-[1.7rem]'>
                  Actualizar
                </h1>
                <p className='font-bold text-[13px] md:text-[14px]'>
                  Modificar los datos del registro de una zona.
                </p>
              </div>
              <div className='mx-auto w-[70%] md:w-[60%]'>
                <ZoneUpdateCard formFamilyHouse={form} isDisabled={isZoneButtonsDisabled} />
              </div>
            </div>

            <div className='w-full flex flex-col md:grid md:grid-cols-2 xl:flex  gap-2 items-center lg:m-auto lg:w-[90%]'>
              <div className='text-center'>
                <h1 className='text-center font-bold text-red-500 text-[22px] sm:text-[1.3rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[1.6rem] 2xl:text-[1.7rem]'>
                  Eliminar
                </h1>
                <p className='font-bold text-[13px] md:text-[14px]'>
                  Eliminar el registro de una zona.
                </p>
              </div>
              <div className='mx-auto w-[70%] md:w-[60%]'>
                <ZoneDeleteCard formFamilyHouse={form} isDisabled={isZoneButtonsDisabled} />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
