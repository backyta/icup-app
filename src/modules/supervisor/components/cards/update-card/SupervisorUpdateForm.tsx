/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState } from 'react';

import { type z } from 'zod';

import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { CalendarIcon } from 'lucide-react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import {
  useSupervisorUpdateEffects,
  useSupervisorUpdateMutation,
  useSupervisorRolePromotionHandler,
  useSupervisorPromoteButtonLogic,
  useSupervisorUpdateSubmitButtonLogic,
} from '@/modules/supervisor/hooks';
import { SupervisorFieldNames } from '@/modules/supervisor/enums';
import { supervisorFormSchema } from '@/modules/supervisor/validations';
import { SupervisorFormSkeleton } from '@/modules/supervisor/components';
import { type SupervisorResponse } from '@/modules/supervisor/interfaces';

import { getSimplePastors } from '@/modules/pastor/services';

import { getSimpleCopastors } from '@/modules/copastor/services';

import { cn } from '@/shared/lib/utils';
import { useRoleValidationByPath } from '@/shared/hooks';

import {
  getFullNames,
  validateDistrictsAllowedByModule,
  validateUrbanSectorsAllowedByDistrict,
} from '@/shared/helpers';
import {
  MemberRole,
  GenderNames,
  CountryNames,
  ProvinceNames,
  DistrictNames,
  DepartmentNames,
  MemberRoleNames,
  UrbanSectorNames,
  MaritalStatusNames,
} from '@/shared/enums';

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
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/shared/components/ui/select';
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '@/shared/components/ui/alert-dialog';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Calendar } from '@/shared/components/ui/calendar';
import { Textarea } from '@/shared/components/ui/textarea';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

interface SupervisorFormUpdateProps {
  id: string;
  dialogClose: () => void;
  scrollToTop: () => void;
  data: SupervisorResponse | undefined;
}

export const SupervisorUpdateForm = ({
  id,
  data,
  dialogClose,
  scrollToTop,
}: SupervisorFormUpdateProps): JSX.Element => {
  //* States
  const [isRelationSelectDisabled, setIsRelationSelectDisabled] = useState<boolean>(false);
  const [isInputTheirCopastorOpen, setIsInputTheirCopastorOpen] = useState<boolean>(false);
  const [isInputTheirPastorOpen, setIsInputTheirPastorOpen] = useState<boolean>(false);
  const [isInputBirthDateOpen, setIsInputBirthDateOpen] = useState<boolean>(false);
  const [isInputConvertionDateOpen, setIsInputConvertionDateOpen] = useState<boolean>(false);
  const [isPromoteButtonDisabled, setIsPromoteButtonDisabled] = useState<boolean>(false);

  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(false);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);
  const [isMessagePromoteDisabled, setIsMessagePromoteDisabled] = useState<boolean>(false);

  const [isLoadingData, setIsLoadingData] = useState(true);

  //* Hooks (external libraries)
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
      maritalStatus: '',
      numberChildren: '',
      conversionDate: undefined,
      email: '',
      phoneNumber: '',
      country: '',
      department: '',
      province: '',
      district: '',
      urbanSector: '',
      address: '',
      referenceAddress: '',
      roles: [MemberRole.Supervisor],
      isDirectRelationToPastor: undefined,
      recordStatus: '',
      theirCopastor: '',
      theirPastor: '',
    },
  });

  //* Watchers
  const district = form.watch('district');
  const theirPastor = form.watch('theirPastor');
  const theirCopastor = form.watch('theirCopastor');
  const isDirectRelationToPastor = form.watch('isDirectRelationToPastor');

  //* Helpers
  const urbanSectorsValidation = validateUrbanSectorsAllowedByDistrict(district);
  const districtsValidation = validateDistrictsAllowedByModule(pathname);

  //* Custom Hooks
  useSupervisorUpdateEffects({
    id,
    data,
    setIsLoadingData,
    supervisorUpdateForm: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
  });

  const { disabledRoles } = useRoleValidationByPath({
    path: pathname,
    memberRoles: MemberRole,
  });

  useSupervisorPromoteButtonLogic({
    supervisorUpdateForm: form,
    fieldName: SupervisorFieldNames,
    setIsPromoteButtonDisabled,
  });

  useSupervisorUpdateSubmitButtonLogic({
    supervisorUpdateForm: form,
    memberRoles: MemberRole,
    isInputDisabled,
    setIsMessageErrorDisabled,
    setIsSubmitButtonDisabled,
    isRelationSelectDisabled,
  });

  const supervisorUpdateMutation = useSupervisorUpdateMutation({
    dialogClose,
    scrollToTop,
    setIsInputDisabled,
    setIsSubmitButtonDisabled,
    setIsRelationSelectDisabled,
  });

  //* Queries
  const copastoresQuery = useQuery({
    queryKey: ['copastors', id],
    queryFn: () => getSimpleCopastors({ isSimpleQuery: true }),
  });

  const pastorsQuery = useQuery({
    queryKey: ['pastors', id],
    queryFn: () => getSimplePastors({ isSimpleQuery: true }),
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof supervisorFormSchema>): void => {
    supervisorUpdateMutation.mutate({ id, formData });
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[990px] xl:w-[1100px]'
    >
      <h2 className='text-center leading-7 text-orange-500 pb-2 font-bold text-[24px] sm:text-[26px] md:text-[28px]'>
        Actualizar información del Supervisor
      </h2>

      <TabsContent value='general-info'>
        <Card className='w-full'>
          {isLoadingData && <SupervisorFormSkeleton />}

          {!isLoadingData && (
            <CardContent className='py-3 px-4'>
              <div className='dark:text-slate-300 text-slate-500 font-bold text-[17px] md:text-[18px] mb-4 md:pl-4'>
                Supervisor: {data?.member?.firstName} {data?.member?.lastName}
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='w-full flex flex-col md:grid md:grid-cols-3 gap-x-10 gap-y-5 px-2 sm:px-12'
                >
                  <div className='col-start-1 col-end-2'>
                    <legend className='font-bold text-[15px] md:text-[16px]'>
                      Datos generales
                    </legend>
                    <FormField
                      control={form.control}
                      name='firstName'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px]'>Nombres</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Ejem: Roberto Martin...'
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
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px]'>Apellidos</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Ejem: Mendoza Prado...'
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
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px]'>Género</FormLabel>
                            <Select
                              disabled={isInputDisabled}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl className='text-[14px]'>
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
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px]'>País de Origen</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Ejem: Peru, Colombia, Mexico...'
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
                        <FormItem className='flex flex-col mt-2'>
                          <FormLabel className='text-[14px]'>Fecha de Nacimiento</FormLabel>
                          <Popover
                            open={isInputBirthDateOpen}
                            onOpenChange={setIsInputBirthDateOpen}
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
                                    format(field.value, 'LLL dd, y', {
                                      locale: es,
                                    })
                                  ) : (
                                    <span className='text-[14px]'>Fecha de nacimiento</span>
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
                                disabled={(date) =>
                                  date > new Date() || date < new Date('1900-01-01')
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription className='pl-3 text-blue-600 text-[11.5px] xl:text-[12.5px] font-bold italic'>
                            * Su fecha de nacimiento se utiliza para calcular su edad.
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
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px]'>Estado Civil</FormLabel>
                            <Select
                              disabled={isInputDisabled}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl className='text-[14px]'>
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
                                  <SelectItem className='text-[14px]' key={key} value={key}>
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
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px]'>Número de hijos</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Ejem: 3'
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
                      name='conversionDate'
                      render={({ field }) => (
                        <FormItem className='flex flex-col mt-2'>
                          <FormLabel className='text-[14px]'>Fecha de conversión</FormLabel>
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
                                    format(field.value, 'LLL dd, y', {
                                      locale: es,
                                    })
                                  ) : (
                                    <span className='text-[12px] xl:text-[13px]'>
                                      Fecha de conversion
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
                                disabled={(date) =>
                                  date > new Date() || date < new Date('1900-01-01')
                                }
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

                    <FormField
                      control={form.control}
                      name='recordStatus'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-2'>
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
                                debe eliminar el registro desde el modulo{' '}
                                <span className='font-bold text-red-500'>Eliminar Supervisor.</span>
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

                  {/* Contacto y Vivienda */}

                  <div className='sm:col-start-2 sm:col-end-3'>
                    <legend className='font-bold  text-[15px] md:text-[16px]'>
                      Contacto / Vivienda
                    </legend>

                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px]'>E-mail</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Ejem: martin@example.com'
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
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px]'>Número de Teléfono</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Ejem: +51 999 999 999'
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
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px]'>País</FormLabel>
                            <Select
                              disabled={isInputDisabled}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl className='text-[14px]'>
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
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px]'>Departamento</FormLabel>
                            <Select
                              disabled={isInputDisabled}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl className='text-[14px]'>
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
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px]'>Provincia</FormLabel>
                            <Select
                              disabled={isInputDisabled}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl className='text-[14px]'>
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
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px]'>Distrito</FormLabel>
                            <Select
                              disabled={isInputDisabled}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl className='text-[13px] md:text-[14px]'>
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
                                    className={`text-[14px] ${districtsValidation?.districtsDataResult?.includes(value) ? 'hidden' : ''}`}
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
                          <FormItem className='mt-2'>
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
                                    className={`text-[14px] ${urbanSectorsValidation?.urbanSectorsDataResult?.includes(value) ?? !district ? 'hidden' : ''}`}
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
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px]'>Dirección</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Ejem: Av. Central 123'
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
                          <FormItem className='mt-2'>
                            <FormLabel className='text-[14px] font-medium'>
                              Referencia de dirección
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Comentarios de referencia sobre la ubicación de la vivienda....'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <div className='sm:col-start-3 sm:col-end-4 flex flex-col gap-4'>
                    <FormField
                      control={form.control}
                      name='roles'
                      render={() => (
                        <FormItem>
                          <div className='mb-2'>
                            <FormLabel className='font-bold text-[15px] md:text-[16px]'>
                              Roles
                            </FormLabel>
                            <FormDescription className='font-medium text-[13px] md:text-[14px]'>
                              Asigna los roles correspondientes para este registro.
                            </FormDescription>
                          </div>
                          {Object.values(MemberRole).map((role) => (
                            <FormField
                              key={role}
                              control={form.control}
                              name='roles'
                              render={({ field }) => {
                                const isDisabled = disabledRoles?.includes(role);
                                return (
                                  <FormItem
                                    key={role}
                                    className='flex flex-row items-center space-x-3 space-y-0'
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
                                                field.value?.filter((value) => value !== role) ??
                                                []);

                                          field.onChange(updatedRoles);
                                        }}
                                        className={
                                          isDisabled || isInputDisabled ? 'bg-slate-500' : ''
                                        }
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

                    <FormField
                      control={form.control}
                      name='isDirectRelationToPastor'
                      render={({ field }) => (
                        <FormItem className='flex flex-row gap-2 items-center px-1 py-3 h-[2.5rem]'>
                          <FormControl>
                            <Checkbox
                              className={cn(isInputDisabled && 'bg-slate-500')}
                              disabled={isInputDisabled}
                              checked={field?.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                              }}
                            />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormLabel className='text-[13px] md:text-[14px]'>
                              ¿Este registro sera relacionado directamente con un Pastor?
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {isMessagePromoteDisabled && (
                      <span className='text-[13px] md:text-[14px] text-yellow-500 font-bold text-center'>
                        !SE HA PROMOVIDO CORRECTAMENTE! <br />
                        <span className='text-[12px] md:text-[13px]'>
                          {form.getValues('roles').includes(MemberRole.Copastor) &&
                            !data?.member?.roles.includes(MemberRole.Treasurer) && (
                              <div>
                                <span className='text-red-500 text-center inline-block'>
                                  Roles anteriores: Supervisor
                                </span>
                                <br />
                                <span className='text-green-500 text-center inline-block'>
                                  Roles nuevos: Co-Pastor
                                </span>
                              </div>
                            )}
                          {form.getValues('roles').includes(MemberRole.Copastor) &&
                            data?.member?.roles.includes(MemberRole.Treasurer) && (
                              <div>
                                <span className='text-red-500 text-center inline-block'>
                                  Roles anteriores: Supervisor - Tesorero
                                </span>
                                <br />
                                <span className='text-green-500 text-center inline-block'>
                                  Roles nuevos: Co-Pastor
                                </span>
                              </div>
                            )}
                        </span>
                      </span>
                    )}

                    {/* Relaciones  */}
                    <div>
                      <legend className='col-start-1 col-end-3 font-bold text-[15px] md:text-[16px]'>
                        Relaciones
                      </legend>
                      {!isMessagePromoteDisabled && !isDirectRelationToPastor && (
                        <FormField
                          control={form.control}
                          name='theirCopastor'
                          render={({ field }) => {
                            return (
                              <FormItem className='mt-2'>
                                <FormLabel className='text-[14px] md:text-[15px] font-bold'>
                                  Co-Pastor
                                </FormLabel>
                                <FormDescription className='text-[14px]'>
                                  Asigna el Co-Pastor responsable para este Supervisor.
                                </FormDescription>
                                <Popover
                                  open={isInputTheirCopastorOpen}
                                  onOpenChange={setIsInputTheirCopastorOpen}
                                >
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        disabled={isRelationSelectDisabled}
                                        variant='outline'
                                        role='combobox'
                                        className={cn(
                                          'w-full justify-between overflow-hidden',
                                          !field.value && 'text-slate-500 font-normal text-[14px]'
                                        )}
                                      >
                                        {field.value
                                          ? `${copastoresQuery?.data?.find((copastor) => copastor.id === field.value)?.member?.firstName} ${copastoresQuery?.data?.find((pastor) => pastor.id === field.value)?.member?.lastName}`
                                          : 'Busque y seleccione un co-pastor'}
                                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent align='center' className='w-auto px-4 py-2'>
                                    <Command>
                                      {copastoresQuery?.data?.length &&
                                      copastoresQuery?.data?.length > 0 ? (
                                        <>
                                          <CommandInput
                                            placeholder='Busque un co-pastor...'
                                            className='h-9 text-[14px]'
                                          />
                                          <CommandEmpty>Co-Pastor no encontrado.</CommandEmpty>
                                          <CommandGroup className='max-h-[200px] h-auto'>
                                            {copastoresQuery?.data?.map((copastor) => (
                                              <CommandItem
                                                className='text-[14px]'
                                                value={getFullNames({
                                                  firstNames: copastor.member?.firstName ?? '',
                                                  lastNames: copastor.member?.lastName ?? '',
                                                })}
                                                key={copastor.id}
                                                onSelect={() => {
                                                  form.setValue('theirCopastor', copastor.id);
                                                  setIsInputTheirCopastorOpen(false);
                                                }}
                                              >
                                                {`${copastor?.member?.firstName} ${copastor?.member?.lastName}`}
                                                <CheckIcon
                                                  className={cn(
                                                    'ml-auto h-4 w-4',
                                                    copastor?.id === field.value
                                                      ? 'opacity-100'
                                                      : 'opacity-0'
                                                  )}
                                                />
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </>
                                      ) : (
                                        copastoresQuery?.data?.length === 0 && (
                                          <p className='text-[14.5px] text-red-500 text-center'>
                                            ❌No hay co-pastores disponibles.
                                          </p>
                                        )
                                      )}
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      )}

                      {((isPromoteButtonDisabled && isInputDisabled && !theirCopastor) ||
                        isDirectRelationToPastor) && (
                        <FormField
                          control={form.control}
                          name='theirPastor'
                          render={({ field }) => {
                            return (
                              <FormItem className='mt-2'>
                                <FormLabel className='text-[14px] md:text-[15px] font-bold'>
                                  Pastor
                                </FormLabel>
                                <FormDescription className='text-[14px]'>
                                  Asigna el Pastor responsable para este Supervisor.
                                </FormDescription>
                                <Popover
                                  open={isInputTheirPastorOpen}
                                  onOpenChange={setIsInputTheirPastorOpen}
                                >
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        disabled={isRelationSelectDisabled}
                                        variant='outline'
                                        role='combobox'
                                        className={cn(
                                          'w-full justify-between overflow-hidden',
                                          !field.value && 'text-slate-500 font-normal text-[14px]'
                                        )}
                                      >
                                        {field.value
                                          ? `${pastorsQuery?.data?.find((pastor) => pastor.id === field.value)?.member?.firstName} ${pastorsQuery?.data?.find((pastor) => pastor.id === field.value)?.member?.lastName}`
                                          : 'Busque y seleccione un pastor'}
                                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent align='center' className='w-auto px-4 py-2'>
                                    <Command>
                                      {pastorsQuery?.data?.length &&
                                      pastorsQuery?.data?.length > 0 ? (
                                        <>
                                          <CommandInput
                                            placeholder='Busque una pastor...'
                                            className='h-9 text-[14px]'
                                          />
                                          <CommandEmpty>Pastor no encontrado.</CommandEmpty>
                                          <CommandGroup className='max-h-[200px] h-auto'>
                                            {pastorsQuery?.data?.map((pastor) => (
                                              <CommandItem
                                                className='text-[14px]'
                                                value={getFullNames({
                                                  firstNames: pastor.member?.firstName ?? '',
                                                  lastNames: pastor.member?.lastName ?? '',
                                                })}
                                                key={pastor.id}
                                                onSelect={() => {
                                                  form.setValue('theirPastor', pastor.id);
                                                  setIsInputTheirPastorOpen(false);
                                                }}
                                              >
                                                {`${pastor?.member?.firstName} ${pastor?.member?.lastName}`}
                                                <CheckIcon
                                                  className={cn(
                                                    'ml-auto h-4 w-4',
                                                    pastor?.id === field.value
                                                      ? 'opacity-100'
                                                      : 'opacity-0'
                                                  )}
                                                />
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </>
                                      ) : (
                                        pastorsQuery?.data?.length === 0 && (
                                          <p className='text-[14.5px] text-red-500 text-center'>
                                            ❌No hay pastores disponibles.
                                          </p>
                                        )
                                      )}
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

                    {isPromoteButtonDisabled && !theirCopastor && !theirPastor && (
                      <span className='text-[12px] md:text-[13px] font-bold text-center text-red-500'>
                        ! Por favor asigna la nueva relación para los roles promovidos !
                      </span>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          disabled={isPromoteButtonDisabled}
                          className='w-full text-[14px] md:mt-[1rem] disabled:bg-slate-500 disabled:text-white bg-yellow-400 text-yellow-700 hover:text-white hover:bg-yellow-500'
                        >
                          Promover de cargo
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='w-[23rem] sm:w-[25rem] md:w-full'>
                        <AlertDialogHeader className='h-auto'>
                          <AlertDialogTitle className='text-yellow-500 font-bold text-xl text-center md:text-[25px] pb-3'>
                            ¿Estas seguro de promover a este Supervisor?
                          </AlertDialogTitle>
                          <AlertDialogDescription className={cn('h-[21rem] md:h-[18rem]')}>
                            <span className='w-full text-left text-blue-500 font-medium mb-3 inline-block text-[16px] md:text-[18px]'>
                              Secuencia de pasos y acciones:
                            </span>
                            <br />
                            <span className='-ml-10 md:ml-0 text-left inline-block mb-2 text-[14px] md:text-[15px]'>
                              ✅ Asignar la relación según el nuevo cargo.
                            </span>
                            <span className='-ml-1 md:ml-0 text-left inline-block mb-2 text-[14px] md:text-[15px]'>
                              ✅ Guardar estos datos para aplicar la promoción.
                            </span>
                            <span className='text-left inline-block mb-2 text-[14px] md:text-[15px]'>
                              ❌ De manera automática se eliminara el registro y se eliminaran todas
                              sus relaciones que tenia en el anterior cargo.
                            </span>

                            <span className='text-left inline-block mb-2 text-[14px] md:text-[15px]'>
                              ❌ Si era Supervisor(a) y sube a Co-Pastor(a) se eliminara su relación
                              con sus discípulos, grupos familiares, predicadores y zona que
                              englobaba su cargo.
                            </span>

                            <span className='text-left inline-block mb-2 text-[14px] md:text-[15px]'>
                              ✅ Se deberá asignar otro Supervisor(a) para discípulos, grupos
                              familiares, predicadores y zona que se quedaron sin Supervisor.
                            </span>

                            <span className='text-left inline-block mb-2 text-[14px] md:text-[15px]'>
                              ✅ Finalmente el registro promovido esta apto para ser usado en su
                              nuevo rol o cargo.
                            </span>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className='bg-red-500 text-red-950 hover:bg-red-500 hover:text-white text-[14px]'>
                            No, Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className='bg-green-500 text-green-950 hover:bg-green-500 hover:text-white text-[14px]'
                            onClick={() => {
                              useSupervisorRolePromotionHandler({
                                supervisorUpdateForm: form,
                                memberRoles: MemberRole,
                                setIsDisabledPromoteButton: setIsPromoteButtonDisabled,
                                setIsDisabledInput: setIsInputDisabled,
                              });

                              setIsMessagePromoteDisabled(true);
                            }}
                          >
                            Sí, Aceptar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <div className=''>
                      <p className='text-red-500 text-[13px] md:text-[14px] font-bold mb-2'>
                        Consideraciones
                      </p>
                      <p className='text-[12px] md:text-[13px] mb-2 font-medium '>
                        ❌ Mientras estés en modo de edición y los datos cambien no podrás promover
                        de cargo.{' '}
                      </p>
                      <p className='text-[12px] md:text-[13px] font-medium '>
                        ❌ Mientras el &#34;Estado&#34; sea{' '}
                        <span className='text-red-500 font-bold'>Inactivo</span> no podrás promover
                        de cargo.
                      </p>
                    </div>
                  </div>

                  {isMessageErrorDisabled ? (
                    <p className='-mb-4 md:-mb-3 md:row-start-2 md:row-end-3 md:col-start-2 md:col-end-3 mx-auto md:w-full text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                      ❌ Datos incompletos, completa todos los campos para guardar el registro.
                    </p>
                  ) : (
                    <p className='-mt-4 order-last md:-mt-3 md:row-start-3 md:row-end-4 md:col-start-2 md:col-end-3 mx-auto md:w-full text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                      ¡Campos completados correctamente! <br /> Para finalizar por favor guarde los
                      cambios.
                    </p>
                  )}

                  <div className='sm:col-start-2 w-full'>
                    <Button
                      disabled={isSubmitButtonDisabled}
                      type='submit'
                      className={cn(
                        'w-full text-[14px]',
                        supervisorUpdateMutation?.isPending &&
                          'bg-emerald-500 disabled:opacity-100 disabled:md:text-[16px] text-white'
                      )}
                      onClick={() => {
                        setTimeout(() => {
                          if (Object.keys(form.formState.errors).length === 0) {
                            setIsSubmitButtonDisabled(true);
                            setIsInputDisabled(true);
                            setIsRelationSelectDisabled(true);
                          }
                        }, 100);
                      }}
                    >
                      {supervisorUpdateMutation?.isPending ? 'Procesando...' : 'Guardar cambios'}
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
