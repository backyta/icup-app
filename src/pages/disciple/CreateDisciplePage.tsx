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
import { formSchema } from '../../validations/form-schema';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';

import { Checkbox } from '@/components/ui/checkbox';
import { MemberRoles, roleNames } from '@/enums/member-roles.enum';

export const CreateDisciplePage = (): JSX.Element => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      originCountry: '',
      numberChildren: '',
      department: '',
      province: '',
      district: '',
      address: '',
    },
  });

  const roles = form.watch('roles');

  const handleSubmit = (values: z.infer<typeof formSchema>): void => {
    console.log({ values });
  };

  return (
    <div>
      <h1 className='text-center pb-4 spx-2 pt-2 lg:pt-4 p-4 font-sans text-2xl sm:text-3xl font-bold text-blue-500 text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Discípulo
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h1 className='text-left px-4 py-2 sm:px-10 sm:pt-4 sm:pb-2 2xl:px-24 2xl:pt-4 font-sans text-2xl sm:text-2xl font-bold text-green-500 text-[1.4rem] sm:text-[2.0rem] md:text-[1.65rem] lg:text-[1.8rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Crear un nuevo discípulo
      </h1>
      <p className='text-slate-500 text-left font-sans text-[13px] font-bold px-4 sm:px-10 sm:text-sm md:text-base  2xl:px-24'>
        Por favor llena los siguientes datos para crear un nuevo discípulo.
      </p>

      <div className='flex min-h-screen flex-col items-center justify-between px-6 py-6 sm:px-10 sm:py-10 2xl:px-36 2xl:py-12'>
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
                    <FormDescription className='pl-3 text-blue-500 text-[12px] sm:text-sm font-bold'>
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
                    <FormItem className='text-sm xl:text-[15px]'>
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
                    <FormDescription className='pl-3 text-blue-600 text-[12px] sm:text-sm  font-bold'>
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
                      <FormLabel className='text-sm 2xl:text-[15px]'>
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
                      <FormLabel className='text-sm 2xl:text-[15px]'>
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
                      <FormDescription className='text-slate-500 font-medium text-sm xl:text-[15px]'>
                        Seleccione los roles que desea asignar al miembro.
                      </FormDescription>
                    </div>
                    {Object.values(MemberRoles).map((role) => (
                      <FormField
                        key={role}
                        control={form.control}
                        name='roles'
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={role}
                              className='flex flex-row items-start space-x-3 space-y-0'
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(role)}
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
                                {roleNames[role]}
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
                        <FormItem>
                          <FormLabel className='text-sm md:text-[16px]'>
                            Pastor
                          </FormLabel>
                          <FormDescription>
                            Asignar relación para los roles escogidos.
                          </FormDescription>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Selecciona un Pastor para asignar al miembro' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='id'>Michael Baca</SelectItem>
                              <SelectItem value='id2'>Daniel Santos</SelectItem>
                              <SelectItem value='id3'>
                                Carlos Rosales
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
                      <FormItem>
                        <FormLabel className='text-sm md:text-[16px]'>
                          Co-Pastor
                        </FormLabel>
                        <FormDescription>
                          Asignar relación para los roles escogidos.
                        </FormDescription>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Selecciona un Co-Pastor para asignar al miembro' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='id'>Michael Baca</SelectItem>
                            <SelectItem value='id2'>Daniel Santos</SelectItem>
                            <SelectItem value='id3'>Carlos Rosales</SelectItem>
                          </SelectContent>
                        </Select>
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
                      <FormItem>
                        <FormLabel className='text-sm md:text-[16px]'>
                          Supervisor
                        </FormLabel>
                        <FormDescription>
                          Asignar relación para los roles escogidos.
                        </FormDescription>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Selecciona un Supervisor para asignar al miembro' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='id'>Michael Baca</SelectItem>
                            <SelectItem value='id2'>Daniel Santos</SelectItem>
                            <SelectItem value='id3'>Carlos Rosales</SelectItem>
                          </SelectContent>
                        </Select>
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
                        <FormItem>
                          <FormLabel className='text-sm md:text-[16px]'>
                            Casa Familiar
                          </FormLabel>
                          <FormDescription className='text-neutral-600 font-medium'>
                            Asignar relación para los roles escogidos.
                          </FormDescription>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Selecciona una Casa Familiar para asignar al miembro' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='id'>Michael Baca</SelectItem>
                              <SelectItem value='id2'>Daniel Santos</SelectItem>
                              <SelectItem value='id3'>
                                Carlos Rosales
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                )}
              <p className='mt-4 font-bold text-[14.5px] 2xl:text-[15.5px] text-blue-600'>
                Consideraciones
              </p>
              <ul className='text-sm 2xl:text-[15px] text-red-500 font-medium '>
                <li>*No se permite asignar mas de 4 roles*</li>
                <li>
                  *Para asignar rol Tesorero se debe asignar rol Predicador o
                  Supervisor*
                </li>
                <li>*El rol Member es obligatorio*</li>
              </ul>
            </div>
            <div className='sm:col-start-1 sm:col-end-3 sm:row-start-3 sm:row-end-4 w-60 m-auto 2xl:w-80'>
              <Button type='submit' className='w-full lg: text-md xl:text-lg'>
                Registrar miembro
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
