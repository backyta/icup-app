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

import { FamilyGroupWorshipTimeNames } from '@/app/family-group/enums';
import { familyGroupFormSchema } from '@/app/family-group/validations';
import { FamilyGroupFormSkeleton } from '@/app/family-group/components';
import { type FamilyGroupResponse } from '@/app/family-group/interfaces';
import { useFamilyGroupUpdateSubmitButtonLogic } from '@/app/family-group/hooks';
import { getAllPreachers, getAllZones, updateFamilyGroup } from '@/app/family-group/services';

import { cn } from '@/shared/lib/utils';
import { type ErrorResponse } from '@/shared/interfaces';

import {
  CountryNames,
  DepartmentNames,
  DistrictNames,
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
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

interface FamilyGroupFormUpdateProps {
  id: string;
  onSubmit: () => void;
  onScroll: () => void;
  data: FamilyGroupResponse | undefined;
}

export const FamilyGroupUpdateForm = ({
  id,
  data,
  onSubmit,
  onScroll,
}: FamilyGroupFormUpdateProps): JSX.Element => {
  //* States
  const [isInputTheirPreacherOpen, setIsInputTheirPreacherOpen] = useState<boolean>(false);
  const [isInputTheirZoneOpen, setIsInputTheirZoneOpen] = useState<boolean>(false);

  const [isInputTheirPreacherDisabled, setIsInputTheirPreacherDisabled] = useState<boolean>(true);
  const [isInputTheirZoneDisabled, setIsInputTheirZoneDisabled] = useState<boolean>(true);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);

  const [isLoadingData, setIsLoadingData] = useState(true);

  //* Hooks (external libraries)
  const { pathname } = useLocation();
  const navigate = useNavigate();

  //* Form
  const form = useForm<z.infer<typeof familyGroupFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(familyGroupFormSchema),
    defaultValues: {
      familyGroupName: '',
      country: '',
      department: '',
      province: '',
      district: '',
      urbanSector: '',
      address: '',
      worshipTime: '',
      referenceAddress: '',
      theirPreacher: '',
      theirZone: '',
      recordStatus: '',
    },
  });

  //* Watchers
  const district = form.watch('district');

  //* Set data
  useEffect(() => {
    form.setValue('familyGroupName', data?.familyGroupName ?? '');
    form.setValue('worshipTime', data?.worshipTime ?? '');
    form.setValue('country', data?.country ?? '');
    form.setValue('department', data?.department ?? '');
    form.setValue('province', data?.province ?? '');
    form.setValue('district', data?.district ?? '');
    form.setValue('urbanSector', data?.urbanSector ?? '');
    form.setValue('address', data?.address ?? '');
    form.setValue('referenceAddress', data?.referenceAddress ?? '');
    form.setValue('theirZone', data?.theirZone?.id);
    form.setValue('theirPreacher', data?.theirPreacher?.id);
    form.setValue('recordStatus', data?.recordStatus);

    setTimeout(() => {
      setIsLoadingData(false);
    }, 1200);
  }, []);

  //* Custom hooks
  useFamilyGroupUpdateSubmitButtonLogic({
    familyGroupUpdateForm: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
    isInputDisabled,
  });

  //* Effects
  useEffect(() => {
    form.resetField('urbanSector', { keepError: true });
  }, [district]);

  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);
      url.pathname = `/family-groups/update-family-group/${id}/edit`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);

  //* Helpers
  const disabledUrbanSectors = validateUrbanSectorsAllowedByDistrict(district);
  const disabledDistricts = validateDistrictsAllowedByModule(pathname);

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: updateFamilyGroup,
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
      toast.success('Cambios guardados correctamente.', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        onScroll();
      }, 150);

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['family-groups-by-term'] });
      }, 500);

      setTimeout(() => {
        onSubmit();
        setIsInputDisabled(false);
      }, 1500);
    },
  });

  //* Querys
  const zonesQuery = useQuery({
    queryKey: ['zones'],
    queryFn: getAllZones,
    staleTime: 5 * 60 * 1000,
  });

  const preachersQuery = useQuery({
    queryKey: ['preachers'],
    queryFn: getAllPreachers,
    staleTime: 5 * 60 * 1000,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof familyGroupFormSchema>): void => {
    mutation.mutate({ id, formData });
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[990px] xl:w-[1100px]'
    >
      <h2 className='text-center text-orange-500 pb-2 font-bold text-[20px] md:text-[24px]'>
        Actualizar información de la Casa Familiar
      </h2>

      <TabsContent value='general-info'>
        <Card className='w-full'>
          {isLoadingData && <FamilyGroupFormSkeleton />}

          {!isLoadingData && (
            <CardContent className='py-3 px-4'>
              <div className='dark:text-slate-300 text-slate-500 font-bold text-[16px] mb-4 pl-4'>
                Grupo Familiar: {`${data?.familyGroupCode} - ${data?.familyGroupName}`}
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='w-full flex flex-col md:grid md:grid-cols-2 gap-x-10 gap-y-5 px-2 sm:px-12'
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
                              <FormControl>
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
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              País
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar el país al que pertenece el grupo familiar.
                            </FormDescription>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={isInputDisabled}
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
                              <FormControl>
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
                            <FormControl>
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
                            <FormControl>
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
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Zona
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar la zona a la que pertenecerá el grupo familiar.
                            </FormDescription>
                            <Popover
                              open={isInputTheirZoneOpen}
                              onOpenChange={setIsInputTheirZoneOpen}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    disabled={isInputTheirZoneDisabled}
                                    variant='outline'
                                    role='combobox'
                                    className={cn(
                                      'w-full justify-between ',
                                      !field.value && 'font-normal',
                                      isInputTheirZoneDisabled &&
                                        'dark:bg-gray-100  dark:text-black bg-gray-200'
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
                                              preacher.id === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
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

                    <FormField
                      control={form.control}
                      name='recordStatus'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] font-bold'>Estado</FormLabel>
                            <Select
                              disabled={isInputDisabled}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl className='text-[13px] md:text-[14px]'>
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
                                <span className='font-bold text-red-500'>
                                  Eliminar Grupo Familiar.{' '}
                                </span>
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
                          'bg-emerald-500 disabled:opacity-100 disabled:md:text-[16px] text-white'
                      )}
                      onClick={() => {
                        setTimeout(() => {
                          if (Object.keys(form.formState.errors).length === 0) {
                            setIsSubmitButtonDisabled(true);
                            setIsInputDisabled(true);
                            setIsInputTheirPreacherDisabled(true);
                            setIsInputTheirZoneDisabled(true);
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
