/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useEffect } from 'react';

import { Toaster, toast } from 'sonner';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';

import { es } from 'date-fns/locale';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from '@/components/ui/select';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

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
} from '@/components/ui/alert-dialog';

import {
  FieldName,
  MaritalStatus,
  MaritalStatusNames,
  MemberRoleNames,
  MemberRoles,
} from '@/enums';

import { type DataMemberKeys, type MemberData } from '@/interfaces';
import { formMemberSchema } from '@/validations';
import { copastors, familyHouses, pastors, supervisors } from '@/data';

// TODO : dependiendo de la ruta hacer fetch a cierto modulo

// NOTE : ver si se hace el fetch aquí o el UpdateCard.
// NOTE : hay que personalizar el aviso de promover según su pagina pastor , copastor, leader....
// NOTE : hacer llamado según el ID para traer la data

const data: MemberData = {
  firstName: 'Kevin',
  lastName: 'Angeles',
  originCountry: 'Peru',
  dateBirth: new Date('12-12-2000'),
  gender: 'female',
  maritalStatus: MaritalStatus.divorced,
  numberChildren: '3',
  conversionDate: new Date('12-12-2000'),
  emailAddress: 'kevin@google.com',
  phoneNumber: '9999',
  country: 'Peru',
  department: 'Lima',
  province: 'Lima',
  district: 'Lima',
  address: 'jr rio 222',
  roles: [MemberRoles.member, MemberRoles.supervisor],
  theirPastor: 'id1',
  theirCopastor: 'id2',
  theirSupervisor: 'id3',
  theirFamilyHouse: 'id2',
  isActive: 'inactive',
};
// NOTE : ver si pasar mas props y colocar en interfaces folder
interface FormMemberProps {
  onSubmit: () => void;
}

//! Type el objeto a recibir desde el padre en una interface
export const FormMember = ({ onSubmit }: FormMemberProps): JSX.Element => {
  const [openInputRelation, setOpenInputRelation] = useState(false);
  const [openInputBirthDate, setOpenInputBirthDate] = useState(false);
  const [openInputConvertionDate, setOpenInputConvertionDate] = useState(false);

  const [disableInput, setDisableInput] = useState(false); // array objects

  const [fixedValues, setFixedValues] = useState<MemberData[]>([]); // array objects
  const [lastValues, setLastValues] = useState<MemberData[]>([]); // array object

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  const form = useForm<z.infer<typeof formMemberSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formMemberSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      originCountry: '',
      numberChildren: '',
      country: 'Peru',
      department: '',
      province: '',
      district: '',
      address: '',
    },
  });

  //* Watchers
  const firstName = form.watch('firstName');
  const lastName = form.watch('lastName');
  const gender = form.watch('gender');
  const originCountry = form.watch('originCountry');
  const maritalStatus = form.watch('maritalStatus');
  const dateBirth = form.watch('dateBirth');
  const numberChildren = form.watch('numberChildren');
  const conversionDate = form.watch('conversionDate');
  const emailAddress = form.watch('emailAddress');
  const phoneNumber = form.watch('phoneNumber');
  const country = form.watch('country');
  const department = form.watch('department');
  const province = form.watch('province');
  const district = form.watch('district');
  const address = form.watch('address');
  const roles = form.watch('roles');
  const theirPastor = form.watch('theirPastor');
  const theirCopastor = form.watch('theirCopastor');
  const theirSupervisor = form.watch('theirSupervisor');
  const theirFamilyHouse = form.watch('theirFamilyHouse');
  const isActive = form.watch('isActive');

  //! Ver la opción de hacer un custom hook o un estado mas grande
  useEffect(() => {
    // TODO : hacer consulta real y setear datos según interface y type
    // Simula una consulta a la URL del backend
    for (const key in data) {
      form.setValue(key as DataMemberKeys, data[key as DataMemberKeys]);
    }
  }, []);

  useEffect(() => {
    const previousValues = lastValues;
    const currentValues = form.getValues([...Object.values(FieldName)]);

    if (
      previousValues.length !== 0 &&
      JSON.stringify(currentValues) !== JSON.stringify(previousValues)
    ) {
      setIsButtonDisabled(true);
    }

    if (
      previousValues.length !== 0 &&
      JSON.stringify(currentValues) === JSON.stringify(previousValues)
    ) {
      setFixedValues(currentValues);
    }

    const arrayEqualsIgnoreOrder = (
      fixed: MemberData[],
      current: MemberData[]
    ): boolean => {
      const sortedA = Array.isArray(fixed[15]) && fixed[15]?.sort();
      const sortedB = Array.isArray(current[15]) && current[15]?.sort();

      return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    };

    if (
      arrayEqualsIgnoreOrder(fixedValues, currentValues) &&
      JSON.stringify(fixedValues) === JSON.stringify(currentValues)
    ) {
      setIsButtonDisabled(false);
    }

    setLastValues(currentValues);
  }, [
    firstName,
    lastName,
    gender,
    originCountry,
    maritalStatus,
    dateBirth,
    numberChildren,
    conversionDate,
    emailAddress,
    phoneNumber,
    country,
    department,
    province,
    district,
    address,
    roles,
    theirPastor,
    theirCopastor,
    theirSupervisor,
    theirFamilyHouse,
    isActive,
  ]);

  const currentPath = window.location.pathname;
  let disabledRoles: string[];

  // NOTE : ver disables para offering, houses, etc. (no sera necesario)
  if (currentPath === '/leaders/update-leader' && !disableInput) {
    disabledRoles = [
      ...Object.values(MemberRoles).filter(
        (rol) => rol !== MemberRoles.treasurer
      ),
    ];
  } else if (
    currentPath === '/pastors/update-pastor' ||
    currentPath === '/copastors/update-copastor' ||
    currentPath === '/disciples/update-disciple' ||
    disableInput
  ) {
    disabledRoles = [...Object.values(MemberRoles).filter((rol) => rol)];
  }

  const handleSubmit = (values: z.infer<typeof formMemberSchema>): void => {
    // TODO : enviar datos al backend actualizar
    console.log({ values });
  };

  const handleRoleUpdate = (): void => {
    // Delete all roles
    form.setValue('theirCopastor', '');
    form.setValue('theirPastor', '');
    form.setValue('theirFamilyHouse', '');
    form.setValue('theirSupervisor', '');

    // Conditional level up role
    const roles = form.getValues('roles');
    const hasMember = roles.includes(MemberRoles.member);
    const hasPreacher = roles.includes(MemberRoles.preacher);
    const hasTreasurer = roles.includes(MemberRoles.treasurer);
    const hasCopastor = roles.includes(MemberRoles.copastor);
    const hasPastor = roles.includes(MemberRoles.pastor);
    const hasSupervisor = roles.includes(MemberRoles.supervisor);

    if (hasMember) {
      if (
        !hasPreacher &&
        !hasSupervisor &&
        !hasTreasurer &&
        !hasCopastor &&
        !hasPastor
      ) {
        form.setValue('roles', [MemberRoles.member, MemberRoles.preacher]);
      } else if (
        hasPreacher &&
        !hasSupervisor &&
        !hasTreasurer &&
        !hasCopastor &&
        !hasPastor
      ) {
        form.setValue('roles', [MemberRoles.member, MemberRoles.supervisor]);
      } else if (
        hasPreacher &&
        hasTreasurer &&
        !hasSupervisor &&
        !hasCopastor &&
        !hasPastor
      ) {
        form.setValue('roles', [
          MemberRoles.member,
          MemberRoles.supervisor,
          MemberRoles.treasurer,
        ]);
      } else if (
        (hasPreacher &&
          hasSupervisor &&
          hasTreasurer &&
          !hasCopastor &&
          !hasPastor) ||
        (hasMember &&
          hasSupervisor &&
          !hasPreacher &&
          !hasTreasurer &&
          !hasCopastor &&
          !hasPastor)
      ) {
        form.setValue('roles', [MemberRoles.member, MemberRoles.copastor]);
      } else if (hasMember && hasCopastor) {
        form.setValue('roles', [MemberRoles.member, MemberRoles.pastor]);
      }
    }

    // set disabled states
    setDisableInput(true);
    setIsButtonDisabled(true);
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[890px] xl:w-[1000px] overflow-y-auto'
    >
      <TabsList className='grid w-full grid-cols-1 px-auto'>
        <TabsTrigger
          value='general-info'
          className='text-[14px] md:text-[15px]'
        >
          Actualizar información del miembro
        </TabsTrigger>
      </TabsList>

      <TabsContent value='general-info' className='overflow-y-auto'>
        <Card className='w-full'>
          <CardContent className='py-3 px-4'>
            {/* Aca podría ser un componente pasamos todos por props */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-auto grid gap-y-6 sm:grid-cols-3 sm:gap-y-4 sm:gap-x-8 px-2 ms:px-6'
              >
                {/* Datos generales */}

                <div className='sm:col-start-1 sm:col-end-2'>
                  <legend className='font-bold text-[14px] md:text-[15px]'>
                    Datos generales
                  </legend>
                  <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-1'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            Nombres
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={disableInput}
                              className='text-[12px] xl:text-[13px]'
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
                        <FormItem className='mt-1'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            Apellidos
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={disableInput}
                              className='text-[12px] xl:text-[13px]'
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
                        <FormItem className='mt-1'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            Genero
                          </FormLabel>
                          <Select
                            disabled={disableInput}
                            onValueChange={field.onChange}
                          >
                            <FormControl className='text-[12px] xl:text-[13px]'>
                              <SelectTrigger>
                                {field.value === 'male' ? (
                                  <SelectValue placeholder='Masculino' />
                                ) : (
                                  <SelectValue placeholder='Femenino' />
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem
                                className='text-[12px] xl:text-[13px]'
                                value='male'
                              >
                                Masculino
                              </SelectItem>
                              <SelectItem
                                className='text-[12px] xl:text-[13px]'
                                value='female'
                              >
                                Femenino
                              </SelectItem>
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
                        <FormItem className='mt-1'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            País de Origen
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={disableInput}
                              className='text-[12px] xl:text-[13px]'
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
                      <FormItem className='flex flex-col mt-2'>
                        <FormLabel className='text-[13px] xl:text-sm'>
                          Fecha de Nacimiento
                        </FormLabel>
                        <Popover
                          open={openInputBirthDate}
                          onOpenChange={setOpenInputBirthDate}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={disableInput}
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
                                    Fecha de nacimiento
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
                                setOpenInputBirthDate(false);
                              }}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription className='pl-3 text-blue-600 text-[12px] xl:text-[13px] font-bold'>
                          * Su fecha de nacimiento se utiliza para calcular su
                          edad.
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
                        <FormItem className='mt-1'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            Estado Civil
                          </FormLabel>
                          <Select
                            disabled={disableInput}
                            onValueChange={field.onChange}
                          >
                            <FormControl className='text-[12px] xl:text-[13px]'>
                              <SelectTrigger>
                                {field.value === MaritalStatus.single ? (
                                  <SelectValue
                                    placeholder={MaritalStatusNames.single}
                                  />
                                ) : field.value === MaritalStatus.married ? (
                                  <SelectValue
                                    placeholder={MaritalStatusNames.married}
                                  />
                                ) : field.value === MaritalStatus.widowed ? (
                                  <SelectValue
                                    placeholder={MaritalStatusNames.widowed}
                                  />
                                ) : field.value === MaritalStatus.divorced ? (
                                  <SelectValue
                                    placeholder={MaritalStatusNames.divorced}
                                  />
                                ) : (
                                  <SelectValue
                                    placeholder={MaritalStatusNames.other}
                                  />
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(MaritalStatusNames).map(
                                ([key, value]) => (
                                  <SelectItem
                                    className='text-[12px] xl:text-[13px]'
                                    key={key}
                                    value={key}
                                  >
                                    {value}
                                  </SelectItem>
                                )
                              )}
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
                        <FormItem className='mt-1'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            Numero de hijos
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={disableInput}
                              className='text-[12px] xl:text-[13px]'
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
                        <FormLabel className='text-[13px] xl:text-sm'>
                          Fecha de conversión
                        </FormLabel>
                        <Popover
                          open={openInputConvertionDate}
                          onOpenChange={setOpenInputConvertionDate}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={disableInput}
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
                                setOpenInputConvertionDate(false);
                              }}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription className='pl-3 text-blue-600 text-[12px] xl:text-[13px] font-bold'>
                          * Fecha en la que el creyente se convirtió.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contacto y Vivienda */}

                <div className='sm:col-start-2 sm:col-end-3'>
                  <legend className='font-bold text-[14px] md:text-[15px]'>
                    Contacto / Vivienda
                  </legend>

                  <FormField
                    control={form.control}
                    name='emailAddress'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-1'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            E-mail
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={disableInput}
                              className='text-[12px] xl:text-[13px]'
                              placeholder='Eje: martin@gmail.com'
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
                        <FormItem className='mt-1'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            Numero de Teléfono
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={disableInput}
                              className='text-[12px] xl:text-[13px]'
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
                        <FormItem className='mt-1'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            País
                          </FormLabel>
                          <FormDescription className='text-[12px] lg:text-[13px]'>
                            País en el que reside el miembro.
                          </FormDescription>
                          <FormControl>
                            <Input
                              disabled={disableInput}
                              className='text-[12px] xl:text-[13px]'
                              placeholder='Eje: Peru...'
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
                    name='department'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-1'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            Departamento
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={disableInput}
                              className='text-[12px] xl:text-[13px]'
                              placeholder='Eje: Lima...'
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
                    name='province'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-1'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            Provincia
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={disableInput}
                              className='text-[12px] xl:text-[13px]'
                              placeholder='Eje: Lima...'
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
                    name='district'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-1'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            Distrito
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={disableInput}
                              className='text-[12px] xl:text-[13px]'
                              placeholder='Eje: Comas, Independencia...'
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
                    name='address'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-1'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            Dirección
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={disableInput}
                              className='text-[12px] xl:text-[13px]'
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
                    name='isActive'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-3'>
                          <FormLabel className='text-[13px] xl:text-sm'>
                            Estado
                          </FormLabel>
                          <Select
                            disabled={disableInput}
                            onValueChange={field.onChange}
                          >
                            <FormControl className='text-[12px] xl:text-[13px]'>
                              <SelectTrigger>
                                {field.value === 'active' ? (
                                  <SelectValue placeholder='Activo' />
                                ) : (
                                  <SelectValue placeholder='Inactivo' />
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem
                                className='text-[12px] xl:text-[13px]'
                                value='active'
                              >
                                Activo
                              </SelectItem>
                              {/* <SelectItem
                                className='text-[12px] xl:text-[13px]'
                                value='inactive'
                              >
                                Inactivo
                              </SelectItem> */}
                            </SelectContent>
                          </Select>
                          {form.getValues('isActive') === 'active' && (
                            <FormDescription className='pl-3  text-[12px] xl:text-[13px] font-bold'>
                              *Se cambio el estado a{' '}
                              <span className='text-green-500'>activo</span>,
                              para colocar nuevamente como{' '}
                              <span className='text-red-500'>inactivo</span>{' '}
                              debe eliminar el registro.
                            </FormDescription>
                          )}
                          {form.getValues('isActive') === 'inactive' &&
                            !disableInput && (
                              <FormDescription className='pl-3text-[12px] xl:text-[13px] font-bold'>
                                * El miembro esta{' '}
                                <span className='text-red-500'>inactivo</span>,
                                puede modificar el estado eligiendo otra opción.
                              </FormDescription>
                            )}
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
                          <FormLabel className='font-bold text-[14px] md:text-[15px]'>
                            Roles
                          </FormLabel>
                          <FormDescription className='font-medium text-[13px] xl:text-sm'>
                            Seleccione los roles que desea asignar al miembro.
                          </FormDescription>
                        </div>
                        {Object.values(MemberRoles).map((role) => (
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
                                        let updatedRoles: MemberRoles[] = [];
                                        checked
                                          ? (updatedRoles = field.value
                                              ? [...field.value, role]
                                              : [role])
                                          : (updatedRoles =
                                              field.value?.filter(
                                                (value) => value !== role
                                              ) ?? []);

                                        field.onChange(updatedRoles);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className='text-[13px] lg:text-sm font-normal'>
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

                  {disableInput &&
                    form.getValues('theirPastor') === '' &&
                    form.getValues('theirCopastor') === '' &&
                    form.getValues('theirSupervisor') === '' && (
                      <span className='text-[12px] md:text-[13px] text-blue-500 font-bold text-center'>
                        !ROLES ACTUALIZADOS! <br />
                        <span className='text-[12px]'>
                          {form
                            .getValues('roles')
                            .includes(MemberRoles.member) &&
                            form
                              .getValues('roles')
                              .includes(MemberRoles.preacher) && (
                              <div>
                                <span className='text-red-500 text-left inline-block'>
                                  Roles anteriores: Miembro
                                </span>
                                <br />
                                <span className='text-green-500 text-left inline-block'>
                                  Roles nuevos: Miembro - Predicador
                                </span>
                              </div>
                            )}

                          {form
                            .getValues('roles')
                            .includes(MemberRoles.member) &&
                            form
                              .getValues('roles')
                              .includes(MemberRoles.supervisor) &&
                            !form
                              .getValues('roles')
                              .includes(MemberRoles.treasurer) && (
                              <div>
                                <span className='text-red-500 text-left inline-block'>
                                  Roles anteriores: Miembro - Predicador
                                </span>
                                <br />
                                <span className='text-green-500 text-left inline-block'>
                                  Roles nuevos: Miembro - Supervisor
                                </span>
                              </div>
                            )}

                          {form
                            .getValues('roles')
                            .includes(MemberRoles.member) &&
                            form
                              .getValues('roles')
                              .includes(MemberRoles.supervisor) &&
                            form
                              .getValues('roles')
                              .includes(MemberRoles.treasurer) && (
                              <div>
                                <span className='text-red-500 text-left inline-block'>
                                  Roles anteriores: Miembro - Predicador -
                                  Tesorero
                                </span>
                                <br />
                                <span className='text-green-500 text-left inline-block'>
                                  Roles nuevos: Miembro - Supervisor - Tesorero
                                </span>
                              </div>
                            )}

                          {form
                            .getValues('roles')
                            .includes(MemberRoles.member) &&
                            form
                              .getValues('roles')
                              .includes(MemberRoles.copastor) && (
                              <div>
                                <span className='text-red-500 text-left inline-block'>
                                  Roles anteriores: Miembro - Supervisor
                                </span>
                                <br />
                                <span className='text-green-500 text-left inline-block'>
                                  Roles nuevos: Miembro - Co-pastor
                                </span>
                              </div>
                            )}

                          {form
                            .getValues('roles')
                            .includes(MemberRoles.member) &&
                            form
                              .getValues('roles')
                              .includes(MemberRoles.pastor) && (
                              <div>
                                <span className='text-red-500 text-left inline-block'>
                                  Roles anteriores: Miembro - Co-pastor
                                </span>
                                <br />
                                <span className='text-green-500 text-left inline-block'>
                                  Roles nuevos: Miembro - Pastor
                                </span>
                              </div>
                            )}
                        </span>
                      </span>
                    )}

                  {/* Relaciones  */}

                  <div>
                    <legend className='font-bold col-start-1 col-end-3 text-[14px] md:text-[15px]'>
                      Relaciones
                    </legend>
                    {/* Validations */}
                    {roles?.includes(MemberRoles.member) &&
                      roles?.includes(MemberRoles.pastor) &&
                      !roles?.includes(MemberRoles.copastor) &&
                      !roles?.includes(MemberRoles.supervisor) &&
                      !roles?.includes(MemberRoles.preacher) &&
                      !roles?.includes(MemberRoles.treasurer) && (
                        <span className='text-green-500 font-bold text-[13px]'>
                          No hay relaciones que asignar para estos roles
                          elegidos.
                        </span>
                      )}

                    {roles?.includes(MemberRoles.member) &&
                      roles?.includes(MemberRoles.copastor) &&
                      !roles?.includes(MemberRoles.pastor) &&
                      !roles?.includes(MemberRoles.supervisor) &&
                      !roles?.includes(MemberRoles.preacher) &&
                      !roles?.includes(MemberRoles.treasurer) && (
                        <FormField
                          control={form.control}
                          name='theirPastor'
                          render={({ field }) => {
                            return (
                              <FormItem className='flex flex-col mt-4'>
                                <FormLabel className='text-[13px] md:text-[14px] font-bold'>
                                  Pastor
                                </FormLabel>
                                <FormDescription className='text-[12px] lg:text-[13px]'>
                                  Seleccione un pastor para esta relación.
                                </FormDescription>
                                <Popover
                                  open={openInputRelation}
                                  onOpenChange={setOpenInputRelation}
                                >
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant='outline'
                                        role='combobox'
                                        className={cn(
                                          'w-full justify-between overflow-hidden font-medium text-[13px] xl:text-sm',
                                          !field.value &&
                                            'text-slate-500 font-normal'
                                        )}
                                      >
                                        {field.value
                                          ? pastors.find(
                                              (pastor) =>
                                                pastor.value === field.value
                                            )?.label
                                          : 'Busque y seleccione un pastor'}
                                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className='mr-30 w-auto px-4 py-2'>
                                    <Command>
                                      <CommandInput
                                        placeholder='Busque un pastor...'
                                        className='h-9 text-sm text-[12px] md:text-[13px]'
                                      />
                                      <CommandEmpty>
                                        Pastor no encontrado.
                                      </CommandEmpty>
                                      <CommandGroup className='max-h-[200px] h-auto'>
                                        {pastors.map((pastor) => (
                                          <CommandItem
                                            className='text-[12px] md:text-[13px]'
                                            value={pastor.label}
                                            key={pastor.value}
                                            onSelect={() => {
                                              form.setValue(
                                                'theirPastor',
                                                pastor.value
                                              );
                                              form.clearErrors('theirPastor');
                                              setOpenInputRelation(false);
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

                    {((roles?.includes(MemberRoles.member) &&
                      roles?.includes(MemberRoles.supervisor) &&
                      !roles?.includes(MemberRoles.treasurer) &&
                      !roles?.includes(MemberRoles.pastor) &&
                      !roles?.includes(MemberRoles.copastor) &&
                      !roles?.includes(MemberRoles.preacher)) ||
                      (roles?.includes(MemberRoles.member) &&
                        roles?.includes(MemberRoles.supervisor) &&
                        roles?.includes(MemberRoles.treasurer) &&
                        !roles?.includes(MemberRoles.pastor) &&
                        !roles?.includes(MemberRoles.copastor) &&
                        !roles?.includes(MemberRoles.preacher))) && (
                      <FormField
                        control={form.control}
                        name='theirCopastor'
                        render={({ field }) => {
                          return (
                            <FormItem className='flex flex-col mt-4'>
                              <FormLabel className='text-[13px] md:text-[14px] font-bold'>
                                Co-Pastor
                              </FormLabel>
                              <FormDescription className='text-[13px] lg:text-[14px]'>
                                Seleccione un co-pastor para esta relación.
                              </FormDescription>
                              <Popover
                                open={openInputRelation}
                                onOpenChange={setOpenInputRelation}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant='outline'
                                      role='combobox'
                                      className={cn(
                                        'w-full justify-between overflow-hidden font-medium  text-[13px] xl:text-sm',
                                        !field.value &&
                                          'text-slate-500 font-normal'
                                      )}
                                    >
                                      {field.value
                                        ? copastors.find(
                                            (copastor) =>
                                              copastor.value === field.value
                                          )?.label
                                        : 'Busque y seleccione un co-pastor'}
                                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className='mr-30 w-auto py-2 px-4'>
                                  <Command>
                                    <CommandInput
                                      placeholder='Busque un co-pastor...'
                                      className='h-9 text-[12px] md:text-[13px]'
                                    />
                                    <CommandEmpty>
                                      Co-Pastor no encontrado.
                                    </CommandEmpty>
                                    <CommandGroup className='max-h-[200px] h-auto'>
                                      {copastors.map((copastor) => (
                                        <CommandItem
                                          className='text-[12px] md:text-[13px]'
                                          value={copastor.label}
                                          key={copastor.value}
                                          onSelect={() => {
                                            form.setValue(
                                              'theirCopastor',
                                              copastor.value
                                            );
                                            form.clearErrors('theirCopastor'); // replicar esto
                                            setOpenInputRelation(false);
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
                    {((roles?.includes(MemberRoles.member) &&
                      roles?.includes(MemberRoles.preacher) &&
                      !roles?.includes(MemberRoles.treasurer) &&
                      !roles?.includes(MemberRoles.pastor) &&
                      !roles?.includes(MemberRoles.copastor) &&
                      !roles?.includes(MemberRoles.supervisor)) ||
                      (roles?.includes(MemberRoles.member) &&
                        roles?.includes(MemberRoles.preacher) &&
                        roles?.includes(MemberRoles.treasurer) &&
                        !roles?.includes(MemberRoles.pastor) &&
                        !roles?.includes(MemberRoles.copastor) &&
                        !roles?.includes(MemberRoles.supervisor))) && (
                      <FormField
                        control={form.control}
                        name='theirSupervisor'
                        render={({ field }) => {
                          return (
                            <FormItem className='flex flex-col mt-4'>
                              <FormLabel className='text-[13px] md:text-[14px] font-bold'>
                                Supervisor
                              </FormLabel>
                              <FormDescription className='text-[13px] lg:text-[14px]'>
                                Seleccione un supervisor para esta relación.
                              </FormDescription>
                              <Popover
                                open={openInputRelation}
                                onOpenChange={setOpenInputRelation}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant='outline'
                                      role='combobox'
                                      className={cn(
                                        'w-full justify-between  font-medium text-[13px] xl:text-sm',
                                        !field.value &&
                                          'text-slate-500 font-normal'
                                      )}
                                    >
                                      {field.value
                                        ? supervisors.find(
                                            (supervisor) =>
                                              supervisor.value === field.value
                                          )?.label
                                        : 'Busque y seleccione un supervisor'}
                                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className='mr-30 w-auto px-4 py-2'>
                                  <Command className='w-full'>
                                    <CommandInput
                                      placeholder='Busque un supervisor...'
                                      className='h-9 text-[13px]'
                                    />
                                    <CommandEmpty>
                                      Supervisor no encontrado.
                                    </CommandEmpty>
                                    <CommandGroup className='max-h-[200px] h-auto'>
                                      {supervisors.map((supervisor) => (
                                        <CommandItem
                                          className='text-[13px]'
                                          value={supervisor.label}
                                          key={supervisor.value}
                                          onSelect={() => {
                                            form.setValue(
                                              'theirSupervisor',
                                              supervisor.value
                                            );
                                            form.clearErrors('theirSupervisor');
                                            setOpenInputRelation(false);
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
                    {roles?.includes(MemberRoles.member) &&
                      !roles?.includes(MemberRoles.pastor) &&
                      !roles?.includes(MemberRoles.copastor) &&
                      !roles?.includes(MemberRoles.preacher) &&
                      !roles?.includes(MemberRoles.supervisor) &&
                      !roles?.includes(MemberRoles.treasurer) && (
                        <FormField
                          control={form.control}
                          name='theirFamilyHouse'
                          render={({ field }) => {
                            return (
                              <FormItem className='flex flex-col mt-4'>
                                <FormLabel className='text-[13px] md:text-[14px] font-bold'>
                                  Casa Familiar
                                </FormLabel>
                                <FormDescription className='text-[14px] lg:text-[14px]'>
                                  Seleccione una casa familiar para esta
                                  relación.
                                </FormDescription>
                                <Popover
                                  open={openInputRelation}
                                  onOpenChange={setOpenInputRelation}
                                >
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant='outline'
                                        role='combobox'
                                        className={cn(
                                          'w-full justify-between overflow-hidden font-medium text-[13px] xl:text-sm',
                                          !field.value &&
                                            'text-slate-500 font-normal'
                                        )}
                                      >
                                        {field.value
                                          ? familyHouses.find(
                                              (familyHouse) =>
                                                familyHouse.value ===
                                                field.value
                                            )?.label
                                          : 'Busque y seleccione un casa familiar'}
                                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className='mr-30 w-auto py-2 px-4'>
                                    <Command>
                                      <CommandInput
                                        placeholder='Busque una casa familiar...'
                                        className='h-9 text-[12px] md:text-[13px]'
                                      />
                                      <CommandEmpty>
                                        Casa Familiar no encontrado.
                                      </CommandEmpty>
                                      <CommandGroup className='max-h-[200px] h-auto'>
                                        {familyHouses.map((familyHouse) => (
                                          <CommandItem
                                            className='text-[12px] md:text-[13px]'
                                            value={familyHouse.label}
                                            key={familyHouse.value}
                                            onSelect={() => {
                                              form.setValue(
                                                'theirFamilyHouse',
                                                familyHouse.value
                                              );
                                              form.clearErrors(
                                                'theirFamilyHouse'
                                              );
                                              setOpenInputRelation(false);
                                            }}
                                          >
                                            {familyHouse.label}
                                            <CheckIcon
                                              className={cn(
                                                'ml-auto h-4 w-4',
                                                familyHouse.value ===
                                                  field.value
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
                  {currentPath !== '/copastors/update-copastor' &&
                    disableInput &&
                    form.getValues('theirPastor') === '' &&
                    form.getValues('theirCopastor') === '' &&
                    form.getValues('theirSupervisor') === '' && (
                      <span className='text-[12px] md:text-[13px] text-center text-red-500 font-medium'>
                        ! Por favor asigna la nueva relación para los roles
                        promovidos !
                      </span>
                    )}
                  {currentPath !== '/pastors/update-pastor' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          disabled={isButtonDisabled}
                          className='w-full text-[14px] md:mt-[2rem] disabled:bg-slate-500 disabled:text-white bg-yellow-400 text-yellow-700 hover:text-white hover:bg-yellow-500'
                        >
                          Promover de cargo
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader className='h-auto'>
                          <AlertDialogTitle className='text-blue-500'>
                            ¿Estas seguro de promover a este miembro?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <span className='text-green-500 font-bold mb-2 inline-block'>
                              Deberás hacer lo siguiente:
                            </span>
                            <br />
                            <span className='inline-block mb-2'>
                              ✔ Primero se deberá asignar nuevas relaciones
                              según el nuevo cargo y guardar estos datos para
                              aplicar la promoción.
                            </span>
                            <br />
                            <span className='text-red-500 font-bold mb-2 inline-block'>
                              Después de hacer esto sucederá lo siguiente:
                            </span>
                            <br />
                            <span className='inline-block mb-1'>
                              ❌ Se borraran todas sus relaciones que tenia en
                              el anterior cargo.
                            </span>

                            {currentPath === '/disciples/update-disciple' && (
                              <span
                                className={`${currentPath === '/disciples/update-disciple' ? 'inline-block mb-1' : 'hidden'}`}
                              >
                                ❌ Si era Miembro y sube a Predicador(a) se
                                eliminara su relación con su casa familiar, y se
                                le asignara una nueva donde desempeñara su nuevo
                                rol.
                              </span>
                            )}

                            {currentPath === '/leaders/update-leader' && (
                              <span
                                className={`${currentPath === '/leaders/update-leader' ? 'inline-block mb-1' : 'hidden'}`}
                              >
                                ❌ Si era Predicador(a) y sube a Supervisor(a)
                                se borrara su relación con su casa familiar y
                                sus miembros, por lo que deberá asignar a otro
                                Predicador(a) para estos.
                              </span>
                            )}

                            {currentPath === '/leaders/update-leader' && (
                              <span
                                className={`${currentPath === '/leaders/update-leader' ? 'inline-block mb-1' : 'hidden'}`}
                              >
                                ❌ Si era Supervisor(a) y sube a Co-pastor(a) se
                                borrara su relación con las zonas, casas,
                                predicadores y miembros que tenia a cargo, por
                                lo que se deberá asignar otro Supervisor(a) para
                                todos estos.
                              </span>
                            )}

                            {currentPath === '/copastors/update-copastor' && (
                              <span
                                className={`${currentPath === '/copastors/update-copastor' ? '' : 'hidden'}`}
                              >
                                <br />❌ Si era Co-pastor(a) y sube a Pastor(a)
                                se borrara su relación con las zonas, casas,
                                supervisores, predicadores y miembros que
                                englobaba su cargo, por lo que se deberá asignar
                                otro Co-pastor(a) para todos estos.
                              </span>
                            )}

                            <br />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleRoleUpdate}>
                            Aceptar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  {currentPath !== '/pastors/update-pastor' &&
                    isButtonDisabled &&
                    !disableInput && (
                      <span className='text-red-500 text-[13px] font-bold'>
                        !ALERTA! : Mientras estés en modo de edición no podrás
                        promover de cargo.
                      </span>
                    )}

                  {(JSON.stringify(fixedValues) !==
                    JSON.stringify(
                      form.getValues([...Object.values(FieldName)])
                    ) ||
                    JSON.stringify(fixedValues[15]) !==
                      JSON.stringify(
                        form.getValues([...Object.values(FieldName)][15])
                      )) &&
                    isButtonDisabled &&
                    (!disableInput || disableInput) && (
                      <span className='text-[12px] md:text-[13px] text-green-500 font-bold text-center'>
                        <span className='font-medium'>
                          Para finalizar por favor guarde los cambios.
                        </span>
                      </span>
                    )}
                </div>

                <div className='sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:row-end-3 w-full'>
                  <Toaster position='top-center' richColors />
                  <Button
                    disabled={isSubmitButtonDisabled}
                    type='submit'
                    className='w-full text-[14px]'
                    onClick={() => {
                      // TODO : agregar promesa cuando se consulte hacer timer y luego mostrar toast (fetch real)
                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          toast.success('Cambios guardados correctamente', {
                            position: 'top-center',
                            className: 'justify-center',
                          });

                          setDisableInput(true);
                          setIsSubmitButtonDisabled(true);
                          setIsButtonDisabled(true);
                        }
                      }, 100);
                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          onSubmit();
                        }
                      }, 1700);
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
