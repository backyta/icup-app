/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useEffect } from 'react';

import { type z } from 'zod';
import { Toaster, toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { es } from 'date-fns/locale';
import { format } from 'date-fns';

import { cn } from '@/shared/lib/utils';
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import {
  useValidatePath,
  useRoleUpdateHandler,
  usePromoteButtonLogic,
  useMemberUpdateSubmitButtonLogic,
} from '@/hooks';

import { copastors, familyHouses, pastors, supervisors } from '@/shared/data';
import { type MemberDataKeys, type MemberData } from '@/shared/interfaces';
import { formMemberSchema } from '@/shared/validations';

import {
  FieldNames,
  Gender,
  GenderNames,
  MaritalStatus,
  MaritalStatusNames,
  MemberRoleNames,
  MemberRole,
  Status,
  Department,
  Country,
  Province,
  District,
  UrbanSector,
  CountryNames,
  DepartmentNames,
  ProvinceNames,
  DistrictNames,
  UrbanSectorNames,
} from '@/shared/enums';

import {
  validateDistrictsAllowedByModule,
  validateUrbanSectorsAllowedByDistrict,
} from '@/shared/helpers';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Calendar } from '@/shared/components/ui/calendar';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from '@/shared/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';

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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';

const data: MemberData = {
  firstName: 'Marcos',
  lastName: 'Guerrero',
  originCountry: 'Peru',
  dateBirth: new Date('12-12-2000'),
  gender: Gender.Male,
  maritalStatus: MaritalStatus.Divorced,
  numberChildren: '3',
  conversionDate: new Date('12-12-2000'),
  emailAddress: 'marcos@google.com',
  phoneNumber: '9999',
  country: Country.Peru,
  department: Department.Lima,
  province: Province.Lima,
  district: District.Independencia,
  urbanSector: UrbanSector.Payet,
  address: 'Jr. Cerro Alto 222, Mz.2 Lt.25',
  referenceComments: 'Cerca a la esquina del parque Ollantaytambo',
  roles: [MemberRole.Disciple],
  theirPastor: 'id1',
  theirCopastor: 'id2',
  theirSupervisor: 'id3',
  theirFamilyHouse: 'id2',
  status: Status.Inactive,
};

interface Props {
  onClose: () => void;
  onScroll: () => void;
}

export const MemberFormUpdate = ({ onClose, onScroll }: Props): JSX.Element => {
  //* States
  const [isInputRelationOpen, setIsInputRelationOpen] = useState<boolean>(false);
  const [isInputBirthDateOpen, setIsInputBirthDateOpen] = useState<boolean>(false);
  const [isInputConvertionDateOpen, setIsInputConvertionDateOpen] = useState<boolean>(false);

  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isRelationSelectDisabled, setIsRelationSelectDisabled] = useState<boolean>(false);

  const [isPromoteButtonDisabled, setIsPromoteButtonDisabled] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(false);

  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);
  const [isMessagePromoteDisabled, setIsMessagePromoteDisabled] = useState<boolean>(false);

  //* Library hooks
  const { pathname } = useLocation();

  //* Form
  const form = useForm<z.infer<typeof formMemberSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formMemberSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      gender: '',
      phoneNumber: '',
      originCountry: '',
      numberChildren: '',
      country: '',
      department: '',
      urbanSector: '',
      province: '',
      district: '',
      address: '',
      referenceComments: '',
      status: '',
    },
  });

  //* Form handler
  const handleSubmit = (values: z.infer<typeof formMemberSchema>): void => {
    console.log({ values });
  };

  //* Watchers
  const roles = form.watch('roles');
  const district = form.watch('district');

  //* Custom Hooks
  const { disabledRoles, textValue } = useValidatePath({
    path: pathname,
    isInputDisabled,
    memberRoles: MemberRole,
  });

  // NOTE : Hacer custom hook para setear
  useEffect(() => {
    for (const key in data) {
      form.setValue(key as MemberDataKeys, data[key as MemberDataKeys]);
    }
  }, []);

  usePromoteButtonLogic({
    formMemberUpdate: form,
    fieldName: FieldNames,
    setIsPromoteButtonDisabled,
  });

  useMemberUpdateSubmitButtonLogic({
    formMemberUpdate: form,
    memberRoles: MemberRole,
    isRelationSelectDisabled,
    pathname,
    setIsMessageErrorDisabled,
    setIsSubmitButtonDisabled,
  });

  //* Helpers
  const disabledUrbanSectors = validateUrbanSectorsAllowedByDistrict(district);
  const disabledDistricts = validateDistrictsAllowedByModule(pathname);

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[990px] xl:w-[1100px] overflow-y-auto'
    >
      <h2 className='text-center text-orange-500 pb-2 font-bold text-[20px] md:text-[24px]'>
        {pathname === '/disciples/update-disciple'
          ? 'Actualizar información del Discípulo'
          : pathname === '/pastors/update-pastor'
            ? 'Actualizar información del Pastor'
            : pathname === '/copastors/update-copastor'
              ? 'Actualizar información del Co-Pastor'
              : 'Actualizar información del Líder'}
      </h2>

      <TabsContent value='general-info' className='overflow-y-auto mt-0'>
        <Card className='w-full'>
          <CardContent className='py-3 px-4'>
            <div className='dark:text-slate-300 text-slate-500 font-bold text-[14px] md:text-[16px] mb-2 pl-0 md:pl-2 italic'>
              {pathname === '/disciples/update-disciple'
                ? 'Discípulo:'
                : pathname === '/pastors/update-pastor'
                  ? 'Pastor:'
                  : pathname === '/copastors/update-copastor'
                    ? 'Copastor:'
                    : 'Líder:'}{' '}
              <span className='italic text-[13[px] md:text-[14px]'>
                Marcos Lucas Castillo Perez (Lima - Peru)
              </span>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-full flex flex-col gap-6 md:grid md:gap-y-6 md:grid-cols-3 md:gap-x-8 md:px-2'
              >
                {/* Datos generales */}

                <div className='sm:col-start-1 sm:col-end-2'>
                  <legend className='font-bold text-[16px]'>Datos generales</legend>

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
                          <FormLabel className='text-[14px]'>Genero</FormLabel>
                          <Select
                            disabled={isInputDisabled}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl className='text-[14px]'>
                              <SelectTrigger>
                                {field.value ? (
                                  <SelectValue placeholder='Selecciona el tipo de genero' />
                                ) : (
                                  'Selecciona el tipo de genero'
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
                    name='dateBirth'
                    render={({ field }) => (
                      <FormItem className='flex flex-col mt-3'>
                        <FormLabel className='text-[14px]'>Fecha de Nacimiento</FormLabel>
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
                    name='status'
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
                            </SelectContent>
                          </Select>
                          {form.getValues('status') === 'active' && (
                            <FormDescription className='pl-2 text-[12px] xl:text-[13px] font-bold'>
                              *El registro esta <span className='text-green-500'>activo</span>, para
                              colocarla como <span className='text-red-500'>Inactivo</span> debe
                              eliminar el registro desde la pestaña{' '}
                              <span className='font-bold text-red-500'>Eliminar {textValue}. </span>
                            </FormDescription>
                          )}
                          {form.getValues('status') === 'inactive' && (
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
                    name='emailAddress'
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
                            onOpenChange={() => {
                              form.resetField('urbanSector', {
                                keepError: true,
                              });
                            }}
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
                                  className={`text-[14px] ${disabledUrbanSectors?.disabledUrbanSectors?.includes(value) || !district ? 'hidden' : ''}`}
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
                    name='referenceComments'
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
                                              field.value?.filter((value) => value !== role) ?? []);

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
                          form.getValues('roles').includes(MemberRole.Preacher) && (
                            <div>
                              <span className='text-red-500 text-left inline-block'>
                                Roles anteriores: Discípulo
                              </span>
                              <br />
                              <span className='text-green-500 text-left inline-block'>
                                Roles nuevos: Discípulo - Predicador
                              </span>
                            </div>
                          )}

                        {form.getValues('roles').includes(MemberRole.Disciple) &&
                          form.getValues('roles').includes(MemberRole.Supervisor) &&
                          !form.getValues('roles').includes(MemberRole.Treasurer) && (
                            <div>
                              <span className='text-red-500 text-left inline-block'>
                                Roles anteriores: Discípulo - Predicador
                              </span>
                              <br />
                              <span className='text-green-500 text-left inline-block'>
                                Roles nuevos: Discípulo - Supervisor
                              </span>
                            </div>
                          )}

                        {form.getValues('roles').includes(MemberRole.Disciple) &&
                          form.getValues('roles').includes(MemberRole.Supervisor) &&
                          form.getValues('roles').includes(MemberRole.Treasurer) && (
                            <div>
                              <span className='text-red-500 text-left inline-block'>
                                Roles anteriores: Discípulo - Predicador - Tesorero
                              </span>
                              <br />
                              <span className='text-green-500 text-left inline-block'>
                                Roles nuevos: Discípulo - Supervisor - Tesorero
                              </span>
                            </div>
                          )}

                        {form.getValues('roles').includes(MemberRole.Disciple) &&
                          form.getValues('roles').includes(MemberRole.Copastor) && (
                            <div>
                              <span className='text-red-500 text-left inline-block'>
                                Roles anteriores: Discípulo - Supervisor
                              </span>
                              <br />
                              <span className='text-green-500 text-left inline-block'>
                                Roles nuevos: Discípulo - Co-pastor
                              </span>
                            </div>
                          )}

                        {form.getValues('roles').includes(MemberRole.Disciple) &&
                          form.getValues('roles').includes(MemberRole.Pastor) && (
                            <div>
                              <span className='text-red-500 text-left inline-block'>
                                Roles anteriores: Discípulo - Co-pastor
                              </span>
                              <br />
                              <span className='text-green-500 text-left inline-block'>
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
                    {/* Validations */}
                    {roles?.includes(MemberRole.Disciple) &&
                      roles?.includes(MemberRole.Pastor) &&
                      !roles?.includes(MemberRole.Copastor) &&
                      !roles?.includes(MemberRole.Supervisor) &&
                      !roles?.includes(MemberRole.Preacher) &&
                      !roles?.includes(MemberRole.Treasurer) && (
                        <span className='text-green-500 font-bold text-[13px]'>
                          No hay relaciones que asignar para estos roles elegidos.
                        </span>
                      )}

                    {roles?.includes(MemberRole.Disciple) &&
                      roles?.includes(MemberRole.Copastor) &&
                      !roles?.includes(MemberRole.Pastor) &&
                      !roles?.includes(MemberRole.Supervisor) &&
                      !roles?.includes(MemberRole.Preacher) &&
                      !roles?.includes(MemberRole.Treasurer) && (
                        <FormField
                          control={form.control}
                          name='theirPastor'
                          render={({ field }) => {
                            return (
                              <FormItem className='flex flex-col mt-3'>
                                <FormLabel className='text-[14px] font-bold'>Pastor</FormLabel>
                                <FormDescription className='text-[14px]'>
                                  Seleccione un pastor para esta relación.
                                </FormDescription>
                                <Popover
                                  open={isInputRelationOpen}
                                  onOpenChange={setIsInputRelationOpen}
                                >
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        disabled={isRelationSelectDisabled}
                                        variant='outline'
                                        role='combobox'
                                        className={cn(
                                          'w-full justify-between overflow-hidden font-medium text-[14px]',
                                          !field.value && 'text-slate-500 font-normal'
                                        )}
                                      >
                                        {field.value
                                          ? pastors.find((pastor) => pastor.value === field.value)
                                              ?.label
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
                                        {pastors.map((pastor) => (
                                          <CommandItem
                                            className='text-[14px]'
                                            value={pastor.label}
                                            key={pastor.value}
                                            onSelect={() => {
                                              form.setValue('theirPastor', pastor.value);
                                              form.clearErrors('theirPastor');
                                              setIsInputRelationOpen(false);
                                            }}
                                          >
                                            {pastor.label}
                                            <CheckIcon
                                              className={cn(
                                                'ml-auto h-4 w-4',
                                                pastor.value === field.value
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

                    {((roles?.includes(MemberRole.Disciple) &&
                      roles?.includes(MemberRole.Supervisor) &&
                      !roles?.includes(MemberRole.Treasurer) &&
                      !roles?.includes(MemberRole.Pastor) &&
                      !roles?.includes(MemberRole.Copastor) &&
                      !roles?.includes(MemberRole.Preacher)) ||
                      (roles?.includes(MemberRole.Disciple) &&
                        roles?.includes(MemberRole.Supervisor) &&
                        roles?.includes(MemberRole.Treasurer) &&
                        !roles?.includes(MemberRole.Pastor) &&
                        !roles?.includes(MemberRole.Copastor) &&
                        !roles?.includes(MemberRole.Preacher))) && (
                      <FormField
                        control={form.control}
                        name='theirCopastor'
                        render={({ field }) => {
                          return (
                            <FormItem className='flex flex-col mt-3'>
                              <FormLabel className='text-[14px] font-bold'>Co-Pastor</FormLabel>
                              <FormDescription className='text-[14px]'>
                                Seleccione un co-pastor para esta relación.
                              </FormDescription>
                              <Popover
                                open={isInputRelationOpen}
                                onOpenChange={setIsInputRelationOpen}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      disabled={isRelationSelectDisabled}
                                      variant='outline'
                                      role='combobox'
                                      className={cn(
                                        'w-full justify-between overflow-hidden font-medium text-[14px]',
                                        !field.value && 'text-slate-500 font-normal'
                                      )}
                                    >
                                      {field.value
                                        ? copastors.find(
                                            (copastor) => copastor.value === field.value
                                          )?.label
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
                                      {copastors.map((copastor) => (
                                        <CommandItem
                                          className='text-[14px]'
                                          value={copastor.label}
                                          key={copastor.value}
                                          onSelect={() => {
                                            form.setValue('theirCopastor', copastor.value);
                                            form.clearErrors('theirCopastor'); // replicar esto
                                            setIsInputRelationOpen(false);
                                          }}
                                        >
                                          {copastor.label}
                                          <CheckIcon
                                            className={cn(
                                              'ml-auto h-4 w-4',
                                              copastor.value === field.value
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

                    {((roles?.includes(MemberRole.Disciple) &&
                      roles?.includes(MemberRole.Preacher) &&
                      !roles?.includes(MemberRole.Treasurer) &&
                      !roles?.includes(MemberRole.Pastor) &&
                      !roles?.includes(MemberRole.Copastor) &&
                      !roles?.includes(MemberRole.Supervisor)) ||
                      (roles?.includes(MemberRole.Disciple) &&
                        roles?.includes(MemberRole.Preacher) &&
                        roles?.includes(MemberRole.Treasurer) &&
                        !roles?.includes(MemberRole.Pastor) &&
                        !roles?.includes(MemberRole.Copastor) &&
                        !roles?.includes(MemberRole.Supervisor))) && (
                      <FormField
                        control={form.control}
                        name='theirSupervisor'
                        render={({ field }) => {
                          return (
                            <FormItem className='flex flex-col mt-3'>
                              <FormLabel className='text-[14px] font-bold'>Supervisor</FormLabel>
                              <FormDescription className='text-[14px]'>
                                Seleccione un supervisor para esta relación.
                              </FormDescription>
                              <Popover
                                open={isInputRelationOpen}
                                onOpenChange={setIsInputRelationOpen}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      disabled={isRelationSelectDisabled}
                                      variant='outline'
                                      role='combobox'
                                      className={cn(
                                        'w-full justify-between font-medium text-[14px] overflow-hidden',
                                        !field.value && 'text-slate-500 font-normal'
                                      )}
                                    >
                                      {field.value
                                        ? supervisors.find(
                                            (supervisor) => supervisor.value === field.value
                                          )?.label
                                        : 'Busque y seleccione un supervisor'}
                                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent align='center' className='w-auto px-4 py-2'>
                                  <Command className='w-full'>
                                    <CommandInput
                                      placeholder='Busque un supervisor...'
                                      className='h-9 text-[14px]'
                                    />
                                    <CommandEmpty>Supervisor no encontrado.</CommandEmpty>
                                    <CommandGroup className='max-h-[200px] h-auto'>
                                      {supervisors.map((supervisor) => (
                                        <CommandItem
                                          className='text-[14px]'
                                          value={supervisor.label}
                                          key={supervisor.value}
                                          onSelect={() => {
                                            form.setValue('theirSupervisor', supervisor.value);
                                            form.clearErrors('theirSupervisor');
                                            setIsInputRelationOpen(false);
                                          }}
                                        >
                                          {supervisor.label}
                                          <CheckIcon
                                            className={cn(
                                              'ml-auto h-4 w-4',
                                              supervisor.value === field.value
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

                    {roles?.includes(MemberRole.Disciple) &&
                      !roles?.includes(MemberRole.Pastor) &&
                      !roles?.includes(MemberRole.Copastor) &&
                      !roles?.includes(MemberRole.Preacher) &&
                      !roles?.includes(MemberRole.Supervisor) &&
                      !roles?.includes(MemberRole.Treasurer) && (
                        <FormField
                          control={form.control}
                          name='theirFamilyHouse'
                          render={({ field }) => {
                            return (
                              <FormItem className='flex flex-col mt-3'>
                                <FormLabel className='text-[14px] font-bold'>
                                  Casa Familiar
                                </FormLabel>
                                <FormDescription className='text-[14px]'>
                                  Seleccione una casa familiar para esta relación.
                                </FormDescription>
                                <Popover
                                  open={isInputRelationOpen}
                                  onOpenChange={setIsInputRelationOpen}
                                >
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        disabled={isRelationSelectDisabled}
                                        variant='outline'
                                        role='combobox'
                                        className={cn(
                                          'w-full justify-between overflow-hidden font-medium text-[14px]',
                                          !field.value && 'text-slate-500 font-normal'
                                        )}
                                      >
                                        {field.value
                                          ? familyHouses.find(
                                              (familyHouse) => familyHouse.value === field.value
                                            )?.label
                                          : 'Busque y seleccione un casa familiar'}
                                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent align='center' className='w-auto px-4 py-2'>
                                    <Command>
                                      <CommandInput
                                        placeholder='Busque una casa familiar...'
                                        className='h-9 text-[14px]'
                                      />
                                      <CommandEmpty>Casa Familiar no encontrado.</CommandEmpty>
                                      <CommandGroup className='max-h-[200px] h-auto'>
                                        {familyHouses.map((familyHouse) => (
                                          <CommandItem
                                            className='text-[14px]'
                                            value={familyHouse.label}
                                            key={familyHouse.value}
                                            onSelect={() => {
                                              form.setValue('theirFamilyHouse', familyHouse.value);
                                              form.clearErrors('theirFamilyHouse');
                                              setIsInputRelationOpen(false);
                                            }}
                                          >
                                            {familyHouse.label}
                                            <CheckIcon
                                              className={cn(
                                                'ml-auto h-4 w-4',
                                                familyHouse.value === field.value
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

                  {pathname !== '/copastors/update-copastor' &&
                    isInputDisabled &&
                    form.getValues('theirPastor') === '' &&
                    form.getValues('theirCopastor') === '' &&
                    form.getValues('theirSupervisor') === '' && (
                      <span className='text-[12px] md:text-[13px] font-bold text-center text-red-500'>
                        ! Por favor asigna la nueva relación para los roles promovidos !
                      </span>
                    )}

                  {pathname !== '/pastors/update-pastor' && (
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
                          <AlertDialogTitle className='text-yellow-500 font-bold text-xl text-center md:text-[25px] pb-2'>
                            {pathname === '/copastors/update-copastor'
                              ? '¿Estas seguro de promover a este Co-Pastor?'
                              : pathname === '/leaders/update-leader'
                                ? '¿Estas seguro de promover a este Líder?'
                                : '¿Estas seguro de promover a este Discípulo?'}
                          </AlertDialogTitle>
                          <AlertDialogDescription
                            className={cn(
                              'h-[19.5rem] md:h-[17rem]',
                              pathname === '/copastors/update-copastor' && 'h-[21rem] md:h-[18rem]',
                              pathname === '/leaders/update-leader' && 'h-[25rem] md:h-[21rem]'
                            )}
                          >
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
                              ❌ De manera automática se borraran todas sus relaciones que tenia en
                              el anterior cargo.
                            </span>

                            {/* Disciples */}
                            {pathname === '/disciples/update-disciple' && (
                              <div>
                                <span
                                  className={`${pathname === '/disciples/update-disciple' ? 'text-left inline-block mb-2 text-[14px] md:text-[15px]' : 'hidden'}`}
                                >
                                  ❌ Si era Discípulo y sube a Predicador(a), se eliminara su
                                  relación con su casa familiar, predicador, supervisor, co-pastor y
                                  pastor.
                                </span>
                                <span
                                  className={`${pathname === '/disciples/update-disciple' ? 'text-left inline-block mb-2 text-[14px] md:text-[15px]' : 'hidden'}`}
                                >
                                  ✅ El discípulo promovido desempeñara funciones de Predicador(a),
                                  tendrá un nuevo supervisor, copastor y pastor, según la zona.
                                </span>
                              </div>
                            )}

                            {/* Copastor */}
                            {pathname === '/copastors/update-copastor' && (
                              <div>
                                <span
                                  className={`${pathname === '/copastors/update-copastor' ? 'text-left inline-block mb-2 text-[14px] md:text-[15px]' : 'hidden'}`}
                                >
                                  ❌ Si era Co-pastor(a) y sube a Pastor(a) se borrara su relación
                                  con las zonas, casas familiares, supervisores, predicadores y
                                  discípulos que englobaba su cargo.
                                </span>
                                <span
                                  className={`${pathname === '/copastors/update-copastor' ? 'text-left inline-block mb-2 text-[14px] md:text-[15px]' : 'hidden'}`}
                                >
                                  ✅ Se deberá asignar otro Co-pastor(a) para los discípulos, casas
                                  y zonas que quedaron desamparados.
                                </span>
                              </div>
                            )}

                            {/* Leaders */}
                            {pathname === '/leaders/update-leader' && (
                              <div>
                                <span
                                  className={`${pathname === '/leaders/update-leader' ? 'text-left inline-block mb-2 text-[14px] md:text-[15px]' : 'hidden'}`}
                                >
                                  ❌ Si era Predicador(a) y sube a Supervisor(a), se borrara su
                                  relación con su casa familiar, discípulos, supervisor, co-pastor y
                                  pastor.
                                </span>
                                <span
                                  className={`${pathname === '/leaders/update-leader' ? 'text-left inline-block mb-2 text-[14px] md:text-[15px]' : 'hidden'}`}
                                >
                                  ❌ Si era Supervisor(a) y sube a Co-pastor(a), se borrara su
                                  relación con su co-pastor y pastor asi como con las zonas, casas,
                                  predicadores y discípulos que tenia a cargo.
                                </span>
                                <span
                                  className={`${pathname === '/leaders/update-leader' ? 'text-left inline-block mb-2 text-[14px] md:text-[15px]' : 'hidden'}`}
                                >
                                  ✅ Se deberá asignar otro Predicador(a) o Supervisor(a) para los
                                  discípulos, casas y zonas que quedaron desamparados.
                                </span>
                              </div>
                            )}

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
                              useRoleUpdateHandler({
                                formMemberUpdate: form,
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
                  )}

                  {pathname !== '/pastors/update-pastor' &&
                    isPromoteButtonDisabled &&
                    !isInputDisabled && (
                      <div className=''>
                        <p className='text-red-500 text-[13px] md:text-[14px] font-bold mb-2'>
                          Consideraciones
                        </p>
                        <p className='text-[12px] md:text-[13px] mb-2 font-medium '>
                          ❌ Mientras estés en modo de edición y los datos cambien no podrás
                          promover de cargo.{' '}
                        </p>
                        <p className='text-[12px] md:text-[13px] font-medium '>
                          ❌ Mientras el &#34;Estado&#34; sea{' '}
                          <span className='text-red-500 font-bold'>Inactivo</span> no podrás
                          promover de cargo.
                        </p>
                      </div>
                    )}
                </div>

                {isMessageErrorDisabled ? (
                  <p className='-mb-4 md:-mb-3 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-4 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                    ❌ Datos incompletos, completa todos los campos para guardar el registro.
                  </p>
                ) : (
                  <p className='-mt-4 order-last md:-mt-3 md:row-start-3 md:row-end-4 md:col-start-1 md:col-end-4 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                    ¡Campos completados correctamente! <br /> Para finalizar por favor guarde los
                    cambios.
                  </p>
                )}

                <div className='sm:col-start-2  w-full'>
                  <Toaster position='top-center' richColors />
                  <Button
                    disabled={isSubmitButtonDisabled}
                    type='submit'
                    className='w-full text-[14px]'
                    onClick={() => {
                      // NOTE : agregar promesa cuando se consulte hacer timer y luego mostrar toast (fetch real)
                      // NOTE : hacer petición al backend para eliminar
                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          toast.success('Cambios guardados correctamente', {
                            position: 'top-center',
                            className: 'justify-center',
                          });

                          setIsInputDisabled(true);
                          setIsSubmitButtonDisabled(true);
                          setIsPromoteButtonDisabled(true);
                          setIsRelationSelectDisabled(true);
                        }
                      }, 100);

                      setTimeout(() => {
                        onScroll();
                      }, 150);

                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          onClose();
                        }
                      }, 1800);
                    }}
                  >
                    Guardar cambios
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
