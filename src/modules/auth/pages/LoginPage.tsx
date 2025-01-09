/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { AxiosError } from 'axios';
import { Toaster, toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/shared/lib/utils';

import { useAuthStore } from '@/stores/auth/auth.store';
import { loginSchema } from '@/modules/auth/validations/login-schema';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';

export const LoginPage = (): JSX.Element => {
  //* States
  const loginUser = useAuthStore((state) => state.loginUser);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number>(401);
  const [countdown, setCountdown] = useState<number>(60);

  //* Hooks (external libraries)
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

  //* Effects
  useEffect(() => {
    document.title = 'Iniciar Sesión - IcupApp';
  }, []);

  useEffect(() => {
    if (statusCode === 429) {
      setIsInputDisabled(true);

      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setCountdown(60);
        setIsInputDisabled(false);
        setStatusCode(401);
        toast.success('Límite de tiempo completado. Ya puede volver a intentarlo.', {
          position: 'top-right',
        });
      }, 60000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [statusCode]);

  //* Form handler
  const handleSubmit = async (values: z.infer<typeof loginSchema>): Promise<void> => {
    try {
      await loginUser(values.email, values.password);
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 401) {
          toast.error(error?.response?.data?.message, {
            position: 'top-right',
          });

          setTimeout(() => {
            if (Object.keys(form.formState.errors).length === 0) {
              setIsInputDisabled(false);
            }
          }, 1500);
        }

        if (error?.response?.status === 429) {
          toast.warning(error?.response?.data?.message, {
            position: 'top-right',
          });
          setStatusCode(error?.response?.status);
        }

        return;
      }

      throw new Error('No se pudo autenticar.');
    }
  };

  return (
    <div className='overflow-y-scroll pt-6 pb-2'>
      <div className='flex flex-col -mt-28 md:-mt-[3rem] md:items-center'>
        <img
          src='/logo-sn.webp'
          alt='Logo Iglesia'
          className='w-[30rem] md:w-[33rem] lg:w-[37rem] xl:w-[45rem] pb-8 pt-[6rem] md:pt-[4rem] mx-auto'
        />
        <h1 className='text-4xl md:text-5xl lg:text-[3.60rem] xl:text-7xl text-center font-semibold dark:text-blue-600 text-blue-800 font-dancing-script mb-0 md:mb-4 lg:mb-4 xl:mb-2 xl:leading-[4.5rem]'>
          ICUP APP
        </h1>
        <h2 className='text-center text-[1.4rem] md:text-[1.7rem] lg:text-3xl xl:text-4xl p-2 md:pb-4 italic'></h2>
      </div>

      <div className='mx-auto w-[18rem] md:w-[24rem] md:mx-auto sm:max-w-md px-5 pb-7 pt-5 md:px-10 md:pt-8 md:pb-10 shadow-md overflow-hidden sm:rounded-lg bg-white dark:bg-slate-900'>
        <h3
          className={cn(
            'text-center text-[20px] md:text-[22px] lg:text-[25px] xl:text-[28px] mb-3 md:mb-5 leading-8 font-bold',
            statusCode === 429 && 'mb-1 md:mb-1'
          )}
        >
          Inicia Sesión
        </h3>
        {statusCode === 429 && (
          <div className='text-center text-red-600 font-semibold'>
            Por favor, espera {countdown} segundos antes de intentar nuevamente.
          </div>
        )}

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
                    <FormControl className='text-[14px] md:text-[14px]'>
                      <Input
                        disabled={isInputDisabled}
                        placeholder='Ejem: maria@google.com'
                        type='email'
                        autoComplete='username'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-[13px]' />
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
                    <FormControl className='text-[14px] md:text-[14px]'>
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
                    <FormMessage className='text-[13px]' />
                  </FormItem>
                );
              }}
            />

            <div className='mt-2 col-start-1 col-end-3 row-start-2 h-full row-end-3 w-full md:m-auto'>
              <Toaster position='bottom-center' richColors />
              <Button
                disabled={isInputDisabled}
                type='submit'
                className={cn(
                  'w-full text-[14px]',
                  isInputDisabled &&
                    statusCode !== 429 &&
                    'dark:bg-emerald-500 bg-emerald-600 dark:hover:bg-emerald-500 hover:bg-emerald-600 text-[15px] w-full h-full text-white'
                )}
                onClick={() => {
                  setTimeout(() => {
                    if (Object.keys(form.formState.errors).length === 0) {
                      setIsInputDisabled(true);
                    }
                  }, 100);
                }}
              >
                {isInputDisabled && statusCode !== 429 ? 'Conectando...' : 'Iniciar Sesión'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
