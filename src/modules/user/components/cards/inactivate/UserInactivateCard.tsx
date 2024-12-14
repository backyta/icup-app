/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useCallback, useEffect, useRef, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { MdDeleteForever } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUserInactivationMutation } from '@/modules/user/hooks/useUserInactivationMutation';
import { userInactivationFormSchema } from '@/modules/user/validations/user-inactivation-form-schema';

import {
  UserInactivationCategory,
  UserInactivationCategoryNames,
} from '@/modules/user/enums/user-inactivation-category.enum';
import {
  SecurityReasonsReasonsNames,
  PerformanceOrConductReasonsNames,
  AdministrativeChangesReasonsNames,
  UnavoidableCircumstancesReasonsNames,
  TransitionOrReassignmentReasonsNames,
  InactivityOrRoleIrrelevanceReasonsNames,
} from '@/modules/user/enums/user-inactivation-reason.enum';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
  FormDescription,
} from '@/shared/components/ui/form';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/shared/components/ui/select';
import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';

interface UserInactivateCardProps {
  idRow: string;
}

export const UserInactivateCard = ({ idRow }: UserInactivateCardProps): JSX.Element => {
  //* States
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isSelectInputDisabled, setIsSelectInputDisabled] = useState<boolean>(false);
  const topRef = useRef<HTMLDivElement>(null);

  //* Form
  const form = useForm<z.infer<typeof userInactivationFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(userInactivationFormSchema),
    defaultValues: {
      userInactivationCategory: '',
      userInactivationReason: '',
    },
  });

  //* Watchers
  const userInactivationCategory = form.watch('userInactivationCategory');
  const userInactivationReason = form.watch('userInactivationReason');

  //* Effects
  useEffect(() => {
    if (!userInactivationCategory && !userInactivationReason) {
      setIsButtonDisabled(true);
    }
    if (userInactivationCategory && userInactivationReason) {
      setIsButtonDisabled(false);
    }
  }, [form, userInactivationCategory, userInactivationReason]);

  useEffect(() => {
    const originalUrl = window.location.href;

    if (idRow && isCardOpen) {
      const url = new URL(window.location.href);
      url.pathname = `/users/inactivate/${idRow}/remove`;

      window.history.replaceState({}, '', url);

      return () => {
        window.history.replaceState({}, '', originalUrl);
      };
    }
  }, [idRow, isCardOpen]);

  //* Functions
  const handleContainerScroll = useCallback((): void => {
    if (topRef.current !== null) {
      topRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  //* Custom hooks
  const userInactivationMutation = useUserInactivationMutation({
    setIsCardOpen,
    setIsButtonDisabled,
    scrollToTop: handleContainerScroll,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof userInactivationFormSchema>): void => {
    setIsSelectInputDisabled(true);
    setIsButtonDisabled(true);

    userInactivationMutation.mutate({
      id: idRow,
      userInactivationCategory: formData.userInactivationCategory,
      userInactivationReason: formData.userInactivationReason,
    });
  };

  return (
    <Dialog open={isCardOpen} onOpenChange={setIsCardOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            form.reset();
          }}
          className='mt-2 py-2 px-1 h-[2rem] bg-red-400 text-white hover:bg-red-500 hover:text-red-950  dark:text-red-950 dark:hover:bg-red-500 dark:hover:text-white'
        >
          <MdDeleteForever className='w-8 h-[1.65rem]' />
        </Button>
      </DialogTrigger>

      <DialogContent ref={topRef} className='w-[23rem] sm:w-[25rem] md:w-full'>
        <div className='h-auto'>
          <h2 className='text-yellow-500 font-bold text-xl text-center md:text-[26px] pb-2'>
            ¿Estas seguro de inactivar este Usuario?
          </h2>
          <p>
            <span className='text-blue-500 font-bold mb-3 inline-block text-[16px] md:text-[18px]'>
              Luego de realizar esta operación sucederá lo siguiente:
            </span>
            <br />
            <span className='inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ El registro de este Usuario se colocara en estado{' '}
              <span className='font-bold'>INACTIVO.</span>
            </span>
            <span className='w-full text-left inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ El registro ya no tendrá acceso al sistema ni a ninguna funcionalidad de esta.
            </span>
            <span className='inline-block text-[14px] md:text-[15px]'>
              ✅ Para poder activarlo nuevamente deberás hacerlo desde el modulo{' '}
              <span className='font-bold'>Actualizar Usuario.</span>
            </span>
            <br />
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name='userInactivationCategory'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold text-red-500'>
                        ¿Cual es el motivo por el cual se esta inactivando este registro?
                      </FormLabel>
                      <FormDescription className='text-[14px] pl-1'>
                        Elige una categoría de eliminación.
                      </FormDescription>
                      <Select
                        disabled={isSelectInputDisabled}
                        value={field.value}
                        onOpenChange={() => {
                          form.resetField('userInactivationReason', {
                            defaultValue: '',
                          });
                        }}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona una categoría' />
                            ) : (
                              'Selecciona una categoría'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(UserInactivationCategoryNames).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
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
                name='userInactivationReason'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormDescription className='text-[14px] pl-1'>
                        Elige un motivo de eliminación según su categoría.
                      </FormDescription>
                      <Select
                        disabled={isSelectInputDisabled}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona un motivo' />
                            ) : (
                              'Selecciona un motivo'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='w-screen sm:ml-[0rem] sm:w-[95%] md:mx-auto md:w-full'>
                          {Object.entries(
                            userInactivationCategory ===
                              UserInactivationCategory.AdministrativeChanges
                              ? AdministrativeChangesReasonsNames
                              : userInactivationCategory ===
                                  UserInactivationCategory.InactivityOrRoleIrrelevance
                                ? InactivityOrRoleIrrelevanceReasonsNames
                                : userInactivationCategory ===
                                    UserInactivationCategory.PerformanceOrConduct
                                  ? PerformanceOrConductReasonsNames
                                  : userInactivationCategory ===
                                      UserInactivationCategory.SecurityReasons
                                    ? SecurityReasonsReasonsNames
                                    : userInactivationCategory ===
                                        UserInactivationCategory.TransitionOrReassignment
                                      ? TransitionOrReassignmentReasonsNames
                                      : userInactivationCategory ===
                                          UserInactivationCategory.UnavoidableCircumstances
                                        ? UnavoidableCircumstancesReasonsNames
                                        : []
                          ).map(([key, value]) => (
                            <SelectItem className='' key={key} value={key}>
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

              <div className='flex justify-center md:justify-end gap-x-4 mt-4'>
                <Button
                  disabled={isButtonDisabled}
                  className='w-full md:w-auto bg-red-500 text-red-950 hover:bg-red-500 hover:text-white text-[14px]'
                  type='button'
                  onClick={() => {
                    setIsCardOpen(false);
                  }}
                >
                  No, cancelar
                </Button>
                <Button
                  disabled={isButtonDisabled}
                  type='submit'
                  className='w-full md:w-auto bg-green-500 text-green-950 hover:bg-green-500 hover:text-white text-[14px]'
                >
                  Sí, inactivar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};