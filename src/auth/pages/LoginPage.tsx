/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from 'react';

import { type z } from 'zod';
import { AxiosError } from 'axios';
import { Toaster, toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthStore } from '@/stores';
import { loginSchema } from '@/auth/validations';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';

export const LoginPage = (): JSX.Element => {
  //* Stores and states
  const loginUser = useAuthStore((state) => state.loginUser);

  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //* External libraries
  const navigate = useNavigate();

  //* Form
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //* Password handler
  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  //* Form handler
  const handleSubmit = async (values: z.infer<typeof loginSchema>): Promise<void> => {
    try {
      await loginUser(values.email, values.password);
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.error === 'Unauthorized') {
          toast.error(error?.response?.data?.message, {
            position: 'top-right',
          });
        }
        return;
      }

      throw new Error('No se pudo autenticar.');
    }
  };

  return (
    <>
      <div className='flex flex-col -mt-28'>
        <img
          src='/src/assets/logo-sn.webp'
          alt='Placeholder Image'
          className='w-[30rem] md:w-[33rem] lg:w-[37rem] xl:w-[45rem] pb-8 md:pb-10 mx-auto'
        />
        <h1 className='text-4xl md:text-5xl lg:text-[3.60rem] xl:text-7xl text-center font-semibold text-blue-800 font-dancing-script mb-0 md:mb-4 lg:mb-4 xl:mb-2 xl:leading-[4.5rem]'>
          ICUP APP
        </h1>
        <h2 className='text-center text-[1.4rem] md:text-[1.7rem] lg:text-3xl xl:text-4xl p-2 md:pb-4 italic'>
          Bienvenido
        </h2>
      </div>

      <div className='w-[18rem] md:w-[24rem] md:mx-auto sm:max-w-md px-5 pb-7 pt-5 md:px-10 md:pt-8 md:pb-10 shadow-md overflow-hidden sm:rounded-lg bg-white dark:bg-slate-900'>
        <h3 className='text-center text-[20px] md:text-[22px] lg:text-[25px] xl:text-[28px] mb-3 md:mb-5 leading-8 font-bold'>
          Inicia Sesión
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='max-w-md w-full flex flex-col gap-3 md:gap-6'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-me'>
                      Correo Electrónico
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isInputDisabled}
                        placeholder='Eje: maria@google.com'
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
                    <FormLabel className='text-[14px] md:text-[14.5px] font-medium'>
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          disabled={isInputDisabled}
                          placeholder='Escribe tu contraseña'
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

            <div className='mt-2 col-start-1 col-end-3 row-start-2 row-end-3 w-full md:m-auto'>
              <Toaster position='bottom-center' richColors />
              <Button
                disabled={isInputDisabled}
                type='submit'
                className='w-full text-[14px]'
                onClick={() => {
                  setTimeout(() => {
                    if (Object.keys(form.formState.errors).length === 0) {
                      setIsInputDisabled(true);
                    }
                  }, 100);

                  setTimeout(() => {
                    if (Object.keys(form.formState.errors).length === 0) {
                      setIsInputDisabled(false);
                    }
                  }, 1500);
                }}
              >
                Iniciar Sesión
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
