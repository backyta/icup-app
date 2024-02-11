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
import { toast } from '@/components/ui/use-toast';
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
      numberChildren: 0,
      department: '',
      province: '',
      district: '',
      address: '',
      their_family_home: '',
      their_pastor: '',
      their_copastor: '',
      their_preacher: '',
      // accountType: '',
      companyName: '',
    },
  });

  const accountType = form.watch('accountType');

  const handleSubmit = (values: z.infer<typeof formSchema>): void => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    console.log({ values });
  };

  return (
    <>
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

      <div className='flex min-h-screen flex-col items-center justify-between px-24 py-10'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='max-w-md w-full flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => {
                return (
                  <FormItem>
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
                  <FormItem>
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
                <FormItem className='flex flex-col'>
                  <FormLabel>Date of birth</FormLabel>
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
              name='emailAddress'
              render={({ field }) => {
                return (
                  <FormItem>
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
              name='gender'
              render={({ field }) => {
                return (
                  <FormItem>
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
                  <FormItem>
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
              name='phoneNumber'
              render={({ field }) => {
                return (
                  <FormItem>
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
              name='conversionDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
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
                  <FormDescription className='pl-3 text-green-600 font-bold'>
                    * Fecha en la que el creyente se convirtió.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='numberChildren'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Numero de hijos</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='País de origen del miembro'
                        type='number'
                        min='0'
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
                  <FormItem>
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
                  <FormItem>
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
                  <FormItem>
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
              name='address'
              render={({ field }) => {
                return (
                  <FormItem>
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
            <FormField
              control={form.control}
              name='roles'
              render={() => (
                <FormItem>
                  <div className='mb-4'>
                    <FormLabel className='text-base'>Sidebar</FormLabel>
                    <FormDescription>
                      Select the items you want to display in the sidebar.
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
            {accountType === 'company' && (
              <FormField
                control={form.control}
                name='companyName'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Company name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}
            <Button type='submit' className='w-full'>
              Registrar miembro
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
