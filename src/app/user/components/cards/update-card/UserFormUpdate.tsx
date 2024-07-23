/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useEffect } from 'react';

import { type z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useUserUpdateSubmitButtonLogic } from '@/app/user/hooks';

import { updateUser } from '@/app/user/services';
import { userFormSchema } from '@/app/user/validations';
import { FormUserSkeleton } from '@/app/user/components';
import { type UserResponse } from '@/app/user/interfaces';
import { UserRoleNames, UserRole } from '@/app/user/enums';

import { GenderNames } from '@/shared/enums';
import { type ErrorResponse } from '@/shared/interfaces';

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';

interface UserFormUpdateProps {
  id: string;
  onSubmit: () => void;
  onScroll: () => void;
  data: UserResponse | undefined;
}

export const UserFormUpdate = ({
  id,
  onSubmit,
  onScroll,
  data,
}: UserFormUpdateProps): JSX.Element => {
  //* States
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);
  const [isLoadingData, setIsLoadingData] = useState(true);

  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* Form
  const form = useForm<z.infer<typeof userFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      roles: [],
      recordStatus: '',
    },
  });

  //* Custom hooks
  useEffect(() => {
    form.setValue('firstName', data?.firstName ?? '');
    form.setValue('lastName', data?.lastName ?? '');
    form.setValue('gender', data?.gender ?? '');
    form.setValue('email', data?.email ?? '');
    form.setValue('roles', data?.roles as UserRole[]);
    form.setValue('recordStatus', data?.recordStatus);

    setTimeout(() => {
      setIsLoadingData(false);
    }, 1200);
  }, []);

  useUserUpdateSubmitButtonLogic({
    formUpdateUser: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
    isInputDisabled,
  });

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: updateUser,
    onError: (error: ErrorResponse) => {
      if (error.message !== 'Unauthorized') {
        toast.error(error.message, {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          setIsInputDisabled(false);
          setIsSubmitButtonDisabled(false);
        }, 1500);
      }

      if (error.message === 'Unauthorized') {
        toast.error('Operación rechazada, el token expiro ingresa nuevamente.', {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          navigate('/');
        }, 3500);
      }
    },
    onSuccess: () => {
      toast.success('Cambios guardados correctamente', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        onScroll();
      }, 150);

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['users-by-term'] });
      }, 500);

      setTimeout(() => {
        onSubmit();
        setIsInputDisabled(false);
      }, 1500);
    },
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof userFormSchema>): void => {
    mutation.mutate({
      id,
      formData: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        email: formData.email,
        roles: formData.roles,
      },
    });
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[830px] xl:w-[930px]'
    >
      <h2 className='text-center text-orange-500 pb-2 font-bold text-[20px] md:text-[24px]'>
        Actualizar información del Usuario
      </h2>

      <TabsContent value='general-info' className='overflow-y-auto'>
        <Card className='w-full'>
          {isLoadingData && <FormUserSkeleton />}

          {!isLoadingData && (
            <CardContent className='py-4 px-4'>
              <div className='dark:text-slate-300 text-slate-500 font-bold text-[16px] mb-4 pl-4'>
                Usuario: {data?.firstName} {data?.lastName}
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='w-full flex flex-col md:grid gap-x-10 gap-y-3 md:gap-y-5 px-2 sm:px-10'
                >
                  <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field }) => {
                      return (
                        <FormItem className='xl:w-[24rem]'>
                          <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                            Nombres
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isInputDisabled}
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
                          <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                            Apellidos
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isInputDisabled}
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
                    name='gender'
                    render={({ field }) => {
                      return (
                        <FormItem className=''>
                          <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                            Género
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={isInputDisabled}
                          >
                            <FormControl>
                              <SelectTrigger>
                                {field.value ? (
                                  <SelectValue placeholder='Selecciona el tipo de género' />
                                ) : (
                                  'Selecciona el tipo de género'
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
                    name='email'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                            Correo Electrónico
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isInputDisabled}
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
                    name='recordStatus'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className='text-[14px]'>Estado</FormLabel>
                          <Select disabled={isInputDisabled} onValueChange={field.onChange}>
                            <FormControl className='text-[13px] md:text-[14px]'>
                              <SelectTrigger>
                                {field.value === 'active' ? (
                                  <SelectValue placeholder='Activo' />
                                ) : (
                                  <SelectValue placeholder='Inactivo' />
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem className='text-[13px] md:text-[14px]' value='active'>
                                Activo
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {form.getValues('recordStatus') === 'active' && (
                            <FormDescription className='pl-2 text-[12px] xl:text-[13px] font-bold'>
                              *El registro esta <span className='text-green-500'>activo</span>, para
                              colocar nuevamente como <span className='text-red-500'>inactivo</span>{' '}
                              eliminar el registro desde la pestaña{' '}
                              <span className='font-bold text-red-500'>Eliminar Usuario.</span>
                            </FormDescription>
                          )}
                          {form.getValues('recordStatus') === 'inactive' && (
                            <FormDescription className='pl-2 text-[12px] xl:text-[13px] font-bold'>
                              * El registro esta <span className='text-red-500'>inactivo</span>,
                              puede modificar el estado eligiendo otra opción.
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name='roles'
                    render={() => (
                      <FormItem className='md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4 mb-3 md:mb-0'>
                        <div className='mb-4'>
                          <FormLabel className='text-[14px] sm:text-[15px] lg:text-[17px] font-bold'>
                            Roles
                          </FormLabel>
                          <FormDescription className='text-slate-600 font-medium text-sm lg:text-[15px]'>
                            Seleccione los roles de acceso que tendrá el usuario.
                          </FormDescription>
                        </div>
                        {Object.values(UserRole).map((role) => (
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
                                      disabled={isInputDisabled}
                                      checked={field.value?.includes(role)}
                                      onCheckedChange={(checked) => {
                                        let updatedRoles: UserRole[] = [];
                                        checked
                                          ? (updatedRoles = field.value
                                              ? [...field.value, role]
                                              : [role])
                                          : (updatedRoles =
                                              field.value?.filter((value) => value !== role) ?? []);

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

                  {isMessageErrorDisabled ? (
                    <p className='-mb-2 md:-mb-3 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                      ❌ Datos incompletos, completa todos los campos para guardar el registro.
                    </p>
                  ) : (
                    <p className='-mt-1 order-last md:-mt-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                      ¡Campos completados correctamente! <br /> Para finalizar por favor guarde los
                      cambios.
                    </p>
                  )}

                  <div className='w-full md:w-[20rem] md:mx-auto col-start-1 col-end-3 text-sm md:text-md xl:text-base'>
                    <Button
                      disabled={isSubmitButtonDisabled}
                      type='submit'
                      className='w-full text-[14px]'
                      onClick={() => {
                        setTimeout(() => {
                          if (Object.keys(form.formState.errors).length === 0) {
                            setIsInputDisabled(true);
                            setIsSubmitButtonDisabled(true);
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
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
};
