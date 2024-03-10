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
import { es } from 'date-fns/locale';
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { MaritalStatusNames, MemberRoleNames, MemberRoles } from '@/enums';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

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

// TODO : pasar la data de la consulta aca y que se renderize.

// NOTE : Colocar boton que diga promover miembro (a predicador), y auto seleccionar los campos o desabilitar, y colocar su nueva relacion.

export const FormMember = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formMemberSchema>>({
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

  if (currentPath === '/disciples/create-disciple') {
    disabledRoles = [
      'pastor',
      'copastor',
      'supervisor',
      'preacher',
      'treasurer',
    ];
  } else if (currentPath === '/pastors/create-pastor') {
    disabledRoles = ['copastor', 'supervisor', 'preacher', 'treasurer'];
  } else if (currentPath === '/copastors/create-copastor') {
    disabledRoles = ['pastor', 'supervisor', 'preacher', 'treasurer'];
  } else if (currentPath === '/leaders/create-leader') {
    disabledRoles = ['pastor', 'copastor'];
  }

  const handleSubmit = (values: z.infer<typeof formMemberSchema>): void => {
    console.log({ values });
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
                              className='text-[13px] xl:text-sm'
                              placeholder='Nombres del miembro'
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
                              className='text-[13px] xl:text-sm'
                              placeholder='Apellidos del miembro'
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
                          <Select onValueChange={field.onChange}>
                            <FormControl className='text-[13px] xl:text-sm'>
                              <SelectTrigger>
                                <SelectValue placeholder='Selecciona un tipo de genero' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem
                                className='text-[13px] xl:text-sm'
                                value='male'
                              >
                                Masculino
                              </SelectItem>
                              <SelectItem
                                className='text-[13px] xl:text-sm'
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
                              className='text-[13px] xl:text-sm'
                              placeholder='País de origen del miembro'
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
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
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
                                  <span className='text-[13px] xl:text-sm'>
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
                              onSelect={field.onChange}
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
                          <Select onValueChange={field.onChange}>
                            <FormControl className='text-[13px] xl:text-sm'>
                              <SelectTrigger>
                                <SelectValue placeholder='Selecciona un tipo de estado civil' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(MaritalStatusNames).map(
                                ([key, value]) => (
                                  <SelectItem
                                    className={`text-[13px] xl:text-sm`}
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
                              className='text-[13px] xl:text-sm'
                              placeholder='Cantidad de hijos'
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
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
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
                                  <span className='text-[13px] xl:text-sm'>
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
                              onSelect={field.onChange}
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
                              className='text-[13px] xl:text-sm'
                              placeholder='Dirección Email del miembro'
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
                              className='text-[13px] xl:text-sm'
                              placeholder='Numero de teléfono del miembro'
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
                              className='text-[13px] xl:text-sm'
                              placeholder='País de residencia del miembro'
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
                              className='text-[13px] xl:text-sm'
                              placeholder='Departamento en la que reside el miembro'
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
                              className='text-[13px] xl:text-sm'
                              placeholder='Provincia en la que reside el miembro'
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
                              className='text-[13px] xl:text-sm'
                              placeholder='Distrito en la que reside el miembro'
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
                              className='text-[13px] xl:text-sm'
                              placeholder='Dirección en la que reside el miembro'
                              type='text'
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
                                  <FormLabel className='lg:text-[15px] font-normal'>
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
                        <span className='text-green-500 font-bold text-[13px] md:text-[14px]'>
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
                                <FormDescription className='text-[13px] lg:text-[14px]'>
                                  Seleccione un pastor para esta relación.
                                </FormDescription>
                                <Popover open={open} onOpenChange={setOpen}>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant='outline'
                                        role='combobox'
                                        className={cn(
                                          'w-full justify-between overflow-hidden text-[13px] xl:text-sm',
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
                                  <PopoverContent className='mr-30 w-[20rem] p-2\'>
                                    <Command>
                                      <CommandInput
                                        placeholder='Busque un pastor...'
                                        className='h-9 text-sm lg:text-[15px]'
                                      />
                                      <CommandEmpty>
                                        Pastor no encontrado.
                                      </CommandEmpty>
                                      <CommandGroup className='max-h-[200px] h-auto'>
                                        {pastors.map((pastor) => (
                                          <CommandItem
                                            className='text-sm lg:text-[15px]'
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
                                        'w-full justify-between overflow-hidden text-[13px] xl:text-sm',
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
                                <PopoverContent className='mr-30 w-[20rem] p-2\'>
                                  <Command>
                                    <CommandInput
                                      placeholder='Busque un co-pastor...'
                                      className='h-9 text-sm lg:text-[15px]'
                                    />
                                    <CommandEmpty>
                                      Co-Pastor no encontrado.
                                    </CommandEmpty>
                                    <CommandGroup className='max-h-[200px] h-auto'>
                                      {copastors.map((copastor) => (
                                        <CommandItem
                                          className='text-sm lg:text-[15px]'
                                          value={copastor.label}
                                          key={copastor.value}
                                          onSelect={() => {
                                            form.setValue(
                                              'theirCopastor',
                                              copastor.value
                                            );
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
                                        'w-full justify-between overflow-hidden text-[13px] xl:text-sm',
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
                                <PopoverContent className='mr-30 w-[20rem] p-2\'>
                                  <Command>
                                    <CommandInput
                                      placeholder='Busque un supervisor...'
                                      className='h-9 text-sm lg:text-[15px]'
                                    />
                                    <CommandEmpty>
                                      Supervisor no encontrado.
                                    </CommandEmpty>
                                    <CommandGroup className='max-h-[200px] h-auto'>
                                      {supervisors.map((supervisor) => (
                                        <CommandItem
                                          className='text-sm lg:text-[15px]'
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
                                          'w-full justify-between overflow-hidden text-[13px] xl:text-sm',
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
                                  <PopoverContent className='mr-30 w-[20rem] p-2\'>
                                    <Command>
                                      <CommandInput
                                        placeholder='Busque una casa familiar...'
                                        className='h-9 text-sm lg:text-[15px]'
                                      />
                                      <CommandEmpty>
                                        Casa Familiar no encontrado.
                                      </CommandEmpty>
                                      <CommandGroup className='max-h-[200px] h-auto'>
                                        {familyHouses.map((familyHouse) => (
                                          <CommandItem
                                            className='text-sm lg:text-[15px]'
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
                  <div>
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
                  </div>
                  <Button
                    type='button'
                    className='w-full text-[14px] bg-yellow-400 text-yellow-700 hover:text-white hover:bg-yellow-500'
                  >
                    Promover de rango
                  </Button>
                </div>

                <div className='sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:row-end-3 w-full'>
                  <Button type='submit' className='w-full text-[14px]'>
                    Actualizar miembro
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
