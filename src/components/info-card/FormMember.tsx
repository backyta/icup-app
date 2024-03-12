/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Card, CardContent } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formMemberSchema } from '@/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

import { es } from 'date-fns/locale';
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  MaritalStatus,
  MaritalStatusNames,
  MemberRoleNames,
  MemberRoles,
} from '@/enums';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

const pastors = [
  { label: 'Michael Rodrigo Baca Angeles', value: 'id1' },
  { label: 'Carlos Ramiro Rodriguez Perez', value: 'id2' },
  { label: 'Daniel Romero Ventura Paredes', value: 'id3' },
] as const;

const copastors = [
  { label: 'Luz Maria Salgado Quito', value: 'id1' },
  { label: 'Mercedes Paula Pelayo Terrones', value: 'id2' },
  { label: 'Rosarios Agustina Rojas Prado', value: 'id3' },
] as const;

const supervisors = [
  { label: 'Luz Maria Salgado Quito', value: 'id1' },
  { label: 'Mercedes Paula Pelayo Terrones', value: 'id2' },
  { label: 'Rosarios Agustina Rojas Prado', value: 'id3' },
] as const;

const familyHouses = [
  { label: 'C-1 - Los Enviados de Jehová', value: 'id1' },
  { label: 'A-2 - Los Guardianes del Amor', value: 'id2' },
  { label: 'A-3 - Los Protectores del Hogar', value: 'id3' },
  { label: 'B-2 - La Familia Unida', value: 'id4' },
  { label: 'C-3 - Los Guardianes de la Luz', value: 'id5' },
  { label: 'A-1 - Los Guerreros de la Fe', value: 'id6' },
  { label: 'C-2 - La Casa del Amor Infinito', value: 'id7' },
  { label: 'A-4 - Los Mensajeros de la Paz', value: 'id8' },
  { label: 'C-4 - La Familia del Renacer', value: 'id9' },
  { label: 'B-1 - Los Hijos de la Esperanza', value: 'id10' },
] as const;

// TODO : Hacer una interface (transformar a array)
const data: any = {
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
  roles: [MemberRoles.member, MemberRoles.treasurer, MemberRoles.preacher],
  theirPastor: 'id1',
  theirCopastor: 'id2',
  theirSupervisor: 'id3',
  theirFamilyHouse: 'id2',
  isActive: 'active',
};

// NOTE : hacer llamado según el ID para traer la data

export const FormMember = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [openBirthDate, setOpenBirthDate] = useState(false);
  const [openConvertionDate, setOpenConvertionDate] = useState(false);

  const [disableInput, setDisableInput] = useState(false);

  const [lastValue, setLastValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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

  const roles = form.watch('roles');

  const currentPath = window.location.pathname;

  let disabledRoles: string[];

  // TODO : Revisar por rutas la de pastor, y los demás porque pastor no podrá subir de nivel.
  // NOTE : pulir todo aquí antes de extender a los demás módulos (terminar todos los todos).

  useEffect(() => {
    // Simula una consulta a la URL del backend
    for (const key in data) {
      form.setValue(key as any, data[key]);
    }
    // form.setValue('firstName', data.firstName);
    // form.setValue('lastName', data.lastName);
    // form.setValue('originCountry', data.originCountry);
    // form.setValue('dateBirth', data.dateBirth);
    // form.setValue('gender', data.gender);
    // form.setValue('maritalStatus', data.maritalStatus);
    // form.setValue('numberChildren', data.numberChildren);
    // form.setValue('conversionDate', data.conversionDate);
    // form.setValue('emailAddress', data.emailAddress);
    // form.setValue('phoneNumber', data.phoneNumber);
    // form.setValue('country', data.country);
    // form.setValue('department', data.department);
    // form.setValue('province', data.province);
    // form.setValue('district', data.district);
    // form.setValue('address', data.address);
    // form.setValue('roles', data.roles);
    // form.setValue('theirCopastor', data.theirCopastor);
    // form.setValue('theirPastor', data.theirPastor);
    // form.setValue('theirFamilyHouse', data.theirFamilyHouse);
    // form.setValue('theirSupervisor', data.theirSupervisor);
    // form.setValue('isActive', data.isActive);
  }, []); // solo necesita ejecutarse una vez no necesario

  const names = form.watch('firstName');

  //* setear el valor antiguo y compararlo con el nuevo
  useEffect(() => {
    const previousFirstName = lastValue;
    const currentFirstName = form.getValues('firstName');
    // console.log({ last: lastValue });
    // console.log({ new: form.getValues('firstName') });
    // Compara el valor actual con el valor anterior
    // console.log(isButtonDisabled);
    // TODO : hacer lo mismo para todos los inputs
    // TODO : lanzar mensaje que cuando se desactive el botón que guarde los cambios primero no se podrá promover
    // TODO : cuando el input tenga su mismo valor reactivar (esto seria muy difícil ya. intentar)

    // TODO : primero hacer para todos y ver la manera de volver activarlo si es la misma palabra o fecha

    // NOTE : tendría que crear un estado para el nombre fijo con el que se setae al comienzo
    // NOTE : y luego compararlo y poner a false el disabled (seria mas interactivo)
    // NOTE : mandar aviso que si se modifica algo se deberá guardar cambios antes de promover
    // NOTE : "Si los datos no son los mismo no se podra promover, guardar cambios y actualizar antes"
    // NOTE : "Si estas intentado actualizar datos del miembro no podras pormoverlo"
    if (previousFirstName !== '' && currentFirstName !== previousFirstName) {
      setIsButtonDisabled(true); // lo trae como esta en ese momento pero ya cambio a true
    }

    setLastValue(currentFirstName);
  }, [names]);

  // TODO : ver disables para offering. (no sera necesario?)

  if (currentPath === '/disciples/update-disciple' && !disableInput) {
    disabledRoles = [
      ...Object.values(MemberRoles).filter(
        (rol) => rol !== MemberRoles.treasurer
      ),
    ];
  } else if (
    currentPath === '/pastors/update-pastor' ||
    currentPath === '/copastors/update-copastor' ||
    currentPath === '/leaders/update-leader' ||
    disableInput
  ) {
    disabledRoles = [...Object.values(MemberRoles).filter((rol) => rol)];
  }

  const handleSubmit = (values: z.infer<typeof formMemberSchema>): void => {
    console.log({ values });
  };

  const handleChangeRoles = (): void => {
    // Borrar todos los roles
    form.setValue('theirCopastor', '');
    form.setValue('theirPastor', '');
    form.setValue('theirFamilyHouse', '');
    form.setValue('theirSupervisor', '');

    if (
      form.getValues('roles').includes(MemberRoles.member) &&
      !form.getValues('roles').includes(MemberRoles.preacher) &&
      !form.getValues('roles').includes(MemberRoles.supervisor) &&
      !form.getValues('roles').includes(MemberRoles.treasurer) &&
      !form.getValues('roles').includes(MemberRoles.copastor) &&
      !form.getValues('roles').includes(MemberRoles.pastor)
    ) {
      form.setValue('roles', [MemberRoles.member, MemberRoles.preacher]);
    } else if (
      form.getValues('roles').includes(MemberRoles.member) &&
      form.getValues('roles').includes(MemberRoles.preacher) &&
      !form.getValues('roles').includes(MemberRoles.treasurer) &&
      !form.getValues('roles').includes(MemberRoles.copastor) &&
      !form.getValues('roles').includes(MemberRoles.pastor) &&
      !form.getValues('roles').includes(MemberRoles.supervisor)
    ) {
      form.setValue('roles', [MemberRoles.member, MemberRoles.supervisor]);
    } else if (
      form.getValues('roles').includes(MemberRoles.member) &&
      form.getValues('roles').includes(MemberRoles.preacher) &&
      form.getValues('roles').includes(MemberRoles.treasurer) &&
      !form.getValues('roles').includes(MemberRoles.copastor) &&
      !form.getValues('roles').includes(MemberRoles.pastor) &&
      !form.getValues('roles').includes(MemberRoles.supervisor)
    ) {
      form.setValue('roles', [
        MemberRoles.member,
        MemberRoles.supervisor,
        MemberRoles.treasurer,
      ]);
    } else if (
      (form.getValues('roles').includes(MemberRoles.member) &&
        form.getValues('roles').includes(MemberRoles.supervisor) &&
        form.getValues('roles').includes(MemberRoles.treasurer) &&
        !form.getValues('roles').includes(MemberRoles.copastor) &&
        !form.getValues('roles').includes(MemberRoles.pastor) &&
        !form.getValues('roles').includes(MemberRoles.preacher)) ||
      (form.getValues('roles').includes(MemberRoles.member) &&
        form.getValues('roles').includes(MemberRoles.supervisor) &&
        !form.getValues('roles').includes(MemberRoles.preacher) &&
        !form.getValues('roles').includes(MemberRoles.treasurer) &&
        !form.getValues('roles').includes(MemberRoles.copastor) &&
        !form.getValues('roles').includes(MemberRoles.pastor))
    ) {
      form.setValue('roles', [MemberRoles.member, MemberRoles.copastor]);
    } else if (
      form.getValues('roles').includes(MemberRoles.member) &&
      form.getValues('roles').includes(MemberRoles.copastor)
    ) {
      form.setValue('roles', [MemberRoles.member, MemberRoles.pastor]);
    }

    setDisableInput(true);
    setIsButtonDisabled(true);
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[840px] xl:w-[960px] overflow-y-auto'
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-auto grid gap-y-6 sm:grid-cols-3 sm:gap-y-4 sm:gap-x-8'
              >
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
                          open={openBirthDate}
                          onOpenChange={setOpenBirthDate}
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
                                setOpenBirthDate(false);
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
                          open={openConvertionDate}
                          onOpenChange={setOpenConvertionDate}
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
                                setOpenConvertionDate(false);
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
                  {/* //NOTE : revisar después de ver el backend solo debería ser activo */}
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
                              <SelectItem
                                className='text-[12px] xl:text-[13px]'
                                value='inactive'
                              >
                                Inactivo
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
                        <span className='text-green-500 font-bold text-[13px] lg:text-[14px]'>
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
                                <Popover open={open} onOpenChange={setOpen}>
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
                                              setOpen(false);
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
                              <Popover open={open} onOpenChange={setOpen}>
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
                                            setOpen(false);
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
                              <Popover open={open} onOpenChange={setOpen}>
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
                                            setOpen(false);
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
                                <Popover open={open} onOpenChange={setOpen}>
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
                                              setOpen(false);
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
                  {disableInput &&
                    form.getValues('theirPastor') === '' &&
                    form.getValues('theirCopastor') === '' &&
                    form.getValues('theirSupervisor') === '' && (
                      <span className='text-[12px] md:text-[13px] text-center dark:text-yellow-500 text-red-500 font-medium'>
                        ! Por favor asigna la nueva relación para los roles
                        promovidos !
                      </span>
                    )}
                  {/* <div>
                    <p className='font-bold text-[14px] 2xl:text-[15.5px] text-blue-600'>
                      Consideraciones
                    </p>
                    <ul className='text-[12px] xl:text-[13px] text-red-500 font-medium'>
                      <li>*No se permite asignar mas de 3 roles.</li>
                      <li>
                        *Para asignar rol Tesorero se debe asignar rol
                        Predicador o Supervisor.
                      </li>
                      <li>*El rol Member es obligatorio.</li>
                    </ul>
                  </div> */}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={isButtonDisabled}
                        className='w-full text-[14px]  md:mt-[2rem] disabled:bg-slate-500 disabled:text-white bg-yellow-400 text-yellow-700 hover:text-white hover:bg-yellow-500'
                      >
                        Promover de cargo
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className='text-blue-500'>
                          ¿Estas seguro de promover a este miembro?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <span className='text-green-500 font-bold'>
                            Deberás hacer lo siguiente:
                          </span>
                          <br />
                          <span className='inline-block mb-2'>
                            ✔ Primero se deberá asignar nuevas relaciones según
                            el nuevo cargo y guardar estos datos para aplicar la
                            promoción.
                          </span>
                          <br />
                          <span className='text-red-500 font-bold'>
                            Después de hacer esto sucederá lo siguiente:
                          </span>
                          <br />
                          <span className='inline-block mb-1'>
                            ❌ Se borraran todas sus relaciones que tenia en el
                            anterior cargo.
                          </span>
                          <br />
                          <span className='inline-block mb-1'>
                            ❌ Si era Miembro y sube a Predicador(a) se
                            eliminara su relación con su casa familiar, y se le
                            asignara una nueva donde desempeñara su nuevo rol.
                          </span>
                          <br />
                          <span className='inline-block mb-1'>
                            ❌ Si era Predicador(a) y sube a Supervisor(a) se
                            borrara su relación con su casa familiar y sus
                            miembros, por lo que deberá asignar a otro
                            Predicador(a) para estos.
                          </span>
                          <br />
                          <span className='inline-block mb-1'>
                            ❌ Si era Supervisor(a) y sube a Co-pastor(a) se
                            borrara su relación con las zonas, casas,
                            predicadores y miembros que tenia a cargo, por lo
                            que se deberá asignar otro Supervisor(a) para todos
                            estos.
                          </span>
                          <br />
                          <span>
                            ❌ Si era Co-pastor(a) y sube a Pastor(a) se borrara
                            su relación con las zonas, casas, supervisores,
                            predicadores y miembros que englobaba su cargo, por
                            lo que se deberá asignar otro Co-pastor(a) para
                            todos estos.
                          </span>
                          <br />
                          <br />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleChangeRoles}>
                          Aceptar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {disableInput &&
                    (form.getValues('theirPastor') ||
                      form.getValues('theirCopastor') ||
                      form.getValues('theirSupervisor')) && (
                      <span className='text-[12px] md:text-[13px] text-green-500 font-bold text-center'>
                        !SE HA PROMOVIDO CORRECTAMENTE! <br />
                        <span className='dark:text-white text-black font-medium'>
                          Por favor guarde los cambios para finalizar.
                        </span>
                      </span>
                    )}
                </div>

                <div className='sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:row-end-3 w-full'>
                  <Toaster position='top-center' richColors />
                  <Button
                    type='submit'
                    className='w-full text-[14px]'
                    onClick={() => {
                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          toast.success('Cambios guardados correctamente', {
                            position: 'top-center',
                            className: 'justify-center',
                          });
                        }
                      }, 100);
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
