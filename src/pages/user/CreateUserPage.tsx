/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
// import { userSchema } from '../../validations/user-schema';
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

import { userSchema } from '@/validations/user-schema';
import { UserRoles, userRoleNames } from '@/enums/user-roles.enum';
import { Checkbox } from '@/components/ui/checkbox';

// import * as z from 'zod';

export const CreateUserPage = (): JSX.Element => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof userSchema>): void => {
    console.log({ values });
  };

  return (
    <>
      <h1 className='text-center pb-4 pt-1 font-sans text-2xl sm:text-3xl font-bold text-user-color text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Usuario
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h1 className='text-left px-4 py-2 sm:px-10 sm:pt-4 sm:pb-1 2xl:text-center 2xl:pt-4 font-sans font-bold text-green-500 text-[1.6rem] sm:text-[2.0rem] md:text-[1.75rem] lg:text-[1.95rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Crear un nuevo usuario
      </h1>
      <p className='dark:text-slate-300 text-left font-sans text-[14px] font-bold px-4 sm:px-10 text-sm md:text-[15px] xl:text-base 2xl:text-center'>
        Por favor llena los siguientes datos para crear un nuevo usuario.
      </p>

      <div className='flex min-h-screen flex-col items-center justify-between px-8 py-4 sm:px-10 sm:py-6 2xl:px-36 2xl:py-10'>
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
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Nombres
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nombres del usuario'
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
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Apellidos
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Apellidos del usuario'
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
              name='emailAddress'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Correo Electrónico
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Dirección de correo electrónico'
                        type='email'
                        // autoComplete='username'
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
              name='password'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Contraseña'
                        // autoComplete='new-password'
                        type='password'
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
              name='passwordConfirm'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Confirmar Contraseña
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Confirmar contraseña'
                        // autoComplete='new-password'
                        type='password'
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
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-[17px] font-bold'>
                      Roles
                    </FormLabel>
                    <FormDescription className='text-slate-600 font-medium text-sm lg:text-[15px]'>
                      Seleccione los roles de acceso que tendrá el usuario.
                    </FormDescription>
                  </div>
                  {Object.values(UserRoles).map((role) => (
                    <FormField
                      key={role}
                      control={form.control}
                      name='roles'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={role}
                            className='flex flex-row items-center space-x-3 space-y-0'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(role)}
                                onCheckedChange={(checked) => {
                                  let updatedRoles: UserRoles[] = [];
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
                            <FormLabel className='text-sm lg:text-[15px] font-normal'>
                              {userRoleNames[role]}
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
            <Button
              type='submit'
              className='w-full text-sm md:text-base xl:text-lg mt-12'
            >
              Registrar Usuario
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
