/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

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
  useDiscipleUpdateEffects,
  useDiscipleUpdateMutation,
  useRoleUpdateDiscipleHandler,
  useDisciplePromoteButtonLogic,
  useDiscipleUpdateSubmitButtonLogic,
} from '@/modules/disciple/hooks';
import { DiscipleFieldNames } from '@/modules/disciple/enums';
import { getAllFamilyGroups } from '@/modules/disciple/services';
import { discipleFormSchema } from '@/modules/disciple/validations';
import { DiscipleFormSkeleton } from '@/modules/disciple/components';
import { type DiscipleResponse } from '@/modules/disciple/interfaces';

import { getAllSupervisors } from '@/modules/preacher/services';

import { cn } from '@/shared/lib/utils';
import { useRoleValidationByPath } from '@/shared/hooks';

import {
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
  getCodeAndNameFamilyGroup,
  validateDistrictsAllowedByModule,
  validateUrbanSectorsAllowedByDistrict,
} from '@/shared/helpers';

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
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
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

interface DiscipleFormUpdateProps {
  id: string;
  onSubmit: () => void;
  onScroll: () => void;
  data: DiscipleResponse | undefined;
}

export const DiscipleUpdateForm = ({
  id,
  data,
  onSubmit,
  onScroll,
}: DiscipleFormUpdateProps): JSX.Element => {
  //* States
  const [isRelationSelectDisabled, setIsRelationSelectDisabled] = useState<boolean>(false);
  const [isInputTheirSupervisorOpen, setIsInputTheirSupervisorOpen] = useState<boolean>(false);
  const [isInputTheirFamilyGroupOpen, setIsInputTheirFamilyGroupOpen] = useState<boolean>(false);
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
  const form = useForm<z.infer<typeof discipleFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(discipleFormSchema),
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
      roles: [MemberRole.Disciple],
      recordStatus: '',
      theirFamilyGroup: '',
      theirSupervisor: '',
    },
  });

  //* Watchers
  const district = form.watch('district');
  const theirSupervisor = form.watch('theirSupervisor');
  const theirFamilyGroup = form.watch('theirFamilyGroup');

  //* Helpers
  const disabledDistricts = validateDistrictsAllowedByModule(pathname);
  const disabledUrbanSectors = validateUrbanSectorsAllowedByDistrict(district);

  //* Custom Hooks
  useDiscipleUpdateEffects({
    id,
    data,
    setIsLoadingData,
    discipleUpdateForm: form,
  });

  const { disabledRoles } = useRoleValidationByPath({
    path: pathname,
    memberRoles: MemberRole,
  });

  useDisciplePromoteButtonLogic({
    discipleUpdateForm: form,
    fieldName: DiscipleFieldNames,
    setIsPromoteButtonDisabled,
  });

  useDiscipleUpdateSubmitButtonLogic({
    discipleUpdateForm: form,
    memberRoles: MemberRole,
    isInputDisabled,
    setIsMessageErrorDisabled,
    setIsSubmitButtonDisabled,
    isRelationSelectDisabled,
  });

  const discipleUpdateMutation = useDiscipleUpdateMutation({
    onSubmit,
    onScroll,
    setIsInputDisabled,
    setIsSubmitButtonDisabled,
    setIsRelationSelectDisabled,
  });

  //* Queries
  const queryFamilyGroups = useQuery({
    queryKey: ['family-groups', id],
    queryFn: getAllFamilyGroups,
  });

  const querySupervisors = useQuery({
    queryKey: ['supervisors', id],
    queryFn: async () => await getAllSupervisors({ isNull: 'false' }),
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof discipleFormSchema>): void => {
    discipleUpdateMutation.mutate({ id, formData });
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[990px] xl:w-[1100px]'
    >
      <h2 className='text-center text-orange-500 pb-2 font-bold text-[20px] md:text-[24px]'>
        Actualizar información del Discípulo
      </h2>

      <TabsContent value='general-info'>
        <Card className='w-full'>
          {isLoadingData && <DiscipleFormSkeleton />}

          {!isLoadingData && (
            <CardContent className='py-3 px-4'>
              <div className='dark:text-slate-300 text-slate-500 font-bold text-[16px] mb-4 pl-4'>
                Discípulo: {data?.firstName} {data?.lastName}
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='w-full flex flex-col md:grid md:grid-cols-3 gap-x-10 gap-y-5 px-2 sm:px-12'
                >
                  <div className='col-start-1 col-end-2'>
                    <legend className='font-bold text-[17px] sm:text-lg'>Datos generales</legend>
                    <FormField
                      control={form.control}
                      name='firstName'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px]'>Nombres</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Eje: Roberto Martin...'
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
                            <FormLabel className='text-[14px]'>Apellidos</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Eje: Mendoza Prado...'
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
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px]'>País de Origen</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Eje: Peru, Colombia, Mexico...'
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
                        <FormItem className='flex flex-col mt-3'>
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
                          <FormItem className='mt-3'>
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
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px]'>Numero de hijos</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Eje: 3'
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
                                <span className='font-bold text-red-500'>Eliminar Co-Pastor. </span>
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
                    <legend className='font-bold text-[16px]'>Contacto / Vivienda</legend>

                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px]'>E-mail</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Eje: martin@example.com'
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
                            <FormLabel className='text-[14px]'>Numero de Teléfono</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
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
                          <FormItem className='mt-3'>
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
                          <FormItem className='mt-3'>
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
                          <FormItem className='mt-3'>
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
                            <FormLabel className='text-[14px]'>Dirección</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                className='text-[14px]'
                                placeholder='Eje: Av. Central 123'
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
                                className='text-[14px]'
                                placeholder='Comentarios sobre la referencia de la vivienda...'
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
                          <div className='mb-4'>
                            <FormLabel className='font-bold text-[16px]'>Roles</FormLabel>
                            <FormDescription className='font-medium text-[13px] md:text-[14px]'>
                              Seleccione los roles que desea asignar al discípulo.
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
                                    className='flex flex-row items-start space-x-3 space-y-0'
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(role)}
                                        disabled={isDisabled}
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
                                        className={isDisabled ? 'bg-slate-500' : ''}
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

                    {isMessagePromoteDisabled && (
                      <span className='text-[13px] md:text-[14px] text-yellow-500 font-bold text-center'>
                        !SE HA PROMOVIDO CORRECTAMENTE! <br />
                        <span className='text-[12px] md:text-[13px]'>
                          {form.getValues('roles').includes(MemberRole.Disciple) && (
                            <div>
                              <span className='text-red-500 text-center inline-block'>
                                Roles anteriores: Discípulo
                              </span>
                              <br />
                              <span className='text-green-500 text-center inline-block'>
                                Roles nuevos: Discípulo - Predicador
                              </span>
                            </div>
                          )}
                        </span>
                      </span>
                    )}

                    {/* Relaciones  */}
                    <div>
                      <legend className='font-bold col-start-1 col-end-3 text-[16px]'>
                        Relaciones
                      </legend>
                      {!isMessagePromoteDisabled && (
                        <FormField
                          control={form.control}
                          name='theirFamilyGroup'
                          render={({ field }) => {
                            return (
                              <FormItem className='mt-4'>
                                <FormLabel className='text-[14.5px] md:text-[16px] font-bold'>
                                  Grupo Familiar
                                </FormLabel>
                                <FormDescription className='text-[14px]'>
                                  Seleccione un grupo familiar para este discípulo.
                                </FormDescription>
                                <Popover
                                  open={isInputTheirFamilyGroupOpen}
                                  onOpenChange={setIsInputTheirFamilyGroupOpen}
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
                                          ? `${queryFamilyGroups?.data?.find((familyGroup) => familyGroup.id === field.value)?.familyGroupName} - ${queryFamilyGroups?.data?.find((familyGroup) => familyGroup.id === field.value)?.familyGroupCode} `
                                          : 'Busque y seleccione un grupo familiar'}
                                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent align='center' className='w-auto px-4 py-2'>
                                    <Command>
                                      <CommandInput
                                        placeholder='Busque un grupo familiar...'
                                        className='h-9 text-[14px]'
                                      />
                                      <CommandEmpty>Grupo familiar no encontrado.</CommandEmpty>
                                      <CommandGroup className='max-h-[200px] h-auto'>
                                        {queryFamilyGroups?.data?.map((familyGroup) => (
                                          <CommandItem
                                            className='text-[14px]'
                                            value={getCodeAndNameFamilyGroup({
                                              code: familyGroup.familyGroupCode,
                                              name: familyGroup.familyGroupName,
                                            })}
                                            key={familyGroup.id}
                                            onSelect={() => {
                                              form.setValue('theirFamilyGroup', familyGroup?.id);
                                              setIsInputTheirFamilyGroupOpen(false);
                                            }}
                                          >
                                            {`${familyGroup?.familyGroupName} - ${familyGroup?.familyGroupCode}`}
                                            <CheckIcon
                                              className={cn(
                                                'ml-auto h-4 w-4',
                                                familyGroup?.id === field.value
                                                  ? 'opacity-100'
                                                  : 'opacity-0'
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

                      {isPromoteButtonDisabled && isInputDisabled && !theirFamilyGroup && (
                        <FormField
                          control={form.control}
                          name='theirSupervisor'
                          render={({ field }) => {
                            return (
                              <FormItem className='mt-4'>
                                <FormLabel className='text-[14.5px] md:text-[16px] font-bold'>
                                  Supervisor
                                </FormLabel>
                                <FormDescription className='text-[14px]'>
                                  Seleccione un supervisor para este predicador.
                                </FormDescription>
                                <Popover
                                  open={isInputTheirSupervisorOpen}
                                  onOpenChange={setIsInputTheirSupervisorOpen}
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
                                          ? `${querySupervisors?.data?.find((supervisor) => supervisor.id === field.value)?.firstName} ${querySupervisors?.data?.find((supervisor) => supervisor.id === field.value)?.lastName}`
                                          : 'Busque y seleccione un supervisor'}
                                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent align='center' className='w-auto px-4 py-2'>
                                    <Command>
                                      <CommandInput
                                        placeholder='Busque una supervisor...'
                                        className='h-9 text-[14px]'
                                      />
                                      <CommandEmpty>Supervisor no encontrado.</CommandEmpty>
                                      <CommandGroup className='max-h-[200px] h-auto'>
                                        {querySupervisors?.data?.map((supervisor) => (
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
                                                supervisor?.id === field.value
                                                  ? 'opacity-100'
                                                  : 'opacity-0'
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

                    {isPromoteButtonDisabled && !theirSupervisor && !theirFamilyGroup && (
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
                          <AlertDialogTitle className='text-yellow-500 font-bold text-xl text-center md:text-[25px] pb-2 flex flex-col'>
                            <span>¿Estas seguro de promover a este</span>
                            <span className='w-full text-center'>Discípulo?</span>
                          </AlertDialogTitle>
                          <AlertDialogDescription className={cn('h-[18rem] md:h-[15.5rem]')}>
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
                              ❌ Si era Discípulo y sube a Predicador(a) se eliminaran las
                              relaciones que guardaba con su grupo familiar, predicador, zona,
                              supervisor, co-pastor, pastor e iglesia.
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
                              useRoleUpdateDiscipleHandler({
                                discipleUpdateForm: form,
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
                        discipleUpdateMutation?.isPending &&
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
                      {discipleUpdateMutation?.isPending ? 'Procesando...' : 'Guardar cambios'}
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