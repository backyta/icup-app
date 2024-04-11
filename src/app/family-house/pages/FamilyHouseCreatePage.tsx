/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster, toast } from 'sonner';

import { cn } from '@/shared/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { formFamilyHouseSchema } from '@/app/family-house/validations';
import { ZoneCreateCard, ZoneUpdateCard } from '@/app/family-house/components';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

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

import { useFamilyHouseStore } from '@/stores';
import { preachers, zones } from '@/shared/data';
import { ZoneDeleteCard } from '../components/zone-forms/ZoneDeleteCard';

//* Nueva forma de usar el Crear House y Actualizar
// Se puede crear una tabla de zona, con id, nombre de zona y supervisor a cargo
// Al crear una casa al hacer click en zona no aparecerá nada porque no habrá zonas, para esto primero se crea
// la zona en un tabla tendrá como relación a un supervisor,
// En el front agregar un botón de crear zonas y al desplegar el input sale zonas vacías
// Una vez creada al hacer click (en el input zonas) lanza una solicitud a la tabla zonas y trae la data y la setea

// Asi mismo al elegir una zona (lanza una petición) este validara su supervisor con el mismo supervisor de los
// preachers y devuelve los disponibles de esta manera se podrá controlar mejor la zona y su encargado.

// Se setea los preacher en predicador y podremos elegit cualquiera según el supervisor.
// Ver si tmb agregarle copastor y pastor (mas finjo que si)

//! Que pasa si un supervisor se va o elimina?
// Ahora si un supervisor se le da de baja o sube de nivel se borra el supervisor de la zona y de los demás lados donde
// tenga relación Lanzar error. Si se intenta crear una nueva casa y no hay predicadores con este supervisor (huérfanos)
// Se deberá asignar un supervisor a la zona

// Si están huérfanos, y le coloco a la zona un nuevo supervisor, este tmb deberá setearse para los predicadores
// que tengan la misma zona en su casa en la que están asignados.
// Y viceversa si asigno a un nuevo supervisor al predicador y su casa tiene una zona, entonces
// tmb debo setear en la misma zona (tabla) a ese supervisor

// Y al colocar el nuevo supervisor hay otros preacher con casas en la misma zona tmb se setea el mismo supervisor
// para estos de manera automática (osea solo basta actualizar 1).

// Se podrá modificar la zona desde un botón cambiando nombre de zona, o supervisor, y estos se aplicaran a todos las casas que tengan este nombre de zona o supervisor

// En actualizar la casa, podre elegir otra zona y esta llamara los predicadores disponibles de esa zona.
// Si no hay ninguno lanzo una nota, pero si hay uno lo muestro si elijo ese, antes de enviar el form
// valido que sean los mismos supervisores, y estaría moviendo la casa a otra zona y de predicador tmb.

// TODO : crear un botón que diga crear zona con nombre, supervisor (modal + form y hacer petición) componente
// TODO : El resto esta bien se setea la zona y luego se activan los demás campos.

// ? Esto seria en la búsqueda del Update (de los módulos)
// TODO : debería hacer una búsqueda(search by) por miembros y casas (huérfanos) (hacer select de los their),
// TODO : en miembros buscamos por miembros sin pastor, copastor, supervisor, predicador, para actualizar.
// TODO : en casas buscamos por casas sin predicador,(asignar predicador con el mismo supervisor de la zona), para actualizar.

export const FamilyHouseCreatePage = (): JSX.Element => {
  const isInputPreacherOpen = useFamilyHouseStore((state) => state.isInputPreacherOpen);
  const isInputSearchZoneOpen = useFamilyHouseStore((state) => state.isInputSearchZoneOpen);

  const isInputZoneDisabled = useFamilyHouseStore((state) => state.isInputZoneDisabled);
  const isInputPreacherDisabled = useFamilyHouseStore((state) => state.isInputPreacherDisabled);
  const isInputDisabled = useFamilyHouseStore((state) => state.isInputDisabled);

  const isSubmitButtonDisabled = useFamilyHouseStore((state) => state.isSubmitButtonDisabled);
  const isZoneButtonsDisabled = useFamilyHouseStore((state) => state.isZoneButtonsDisabled);

  const setIsPreacherOpen = useFamilyHouseStore((state) => state.setIsPreacherOpen);
  const setIsSearchZoneOpen = useFamilyHouseStore((state) => state.setIsSearchZoneOpen);

  const setIsInputZoneDisabled = useFamilyHouseStore((state) => state.setIsInputZoneDisabled);
  const setIsInputPreacherDisabled = useFamilyHouseStore(
    (state) => state.setIsInputPreacherDisabled
  );
  const setIsInputDisabled = useFamilyHouseStore((state) => state.setIsInputDisabled);

  const setIsSubmitButtonDisabled = useFamilyHouseStore((state) => state.setIsSubmitButtonDisabled);
  const setIsZoneButtonsDisabled = useFamilyHouseStore((state) => state.setIsZoneButtonsDisabled);

  const formFamilyHouse = useForm<z.infer<typeof formFamilyHouseSchema>>({
    resolver: zodResolver(formFamilyHouseSchema),
    defaultValues: {
      zoneName: '',
      houseName: '',
      country: '',
      department: '',
      province: '',
      district: '',
      address: '',
      theirPreacher: undefined,
    },
  });

  // TODO : corregir los setTimeout de 1700 cuando se escribe se lanza el form. (hacer otra validación o bloquear el campo)
  //* Watchers
  const watchZoneName = formFamilyHouse.watch('zoneName');
  const watchHouseName = formFamilyHouse.watch('houseName');
  const watchCountry = formFamilyHouse.watch('country');
  const watchDepartment = formFamilyHouse.watch('department');
  const watchProvince = formFamilyHouse.watch('province');
  const watchDistrict = formFamilyHouse.watch('district');
  const watchAddress = formFamilyHouse.watch('address');
  const watchTheirPreacher = formFamilyHouse.watch('theirPreacher');

  useEffect(() => {
    if (formFamilyHouse.getValues('zoneName')) {
      setIsInputPreacherDisabled(false);
    }
  }, [watchZoneName]);

  useEffect(() => {
    if (formFamilyHouse.getValues('theirPreacher')) {
      setIsInputDisabled(false);
    }
  }, [watchTheirPreacher]);

  useEffect(() => {
    if (
      watchZoneName &&
      watchHouseName &&
      watchCountry &&
      watchDepartment &&
      watchProvince &&
      watchDistrict &&
      watchAddress &&
      watchTheirPreacher
    ) {
      setIsSubmitButtonDisabled(false);
    }

    if (
      !watchZoneName ||
      !watchHouseName ||
      !watchCountry ||
      !watchDepartment ||
      !watchProvince ||
      !watchDistrict ||
      !watchAddress ||
      !watchTheirPreacher
    ) {
      setIsSubmitButtonDisabled(true);
    }
  }, [
    watchZoneName,
    watchHouseName,
    watchCountry,
    watchDepartment,
    watchProvince,
    watchDistrict,
    watchAddress,
    watchTheirPreacher,
  ]);

  const handleSubmit = (values: z.infer<typeof formFamilyHouseSchema>): void => {
    console.log({ values });
  };

  // TODO : tomorrow fix toast lleve hacia arriba cuando guardamos o salvamos en todos los forms que necesite ( card en su mayoria)
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

      <div className='flex flex-col items-center pb-8 gap-y-8 md:gap-y-12 px-5 py-4 sm:px-10 sm:py-8 2xl:px-36 2xl:py-8'>
        <Form {...formFamilyHouse}>
          <form
            onSubmit={formFamilyHouse.handleSubmit(handleSubmit)}
            className='w-full flex flex-col md:grid sm:grid-cols-2 gap-x-10 gap-y-4'
          >
            <FormField
              control={formFamilyHouse.control}
              name='zoneName'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>Zona</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Asignar una zona a la que pertenecerá la casa familiar.
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
                                  formFamilyHouse.setValue('zoneName', zone.value);
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
                      * Si no hay zonas disponibles o quieres una nueva, debes crearla.
                    </FormDescription>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formFamilyHouse.control}
              name='theirPreacher'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 flex flex-col'>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                      Predicador
                    </FormLabel>
                    <FormDescription className='text-[14px] '>
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
                              ? preachers.find((preacher) => preacher.value === field.value)?.label
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
                                  formFamilyHouse.setValue('theirPreacher', preacher.value);
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
              control={formFamilyHouse.control}
              name='houseName'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>Nombre</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Asignar una nombre a la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className={cn(isInputDisabled && 'dark:bg-gray-100 text-black bg-gray-200')}
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
              control={formFamilyHouse.control}
              name='country'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>País</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Asignar el país a la que pertenece la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className={cn(isInputDisabled && 'dark:bg-gray-100 text-black bg-gray-200')}
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
              control={formFamilyHouse.control}
              name='department'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                      Departamento
                    </FormLabel>
                    <FormDescription className='text-[14px]'>
                      Asignar el departamento a la pertenece la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className={cn(isInputDisabled && 'dark:bg-gray-100 text-black bg-gray-200')}
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
              control={formFamilyHouse.control}
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
                    <FormControl>
                      <Input
                        className={cn(isInputDisabled && 'dark:bg-gray-100 text-black bg-gray-200')}
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
              control={formFamilyHouse.control}
              name='district'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                      Distrito
                    </FormLabel>
                    <FormDescription className='text-[14px]'>
                      Asignar el distrito al que pertenece la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className={cn(isInputDisabled && 'dark:bg-gray-100 text-black bg-gray-200')}
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
              control={formFamilyHouse.control}
              name='address'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                      Dirección
                    </FormLabel>
                    <FormDescription className='text-[14px]'>
                      Asignar la dirección al que pertenece la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className={cn(isInputDisabled && 'dark:bg-gray-100 text-black bg-gray-200')}
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
            <div className='mt-4 md:mt-6 sm:col-start-1 sm:col-end-3 sm:row-start-5 sm:row-end-6 w-60 m-auto 2xl:w-80'>
              {Object.values(formFamilyHouse.getValues()).some(
                (value) => value !== '' && value !== undefined
              ) && <Toaster position='top-center' richColors />}
              <Button
                disabled={isSubmitButtonDisabled}
                type='submit'
                className='w-full text-[14px]'
                onClick={() => {
                  // TODO : agregar promesa cuando se consulte hacer timer y luego mostrar toast (fetch real)
                  setTimeout(() => {
                    if (Object.keys(formFamilyHouse.formState.errors).length === 0) {
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
                    if (Object.keys(formFamilyHouse.formState.errors).length === 0) {
                      setIsSubmitButtonDisabled(false);
                      setIsZoneButtonsDisabled(false);
                      setIsInputZoneDisabled(false);
                    }
                  }, 1700);

                  setTimeout(() => {
                    if (Object.keys(formFamilyHouse.formState.errors).length === 0) {
                      formFamilyHouse.reset();
                    }
                  }, 1700);
                }}
              >
                Registrar Casa Familiar
              </Button>
            </div>
          </form>
        </Form>

        {/* //TODO : hacer el delete y deshabilitar botones y revisar cada uno */}
        {/* Zone, create, update, delete */}
        <div className='max-w-[60rem] w-full flex flex-col gap-6'>
          <div className='flex flex-col md:grid md:grid-cols-2 gap-2 items-center lg:mx-auto lg:w-[90%]'>
            <div className='text-center'>
              <h1 className='text-center font-bold text-green-500 text-[22px] sm:text-[1.3rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[1.6rem] 2xl:text-[1.7rem]'>
                Crear una nueva zona
              </h1>
              <p className='font-bold text-[13px] md:text-[14px]'>
                Crear el registro de una nueva zona.
              </p>
            </div>
            <div className='mx-auto w-[70%] md:w-[60%]'>
              <ZoneCreateCard form={formFamilyHouse} isDisabled={isZoneButtonsDisabled} />
            </div>
          </div>

          <div className='flex flex-col md:grid md:grid-cols-2 gap-2 items-center lg:m-auto lg:w-[90%]'>
            <div className='text-center'>
              <h1 className='text-center font-bold text-orange-500 text-[22px] sm:text-[1.3rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[1.6rem] 2xl:text-[1.7rem]'>
                Actualizar una zona
              </h1>
              <p className='font-bold text-[13px] md:text-[14px]'>
                Modificar una zona existente por falta de supervisor o para modificar sus datos.
              </p>
            </div>
            <div className='mx-auto w-[70%] md:w-[60%]'>
              <ZoneUpdateCard form={formFamilyHouse} isDisabled={isZoneButtonsDisabled} />
            </div>
          </div>

          <div className='flex flex-col md:grid md:grid-cols-2 gap-2 items-center lg:m-auto lg:w-[90%]'>
            <div className='text-center'>
              <h1 className='text-center font-bold text-red-500 text-[22px] sm:text-[1.3rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[1.6rem] 2xl:text-[1.7rem]'>
                Eliminar una zona
              </h1>
              <p className='font-bold text-[13px] md:text-[14px]'>
                Eliminar el registro de una zona.
              </p>
            </div>
            <div className='mx-auto w-[70%] md:w-[60%]'>
              <ZoneDeleteCard form={formFamilyHouse} isDisabled={isZoneButtonsDisabled} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
