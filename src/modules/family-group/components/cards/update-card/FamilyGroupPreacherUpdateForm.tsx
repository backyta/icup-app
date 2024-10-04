/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';

import { GiCardExchange } from 'react-icons/gi';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import {
  useFamilyGroupPreacherUpdateEffects,
  useFamilyGroupPreacherUpdateMutation,
  useFamilyGroupPreacherUpdateSubmitButtonLogic,
} from '@/modules/family-group/hooks';
import { getPreachersByZone } from '@/modules/preacher/services';
import { type FamilyGroupResponse } from '@/modules/family-group/interfaces';
import { familyGroupPreacherUpdateFormSchema } from '@/modules/family-group/validations';

import { PreacherSearchType } from '@/modules/preacher/enums';

import { cn } from '@/shared/lib/utils';
import { getFullNames } from '@/shared/helpers';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from '@/shared/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

interface FamilyGroupPreacherFormUpdateProps {
  id: string;
  dialogClose: () => void;
  scrollToTop: () => void;
  data: FamilyGroupResponse | undefined;
}

export const FamilyGroupPreacherUpdateForm = ({
  id,
  dialogClose: onSubmit,
  scrollToTop: onScroll,
  data,
}: FamilyGroupPreacherFormUpdateProps): JSX.Element => {
  //* States
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);
  const [isInputTheirPreacherOpen, setIsInputTheirPreacherOpen] = useState<boolean>(false);
  const [isInputTheirPreacherDisabled, setIsInputTheirPreacherDisabled] = useState<boolean>(false);

  //* Form
  const form = useForm<z.infer<typeof familyGroupPreacherUpdateFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(familyGroupPreacherUpdateFormSchema),
    defaultValues: {
      currentFamilyGroup: '',
      currentTheirPreacher: '',
      newTheirPreacher: '',
      newFamilyGroup: '',
    },
  });

  //* Queries
  const preachersQuery = useQuery({
    queryKey: ['preachers-by-zone', data?.theirZone?.id],
    queryFn: () =>
      getPreachersByZone({
        searchType: PreacherSearchType.ZoneId,
        zoneId: data?.theirZone?.id ?? '',
        isNullFamilyGroup: false,
      }),
    enabled: !!data?.theirZone?.id,
    retry: 1,
  });

  //* Custom Hooks
  useFamilyGroupPreacherUpdateEffects({
    id,
    data,
    familyGroupPreacherUpdateForm: form,
    preachersQuery,
  });

  useFamilyGroupPreacherUpdateSubmitButtonLogic({
    familyGroupPreacherUpdateForm: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
    isInputTheirPreacherDisabled,
  });

  const familyGroupPreacherUpdateMutation = useFamilyGroupPreacherUpdateMutation({
    onSubmit,
    onScroll,
    data,
    setIsInputDisabled,
    setIsSubmitButtonDisabled,
    setIsInputTheirPreacherDisabled,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof familyGroupPreacherUpdateFormSchema>): void => {
    familyGroupPreacherUpdateMutation.mutate({
      id: id ?? '',
      formData: {
        newTheirPreacher: formData.newTheirPreacher,
      },
    });
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[480px] md:w-[550px] lg:w-[550px] xl:w-[600px]'
    >
      <h2 className='text-center text-emerald-500 pb-2 font-bold text-[20px] sm:text-[22px] md:text-[24px]'>
        Intercambiar Predicadores
      </h2>

      <TabsContent value='general-info' className='overflow-y-auto'>
        <Card className='w-full'>
          <CardContent className='py-4 px-4'>
            <div className='font-bold text-[14.5px] md:text-[15px] mb-4'>
              Nombre de Zona:{' '}
              <span className='font-black text-blue-500 text-[16.5px] md:text-[17.5px]'>
                {data?.theirZone?.zoneName}
              </span>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-full flex flex-col gap-x-10 gap-y-5 md:gap-y-5 px-2 md:px-4'
              >
                <div className='flex flex-col md:grid md:grid-cols-7 gap-2'>
                  <div className='flex flex-col gap-2 md:gap-4 md:col-start-1 md:col-end-4'>
                    <FormField
                      control={form.control}
                      name='currentTheirPreacher'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='text-[14px] font-bold'>
                              Predicador Actual
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={cn(
                                  'text-[14px] font-medium',
                                  !data?.theirPreacher?.id && 'text-red-500 bg-red-50'
                                )}
                                disabled={isInputDisabled}
                                placeholder='Predicador actual...'
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
                      name='currentFamilyGroup'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='text-[14px] font-bold'>
                              Grupo Familiar Actual
                            </FormLabel>
                            <FormControl>
                              <Input
                                className='font-medium'
                                disabled={isInputDisabled}
                                placeholder='Grupo familiar actual'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <div className='pt-2 sm:pt-0 col-start-4 col-end-5 text-center justify-center flex items-center'>
                    <GiCardExchange className='text-[2.5rem] text-amber-500' />
                  </div>

                  <div className='flex flex-col gap-2 md:gap-4 md:col-start-5 md:col-end-8'>
                    <FormField
                      control={form.control}
                      name='newTheirPreacher'
                      render={({ field }) => {
                        return (
                          <FormItem className=''>
                            <FormLabel className='text-[14px] font-bold'>
                              Predicador Nuevo
                            </FormLabel>

                            <Popover
                              open={isInputTheirPreacherOpen}
                              onOpenChange={setIsInputTheirPreacherOpen}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    disabled={isInputTheirPreacherDisabled}
                                    variant='outline'
                                    role='combobox'
                                    className={cn('w-full justify-between font-medium text-[14px]')}
                                  >
                                    {field.value
                                      ? `${preachersQuery?.data?.find((preacher) => preacher.id === field.value)?.firstName} ${preachersQuery.data?.find((preacher) => preacher.id === field.value)?.lastName}`
                                      : 'Seleccione un predicador'}
                                    <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent align='center' className='w-auto px-4 py-2'>
                                <Command>
                                  {preachersQuery?.data?.length &&
                                  preachersQuery?.data?.length > 0 ? (
                                    <>
                                      <CommandInput
                                        placeholder='Busque un predicador...'
                                        className='h-9 text-[14px]'
                                      />

                                      <CommandEmpty>Predicador no encontrado.</CommandEmpty>

                                      <CommandGroup
                                        className={cn(
                                          'max-h-[200px] h-auto ',
                                          !preachersQuery.data && 'w-[320px]'
                                        )}
                                      >
                                        {preachersQuery.data?.map(
                                          (preacher) =>
                                            preacher.id !== data?.theirPreacher?.id && (
                                              <CommandItem
                                                className='text-[14px]'
                                                value={getFullNames({
                                                  firstNames: preacher.firstName,
                                                  lastNames: preacher.lastName,
                                                })}
                                                key={preacher.id}
                                                onSelect={() => {
                                                  form.setValue('newTheirPreacher', preacher.id);
                                                  setIsInputTheirPreacherOpen(false);
                                                }}
                                              >
                                                {`${preacher?.firstName} ${preacher?.lastName}`}
                                                <CheckIcon
                                                  className={cn(
                                                    'ml-auto h-4 w-4',
                                                    preacher.id === field.value
                                                      ? 'opacity-100'
                                                      : 'opacity-0'
                                                  )}
                                                />
                                              </CommandItem>
                                            )
                                        )}
                                      </CommandGroup>
                                    </>
                                  ) : (
                                    preachersQuery?.data?.length === 0 && (
                                      <p className='text-[14px] w-[280px] md:w-[210px] text-red-500 text-center'>
                                        ❌ No se encontró predicadores disponibles, todos están
                                        asignados a un grupo familiar.
                                      </p>
                                    )
                                  )}
                                </Command>
                              </PopoverContent>
                            </Popover>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name='newFamilyGroup'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='text-[14px] font-bold'>
                              Grupo Familiar Nuevo
                            </FormLabel>
                            <FormControl>
                              <Input
                                className='font-medium'
                                disabled={isInputDisabled}
                                placeholder='Grupo familiar nuevo...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>

                {isMessageErrorDisabled ? (
                  <p className='-mb-2 md:-mb-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                    ❌ Datos incompletos, completa todos los campos para actualizar el registro.
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
                    className={cn(
                      'w-full text-[14px]',
                      familyGroupPreacherUpdateMutation?.isPending &&
                        'bg-emerald-500 disabled:opacity-100 disabled:text-[16px] text-white'
                    )}
                    onClick={() => {
                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          setIsSubmitButtonDisabled(true);
                          setIsInputDisabled(true);
                          setIsInputTheirPreacherDisabled(true);
                        }
                      }, 100);
                    }}
                  >
                    {familyGroupPreacherUpdateMutation?.isPending
                      ? 'Procesando...'
                      : 'Guardar cambios'}
                  </Button>
                </div>
              </form>
            </Form>
            <div className='mt-3'>
              <p className='text-red-500 text-[13px] md:text-[14px] font-bold mb-2'>
                Consideraciones
              </p>
              <p className='text-[12px] md:text-[13px] mb-2 font-medium '>
                ✅ Se requiere que los Predicadores tengan la misma Zona para intercambiarlos entre
                los Grupos Familiares.
              </p>
              <p className='text-[12px] md:text-[13px] mb-2 font-medium '>
                ✅ Al ejecutar el intercambio el predicador pasara al otro Grupo Familiar y
                viceversa.
              </p>
              <p className='text-[12px] md:text-[13px] mb-2 font-medium '>
                ✅ Si quieres intercambiar por otro Predicador, primero deberás actualizar ese
                Predicador a la Zona correspondiente.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
