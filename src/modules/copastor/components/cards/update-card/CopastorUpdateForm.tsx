/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
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
  useCopastorUpdateEffects,
  useCopastorUpdateMutation,
  useRoleUpdateCopastorHandler,
  useCopastorPromoteButtonLogic,
  useCopastorUpdateSubmitButtonLogic,
} from '@/modules/copastor/hooks';
import { getAllPastors } from '@/modules/copastor/services';
import { copastorFormSchema } from '@/modules/copastor/validations';
import { CopastorFormSkeleton } from '@/modules/copastor/components';
import { type CopastorResponse } from '@/modules/copastor/interfaces';

import { getAllChurches } from '@/modules/pastor/services';

import { CopastorFieldNames } from '@/modules/copastor/enums';

import { useRoleValidationByPath } from '@/shared/hooks';

import { cn } from '@/shared/lib/utils';

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
  getFullNames,
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
  SelectTrigger,
  SelectContent,
} from '@/shared/components/ui/select';
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
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

interface CopastorFormUpdateProps {
  id: string;
  onSubmit: () => void;
  onScroll: () => void;
  data: CopastorResponse | undefined;
}

export const CopastorUpdateForm = ({
  id,
  data,
  onSubmit,
  onScroll,
}: CopastorFormUpdateProps): JSX.Element => {
  //* States
  const [isRelationSelectDisabled, setIsRelationSelectDisabled] = useState<boolean>(false);
  const [isInputTheirChurchOpen, setIsInputTheirChurchOpen] = useState<boolean>(false);
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
  const form = useForm<z.infer<typeof copastorFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(copastorFormSchema),
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
      theirPastor: '',
      theirChurch: '',
    },
  });

  //* Watchers
  const district = form.watch('district');
  const theirChurch = form.watch('theirChurch');
  const theirPastor = form.watch('theirPastor');

  //* Helpers
  const disabledUrbanSectors = validateUrbanSectorsAllowedByDistrict(district);
  const disabledDistricts = validateDistrictsAllowedByModule(pathname);

  //* Custom Hooks
  useCopastorUpdateEffects({
    id,
    data,
    setIsLoadingData,
    copastorUpdateForm: form,
  });

  const { disabledRoles } = useRoleValidationByPath({
    path: pathname,
    memberRoles: MemberRole,
  });

  useCopastorPromoteButtonLogic({
    copastorUpdateForm: form,
    fieldName: CopastorFieldNames,
    setIsPromoteButtonDisabled,
  });

  useCopastorUpdateSubmitButtonLogic({
    copastorUpdateForm: form,
    memberRoles: MemberRole,
    isInputDisabled,
    setIsMessageErrorDisabled,
    setIsSubmitButtonDisabled,
    isRelationSelectDisabled,
  });

  const copastorUpdateMutation = useCopastorUpdateMutation({
    onSubmit,
    onScroll,
    setIsInputDisabled,
    setIsSubmitButtonDisabled,
    setIsRelationSelectDisabled,
  });

  //* Queries
  const queryPastors = useQuery({
    queryKey: ['pastors', id],
    queryFn: getAllPastors,
  });

  const queryChurches = useQuery({
    queryKey: ['churches', id],
    queryFn: getAllChurches,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof copastorFormSchema>): void => {
    copastorUpdateMutation.mutate({ id, formData });
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[990px] xl:w-[1100px]'
    >
      <h2 className='text-center text-orange-500 pb-2 font-bold text-[20px] md:text-[24px]'>
        Actualizar información del Co-Pastor
      </h2>

      <TabsContent value='general-info'>
        <Card className='w-full'>
          {isLoadingData && <CopastorFormSkeleton />}

          {!isLoadingData && (
            <CardContent className='py-3 px-4'>
              <div className='dark:text-slate-300 text-slate-500 font-bold text-[16px] mb-4 pl-4'>
                Co-Pastor: {data?.firstName} {data?.lastName}
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
                                *El registro esta <span className='text-green-500'>activo</span>,
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
                          {form.getValues('roles').includes(MemberRole.Disciple) &&
                            form.getValues('roles').includes(MemberRole.Pastor) && (
                              <div>
                                <span className='text-red-500 text-center inline-block'>
                                  Roles anteriores: Discípulo - Co-Pastor
                                </span>
                                <br />
                                <span className='text-green-500 text-center inline-block'>
                                  Roles nuevos: Discípulo - Pastor
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
                          name='theirPastor'
                          render={({ field }) => {
                            return (
                              <FormItem className='flex flex-col mt-4'>
                                <FormLabel className='text-[14.5px] md:text-[16px] font-bold'>
                                  Pastor
                                </FormLabel>
                                <FormDescription className='text-[14px]'>
                                  Seleccione un pastor para este co-pastor.
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
                                          ? `${queryPastors?.data?.find((pastor) => pastor.id === field.value)?.firstName} ${queryPastors?.data?.find((pastor) => pastor.id === field.value)?.lastName}`
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
                                        {queryPastors?.data?.map((pastor) => (
                                          <CommandItem
                                            className='text-[14px]'
                                            value={getFullNames({
                                              firstNames: pastor.firstName,
                                              lastNames: pastor.lastName,
                                            })}
                                            key={pastor.id}
                                            onSelect={() => {
                                              form.setValue('theirPastor', pastor.id);
                                              setIsInputTheirPastorOpen(false);
                                            }}
                                          >
                                            {`${pastor?.firstName} ${pastor?.lastName}`}
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
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      )}

                      {isPromoteButtonDisabled && isInputDisabled && !theirPastor && (
                        <FormField
                          control={form.control}
                          name='theirChurch'
                          render={({ field }) => {
                            return (
                              <FormItem className='flex flex-col mt-4'>
                                <FormLabel className='text-[14.5px] md:text-[16px] font-bold'>
                                  Iglesia
                                </FormLabel>
                                <FormDescription className='text-[14px]'>
                                  Seleccione una iglesia a la que pertenece este pastor.
                                </FormDescription>
                                <Popover
                                  open={isInputTheirChurchOpen}
                                  onOpenChange={setIsInputTheirChurchOpen}
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
                                          ? queryChurches?.data?.find(
                                              (church) => church.id === field.value
                                            )?.churchName
                                          : 'Busque y seleccione una iglesia'}
                                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent align='center' className='w-auto px-4 py-2'>
                                    <Command>
                                      <CommandInput
                                        placeholder='Busque una iglesia...'
                                        className='h-9 text-[14px]'
                                      />
                                      <CommandEmpty>Iglesia no encontrada.</CommandEmpty>
                                      <CommandGroup className='max-h-[200px] h-auto'>
                                        {queryChurches?.data?.map((church) => (
                                          <CommandItem
                                            className='text-[14px]'
                                            value={church.churchName}
                                            key={church.id}
                                            onSelect={() => {
                                              form.setValue('theirChurch', church.id);
                                              setIsInputTheirChurchOpen(false);
                                            }}
                                          >
                                            {church?.churchName}
                                            <CheckIcon
                                              className={cn(
                                                'ml-auto h-4 w-4',
                                                church?.id === field.value
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

                    {isPromoteButtonDisabled && !theirChurch && !theirPastor && (
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
                            <span className='w-full text-center'>Co-Pastor?</span>
                          </AlertDialogTitle>
                          <AlertDialogDescription className={cn('h-[22rem] md:h-[19rem]')}>
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
                              ❌ Si era Co-Pastor(a) y sube a Pastor(a) se eliminara su relación con
                              sus discípulos, grupos familiares, predicadores, supervisores y zonas
                              que englobaba su cargo.
                            </span>

                            <span className='text-left inline-block mb-2 text-[14px] md:text-[15px]'>
                              ✅ Se deberá asignar otro Co-Pastor(a) para los discípulos, grupos
                              familiares, predicadores, supervisores y zonas que se quedaron sin
                              Co-Pastor.
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
                              useRoleUpdateCopastorHandler({
                                copastorUpdateForm: form,
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
                        copastorUpdateMutation?.isPending &&
                          'bg-emerald-500 disabled:opacity-100 disabled:md:text-[15px] text-white'
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
                      {copastorUpdateMutation?.isPending ? 'Procesando...' : 'Guardar cambios'}
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
