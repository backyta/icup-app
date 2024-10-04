/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from 'react';

import type * as z from 'zod';
import { Toaster } from 'sonner';
import { useForm } from 'react-hook-form';

import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import {
  useFamilyGroupCreationMutation,
  useFamilyGroupCreationSubmitButtonLogic,
} from '@/modules/family-group/hooks';

import { getSimpleZones } from '@/modules/zone/services';

import { familyGroupFormSchema } from '@/modules/family-group/validations';
import { FamilyGroupWorshipTimeNames } from '@/modules/family-group/enums';

import { PreacherSearchType } from '@/modules/preacher/enums';
import { getPreachersByZone } from '@/modules/preacher/services';

import { cn } from '@/shared/lib/utils';
import { PageTitle } from '@/shared/components/page';

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
  getFullNames,
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

  useEffect(() => {
    document.title = 'Modulo Grupo Familiar - IcupApp';
  }, []);

  //* Helpers
  const districtsValidation = validateDistrictsAllowedByModule(pathname);
  const urbanSectorsValidation = validateUrbanSectorsAllowedByDistrict(district);

  //* Custom hooks
  useFamilyGroupCreationSubmitButtonLogic({
    familyGroupCreationForm: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
    isInputDisabled,
  });

  const familyGroupCreationMutation = useFamilyGroupCreationMutation({
    familyGroupCreationForm: form,
    setIsInputDisabled,
    setIsSubmitButtonDisabled,
  });

  //* Queries
  const zonesQuery = useQuery({
    queryKey: ['zones'],
    queryFn: () => getSimpleZones({ isSimpleQuery: true }),
  });

  const preachersQuery = useQuery({
    queryKey: ['creation-preachers-by-zone', theirZone],
    queryFn: () =>
      getPreachersByZone({
        searchType: PreacherSearchType.ZoneId,
        zoneId: theirZone ?? '',
        isNullFamilyGroup: true,
      }),
    enabled: !!theirZone,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof familyGroupFormSchema>): void => {
    familyGroupCreationMutation.mutate(formData);
  };

  return (
    <div className='animate-fadeInPage'>
      <PageTitle className='text-family-group-color '>Modulo Grupo Familiar</PageTitle>

      <h1 className='text-left leading-7 pb-2 pt-3 px-4 sm:px-5 2xl:px-24 font-sans font-bold text-green-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.9rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Crear un nuevo grupo familiar
      </h1>

      <p className='dark:text-slate-300 text-left font-sans font-bold pl-5 pr-6  sm:pl-7 2xl:px-28 text-[12px] md:text-[15px] xl:text-base'>
        Por favor llena los siguientes datos para crear un nuevo grupo familiar.
      </p>

      <div className='flex flex-col items-center gap-y-8 md:gap-y-8 px-6 py-4 sm:px-8 sm:py-6 lg:py-6 xl:px-14 2xl:px-36'>
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
                    <FormItem>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Nombre
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asigna una nombre al nuevo grupo familiar.
                      </FormDescription>
                      <FormControl>
                        <Input
                          disabled={isInputDisabled}
                          placeholder='Ejem: Los Guerreros de Dios...'
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Horario de culto
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asigna un horario de culto al nuevo grupo familiar.
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
                        <SelectContent className='h-[15rem]'>
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>País</FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asigna el país al que pertenece el nuevo grupo familiar.
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Departamento
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asigna el departamento al que pertenece el nuevo grupo familiar.
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Provincia
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asigna la provincia a la que pertenece el nuevo grupo familiar.
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Distrito
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asigna el distrito al que pertenece el nuevo grupo familiar.
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
                              className={`text-[14px] ${districtsValidation?.districtsValidation?.includes(value) ? 'hidden' : ''}`}
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
                        Asigna el sector urbano al que pertenece el grupo familiar.
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
                              className={`text-[14px] ${urbanSectorsValidation?.disabledUrbanSectors?.includes(value) ?? !district ? 'hidden' : ''}`}
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Dirección
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asigna la dirección al que pertenece el nuevo grupo familiar.
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Referencia de dirección
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isInputDisabled}
                          placeholder='Comentarios de referencia sobre la ubicación del grupo familiar...'
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>Zona</FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asigna la Zona a la que pertenecerá este Grupo Familiar.
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
                            {zonesQuery?.data?.length && zonesQuery?.data?.length > 0 ? (
                              <>
                                <CommandInput
                                  placeholder='Busque una zona...'
                                  className='h-9 text-[14px]'
                                />
                                <CommandEmpty>Zona no encontrada.</CommandEmpty>
                                <CommandGroup className='max-h-[200px] h-auto'>
                                  {zonesQuery?.data?.map((zone) => (
                                    <CommandItem
                                      className='text-[14px]'
                                      value={zone.zoneName}
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
                              </>
                            ) : (
                              zonesQuery?.data?.length === 0 && (
                                <p className='text-[14.5px] text-red-500 text-center'>
                                  ❌No hay zonas disponibles.
                                </p>
                              )
                            )}
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Predicador
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asigna el Predicador responsable para este Grupo Familiar.
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
                                  !field.value && 'font-normal'
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
                              {preachersQuery?.data?.length && preachersQuery?.data?.length > 0 ? (
                                <>
                                  <CommandInput
                                    placeholder='Busque un predicador...'
                                    className='h-9 text-[14px]'
                                  />
                                  {preachersQuery?.data && (
                                    <CommandEmpty>Predicador no encontrado.</CommandEmpty>
                                  )}
                                  <CommandGroup className='max-h-[200px] h-auto'>
                                    {preachersQuery.data?.map((preacher) => (
                                      <CommandItem
                                        className='text-[14px]'
                                        value={getFullNames({
                                          firstNames: preacher.firstName,
                                          lastNames: preacher.lastName,
                                        })}
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
                                    ))}
                                  </CommandGroup>
                                </>
                              ) : (
                                preachersQuery?.data?.length === 0 && (
                                  <p className='text-[14.5px] text-red-500 text-center'>
                                    ❌No hay predicadores disponibles.
                                  </p>
                                )
                              )}
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
      </div>
    </div>
  );
};
