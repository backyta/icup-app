/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import type * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from '@/components/ui/select';

import { es } from 'date-fns/locale';
import { formMemberSchema } from '../../validations/form-member-schema';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';

import { Checkbox } from '@/components/ui/checkbox';
import { MemberRoles, memberRoleNames } from '@/enums/member-roles.enum';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
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

export const DiscipleCreatePage = (): JSX.Element => {
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

  const currentPath = window.location.pathname;
  const disciple = 'discípulo';
  const pastor = 'pastor';
  const copastor = 'co-pastor';
  const leader = 'líder';

  let subTitleValue;
  let disabledRoles: string[];

  if (currentPath === '/disciples/create-disciple') {
    subTitleValue = disciple;
    disabledRoles = [
      'pastor',
      'copastor',
      'supervisor',
      'preacher',
      'treasurer',
    ];
  } else if (currentPath === '/pastors/create-pastor') {
    subTitleValue = pastor;
    disabledRoles = ['copastor', 'supervisor', 'preacher', 'treasurer'];
  } else if (currentPath === '/copastors/create-copastor') {
    subTitleValue = copastor;
    disabledRoles = ['pastor', 'supervisor', 'preacher', 'treasurer'];
  } else if (currentPath === '/leaders/create-leader') {
    subTitleValue = leader;
    disabledRoles = ['pastor', 'copastor'];
  }

  const roles = form.watch('roles');

  const handleSubmit = (values: z.infer<typeof formMemberSchema>): void => {
    console.log({ values });
  };

  return (
    <div>
      {currentPath === '/disciples/create-disciple' && (
        <h1 className='text-center pt-1 pb-4 font-sans text-2xl sm:text-3xl font-bold text-blue-500 text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
          Modulo Discípulo
        </h1>
      )}
      {currentPath === '/pastors/create-pastor' && (
        <h1 className='text-center pt-1 pb-4 font-sans text-2xl sm:text-3xl font-bold text-pastor-color text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
          Modulo Pastor
        </h1>
      )}
      {currentPath === '/copastors/create-copastor' && (
        <h1 className='text-center pt-1 pb-4 font-sans text-2xl sm:text-3xl font-bold text-copastor-color text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
          Modulo Co-Pastor
        </h1>
      )}
      {currentPath === '/leaders/create-leader' && (
        <h1 className='text-center pt-1 pb-4 font-sans text-2xl sm:text-3xl font-bold text-leader-color text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
          Modulo Líder
        </h1>
      )}

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h2 className='text-left px-4 py-2 sm:px-5 sm:pt-4 sm:pb-2 2xl:px-24 2xl:pt-4 font-sans text-2xl sm:text-2xl font-bold text-green-500 text-[1.55rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.9rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Crear un nuevo {subTitleValue}
      </h2>

      <p className='dark:text-slate-300 text-left font-sans font-bold px-4 sm:px-5 text-sm md:text-[15px] xl:text-base 2xl:px-24'>
        Por favor llena los siguientes datos para crear un nuevo {subTitleValue}
        .
      </p>

      <div className='flex min-h-screen flex-col items-center justify-between px-8 py-6 sm:px-6 sm:py-10 xl:px-20 2xl:px-36 2xl:py-12'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='w-full grid gap-y-6 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-10'
          >
            <div className='sm:col-start-1 sm:col-end-2'>
              <legend className='font-bold text-md lg:text-lg xl:text-xl'>
                Datos generales
              </legend>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-sm xl:text-[15px]'>
                        Nombres
                      </FormLabel>
                      <FormControl>
                        <Input
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-sm xl:text-[15px]'>
                        Apellidos
                      </FormLabel>
                      <FormControl>
                        <Input
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
                name='originCountry'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-sm xl:text-[15px]'>
                        País de Origen
                      </FormLabel>
                      <FormControl>
                        <Input
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
                  <FormItem className='flex flex-col mt-4'>
                    <FormLabel className='text-sm xl:text-[15px]'>
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
                              format(field.value, 'LLL dd, y', { locale: es })
                            ) : (
                              <span className='text-sm md:text-[12px] lg:text-sm'>
                                Fecha de nacimiento del miembro
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
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className='pl-3 text-blue-600 text-[12px] lg:text-sm font-bold'>
                      * Su fecha de nacimiento se utiliza para calcular su edad.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-sm xl:text-[15px]'>
                        Genero
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Selecciona un tipo de genero' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='male'>Masculino</SelectItem>
                          <SelectItem value='female'>Femenino</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {/* //TODO agregar busqueda por lupa en las relaciones de roles y en casa familiar */}
              <FormField
                control={form.control}
                name='maritalStatus'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-sm xl:text-[15px]'>
                        Estado Civil
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Selecciona un tipo de estado civil' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='single'>Soltero</SelectItem>
                          <SelectItem value='married'>Casado</SelectItem>
                          <SelectItem value='widowed'>Viudo</SelectItem>
                          <SelectItem value='divorced'>Divorciado</SelectItem>
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
                    <FormItem className='text-sm xl:text-[15px] mt-3'>
                      <FormLabel>Numero de hijos</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Cantidad de hijos'
                          // type='number'
                          // min='0'
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
                  <FormItem className='flex flex-col mt-4'>
                    <FormLabel className='text-sm xl:text-[15px]'>
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
                              format(field.value, 'PPP')
                            ) : (
                              <span className='text-sm md:text-[12px] lg:text-sm'>
                                Fecha de conversion del miembro
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
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className='pl-3 text-blue-600 text-[12px] lg:text-sm font-bold'>
                      * Fecha en la que el creyente se convirtió.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='sm:col-start-2 sm:col-end-3'>
              <legend className='font-bold text-md lg:text-lg xl:text-xl'>
                Contacto / Vivienda
              </legend>

              <FormField
                control={form.control}
                name='emailAddress'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-sm xl:text-[15px]'>
                        E-mail
                      </FormLabel>
                      <FormControl>
                        <Input
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-sm xl:text-[15px]'>
                        Numero de Teléfono
                      </FormLabel>
                      <FormControl>
                        <Input
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-sm xl:text-[15px]'>
                        País
                      </FormLabel>
                      <FormDescription className='text-[13px] lg:text-sm'>
                        País en el que reside el miembro.
                      </FormDescription>
                      <FormControl>
                        <Input
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-sm xl:text-[15px]'>
                        Departamento
                      </FormLabel>
                      <FormControl>
                        <Input
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-sm xl:text-[15px]'>
                        Provincia
                      </FormLabel>
                      <FormControl>
                        <Input
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-sm xl:text-[15px]'>
                        Distrito
                      </FormLabel>
                      <FormControl>
                        <Input
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-sm xl:text-[15px]'>
                        Dirección
                      </FormLabel>
                      <FormControl>
                        <Input
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
            <div className='sm:col-start-1 sm:col-end-2 sm:row-start-2 sm:row-end-3 h-auto'>
              <FormField
                control={form.control}
                name='roles'
                render={() => (
                  <FormItem>
                    <div className='mb-4'>
                      <FormLabel className='font-bold text-md lg:text-lg xl:text-xl'>
                        Roles
                      </FormLabel>
                      <FormDescription className='font-medium text-sm xl:text-[15px]'>
                        Seleccione los roles que desea asignar al miembro.
                      </FormDescription>
                    </div>
                    {Object.values(MemberRoles).map((role) => (
                      <FormField
                        key={role}
                        control={form.control}
                        name='roles'
                        render={({ field }) => {
                          const isDisabled = disabledRoles.includes(role);
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
                                {memberRoleNames[role]}
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
            <div className='sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:row-end-3'>
              <legend className='font-bold col-start-1 col-end-3 text-md lg:text-lg xl:text-xl'>
                Relaciones
              </legend>
              {/* Validations */}
              {roles?.includes(MemberRoles.member) &&
                roles?.includes(MemberRoles.pastor) &&
                !roles?.includes(MemberRoles.copastor) &&
                !roles?.includes(MemberRoles.supervisor) &&
                !roles?.includes(MemberRoles.preacher) &&
                !roles?.includes(MemberRoles.treasurer) && (
                  <span className='text-green-500 font-bold'>
                    No hay relaciones que asignar para estos roles elegidos.
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
                          <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                            Pastor
                          </FormLabel>
                          <FormDescription className='text-sm lg:text-[15px]'>
                            Seleccione un pastor para esta relación.
                          </FormDescription>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant='outline'
                                  role='combobox'
                                  className={cn(
                                    'w-full justify-between overflow-hidden',
                                    !field.value && 'text-slate-500 font-normal'
                                  )}
                                >
                                  {field.value
                                    ? pastors.find(
                                        (pastor) => pastor.value === field.value
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
                        <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                          Co-Pastor
                        </FormLabel>
                        <FormDescription className='text-sm lg:text-[15px]'>
                          Seleccione un co-pastor para esta relación.
                        </FormDescription>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between overflow-hidden',
                                  !field.value && 'text-slate-500 font-normal'
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
                        <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                          Supervisor
                        </FormLabel>
                        <FormDescription className='text-sm lg:text-[15px]'>
                          Seleccione un supervisor para esta relación.
                        </FormDescription>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between overflow-hidden',
                                  !field.value && 'text-slate-500 font-normal'
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
                          <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                            Casa Familiar
                          </FormLabel>
                          <FormDescription className='text-sm lg:text-[15px]'>
                            Seleccione una casa familiar para esta relación.
                          </FormDescription>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant='outline'
                                  role='combobox'
                                  className={cn(
                                    'w-full justify-between overflow-hidden',
                                    !field.value && 'text-slate-500 font-normal'
                                  )}
                                >
                                  {field.value
                                    ? familyHouses.find(
                                        (familyHouse) =>
                                          familyHouse.value === field.value
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
              <p className='mt-4 font-bold text-[14px] 2xl:text-[15.5px] text-blue-600'>
                Consideraciones
              </p>
              <ul className='text-[13px] 2xl:text-[14px] text-red-500 font-medium '>
                <li>*No se permite asignar mas de 3 roles.</li>
                <li>
                  *Para asignar rol Tesorero se debe asignar rol Predicador o
                  Supervisor.
                </li>
                <li>*El rol Member es obligatorio.</li>
              </ul>
            </div>
            <div className='sm:col-start-1 sm:col-end-3 sm:row-start-3 sm:row-end-4 w-60 m-auto 2xl:w-80'>
              <Button
                type='submit'
                className='w-full text-sm md:text-base xl:text-lg'
              >
                Registrar miembro
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
