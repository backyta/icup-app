/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from 'react';

import type * as z from 'zod';
import { Toaster } from 'sonner';
import { useForm } from 'react-hook-form';

import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { cn } from '@/shared/lib/utils';

import { supervisorFormSchema } from '@/modules/supervisor/validations';
import { getAllCopastors } from '@/modules/supervisor/services';
import {
  useSupervisorCreationSubmitButtonLogic,
  useSupervisorCreationMutation,
} from '@/modules/supervisor/hooks';

import { getAllPastors } from '@/modules/copastor/services';

import { useRoleValidationByPath } from '@/shared/hooks';
import { LoadingSpinner } from '@/shared/components';

import {
  Country,
  Province,
  Department,
  MemberRole,
  GenderNames,
  CountryNames,
  DistrictNames,
  ProvinceNames,
  DepartmentNames,
  MemberRoleNames,
  UrbanSectorNames,
  MaritalStatusNames,
} from '@/shared/enums';
import {
  getFullNames,
  validateDistrictsAllowedByModule,
  validateUrbanSectorsAllowedByDistrict,
} from '@/shared/helpers';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';
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
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Textarea } from '@/shared/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

export const SupervisorCreatePage = (): JSX.Element => {
  //* States
  const [isInputTheirCopastorOpen, setIsInputTheirCopastorOpen] = useState<boolean>(false);
  const [isInputTheirPastorOpen, setIsInputTheirPastorOpen] = useState<boolean>(false);
  const [isInputBirthDateOpen, setIsInputBirthDateOpen] = useState<boolean>(false);
  const [isInputConvertionDateOpen, setIsInputConvertionDateOpen] = useState<boolean>(false);

  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);

  //* Library hooks
  const { pathname } = useLocation();

  //* Form
  const form = useForm<z.infer<typeof supervisorFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(supervisorFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      originCountry: '',
      birthDate: undefined,
      conversionDate: undefined,
      numberChildren: '',
      maritalStatus: '',
      isDirectRelationToPastor: false,
      email: '',
      phoneNumber: '',
      country: Country.Peru,
      department: Department.Lima,
      province: Province.Lima,
      district: '',
      address: '',
      referenceAddress: '',
      roles: [MemberRole.Disciple, MemberRole.Supervisor],
      theirPastor: '',
    },
  });

  //* Watchers
  const district = form.watch('district');
  const isDirectRelationToPastor = form.watch('isDirectRelationToPastor');

  //* Effects
  useEffect(() => {
    form.resetField('urbanSector', {
      keepError: true,
    });
  }, [district]);

  useEffect(() => {
    if (isDirectRelationToPastor) {
      form.resetField('theirCopastor', {
        keepError: true,
      });
    }

    if (!isDirectRelationToPastor) {
      form.resetField('theirPastor', {
        keepError: true,
      });
    }
  }, [isDirectRelationToPastor]);

  //* Helpers
  const disabledUrbanSectors = validateUrbanSectorsAllowedByDistrict(district);
  const disabledDistricts = validateDistrictsAllowedByModule(pathname);

  //* Custom hooks
  const { disabledRoles } = useRoleValidationByPath({
    path: pathname,
    memberRoles: MemberRole,
  });

  useSupervisorCreationSubmitButtonLogic({
    supervisorCreationForm: form,
    memberRoles: MemberRole,
    isInputDisabled,
    isMessageErrorDisabled,
    setIsMessageErrorDisabled,
    setIsSubmitButtonDisabled,
  });

  const supervisorCreationMutation = useSupervisorCreationMutation({
    supervisorCreationForm: form,
    setIsInputDisabled,
    setIsSubmitButtonDisabled,
  });

  //* Queries
  const queryCopastors = useQuery({
    queryKey: ['copastors'],
    queryFn: getAllCopastors,
  });

  const queryPastors = useQuery({
    queryKey: ['pastors'],
    queryFn: getAllPastors,
  });

  if (queryCopastors.isLoading) return <LoadingSpinner />;

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof supervisorFormSchema>): void => {
    supervisorCreationMutation.mutate(formData);
  };

  return (
    <div className='animate-fadeInPage'>
      <h1
        className={cn(
          'text-center pt-1 md:pt-0 pb-1 font-sans font-bold text-supervisor-color text-[2.1rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-[3rem]'
        )}
      >
        Modulo Supervisor
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h2 className='text-left px-4 sm:px-5 pt-2 2xl:px-24 font-sans font-bold text-green-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.9rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Crear un nuevo supervisor
      </h2>

      <p className='dark:text-slate-300 text-left font-sans font-bold pl-5 sm:pl-7 2xl:px-28 text-[12.5px] md:text-[15px] xl:text-base'>
        Por favor llena los siguientes datos para crear un nuevo supervisor.
      </p>

      <div className='flex min-h-screen flex-col items-center justify-between px-8 py-6 sm:px-8 sm:py-6 lg:py-6 xl:px-14 2xl:px-36'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='w-full flex flex-col gap-y-6 md:grid md:grid-cols-2 md:gap-y-8 md:gap-x-10'
          >
            <div className='sm:col-start-1 sm:col-end-2'>
              <legend className='font-bold text-[17px] sm:text-lg'>Datos generales</legend>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] font-medium'>Nombres</FormLabel>
                      <FormControl>
                        <Input
                          className='text-[14px]'
                          disabled={isInputDisabled}
                          placeholder='Eje: Ramiro Ignacio'
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
                name='lastName'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] font-medium'>Apellidos</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isInputDisabled}
                          placeholder='Eje: Saavedra Ramirez'
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
                name='gender'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] font-medium'>Género</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isInputDisabled}
                      >
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona el tipo de Género' />
                            ) : (
                              'Selecciona el tipo de Género'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(GenderNames).map(([key, value]) => (
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
                name='originCountry'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] font-medium'>País de origen</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isInputDisabled}
                          placeholder='Eje:  Colombia, Panama, Ecuador'
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
                name='birthDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col mt-4'>
                    <FormLabel className='text-[14px] font-medium'>Fecha de nacimiento</FormLabel>
                    <Popover open={isInputBirthDateOpen} onOpenChange={setIsInputBirthDateOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isInputDisabled}
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'LLL dd, y', { locale: es })
                            ) : (
                              <span className='text-[14px]'>Selecciona la fecha de nacimiento</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setIsInputBirthDateOpen(false);
                          }}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className='pl-3 text-blue-600 text-[11.5px] xl:text-[12.5px] font-bold italic'>
                      * Su fecha de nacimiento se utilizara para calcular su edad.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='maritalStatus'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-4'>
                      <FormLabel className='text-[14px] font-medium'>Estado Civil</FormLabel>
                      <Select
                        value={field.value}
                        disabled={isInputDisabled}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona el estado civil' />
                            ) : (
                              'Selecciona el estado civil'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(MaritalStatusNames).map(([key, value]) => (
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
                name='numberChildren'
                render={({ field }) => {
                  return (
                    <FormItem className=' mt-4'>
                      <FormLabel className='text-[14px] font-medium'>Numero de hijos</FormLabel>
                      <FormControl>
                        <Input disabled={isInputDisabled} placeholder='Eje: 2' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name='conversionDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col mt-4'>
                    <FormLabel className='text-[14px] font-medium'>Fecha de conversión</FormLabel>
                    <Popover
                      open={isInputConvertionDateOpen}
                      onOpenChange={setIsInputConvertionDateOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isInputDisabled}
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'LLL dd, y', { locale: es })
                            ) : (
                              <span className='text-sm md:text-[14px] lg:text-sm'>
                                Selecciona la fecha de conversión
                              </span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setIsInputConvertionDateOpen(false);
                          }}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className='pl-3 text-blue-600 text-[11.5px] xl:text-[12.5px] font-bold italic'>
                      * Fecha en la que el creyente se convirtió.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='sm:col-start-2 sm:col-end-3'>
              <legend className='font-bold text-[17px] sm:text-lg'>Contacto / Vivienda</legend>

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] font-medium'>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isInputDisabled}
                          placeholder='Eje: pedro123@example.com'
                          type='email'
                          autoComplete='username'
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
                name='phoneNumber'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] font-medium'>Numero de teléfono</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isInputDisabled}
                          placeholder='Eje: 999 999 999'
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
                      <FormLabel className='text-[14px] font-medium'>País</FormLabel>
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
                      <FormLabel className='text-[14px] font-medium'>Departamento</FormLabel>
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
                      <FormLabel className='text-[14px] font-medium'>Provincia</FormLabel>
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
                      <FormLabel className='text-[14px] font-medium'>Distrito</FormLabel>
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

              <FormField
                control={form.control}
                name='urbanSector'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] font-medium'>Sector Urbano</FormLabel>
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] font-medium'>Dirección</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isInputDisabled}
                          placeholder='Eje: Jr. Rosales 111 - Mz.A Lt.14'
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
                      <FormLabel className='text-[14px] font-medium'>
                        Referencia de dirección
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isInputDisabled}
                          placeholder='Comentarios sobre la referencia de la vivienda...'
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
                name='isDirectRelationToPastor'
                render={({ field }) => (
                  <FormItem className='flex flex-row gap-2 items-end mt-3 px-1 py-3 h-[2.5rem]'>
                    <FormControl>
                      <Checkbox
                        disabled={isInputDisabled}
                        checked={field?.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                        }}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel className='text-[13px] md:text-[14px]'>
                        ¿Esta registro sera relacionado directamente con un Pastor?
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Roles */}

            <div className='sm:col-start-1 sm:col-end-2 sm:row-start-2 sm:row-end-3 h-auto'>
              <FormField
                control={form.control}
                name='roles'
                render={() => (
                  <FormItem>
                    <div className='mb-4'>
                      <FormLabel className='font-bold text-[17px] sm:text-lg'>Roles</FormLabel>
                      <FormDescription className='font-medium'>
                        Seleccione los roles que desea asignar al discípulo.
                      </FormDescription>
                    </div>
                    {Object.values(MemberRole).map((role) => (
                      <FormField
                        key={role}
                        control={form.control}
                        name='roles'
                        render={({ field }) => {
                          const isDisabled = disabledRoles?.includes(role) ?? isInputDisabled;
                          return (
                            <FormItem
                              key={role}
                              className='flex flex-row items-start space-x-3 space-y-0'
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(role)}
                                  disabled={isDisabled || isInputDisabled}
                                  onCheckedChange={(checked) => {
                                    let updatedRoles: MemberRole[] = [];
                                    checked
                                      ? (updatedRoles = field.value
                                          ? [...field.value, role]
                                          : [role])
                                      : (updatedRoles =
                                          field.value?.filter((value) => value !== role) ?? []);

                                    field.onChange(updatedRoles);
                                  }}
                                  className={isDisabled || isInputDisabled ? 'bg-slate-500' : ''}
                                />
                              </FormControl>
                              <FormLabel className='text-[14px] font-normal'>
                                {MemberRoleNames[role]}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Relations */}

            <div className='sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:row-end-3'>
              <legend className='font-bold col-start-1 col-end-3 text-[17px] sm:text-[18px]'>
                Relaciones
              </legend>
              {isDirectRelationToPastor && (
                <FormField
                  control={form.control}
                  name='theirPastor'
                  render={({ field }) => {
                    return (
                      <FormItem className='flex flex-col mt-4'>
                        <FormLabel className='text-[14.5px] md:text-[16px] font-bold'>
                          Pastor
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Seleccione un Pastor para este Supervisor (enlace directo).
                        </FormDescription>
                        <Popover
                          open={isInputTheirPastorOpen}
                          onOpenChange={setIsInputTheirPastorOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isInputDisabled}
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between overflow-hidden',
                                  !field.value && 'text-slate-500 font-normal text-[14px]'
                                )}
                              >
                                {field.value
                                  ? `${queryPastors.data?.find((pastor) => pastor.id === field.value)?.firstName} ${queryPastors.data?.find((pastor) => pastor.id === field.value)?.lastName}`
                                  : 'Busque y seleccione un pastor'}
                                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align='center' className='w-auto px-4 py-2'>
                            <Command>
                              <CommandInput
                                placeholder='Busque un pastor...'
                                className='h-9 text-[14px]'
                              />
                              <CommandEmpty>Pastor no encontrado.</CommandEmpty>
                              <CommandGroup className='max-h-[200px] h-auto'>
                                {queryPastors.data?.map((pastor) => (
                                  <CommandItem
                                    className='text-[14px]'
                                    value={pastor.id}
                                    key={pastor.id}
                                    onSelect={() => {
                                      form.setValue('theirPastor', pastor?.id);
                                      setIsInputTheirPastorOpen(false);
                                    }}
                                  >
                                    {`${pastor?.firstName} ${pastor?.lastName}`}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        pastor?.id === field.value ? 'opacity-100' : 'opacity-0'
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
              )}

              {!isDirectRelationToPastor && (
                <FormField
                  control={form.control}
                  name='theirCopastor'
                  render={({ field }) => {
                    return (
                      <FormItem className='flex flex-col mt-4'>
                        <FormLabel className='text-[14.5px] md:text-[16px] font-bold'>
                          Co-Pastor
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Seleccione un co-pastor para este supervisor.
                        </FormDescription>
                        <Popover
                          open={isInputTheirCopastorOpen}
                          onOpenChange={setIsInputTheirCopastorOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isInputDisabled}
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between overflow-hidden',
                                  !field.value && 'text-slate-500 font-normal text-[14px]'
                                )}
                              >
                                {field.value
                                  ? `${queryCopastors.data?.find((copastor) => copastor.id === field.value)?.firstName} ${queryCopastors.data?.find((copastor) => copastor.id === field.value)?.lastName}`
                                  : 'Busque y seleccione un co-pastor'}
                                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align='center' className='w-auto px-4 py-2'>
                            <Command>
                              <CommandInput
                                placeholder='Busque un co-pastor...'
                                className='h-9 text-[14px]'
                              />
                              <CommandEmpty>Co-Pastor no encontrado.</CommandEmpty>
                              <CommandGroup className='max-h-[200px] h-auto'>
                                {queryCopastors.data?.map((copastor) => (
                                  <CommandItem
                                    className='text-[14px]'
                                    value={getFullNames({
                                      firstNames: copastor.firstName,
                                      lastNames: copastor.lastName,
                                    })}
                                    key={copastor.id}
                                    onSelect={() => {
                                      form.setValue('theirCopastor', copastor.id);
                                      setIsInputTheirCopastorOpen(false);
                                    }}
                                  >
                                    {`${copastor?.firstName} ${copastor?.lastName}`}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        copastor?.id === field.value ? 'opacity-100' : 'opacity-0'
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
              )}
            </div>

            {isMessageErrorDisabled ? (
              <p className='mt-2 -mb-4 md:-mt-5 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-4 mx-auto md:w-[100%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                ❌ Datos incompletos, completa todos los campos para crear el registro.
              </p>
            ) : (
              <p className='order-last -mt-3 md:-mt-5 md:col-start-1 md:col-end-3 mx-auto md:w-[70%] lg:w-[50%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                ¡Campos completados correctamente!
              </p>
            )}

            <div className='md:mt-2 lg:mt-2 col-start-1 col-end-3 row-start-3 row-end-4 w-full md:w-[20rem] md:m-auto'>
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
                Registrar Supervisor
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
