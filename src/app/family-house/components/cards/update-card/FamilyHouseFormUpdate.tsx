/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster, toast } from 'sonner';
import { type z } from 'zod';

import { cn } from '@/shared/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { useFamilyHouseUpdateSubmitButtonLogic } from '@/hooks';

import { type FamilyHouseDataKeys, type FamilyHouseData } from '@/app/family-house/interfaces';
import { formFamilyHouseSchema } from '@/app/family-house/validations';

import { preachers, zones } from '@/shared/data';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
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

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Status } from '@/shared/enums';

const data: FamilyHouseData = {
  zoneName: zones[1].value,
  houseName: 'Los Guerreros de Dios',
  country: 'Peru',
  department: 'Lima',
  province: 'Lima',
  district: 'Independencia',
  address: 'Av. Hayan Capac 123',
  theirPreacher: 'id2',
  status: Status.Inactive,
};

interface Props {
  onSubmit: () => void;
  onScroll: () => void;
}

export const FamilyHouseFormUpdate = ({ onSubmit, onScroll }: Props): JSX.Element => {
  //* States
  const [isInputZoneOpen, setIsInputZoneOpen] = useState<boolean>(false);
  const [isInputPreacherOpen, setIsInputPreacherOpen] = useState<boolean>(false);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);

  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);

  //* Form
  const form = useForm<z.infer<typeof formFamilyHouseSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formFamilyHouseSchema),
    defaultValues: {
      zoneName: '',
      theirPreacher: '',
      houseName: '',
      country: '',
      department: '',
      province: '',
      district: '',
      address: '',
      status: '',
    },
  });

  //* Handler form
  const handleSubmit = (values: z.infer<typeof formFamilyHouseSchema>): void => {
    console.log({ values });
  };

  // NOTE : Hacer custom hook
  useEffect(() => {
    for (const key in data) {
      form.setValue(key as FamilyHouseDataKeys, data[key as FamilyHouseDataKeys]);
    }
  }, []);

  //* Custom hooks
  useFamilyHouseUpdateSubmitButtonLogic({
    formFamilyHouseUpdate: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
  });

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[990px] xl:w-[1100px]'
    >
      <h2 className='text-center text-orange-500 pb-2 font-bold text-[20px] md:text-[24px]'>
        Actualizar información de la Casa Familiar
      </h2>

      <TabsContent value='general-info'>
        <Card className='w-full'>
          <CardContent className='py-3 px-4'>
            <div className='dark:text-slate-300 text-slate-500 font-bold text-[16px] mb-4 pl-4'>
              Casa Familiar: C-2 - Guerreros de Dios
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-full flex flex-col md:grid sm:grid-cols-2 gap-x-10 gap-y-5 px-2 sm:px-12'
              >
                <FormField
                  control={form.control}
                  name='zoneName'
                  render={({ field }) => {
                    return (
                      <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Zona
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Asignar una zona a la que pertenecerá la casa familiar.
                        </FormDescription>
                        <Popover open={isInputZoneOpen} onOpenChange={setIsInputZoneOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isInputDisabled}
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between',
                                  !field.value && 'text-slate-500 font-normal'
                                )}
                              >
                                {field.value
                                  ? zones.find((zone) => zone.value === field.value)?.label
                                  : 'Busque y seleccione una zona'}
                                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align='center' className='w-auto p-2'>
                            <Command>
                              <CommandInput
                                placeholder='Busque una zona...'
                                className='h-9 text-[14px]'
                              />
                              <CommandEmpty>Zona no encontrada.</CommandEmpty>
                              <CommandGroup className='max-h-[200px] h-auto'>
                                {zones.map((zone) => (
                                  <CommandItem
                                    className='text-[14px]'
                                    value={zone.label}
                                    key={zone.value}
                                    onSelect={() => {
                                      form.setValue('zoneName', zone.value);
                                      setIsInputZoneOpen(false);
                                    }}
                                  >
                                    {zone.label}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        zone.value === field.value ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
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
                  name='theirPreacher'
                  render={({ field }) => {
                    return (
                      <FormItem className='md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 flex flex-col'>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Predicador
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Seleccione un predicador para esta casa familiar.
                        </FormDescription>
                        <Popover open={isInputPreacherOpen} onOpenChange={setIsInputPreacherOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isInputDisabled}
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between',
                                  !field.value && 'text-slate-400 font-normal'
                                )}
                              >
                                {field.value
                                  ? preachers.find((preacher) => preacher.value === field.value)
                                      ?.label
                                  : 'Busque y seleccione un predicador'}
                                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align='center' className='w-auto p-2'>
                            <Command>
                              <CommandInput
                                placeholder='Busque un predicador...'
                                className='h-9 text-[14px]'
                              />
                              <CommandEmpty>Predicador no encontrado.</CommandEmpty>
                              <CommandGroup className='max-h-[200px] h-auto'>
                                {preachers.map((preacher) => (
                                  <CommandItem
                                    className='text-[14px]'
                                    value={preacher.label}
                                    key={preacher.value}
                                    onSelect={() => {
                                      form.setValue('theirPreacher', preacher.value);
                                      setIsInputPreacherOpen(false);
                                    }}
                                  >
                                    {preacher.label}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        preacher.value === field.value ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
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
                  name='houseName'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Nombre
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Asignar una nombre a la casa familiar.
                        </FormDescription>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            placeholder='Eje: Los Guerreros de Dios...'
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
                  name='country'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          País
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Asignar una país a la que pertenece la casa familiar.
                        </FormDescription>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            placeholder='Eje: Peru, Colombia, Ecuador...'
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
                  name='department'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Departamento
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Asignar un departamento a la pertenece la casa familiar.
                        </FormDescription>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            placeholder='Eje: Lima, Puno, Huanuco...'
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
                  name='province'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Provincia
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Asignar una provincia a la que pertenece la casa familiar.
                        </FormDescription>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            placeholder='Eje: Lima, Huamanga, Huaraz...'
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
                  name='district'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Distrito
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Asignar un distrito al que pertenece la casa familiar.
                        </FormDescription>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            placeholder='Comas, Independencia, Carabayllo...'
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
                  name='address'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Dirección
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Asignar una dirección al que pertenece la casa familiar.
                        </FormDescription>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            placeholder='Av. Central 123...'
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
                  name='status'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Estado
                        </FormLabel>
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
                            *La casa familiar esta <span className='text-green-500'>activa</span>,
                            para colocarla como <span className='text-red-500'>inactiva</span> debe
                            eliminar el registro desde la pestaña{' '}
                            <span className='font-bold text-red-500'>Eliminar Casa Familiar.</span>
                          </FormDescription>
                        )}
                        {form.getValues('status') === 'inactive' && (
                          <FormDescription className='pl-2 text-[12px] xl:text-[13px] font-bold'>
                            * La casa familiar esta <span className='text-red-500'>inactiva</span>,
                            puede modificar el estado eligiendo otra opción.
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {isMessageErrorDisabled ? (
                  <p className='-mb-5 mt-4 md:mt-1 md:-mb-3 md:row-start-6 md:row-end-7 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                    ❌ Datos incompletos, completa todos los campos para guardar el registro.
                  </p>
                ) : (
                  <p className='-mt-3 order-last md:-mt-2 md:row-start-8 md:row-end-9 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                    ¡Campos completados correctamente! <br /> Para finalizar por favor guarde los
                    cambios.
                  </p>
                )}

                <div className='mt-2 md:mt-1 md:col-start-1 md:col-end-3 md:row-start-7 md:row-end-8 w-full md:w-[20rem] md:m-auto'>
                  <Toaster position='top-center' richColors />
                  <Button
                    disabled={isSubmitButtonDisabled}
                    type='submit'
                    className='w-full text-[14px]'
                    onClick={() => {
                      // NOTE : agregar promesa cuando se consulte hacer timer y luego mostrar toast (fetch real)
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
