/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useEffect } from 'react';

import { type z } from 'zod';
import { Toaster, toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

import { useUserSubmitButtonLogic } from '@/hooks';

import { userSchema } from '@/app/user/validations';
import { type UserDataKeys, type UserData } from '@/app/user/interfaces';

import { cn } from '@/shared/lib/utils';

import { UserRoleNames, UserRoles } from '@/app/user/enums';

import { Status } from '@/shared/enums';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';
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

const data: UserData = {
  firstName: 'Mario Luigi',
  lastName: 'Farfan Moreno',
  emailAddress: 'kevin.baca@example.com',
  password: 'Abcd123$',
  passwordConfirm: 'Abcd123$',
  roles: [UserRoles.SuperUser],
  status: Status.Inactive,
};

interface Props {
  onClose: () => void;
  onScroll: () => void;
}

export const UserFormUpdate = ({ onClose, onScroll }: Props): JSX.Element => {
  //* States
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);

  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);

  const [isMessageErrorRolesDisabled, setIsMessageErrorRolesDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);
  const [isMessageErrorPasswordDisabled, setIsMessageErrorPasswordDisabled] =
    useState<boolean>(true);

  //* Form
  const form = useForm<z.infer<typeof userSchema>>({
    mode: 'onChange',
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      passwordConfirm: '',
      roles: [],
      status: '',
    },
  });

  //* Form handler
  const handleSubmit = (values: z.infer<typeof userSchema>): void => {
    console.log({ values });
  };

  //* Password Handler
  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordConfirm = (): void => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  //* Custom hooks
  // NOTE : setear data hacer hook
  useEffect(() => {
    for (const key in data) {
      form.setValue(key as UserDataKeys, data[key as UserDataKeys]);
    }
  }, []);

  useUserSubmitButtonLogic({
    formUser: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
    setIsMessageErrorPasswordDisabled,
    setIsMessageErrorRolesDisabled,
    handleSubmit,
  });

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
          <CardContent className='py-3 px-4'>
            <div className='dark:text-slate-300 text-slate-500 font-bold text-[16px] mb-4 pl-4'>
              Registro de Usuario: 12KH453 - Maria Gutierrez
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
                  name='emailAddress'
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
                        {(form.formState.errors.password ||
                          form.formState.errors.passwordConfirm) && (
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
                  name='status'
                  render={({ field }) => {
                    return (
                      <FormItem
                        className={cn(
                          'md:col-start-2 md:col-end-3 md:row-start-4 md:row-end-5 md:-mt-[7.5rem] xl:-mt-[6.2rem]',
                          (form.formState.errors.password ||
                            form.formState.errors.passwordConfirm) &&
                            'xl:-mt-[0.5rem]'
                        )}
                      >
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
                        {form.getValues('status') === 'active' && (
                          <FormDescription className='pl-2 text-[12px] xl:text-[13px] font-bold'>
                            *El registro esta <span className='text-green-500'>activo</span>, para
                            colocar nuevamente como <span className='text-red-500'>inactivo</span>{' '}
                            eliminar el registro desde la pestaña{' '}
                            <span className='font-bold text-red-500'>Eliminar Usuario.</span>
                          </FormDescription>
                        )}
                        {form.getValues('status') === 'inactive' && (
                          <FormDescription className='pl-2 text-[12px] xl:text-[13px] font-bold'>
                            * El registro esta <span className='text-red-500'>inactivo</span>, puede
                            modificar el estado eligiendo otra opción.
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
                                    disabled={isInputDisabled}
                                    checked={field.value?.includes(role)}
                                    onCheckedChange={(checked) => {
                                      let updatedRoles: UserRoles[] = [];
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
                  <p className='-mb-2 md:-mb-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                    ❌ Datos incompletos, completa todos los campos para guardar el registro.
                  </p>
                ) : isMessageErrorPasswordDisabled ? (
                  <p className='-mb-2 md:-mb-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                    ❌ Las contraseñas deben coincidir.
                  </p>
                ) : isMessageErrorRolesDisabled ? (
                  <p className='-mb-2 md:-mb-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                    ❌ Debes elegir al menos un rol.
                  </p>
                ) : (
                  <p className='-mt-1 order-last md:-mt-3 md:row-start-6 md:row-end-7 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                    ¡Campos completados correctamente! <br /> Para finalizar por favor guarde los
                    cambios.
                  </p>
                )}

                <div className='w-full md:w-[20rem] md:mx-auto col-start-1 col-end-3 text-sm md:text-md xl:text-base'>
                  <Toaster position='top-center' richColors />
                  <Button
                    disabled={isSubmitButtonDisabled}
                    type='submit'
                    className='w-full text-[14px]'
                    onClick={() => {
                      // NOTE : agregar promesa cuando se consulte hacer timer y luego mostrar toast (fetch real)
                      // NOTE : hacer petición al backend para actualizar
                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          toast.success('Cambios guardados correctamente', {
                            position: 'top-center',
                            className: 'justify-center',
                          });

                          setIsInputDisabled(true);
                          setIsSubmitButtonDisabled(true);
                        }
                      }, 100);

                      setTimeout(() => {
                        onScroll();
                      }, 150);

                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          onClose();
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
