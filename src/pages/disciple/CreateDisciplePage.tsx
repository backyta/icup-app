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
// import { clsx } from 'clsx';

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
      // theirFamilyHouse: '',
      // theirPastor: '',
      // theirCopastor: '',
      // theirPreacher: '',
      // theirSupervisor: '',
    },
  });
  const roles = form.watch('roles');
  console.log(roles);

  // TODO : terminar el responsive, yamnio de letras
  // TODO : Eliminar y ordenar Crear pastores, copastorews y lideres.
  // TODO : ver si los lideres tmb pueden ser tesoreros y asignarles un copastor y de los preacher sacar su copastor del superviosr
  // TODO : revisr si el supervisor necesita una zona a su cargo (se puiede cambiar, asi como la casa a sui cargo del predicador)
  const handleSubmit = (values: z.infer<typeof formSchema>): void => {
    console.log({ values });
  };

  return (
    <div>
      <h1 className='text-center p-2 md:p-4 font-sans text-2xl sm:text-3xl font-bold text-blue-600 text-[2rem] sm:text-[2.4rem] md:text-[2.6rem] lg:text-5xl xl:text-5xl'>
        Modulo Discípulo
      </h1>

      <hr className='p-[0.02rem] bg-slate-500' />

      <h1 className='text-center p-2 md:p-4 font-sans text-2xl sm:text-2xl font-bold text-green-600 text-[1.5rem] sm:text-[2.0rem] md:text-[2.2rem] lg:text-4xl xl:text-4xl'>
        Crear un nuevo discípulo
      </h1>
      <p className='text-center font-sans text-sm sm:text-md font-bold px-4 lg:text-base xl:text-lg'>
        Hola, por favor llena los siguientes datos para crear un nuevo
        discípulo.
      </p>

      <div className='flex min-h-screen flex-col items-center justify-between px-10 py-10 2xl:px-36 2xl:py-12'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            // className='max-w-md w-full flex flex-col gap-4'
            className='w-full grid grid-cols-2 gap-y-8 gap-x-10'
          >
            <div className='col-start-1 col-end-2'>
              <legend className='font-bold text-lg'>Datos generales</legend>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel>Nombres</FormLabel>
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
                      <FormLabel>Apellidos</FormLabel>
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
                    <FormLabel>Fecha de Nacimiento</FormLabel>
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
                              <span>Fecha de nacimiento del miembro</span>
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
                    <FormDescription className='pl-3 text-blue-600 font-bold'>
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
                      <FormLabel>Genero</FormLabel>
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
                      <FormLabel>Estado Civil</FormLabel>
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
                    <FormItem className='mt-3'>
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
                    <FormLabel>Fecha de conversión</FormLabel>
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
                              <span>Fecha de conversion del miembro</span>
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
                    <FormDescription className='pl-3 text-blue-600 font-bold'>
                      * Fecha en la que el creyente se convirtió.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-start-2 col-end-3'>
              <legend className='font-bold text-lg'>Contacto / Vivienda</legend>
              <FormField
                control={form.control}
                name='emailAddress'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel>E-mail</FormLabel>
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
                      <FormLabel>Numero de Teléfono</FormLabel>
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
                      <FormLabel>País de Origen</FormLabel>
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
                      <FormLabel>Departamento</FormLabel>
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
                      <FormLabel>Provincia</FormLabel>
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
                      <FormLabel>Distrito</FormLabel>
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
                      <FormLabel>Dirección</FormLabel>
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
            <div className='col-start-1 col-end-2 row-start-2 row-end-3 h-auto'>
              <FormField
                control={form.control}
                name='roles'
                render={() => (
                  <FormItem>
                    <div className='mb-4'>
                      <FormLabel className='font-bold text-lg'>Roles</FormLabel>
                      <FormDescription>
                        Seleccione los roles que desea asignar al miembro
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
                              <FormLabel className='text-sm font-normal'>
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
            <div className='col-start-2 col-end-3 row-start-2 row-end-3'>
              <legend className='font-bold col-start-1 col-end-3 text-lg'>
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
                          <FormLabel>Pastor</FormLabel>
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
              {roles?.includes(MemberRoles.member) &&
                roles?.includes(MemberRoles.supervisor) &&
                !roles?.includes(MemberRoles.pastor) &&
                !roles?.includes(MemberRoles.copastor) &&
                !roles?.includes(MemberRoles.preacher) &&
                !roles?.includes(MemberRoles.treasurer) && (
                  <FormField
                    control={form.control}
                    name='theirCopastor'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Co-Pastor</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Selecciona un Co-Pastor para asignar al miembro' />
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
                roles?.includes(MemberRoles.preacher)) ||
                roles?.includes(MemberRoles.treasurer)) &&
                !roles?.includes(MemberRoles.pastor) &&
                !roles?.includes(MemberRoles.copastor) &&
                !roles?.includes(MemberRoles.supervisor) && (
                  <FormField
                    control={form.control}
                    name='theirSupervisor'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Supervisor</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Selecciona un Supervisor para asignar al miembro' />
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
                          <FormLabel>Casa Familiar</FormLabel>
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
              <p className='mt-4 font-bold text-sm text-blue-600'>
                Consideraciones
              </p>
              <ul className=' text-sm text-red-500 font-medium '>
                <li>*No se permite asignar mas de 4 roles*</li>
                <li>
                  *Para asignar rol Tesorero se debe asignar rol Predicador o
                  Supervisor*
                </li>
                <li>*El rol Member es obligatorio*</li>
              </ul>
            </div>
            <div className='col-start-1 col-end-3 row-start-3 row-end-4 w-60 m-auto 2xl:w-80'>
              <Button type='submit' className='w-full'>
                Registrar miembro
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
