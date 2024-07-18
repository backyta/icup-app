/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from 'react';

import type * as z from 'zod';
import { Toaster, toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { createUser } from '@/app/user/services';
import { userFormSchema } from '@/app/user/validations';
import { UserRole, UserRoleNames } from '@/app/user/enums';
import { useUserCreateSubmitButtonLogic } from '@/app/user/hooks';

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

export const UserCreatePage = (): JSX.Element => {
  //* States
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);

  const [isMessageErrorRolesDisabled, setIsMessageErrorRolesDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);
  const [isMessageErrorPasswordDisabled, setIsMessageErrorPasswordDisabled] =
    useState<boolean>(true);

  //* Form
  const form = useForm<z.infer<typeof userFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      password: '',
      passwordConfirm: '',
      roles: [],
    },
  });

  //* Library hooks
  const navigate = useNavigate();

  //* Password handler
  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordConfirm = (): void => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  //* Custom hooks
  useUserCreateSubmitButtonLogic({
    formCreateUser: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
    setIsMessageErrorPasswordDisabled,
    setIsMessageErrorRolesDisabled,
    isInputDisabled,
  });

  //* Mutation
  const mutation = useMutation({
    mutationFn: createUser,
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
      toast.success('Registro creado exitosamente.', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        setIsInputDisabled(false);
        setIsSubmitButtonDisabled(false);
      }, 1500);

      setTimeout(() => {
        form.reset();
      }, 1600);

      setTimeout(() => {
        navigate('/users');
      }, 2600);
    },
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof userFormSchema>): void => {
    console.log();
    mutation.mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      email: formData.email,
      password: formData.password,
      roles: formData.roles,
    });
  };

  return (
    <>
      <h1 className='text-center pt-1 md:pt-0 pb-1 font-sans font-bold text-user-color text-[2.1rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-[3rem]'>
        Modulo Usuario
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h1 className='text-left px-4 sm:px-5 pt-2 2xl:px-24 font-sans font-bold text-green-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.9rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Crear un nuevo usuario
      </h1>
      <p className='dark:text-slate-300 text-left font-sans text-[14px] font-bold px-4 sm:px-10 text-sm md:text-[15px] xl:text-base 2xl:text-center'>
        Por favor llena los siguientes datos para crear un nuevo usuario.
      </p>

      <div className='flex min-h-screen flex-col items-center justify-between px-8 py-4 sm:px-10 sm:py-6 2xl:px-36 2xl:py-10'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='max-w-md w-full flex flex-col gap-5'
          >
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => {
                return (
                  <FormItem>
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
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>Género</FormLabel>
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
              name='password'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          disabled={isInputDisabled}
                          placeholder='Contraseña'
                          autoComplete='new-password'
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                        />
                        <button
                          className='absolute right-2 top-3 z-10'
                          type='button'
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
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
              name='passwordConfirm'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                      Confirmar Contraseña
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          disabled={isInputDisabled}
                          placeholder='Confirmar contraseña'
                          autoComplete='new-password'
                          type={showPasswordConfirm ? 'text' : 'password'}
                          {...field}
                        />
                        <button
                          className='absolute right-2 top-3 z-10'
                          type='button'
                          onClick={toggleShowPasswordConfirm}
                        >
                          {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    {(form.formState.errors.password || form.formState.errors.passwordConfirm) && (
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

            <FormField
              control={form.control}
              name='roles'
              render={() => (
                <FormItem>
                  <div className='mb-4'>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>Roles</FormLabel>
                    <FormDescription className='text-[14px]'>
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
                                    ? (updatedRoles = field.value ? [...field.value, role] : [role])
                                    : (updatedRoles =
                                        field.value?.filter((value) => value !== role) ?? []);

                                  field.onChange(updatedRoles);
                                }}
                              />
                            </FormControl>
                            <FormLabel className='text-[14px] font-medium'>
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
              <p className='-mb-4 md:-mb-3 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[100%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                ❌ Datos incompletos, completa todos los campos para crear el registro.
              </p>
            ) : isMessageErrorPasswordDisabled ? (
              <p className='-mb-4 md:-mb-3 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[100%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                ❌ Las contraseñas deben coincidir.
              </p>
            ) : isMessageErrorRolesDisabled ? (
              <p className='-mb-4 md:-mb-3 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[100%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                ❌ Debes elegir al menos un rol para el usuario.
              </p>
            ) : (
              <p className='-mt-4 order-last md:-mt-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                ¡Campos completados correctamente! <br />
              </p>
            )}

            <div className='mt-2 col-start-1 col-end-3 row-start-2 row-end-3 w-full md:w-[20rem] md:m-auto'>
              <Toaster position='top-center' richColors />
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
                Registrar Usuario
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
