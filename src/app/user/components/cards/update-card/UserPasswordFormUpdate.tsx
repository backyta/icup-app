/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from 'react';

import { type z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useUserUpdatePasswordSubmitButtonLogic } from '@/app/user/hooks';

import { updateUser } from '@/app/user/services';
import { userPasswordUpdateFormSchema } from '@/app/user/validations';

import { type ErrorResponse } from '@/shared/interfaces';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';

interface UserFormPasswordUpdateProps {
  id: string;
  onSubmit: () => void;
  onScroll: () => void;
}

export const UserPasswordFormUpdate = ({
  id,
  onSubmit,
  onScroll,
}: UserFormPasswordUpdateProps): JSX.Element => {
  //* States
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState<boolean>(false);

  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);

  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);
  const [isMessageErrorPasswordDisabled, setIsMessageErrorPasswordDisabled] =
    useState<boolean>(true);

  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* Form
  const form = useForm<z.infer<typeof userPasswordUpdateFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(userPasswordUpdateFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  //* Password Handler
  const toggleShowCurrentPassword = (): void => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = (): void => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowNewPasswordConfirm = (): void => {
    setShowNewPasswordConfirm(!showNewPasswordConfirm);
  };

  useUserUpdatePasswordSubmitButtonLogic({
    formUpdatePasswordUser: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
    setIsMessageErrorPasswordDisabled,
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
  const handleSubmit = (formData: z.infer<typeof userPasswordUpdateFormSchema>): void => {
    mutation.mutate({
      id,
      formData: {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      },
    });
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[420px] md:w-[480px] lg:w-[440px] xl:w-[530px]'
    >
      <h2 className='text-center text-purple-500 pb-2 font-bold text-[20px] md:text-[24px]'>
        Actualizar contraseña
      </h2>

      <TabsContent value='general-info' className='overflow-y-auto'>
        <Card className='w-full'>
          <CardContent className='py-4 px-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-full flex flex-col gap-x-10 gap-y-3 md:gap-y-5 px-2 sm:px-10'
              >
                <FormField
                  control={form.control}
                  name='currentPassword'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Contraseña Actual
                        </FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              disabled={isInputDisabled}
                              placeholder='Escribe tu contraseña actual...'
                              autoComplete='new-password'
                              type={showCurrentPassword ? 'text' : 'password'}
                              {...field}
                            />
                            <button
                              className='absolute right-2 top-3 z-10'
                              type='button'
                              onClick={toggleShowCurrentPassword}
                            >
                              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name='newPassword'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Contraseña Nueva
                        </FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              disabled={isInputDisabled}
                              placeholder='Escribe tu contraseña nueva...'
                              autoComplete='new-password'
                              type={showNewPassword ? 'text' : 'password'}
                              {...field}
                            />
                            <button
                              className='absolute right-2 top-3 z-10'
                              type='button'
                              onClick={toggleShowNewPassword}
                            >
                              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name='newPasswordConfirm'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Confirmar Contraseña Nueva
                        </FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              disabled={isInputDisabled}
                              placeholder='Confirma tu contraseña nueva...'
                              autoComplete='new-password'
                              type={showNewPasswordConfirm ? 'text' : 'password'}
                              {...field}
                            />
                            <button
                              className='absolute right-2 top-3 z-10'
                              type='button'
                              onClick={toggleShowNewPasswordConfirm}
                            >
                              {showNewPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                        {(form.formState.errors.newPassword ||
                          form.formState.errors.newPasswordConfirm) && (
                          <div className='text-red-500 font-medium text-[12px] md:text-[13px]'>
                            <ul className='pl-2'>
                              <li className='pl-2 text-white'>✅ Al menos un dígito.</li>
                              <li className='pl-2 text-white'>✅ No espacios en blanco.</li>
                              <li className='pl-2 text-white'>✅ Al menos 1 carácter especial.</li>
                              <li className='pl-2 text-white'>
                                ✅ Mínimo 8 caracteres y máximo 15 caracteres.
                              </li>
                              <li className='pl-2 text-white'>
                                ✅ Al menos una letra mayúscula y al menos una letra minúscula.
                              </li>
                            </ul>
                          </div>
                        )}
                      </FormItem>
                    );
                  }}
                />

                {isMessageErrorDisabled ? (
                  <p className='-mb-2 md:-mb-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                    ❌ Datos incompletos, completa todos los campos para actualizar el registro.
                  </p>
                ) : isMessageErrorPasswordDisabled ? (
                  <p className='-mb-2 md:-mb-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                    ❌ Las contraseñas deben coincidir.
                  </p>
                ) : (
                  <p className='-mt-1 order-last md:-mt-3 md:row-start-6 md:row-end-7 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
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
                          setIsSubmitButtonDisabled(true);
                          setIsInputDisabled(true);
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
