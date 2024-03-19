/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useEffect } from 'react';

// import { Toaster, toast } from 'sonner';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { UserRoleNames, UserRoles } from '@/enums';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Card, CardContent } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { userSchema } from '@/validations';
import { Checkbox } from '@/components/ui/checkbox';
import { type DataUserKeys, type UserData } from '@/interfaces';
import { Toaster, toast } from 'sonner';

// TODO : dependiendo de la ruta hacer fetch a cierto modulo

// NOTE : ver si se hace el fetch aquí o el UpdateCard.
// NOTE : hay que personalizar el aviso de promover según su pagina pastor , copastor, leader....
// NOTE : hacer llamado según el ID para traer la data

const data: UserData = {
  firstName: 'Kevin Michael',
  lastName: 'Baca Angeles',
  emailAddress: 'kevin.baca@icup.com',
  password: '123456',
  passwordConfirm: '123456',
  roles: [UserRoles.superUser],
};

// NOTE : ver si pasar mas props y colocar en interfaces folder
interface UserMemberProps {
  onSubmit: () => void;
}

//! Type el objeto a recibir desde el padre en una interface
export const FormUser = ({ onSubmit }: UserMemberProps): JSX.Element => {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const [disableInput, setDisableInput] = useState(false);

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

  //* Watchers
  const watchFirstName = form.watch('firstName');
  const watchTyLastName = form.watch('lastName');
  const watchTypeEmail = form.watch('emailAddress');
  const watchTypePassword = form.watch('password');
  const watchTypeConfirmPassword = form.watch('passwordConfirm');
  const watchTypeRoles = form.watch('roles');

  useEffect(() => {
    if (
      form.getValues('firstName') &&
      form.getValues('lastName') &&
      form.getValues('emailAddress') &&
      form.getValues('password') &&
      form.getValues('passwordConfirm') &&
      form.getValues('roles')
    ) {
      setIsSubmitButtonDisabled(false);
    }

    if (
      !form.getValues('firstName') ||
      !form.getValues('lastName') ||
      !form.getValues('emailAddress') ||
      !form.getValues('password') ||
      !form.getValues('passwordConfirm') ||
      !form.getValues('roles')
    ) {
      setIsSubmitButtonDisabled(true);
    }
  }, [
    watchFirstName,
    watchTyLastName,
    watchTypeEmail,
    watchTypePassword,
    watchTypeConfirmPassword,
    watchTypeRoles,
  ]);

  useEffect(() => {
    for (const key in data) {
      form.setValue(key as DataUserKeys, data[key as DataUserKeys]);
    }
  }, []);

  const handleSubmit = (values: z.infer<typeof userSchema>): void => {
    console.log({ values });
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-[440px] sm:w-[520px] md:w-[680px] lg:w-[890px] xl:w-[1000px] overflow-y-auto'
    >
      <TabsList className='grid w-full grid-cols-1 px-auto'>
        <TabsTrigger
          value='general-info'
          className='text-[14px] md:text-[15px]'
        >
          Actualizar información del usuario
        </TabsTrigger>
      </TabsList>

      <TabsContent value='general-info' className='overflow-y-auto'>
        <Card className='w-full'>
          <CardContent className='py-3 px-4'>
            {/* Aca podría ser un componente pasamos todos por props */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-full flex flex-col sm:grid sm:grid-cols-2 gap-y-6 gap-x-8 px-2 sm:px-8'
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
                            disabled={disableInput}
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
                            disabled={disableInput}
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
                            disabled={disableInput}
                            placeholder='Dirección de correo electrónico'
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
                  name='password'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                          Contraseña
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={disableInput}
                            placeholder='Contraseña'
                            autoComplete='new-password'
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
                            disabled={disableInput}
                            placeholder='Confirmar contraseña'
                            autoComplete='new-password'
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
                    <FormItem className='sm:col-start-1 sm:col-end-2 sm:row-start-3 sm:row-end-4'>
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
                                    disabled={disableInput}
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
                                  {UserRoleNames[role]}
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

                <div className='w-[20rem] mx-auto col-start-1 col-end-3 text-sm md:text-md xl:text-base mt-4'>
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
