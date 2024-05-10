/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { Toaster, toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { formFamilyHouseSchema } from '@/app/family-house/validations';
import { ZoneCreateCard, ZoneUpdateCard, ZoneDeleteCard } from '@/app/family-house/components';

import { useFamilyHouseCreateSubmitButtonLogic } from '@/hooks';
import { useFamilyHouseStore } from '@/stores';

import { cn } from '@/shared/lib/utils';
import { preachers, zones } from '@/app/family-house/data';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
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
import {
  CountryNames,
  DepartmentNames,
  DistrictNames,
  ProvinceNames,
  UrbanSectorNames,
} from '@/shared/enums';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  validateDistrictsAllowedByModule,
  validateUrbanSectorsAllowedByDistrict,
} from '@/shared/helpers';

export const FamilyHouseCreatePage = (): JSX.Element => {
  //* States
  const isInputPreacherOpen = useFamilyHouseStore((state) => state.isInputPreacherOpen);
  const isInputSearchZoneOpen = useFamilyHouseStore((state) => state.isInputSearchZoneOpen);

  const isInputZoneDisabled = useFamilyHouseStore((state) => state.isInputZoneDisabled);
  const isInputPreacherDisabled = useFamilyHouseStore((state) => state.isInputPreacherDisabled);
  const isInputDisabled = useFamilyHouseStore((state) => state.isInputDisabled);

  const isSubmitButtonDisabled = useFamilyHouseStore((state) => state.isSubmitButtonDisabled);
  const isZoneButtonsDisabled = useFamilyHouseStore((state) => state.isZoneButtonsDisabled);

  const setIsPreacherOpen = useFamilyHouseStore((state) => state.setIsInputPreacherOpen);
  const setIsSearchZoneOpen = useFamilyHouseStore((state) => state.setIsInputSearchZoneOpen);

  const setIsInputZoneDisabled = useFamilyHouseStore((state) => state.setIsInputZoneDisabled);
  const setIsInputPreacherDisabled = useFamilyHouseStore(
    (state) => state.setIsInputPreacherDisabled
  );
  const setIsInputDisabled = useFamilyHouseStore((state) => state.setIsInputDisabled);

  const setIsSubmitButtonDisabled = useFamilyHouseStore((state) => state.setIsSubmitButtonDisabled);
  const setIsZoneButtonsDisabled = useFamilyHouseStore((state) => state.setIsZoneButtonsDisabled);

  const setIsMessageErrorDisabled = useFamilyHouseStore((state) => state.setIsMessageErrorDisabled);
  const isMessageErrorDisabled = useFamilyHouseStore((state) => state.isMessageErrorDisabled);

  //* Library hooks
  const { pathname } = useLocation();

  //* Form
  const form = useForm<z.infer<typeof formFamilyHouseSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formFamilyHouseSchema),
    defaultValues: {
      zoneName: '',
      houseName: '',
      country: '',
      department: '',
      province: '',
      district: '',
      urbanSector: '',
      address: '',
      worshipTime: '',
      referenceComments: '',
      theirPreacher: '',
    },
  });

  //* Form handler
  const handleSubmit = (values: z.infer<typeof formFamilyHouseSchema>): void => {
    console.log({ values });
  };

  //* watchers
  const district = form.watch('district');

  //* Custom hooks
  useFamilyHouseCreateSubmitButtonLogic({
    formFamilyHouseCreate: form,
    setIsInputDisabled,
    isInputDisabled,
    setIsInputPreacherDisabled,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
  });

  //* Effects
  useEffect(() => {
    form.resetField('urbanSector', {
      keepError: true,
    });
  }, [district]);

  //* Helpers
  const disabledUrbanSectors = validateUrbanSectorsAllowedByDistrict(district);
  const disabledDistricts = validateDistrictsAllowedByModule(pathname);

  return (
    <>
      <h1 className='text-center pt-1 md:pt-0 pb-1 font-sans font-bold text-family-house-color text-[2.1rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-[3rem]'>
        Modulo Casa Familiar
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h1 className='text-left px-4 sm:px-5 pt-2 2xl:px-24 font-sans font-bold text-green-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.9rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Crear una nueva casa familiar
      </h1>

      <p className='dark:text-slate-300 text-left font-sans font-bold pl-5 sm:pl-7 2xl:px-28 text-[12px] md:text-[15px] xl:text-base'>
        Por favor llena los siguientes datos para crear una nueva casa familiar.
      </p>

      <div className='flex flex-col items-center pb-8 gap-y-8 md:gap-y-8 px-5 py-4 sm:px-12 sm:py-8 2xl:px-36 2xl:py-8'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='w-full flex flex-col md:grid grid-cols-2 gap-x-10 gap-y-4'
          >
            <div className='col-start-1 col-end-2'>
              <FormField
                control={form.control}
                name='zoneName'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>Zona</FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar la zona a la que pertenecerá la casa familiar.
                      </FormDescription>
                      <Popover open={isInputSearchZoneOpen} onOpenChange={setIsSearchZoneOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={isInputZoneDisabled}
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-full justify-between',
                                !field.value && 'text-slate-500 dark:text-slate-200 font-normal'
                              )}
                            >
                              {field.value
                                ? zones.find((zone) => zone.value === field.value)?.label
                                : 'Busque y seleccione una zona'}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align='center' className='w-auto px-4 py-2'>
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
                                    setIsSearchZoneOpen(false);
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
                      <FormDescription className='text-[12px] md:text-[13px] text-blue-500 font-bold'>
                        * Si no hay zonas disponibles o necesitas una nueva zona, debes crearla.
                      </FormDescription>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name='theirPreacher'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Predicador
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Seleccione un predicador para esta casa familiar.
                      </FormDescription>
                      <Popover open={isInputPreacherOpen} onOpenChange={setIsPreacherOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={isInputPreacherDisabled}
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-full justify-between ',
                                !field.value && 'text-slate-400 font-normal',
                                isInputPreacherDisabled &&
                                  'dark:bg-gray-100 text-slate-500 bg-gray-200'
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
                        <PopoverContent align='center' className='w-auto px-4 py-2'>
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
                                    setIsPreacherOpen(false);
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Nombre
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar una nombre a la casa familiar.
                      </FormDescription>
                      <FormControl>
                        <Input
                          className={cn(
                            isInputDisabled && 'dark:bg-gray-100 text-black bg-gray-200'
                          )}
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
                name='worshipTime'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Horario de culto
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar el horario de culto de la casa familiar.
                      </FormDescription>
                      <FormControl
                        className={cn(isInputDisabled && 'dark:bg-gray-100 text-black bg-gray-200')}
                      >
                        <Input disabled={isInputDisabled} type='time' {...field} />
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
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>País</FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar el país al que pertenece la casa familiar.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isInputDisabled}
                      >
                        <FormControl
                          className={cn(
                            isInputDisabled && 'dark:bg-gray-100 text-slate-500 bg-gray-200'
                          )}
                        >
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona el país' />
                            ) : (
                              'Selecciona el país'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(CountryNames).map(([key, value]) => (
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
                name='department'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Departamento
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar el departamento al que pertenece la casa familiar.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isInputDisabled}
                      >
                        <FormControl
                          className={cn(
                            isInputDisabled && 'dark:bg-gray-100 text-slate-500 bg-gray-200'
                          )}
                        >
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona el departamento' />
                            ) : (
                              'Selecciona el departamento'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(DepartmentNames).map(([key, value]) => (
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
            </div>

            <div className='col-start-2 col-end-3'>
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
                        Asignar la provincia a la que pertenece la casa familiar.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isInputDisabled}
                      >
                        <FormControl
                          className={cn(
                            isInputDisabled && 'dark:bg-gray-100 text-slate-500 bg-gray-200'
                          )}
                        >
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona la provincia' />
                            ) : (
                              'Selecciona la provincia'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(ProvinceNames).map(([key, value]) => (
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
                name='district'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3 md:mt-5'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Distrito
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar el distrito al que pertenece la casa familiar.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isInputDisabled}
                      >
                        <FormControl
                          className={cn(
                            isInputDisabled && 'dark:bg-gray-100 text-slate-500 bg-gray-200'
                          )}
                        >
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona el distrito' />
                            ) : (
                              'Selecciona el distrito'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(DistrictNames).map(([key, value]) => (
                            <SelectItem
                              className={`text-[14px] ${disabledDistricts?.disabledDistricts?.includes(value) ? 'hidden' : ''}`}
                              key={key}
                              value={key}
                            >
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
                name='urbanSector'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3 md:mt-5'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Sector Urbano
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar el sector urbano al que pertenece la casa familiar.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isInputDisabled}
                      >
                        <FormControl
                          className={cn(
                            isInputDisabled && 'dark:bg-gray-100 text-slate-500 bg-gray-200'
                          )}
                        >
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona el sector urbano' />
                            ) : (
                              'Selecciona el sector urbano'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(UrbanSectorNames).map(([key, value]) => (
                            <SelectItem
                              className={`text-[14px] ${disabledUrbanSectors?.disabledUrbanSectors?.includes(value) ?? !district ? 'hidden' : ''}`}
                              key={key}
                              value={key}
                            >
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
                name='address'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3 md:mt-5'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Dirección
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar la dirección al que pertenece la casa familiar.
                      </FormDescription>
                      <FormControl
                        className={cn(isInputDisabled && 'dark:bg-gray-100 text-black bg-gray-200')}
                      >
                        <Input
                          disabled={isInputDisabled}
                          placeholder='Ej: Av. Central 123 - Mz.A Lt.3'
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
                name='referenceComments'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3 md:mt-5'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Referencia de dirección
                      </FormLabel>
                      <FormControl
                        className={cn(isInputDisabled && 'dark:bg-gray-100 text-black bg-gray-200')}
                      >
                        <Textarea
                          disabled={isInputDisabled}
                          placeholder='Comentarios sobre la referencia de la casa familiar...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            {isMessageErrorDisabled ? (
              <p className='-mb-5 mt-2 md:-mb-2 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 mx-auto md:w-[100%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                ❌ Datos incompletos, completa todos los campos para crear el registro.
              </p>
            ) : (
              <p className='-mt-2 order-last md:-mt-2 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                ¡Campos completados correctamente! <br />
              </p>
            )}

            <div className='mt-2 md:mt-1 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-4 w-full md:w-[20rem] md:m-auto'>
              {Object.values(form.getValues()).some(
                (value) => value !== '' && value !== undefined
              ) && <Toaster position='top-center' richColors />}
              <Button
                disabled={isSubmitButtonDisabled}
                type='submit'
                className='w-full text-[14px]'
                onClick={() => {
                  // NOTE : agregar promesa cuando se consulte hacer timer y luego mostrar toast (fetch real)
                  // NOTE : hacer petición al backend para crear
                  setTimeout(() => {
                    if (Object.keys(form.formState.errors).length === 0) {
                      toast.success('Cambios guardados correctamente', {
                        position: 'top-center',
                        className: 'justify-center',
                      });

                      setIsInputDisabled(true);
                      setIsInputPreacherDisabled(true);
                      setIsSubmitButtonDisabled(true);
                      setIsZoneButtonsDisabled(true);
                      setIsInputZoneDisabled(true);
                    }
                  }, 100);

                  setTimeout(() => {
                    if (Object.keys(form.formState.errors).length === 0) {
                      setIsSubmitButtonDisabled(false);
                      setIsZoneButtonsDisabled(false);
                      setIsInputZoneDisabled(false);
                    }
                  }, 1700);

                  setTimeout(() => {
                    if (Object.keys(form.formState.errors).length === 0) {
                      form.reset();
                    }
                  }, 1700);
                }}
              >
                Registrar Casa Familiar
              </Button>
            </div>
          </form>
        </Form>

        {/* Zone, create, update, delete */}
        <div className='max-w-[90%] w-full flex flex-col gap-6'>
          <hr className='md:p-[0.02rem] bg-slate-500 w-full' />

          <div className='flex flex-col gap-4 xl:grid xl:grid-cols-3 justify-center items-center'>
            <div className='w-full flex flex-col md:grid md:grid-cols-2 xl:flex gap-2 items-center lg:mx-auto lg:w-[90%]'>
              <div className='text-center'>
                <h1 className='text-center font-bold text-green-500 text-[22px] sm:text-[1.3rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[1.6rem] 2xl:text-[1.7rem]'>
                  Crear
                </h1>
                <p className='font-bold text-[13px] md:text-[14px]'>
                  Crear el registro de una nueva zona.
                </p>
              </div>
              <div className='mx-auto w-[70%] md:w-[60%]'>
                <ZoneCreateCard formFamilyHouse={form} isDisabled={isZoneButtonsDisabled} />
              </div>
            </div>

            <div className='w-full flex flex-col md:grid md:grid-cols-2 xl:flex gap-2 items-center lg:m-auto lg:w-[90%]'>
              <div className='text-center'>
                <h1 className='text-center font-bold text-orange-500 text-[22px] sm:text-[1.3rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[1.6rem] 2xl:text-[1.7rem]'>
                  Actualizar
                </h1>
                <p className='font-bold text-[13px] md:text-[14px]'>
                  Modificar los datos del registro de una zona.
                </p>
              </div>
              <div className='mx-auto w-[70%] md:w-[60%]'>
                <ZoneUpdateCard formFamilyHouse={form} isDisabled={isZoneButtonsDisabled} />
              </div>
            </div>

            <div className='w-full flex flex-col md:grid md:grid-cols-2 xl:flex  gap-2 items-center lg:m-auto lg:w-[90%]'>
              <div className='text-center'>
                <h1 className='text-center font-bold text-red-500 text-[22px] sm:text-[1.3rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[1.6rem] 2xl:text-[1.7rem]'>
                  Eliminar
                </h1>
                <p className='font-bold text-[13px] md:text-[14px]'>
                  Eliminar el registro de una zona.
                </p>
              </div>
              <div className='mx-auto w-[70%] md:w-[60%]'>
                <ZoneDeleteCard formFamilyHouse={form} isDisabled={isZoneButtonsDisabled} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
