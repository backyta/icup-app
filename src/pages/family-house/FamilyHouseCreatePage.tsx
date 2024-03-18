/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  formFamilyHouseSchema,
  formSearchZoneSchema,
  formZoneSchema,
} from '@/validations/form-family-house-schema';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { type DataZoneKeys, type ZoneData } from '@/interfaces';

const preachers = [
  { label: 'Juan Carlos Medina Salinas', value: 'id1' },
  { label: 'María Elena Huamaní Ramos', value: 'id2' },
  { label: 'Jorge Luis Sánchez Cárdenas', value: 'id3' },
  { label: 'Rosa María Torres Díaz', value: 'id4' },
  { label: 'Luis Alberto Rodríguez Soto', value: 'id5' },
  { label: 'Ana María Gutiérrez Flores', value: 'id6' },
  { label: 'Pedro Pablo Pérez Torres', value: 'id7' },
  { label: 'Silvia Esther Chávez Díaz', value: 'id8' },
  { label: 'Fernando José López Ramírez', value: 'id9' },
  { label: 'Carmen Rosa Silva García', value: 'id10' },
] as const;

const supervisors = [
  { label: 'Luz Maria Condori Mejia', value: 'id1' },
  { label: 'Rolando David Gonzales Calixto', value: 'id2' },
  { label: 'Mercedes Luisa Aparcano Saavedra', value: 'id3' },
] as const;

const zones = [
  { label: 'Pisac Alto - (Indep.Lima)', value: 'id-1' },
  { label: 'Tahua Centro - (Indep.Lima)', value: 'id-2' },
  { label: 'Pisac Alto - (Huamanga - Ayacucho)', value: 'id-3' },
  { label: 'Huandoy Bajo - (Los Oliv. Lima)', value: 'id-4' },
] as const;

const data: ZoneData = {
  zoneName: 'Pisac Alto',
  country: 'Peru',
  department: 'Ayacucho',
  province: 'Huamanga',
  district: 'Pacaycasa',
  theirSupervisor: 'id2',
};

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
  const [openPreacher, setOpenPreacher] = useState(false);
  const [openSupervisor, setOpenSupervisor] = useState(false);

  const [openSearchZone, setOpenSearchZone] = useState(false);
  const [openSearchZoneUpdate, setOpenSearchZoneUpdate] = useState(false);

  const [disableInput, setDisableInput] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);

  const [showEditMode, setShowEditMode] = useState(true);

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
    },
  });

  const formCreateZone = useForm<z.infer<typeof formZoneSchema>>({
    resolver: zodResolver(formZoneSchema),
    defaultValues: {
      zoneName: '',
      country: '',
      department: '',
      province: '',
      district: '',
    },
  });

  const formUpdateZone = useForm<z.infer<typeof formZoneSchema>>({
    resolver: zodResolver(formZoneSchema),
    defaultValues: {
      zoneName: '',
      country: '',
      department: '',
      province: '',
      district: '',
    },
  });

  const formSearchZone = useForm<z.infer<typeof formSearchZoneSchema>>({
    resolver: zodResolver(formSearchZoneSchema),
    defaultValues: {
      zoneName: '',
    },
  });

  // console.log(formZone.getValues());

  //* Watchers
  const watchZone = formFamilyHouse.watch('zoneName');

  const watchCreateSupervisor = formCreateZone.watch('theirSupervisor');
  const watchCreateZoneName = formCreateZone.watch('zoneName');
  const watchCreateCountry = formCreateZone.watch('country');
  const watchCreateDepartment = formCreateZone.watch('department');
  const watchCreateProvince = formCreateZone.watch('province');
  const watchCreateDistrict = formCreateZone.watch('district');

  const watchUpdateSupervisor = formUpdateZone.watch('theirSupervisor');
  const watchUpdateZoneName = formUpdateZone.watch('zoneName');
  const watchUpdateCountry = formUpdateZone.watch('country');
  const watchUpdateDepartment = formUpdateZone.watch('department');
  const watchUpdateProvince = formUpdateZone.watch('province');
  const watchUpdateDistrict = formUpdateZone.watch('district');

  const watchSearchZoneName = formSearchZone.watch('zoneName');

  useEffect(() => {
    if (
      formCreateZone.getValues('zoneName') &&
      formCreateZone.getValues('country') &&
      formCreateZone.getValues('department') &&
      formCreateZone.getValues('province') &&
      formCreateZone.getValues('district') &&
      formCreateZone.getValues('theirSupervisor')
    ) {
      setIsButtonDisabled(false);
    }

    if (
      !formCreateZone.getValues('zoneName') ||
      !formCreateZone.getValues('country') ||
      !formCreateZone.getValues('department') ||
      !formCreateZone.getValues('province') ||
      !formCreateZone.getValues('district') ||
      !formCreateZone.getValues('theirSupervisor')
    ) {
      setIsButtonDisabled(true);
    }
  }, [
    watchCreateSupervisor,
    watchCreateZoneName,
    watchCreateCountry,
    watchCreateDepartment,
    watchCreateProvince,
    watchCreateDistrict,
  ]);

  useEffect(() => {
    if (
      formUpdateZone.getValues('zoneName') &&
      formUpdateZone.getValues('country') &&
      formUpdateZone.getValues('department') &&
      formUpdateZone.getValues('province') &&
      formUpdateZone.getValues('district') &&
      formUpdateZone.getValues('theirSupervisor')
    ) {
      setIsButtonDisabled(false);
    }

    if (
      !formUpdateZone.getValues('zoneName') ||
      !formUpdateZone.getValues('country') ||
      !formUpdateZone.getValues('department') ||
      !formUpdateZone.getValues('province') ||
      !formUpdateZone.getValues('district') ||
      !formUpdateZone.getValues('theirSupervisor')
    ) {
      setIsButtonDisabled(true);
    }

    if (formSearchZone.getValues('zoneName')) {
      setIsSearchButtonDisabled(false);
    }
    if (!formSearchZone.getValues('zoneName')) {
      setIsSearchButtonDisabled(true);
    }
  }, [
    watchUpdateSupervisor,
    watchUpdateZoneName,
    watchUpdateCountry,
    watchUpdateDepartment,
    watchUpdateProvince,
    watchUpdateDistrict,
    watchSearchZoneName,
  ]);

  // console.log(formUpdateZone.getValues());
  useEffect(() => {
    if (formFamilyHouse.getValues('zoneName')) {
      setDisableInput(false);
    }
  }, [watchZone]);

  const handleSubmit = (
    values: z.infer<typeof formFamilyHouseSchema>
  ): void => {
    console.log({ values });
  };

  const handleSubmitCreateZone = (
    values: z.infer<typeof formZoneSchema>
  ): void => {
    console.log({ values });
  };

  const handleSubmitUpdateZone = (
    values: z.infer<typeof formZoneSchema>
  ): void => {
    console.log({ values });
  };

  const handleSubmitSearchZone = (
    values: z.infer<typeof formSearchZoneSchema>
  ): void => {
    for (const key in data) {
      formUpdateZone.setValue(key as DataZoneKeys, data[key as DataZoneKeys]);
    }
    setShowEditMode(false);
    console.log({ values });
  };

  return (
    <>
      <h1 className='text-center pb-4 pt-1 font-sans text-2xl sm:text-3xl font-bold text-family-color text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Casa Familiar
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h1 className='text-left px-4 py-2 sm:px-10 sm:pt-4 sm:pb-1 2xl:text-center 2xl:pt-4 font-sans font-bold text-green-500 text-[1.6rem] sm:text-[2.0rem] md:text-[1.75rem] lg:text-[1.95rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Crear una nueva casa familiar
      </h1>

      <p className='dark:text-slate-300 text-left font-sans text-[14px] font-bold px-4 sm:px-10 text-sm md:text-[15px] xl:text-base  2xl:text-center pb-4'>
        Por favor, elige una opción: crear una nueva zona o modificar una zona
        existente por falta de supervisor o para cambiar su nombre.
      </p>

      <div className='flex px-10 sm:px-20 gap-6 lg:w-[50rem] lg:mx-auto  2xl:w-[60rem] lg:gap-10 pb-7'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              onClick={() => {
                formCreateZone.resetField('zoneName');
                formCreateZone.resetField('country');
                formCreateZone.resetField('department');
                formCreateZone.resetField('province');
                formCreateZone.resetField('district');
                formCreateZone.resetField('theirSupervisor');
                setIsButtonDisabled(true);
              }}
              className='w-full text-[14px]  disabled:bg-slate-500 disabled:text-white bg-yellow-400 text-yellow-700 hover:text-white hover:bg-yellow-500'
            >
              Crear nueva zona
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='max-w-[40rem]'>
            <AlertDialogHeader className='h-auto'>
              <AlertDialogTitle className='text-green-500 text-center font-bold text-[22px]'>
                Crear nueva zona
              </AlertDialogTitle>
              <div>
                {/* Create Zone */}

                <Form {...formCreateZone}>
                  <form
                    onSubmit={formCreateZone.handleSubmit(
                      handleSubmitCreateZone
                    )}
                    className='max-w-[60rem] w-full flex flex-col md:grid sm:grid-cols-2 gap-x-8 gap-y-7'
                  >
                    <FormField
                      control={formCreateZone.control}
                      name='zoneName'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='text-[13px] sm:text-[14px] lg:text-[15px] font-bold'>
                              Nombre
                            </FormLabel>
                            <FormDescription className='text-[12px] md:text-[13px] lg:[14px]'>
                              Asignar una nombre a la zona.
                            </FormDescription>
                            <FormControl>
                              <Input
                                className='text-black dark:text-white'
                                placeholder='Eje: A, Tahua-1, P-1...'
                                type='text'
                                {...field}
                              />
                            </FormControl>
                            <span
                              className={cn(
                                `text-red-500 text-[12px] md:text-[13px] font-medium px-2`,
                                formCreateZone.getValues('zoneName') && 'hidden'
                              )}
                            >
                              Por favor ingresa un nombre.
                            </span>
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={formCreateZone.control}
                      name='country'
                      render={({ field }) => {
                        return (
                          <FormItem className=''>
                            <FormLabel className='text-[13px] sm:text-[14px] font-medium'>
                              País
                            </FormLabel>

                            <FormControl>
                              <Input
                                className='text-black dark:text-white'
                                placeholder='Eje: A, Tahua-1, P-1...'
                                type='text'
                                {...field}
                              />
                            </FormControl>
                            <span
                              className={cn(
                                `text-red-500 text-[12px] md:text-[13px] font-medium px-2`,
                                formCreateZone.getValues('country') && 'hidden'
                              )}
                            >
                              Por favor ingresa un nombre.
                            </span>
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={formCreateZone.control}
                      name='department'
                      render={({ field }) => {
                        return (
                          <FormItem className=''>
                            <FormLabel className='text-[13px] sm:text-[14px] font-medium'>
                              Departamento
                            </FormLabel>

                            <FormControl>
                              <Input
                                className='text-black dark:text-white'
                                placeholder='Eje: A, Tahua-1, P-1...'
                                type='text'
                                {...field}
                              />
                            </FormControl>
                            <span
                              className={cn(
                                `text-red-500 text-[12px] md:text-[13px] font-medium px-2`,
                                formCreateZone.getValues('department') &&
                                  'hidden'
                              )}
                            >
                              Por favor ingresa un nombre.
                            </span>
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={formCreateZone.control}
                      name='province'
                      render={({ field }) => {
                        return (
                          <FormItem className=''>
                            <FormLabel className='text-[13px] sm:text-[14px] font-medium'>
                              Provincia
                            </FormLabel>

                            <FormControl>
                              <Input
                                className='text-black dark:text-white'
                                placeholder='Eje: A, Tahua-1, P-1...'
                                type='text'
                                {...field}
                              />
                            </FormControl>
                            <span
                              className={cn(
                                `text-red-500 text-[12px] md:text-[13px] font-medium px-2`,
                                formCreateZone.getValues('province') && 'hidden'
                              )}
                            >
                              Por favor ingresa un nombre.
                            </span>
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={formCreateZone.control}
                      name='district'
                      render={({ field }) => {
                        return (
                          <FormItem className=''>
                            <FormLabel className='text-[13px] sm:text-[14px] font-medium'>
                              Distrito
                            </FormLabel>

                            <FormControl>
                              <Input
                                className='text-black dark:text-white'
                                placeholder='Eje: A, Tahua-1, P-1...'
                                type='text'
                                {...field}
                              />
                            </FormControl>
                            <span
                              className={cn(
                                `text-red-500 text-[12px] md:text-[13px] font-medium px-2`,
                                formCreateZone.getValues('district') && 'hidden'
                              )}
                            >
                              Por favor ingresa un nombre.
                            </span>
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={formCreateZone.control}
                      name='theirSupervisor'
                      render={({ field }) => {
                        return (
                          <FormItem className='md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 flex flex-col'>
                            <FormLabel className='text-[13px] sm:text-[14px] lg:text-[15px] font-bold'>
                              Supervisor
                            </FormLabel>
                            <FormDescription className='text-[12px] md:text-[13px] lg:[14px]'>
                              Seleccione un supervisor para esta zona.
                            </FormDescription>
                            <Popover
                              open={openSupervisor}
                              onOpenChange={setOpenSupervisor}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant='outline'
                                    role='combobox'
                                    className={cn(
                                      'w-full justify-between text-black dark:text-white',
                                      !field.value &&
                                        'text-slate-400 font-normal'
                                    )}
                                  >
                                    {field.value
                                      ? supervisors.find(
                                          (supervisor) =>
                                            supervisor.value === field.value
                                        )?.label
                                      : 'Busque y seleccione un supervisor'}
                                    <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                align='center'
                                className='w-auto p-2'
                              >
                                <Command>
                                  <CommandInput
                                    placeholder='Busque un supervisor...'
                                    className='h-9 text-sm lg:text-[15px]'
                                  />
                                  <CommandEmpty>
                                    Supervisor no encontrado.
                                  </CommandEmpty>
                                  <CommandGroup className='max-h-[200px] h-auto'>
                                    {supervisors.map((supervisor) => (
                                      <CommandItem
                                        className='text-[13px] md:text-[14px]'
                                        value={supervisor.label}
                                        key={supervisor.value}
                                        onSelect={() => {
                                          formCreateZone.setValue(
                                            'theirSupervisor',
                                            supervisor.value
                                          );
                                          setOpenSupervisor(false);
                                        }}
                                      >
                                        {supervisor.label}
                                        <CheckIcon
                                          className={cn(
                                            'ml-auto h-4 w-4',
                                            supervisor.value === field.value
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <span
                              className={cn(
                                `text-red-500 text-[12px] md:text-[13px] font-medium`,
                                formCreateZone.getValues('theirSupervisor') &&
                                  'hidden'
                              )}
                            >
                              Por favor elige un Supervisor.
                            </span>
                          </FormItem>
                        );
                      }}
                    />

                    <AlertDialogFooter className='col-start-1 col-end-3'>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={isButtonDisabled}
                        type='submit'
                      >
                        Aceptar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </Form>
              </div>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>

        {/* Update Zone */}

        {/* // Agregar un boton de buscar y un input de zona o supervisor */}
        {/* // El input listara todos los supervisores y zonas */}
        {/* Ver si solo buscar por nombre de zona y traer todas las concidencias en una lista */}
        {/*  Elegir de esa lista uno (hacer solicitud y traer) su data y setear en input, ahi podremos */}
        {/* modificar y luego en guardar cambios */}
        {/* //TODO : trabajar en buscar la zona por nombre o por supervisor(puede no haber) y mostrar las zonas  */}
        {/* //TODO :   */}
        {/* //TODO : con un input y su datos y un boton que diga editar (habilitar el input)  */}
        {/* className='w-full text-[14px]  disabled:bg-slate-500 disabled:text-white bg-orange-400 text-orange-700 hover:text-white hover:bg-orange-500'> */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              onClick={() => {
                formSearchZone.resetField('zoneName');
                setIsButtonDisabled(true);
                setShowEditMode(true);
              }}
              className='w-full text-[14px]  disabled:bg-slate-500 disabled:text-white bg-orange-400 text-orange-700 hover:text-white hover:bg-orange-500'
            >
              Actualizar una zona
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='max-w-[40rem]'>
            <AlertDialogHeader className='h-auto'>
              <AlertDialogTitle className='text-orange-500 text-center font-bold text-[22px]'>
                Actualizar una zona
              </AlertDialogTitle>
              <div>
                {/* Search Zone */}
                {/* Se hara una búsqueda directa a la tabla zonas y se guardara en un array */}
                {/* y se leera todas las zonas de ese array y se meteran al combox */}
                {/* Al elegir una buscara solo 1 (zona unique), buscar por id */}
                {/*  Si hay zonas en otros lados del pais con el mismo nombre identificar por, distrito, deptm. */}
                {/* En el front traer la data y hacer un map para componer el name Pisac Alto - Huanc. Huanuco, Pisac Alto, Indp. Lima */}
                <Form {...formSearchZone}>
                  <form
                    onSubmit={formSearchZone.handleSubmit(
                      handleSubmitSearchZone
                    )}
                    className='max-w-[60rem] w-full flex flex-col md:grid sm:grid-cols-2 gap-x-8 gap-y-7 items-center'
                  >
                    <FormField
                      control={formSearchZone.control}
                      name='zoneName'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='text-[13px] sm:text-[14px] lg:text-[15px] font-bold'>
                              Zonas
                            </FormLabel>
                            <FormDescription className='text-[12px] md:text-[13px] lg:[14px]'>
                              Seleccione un zona a buscar.
                            </FormDescription>
                            <Popover
                              open={openSearchZoneUpdate}
                              onOpenChange={setOpenSearchZoneUpdate}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant='outline'
                                    role='combobox'
                                    className={cn(
                                      'w-full justify-between text-black dark:text-white',
                                      !field.value &&
                                        'text-slate-400 font-normal'
                                    )}
                                  >
                                    {field.value
                                      ? zones.find(
                                          (zone) => zone.value === field.value
                                        )?.label
                                      : 'Busque y seleccione una zona'}
                                    <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                align='center'
                                className='w-auto p-2'
                              >
                                <Command>
                                  <CommandInput
                                    placeholder='Busque una zona...'
                                    className='h-9 text-sm lg:text-[15px]'
                                  />
                                  <CommandEmpty>
                                    Zona no encontrada.
                                  </CommandEmpty>
                                  <CommandGroup className='max-h-[200px] h-auto'>
                                    {zones.map((zone) => (
                                      <CommandItem
                                        className='text-[13px] md:text-[14px]'
                                        value={zone.label}
                                        key={zone.value}
                                        onSelect={() => {
                                          formSearchZone.setValue(
                                            'zoneName',
                                            zone.value
                                          );
                                          setOpenSearchZoneUpdate(false);
                                        }}
                                      >
                                        {zone.label}
                                        <CheckIcon
                                          className={cn(
                                            'ml-auto h-4 w-4',
                                            zone.value === field.value
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <span
                              className={cn(
                                `text-red-500 text-[12px] md:text-[13px] font-medium`,
                                formSearchZone.getValues('zoneName') && 'hidden'
                              )}
                            >
                              Por favor elige un Supervisor.
                            </span>
                          </FormItem>
                        );
                      }}
                    />
                    <Button
                      disabled={isSearchButtonDisabled}
                      type='submit'
                      className='mt-[3.5rem]'
                    >
                      Buscar
                    </Button>
                  </form>
                </Form>

                {/* Update Zone */}
                {!showEditMode && (
                  <Form {...formUpdateZone}>
                    <form
                      onSubmit={formUpdateZone.handleSubmit(
                        handleSubmitUpdateZone
                      )}
                      className='max-w-[60rem] w-full flex flex-col md:grid sm:grid-cols-2 gap-x-8 gap-y-7'
                    >
                      <span className='inline-block col-start-1 col-end-3 row-start-1 row-end-2 mt-4 font-medium text-green-500'>
                        Editar zona seleccionada
                      </span>
                      <FormField
                        control={formUpdateZone.control}
                        name='zoneName'
                        render={({ field }) => {
                          return (
                            <FormItem className='col-start-1 col-end-2 row-start-2 row-end-3'>
                              <FormLabel className='text-[13px] sm:text-[14px] font-medium'>
                                Nombre
                              </FormLabel>

                              <FormControl>
                                <Input
                                  className='text-black dark:text-white'
                                  placeholder='Eje: A, Tahua-1, P-1...'
                                  type='text'
                                  {...field}
                                />
                              </FormControl>
                              <span
                                className={cn(
                                  `text-red-500 text-[12px] md:text-[13px] font-medium px-2`,
                                  formUpdateZone.getValues('zoneName') &&
                                    'hidden'
                                )}
                              >
                                Por favor ingresa un nombre.
                              </span>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={formUpdateZone.control}
                        name='country'
                        render={({ field }) => {
                          return (
                            <FormItem className=''>
                              <FormLabel className='text-[13px] sm:text-[14px] font-medium'>
                                País
                              </FormLabel>

                              <FormControl>
                                <Input
                                  className='text-black dark:text-white'
                                  placeholder='Eje: A, Tahua-1, P-1...'
                                  type='text'
                                  {...field}
                                />
                              </FormControl>
                              <span
                                className={cn(
                                  `text-red-500 text-[12px] md:text-[13px] font-medium px-2`,
                                  formUpdateZone.getValues('country') &&
                                    'hidden'
                                )}
                              >
                                Por favor ingresa un nombre.
                              </span>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={formUpdateZone.control}
                        name='department'
                        render={({ field }) => {
                          return (
                            <FormItem className=''>
                              <FormLabel className='text-[13px] sm:text-[14px] font-medium'>
                                Departamento
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className='text-black dark:text-white'
                                  placeholder='Eje: A, Tahua-1, P-1...'
                                  type='text'
                                  {...field}
                                />
                              </FormControl>
                              <span
                                className={cn(
                                  `text-red-500 text-[12px] md:text-[13px] font-medium px-2`,
                                  formUpdateZone.getValues('department') &&
                                    'hidden'
                                )}
                              >
                                Por favor ingresa un nombre.
                              </span>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={formUpdateZone.control}
                        name='province'
                        render={({ field }) => {
                          return (
                            <FormItem className=''>
                              <FormLabel className='text-[13px] sm:text-[14px] font-medium'>
                                Provincia
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className='text-black dark:text-white'
                                  placeholder='Eje: A, Tahua-1, P-1...'
                                  type='text'
                                  {...field}
                                />
                              </FormControl>
                              <span
                                className={cn(
                                  `text-red-500 text-[12px] md:text-[13px] font-medium px-2`,
                                  formUpdateZone.getValues('province') &&
                                    'hidden'
                                )}
                              >
                                Por favor ingresa un nombre.
                              </span>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={formUpdateZone.control}
                        name='district'
                        render={({ field }) => {
                          return (
                            <FormItem className=''>
                              <FormLabel className='text-[13px] sm:text-[14px] font-medium'>
                                Distrito
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className='text-black dark:text-white'
                                  placeholder='Eje: A, Tahua-1, P-1...'
                                  type='text'
                                  {...field}
                                />
                              </FormControl>
                              <span
                                className={cn(
                                  `text-red-500 text-[12px] md:text-[13px] font-medium px-2`,
                                  formUpdateZone.getValues('district') &&
                                    'hidden'
                                )}
                              >
                                Por favor ingresa un nombre.
                              </span>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={formUpdateZone.control}
                        name='theirSupervisor'
                        render={({ field }) => {
                          return (
                            <FormItem className='md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3 flex flex-col'>
                              <FormLabel className='text-[13px] sm:text-[14px] lg:text-[15px] font-bold'>
                                Supervisor
                              </FormLabel>

                              <Popover
                                open={openSupervisor}
                                onOpenChange={setOpenSupervisor}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant='outline'
                                      role='combobox'
                                      className={cn(
                                        'w-full justify-between text-black dark:text-white',
                                        !field.value &&
                                          'text-slate-400 font-normal'
                                      )}
                                    >
                                      {field.value
                                        ? supervisors.find(
                                            (supervisor) =>
                                              supervisor.value === field.value
                                          )?.label
                                        : 'Busque y seleccione un supervisor'}
                                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  align='center'
                                  className='w-auto p-2'
                                >
                                  <Command>
                                    <CommandInput
                                      placeholder='Busque un supervisor...'
                                      className='h-9 text-sm lg:text-[15px]'
                                    />
                                    <CommandEmpty>
                                      Supervisor no encontrado.
                                    </CommandEmpty>
                                    <CommandGroup className='max-h-[200px] h-auto'>
                                      {supervisors.map((supervisor) => (
                                        <CommandItem
                                          className='text-[13px] md:text-[14px]'
                                          value={supervisor.label}
                                          key={supervisor.value}
                                          onSelect={() => {
                                            formUpdateZone.setValue(
                                              'theirSupervisor',
                                              supervisor.value
                                            );
                                            setOpenSupervisor(false);
                                          }}
                                        >
                                          {supervisor.label}
                                          <CheckIcon
                                            className={cn(
                                              'ml-auto h-4 w-4',
                                              supervisor.value === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <span
                                className={cn(
                                  `text-red-500 text-[12px] md:text-[13px] font-medium`,
                                  formUpdateZone.getValues('theirSupervisor') &&
                                    'hidden'
                                )}
                              >
                                Por favor elige un Supervisor.
                              </span>
                            </FormItem>
                          );
                        }}
                      />

                      <AlertDialogFooter className='col-start-1 col-end-3'>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={isButtonDisabled}
                          type='submit'
                        >
                          Guardar cambios
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </form>
                  </Form>
                )}
              </div>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* //! Formulario de creación de casa familiar  */}
      <p className='dark:text-slate-300 text-left font-sans text-[14px] font-bold px-4 sm:px-10 text-sm md:text-[15px] xl:text-base  2xl:text-center'>
        Por favor llena los siguientes datos para crear una nueva casa familiar.
      </p>

      <div className='flex min-h-screen flex-col items-center justify-between px-8 py-4 sm:px-10 sm:py-8 2xl:px-36 2xl:py-8'>
        <Form {...formFamilyHouse}>
          <form
            onSubmit={formFamilyHouse.handleSubmit(handleSubmit)}
            className='max-w-[60rem] w-full flex flex-col md:grid sm:grid-cols-2 gap-x-10 gap-y-7'
          >
            <FormField
              control={formFamilyHouse.control}
              name='zoneName'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Zona
                    </FormLabel>
                    <FormDescription className='text-sm lg:text-[15px]'>
                      Asignar una zona a la que pertenecerá la casa familiar.
                    </FormDescription>
                    <Popover
                      open={openSearchZone}
                      onOpenChange={setOpenSearchZone}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-slate-500 font-normal'
                            )}
                          >
                            {field.value
                              ? zones.find((zone) => zone.value === field.value)
                                  ?.label
                              : 'Busque y seleccione una zona'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto p-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque una zona...'
                            className='h-9 text-sm lg:text-[15px]'
                          />
                          <CommandEmpty>Zona no encontrada.</CommandEmpty>
                          <CommandGroup className='max-h-[200px] h-auto'>
                            {zones.map((zone) => (
                              <CommandItem
                                className='text-[13px] md:text-[14px]'
                                value={zone.label}
                                key={zone.value}
                                onSelect={() => {
                                  formFamilyHouse.setValue(
                                    'zoneName',
                                    zone.value
                                  );
                                  setOpenSearchZone(false);
                                }}
                              >
                                {zone.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    zone.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                    <FormDescription className='text-[13px] text-red-500 font-medium'>
                      * Si no hay zonas disponibles o quieres una nueva, deber
                      crearla.
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
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Predicador
                    </FormLabel>
                    <FormDescription className='text-sm lg:text-[15px]'>
                      Seleccione un predicador para esta casa familiar.
                    </FormDescription>
                    <Popover open={openPreacher} onOpenChange={setOpenPreacher}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={disableInput}
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-slate-400 font-normal',
                              disableInput && 'dark:bg-gray-100 bg-gray-300'
                            )}
                          >
                            {field.value
                              ? preachers.find(
                                  (preacher) => preacher.value === field.value
                                )?.label
                              : 'Busque y seleccione un predicador'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto p-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un predicador...'
                            className='h-9 text-sm lg:text-[15px]'
                          />
                          <CommandEmpty>Predicador no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[200px] h-auto'>
                            {preachers.map((preacher) => (
                              <CommandItem
                                className='text-[13px] md:text-[14px]'
                                value={preacher.label}
                                key={preacher.value}
                                onSelect={() => {
                                  formFamilyHouse.setValue(
                                    'theirPreacher',
                                    preacher.value
                                  );
                                  setOpenPreacher(false);
                                }}
                              >
                                {preacher.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    preacher.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
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
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Nombre
                    </FormLabel>
                    <FormDescription className='text-sm lg:text-[15px]'>
                      Asignar una nombre a la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className={cn(
                          disableInput && 'dark:bg-gray-100 bg-gray-300'
                        )}
                        disabled={disableInput}
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
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      País
                    </FormLabel>
                    <FormDescription className='text-sm lg:text-[15px]'>
                      Asignar una país a la que pertenece la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className={cn(
                          disableInput && 'dark:bg-gray-100 bg-gray-300'
                        )}
                        disabled={disableInput}
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
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Departamento
                    </FormLabel>
                    <FormDescription className='text-sm lg:text-[15px]'>
                      Asignar un departamento a la pertenece la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className={cn(
                          disableInput && 'dark:bg-gray-100 bg-gray-300'
                        )}
                        disabled={disableInput}
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
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Provincia
                    </FormLabel>
                    <FormDescription className='text-sm lg:text-[15px]'>
                      Asignar una provincia a la que pertenece la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className={cn(
                          disableInput && 'dark:bg-gray-100 bg-gray-300'
                        )}
                        disabled={disableInput}
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
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Distrito
                    </FormLabel>
                    <FormDescription className='text-sm lg:text-[15px]'>
                      Asignar un distrito al que pertenece la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className={cn(
                          disableInput && 'dark:bg-gray-100 bg-gray-300'
                        )}
                        disabled={disableInput}
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
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Dirección
                    </FormLabel>
                    <FormDescription className='text-sm lg:text-[15px]'>
                      Asignar una dirección al que pertenece la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className={cn(
                          disableInput && 'dark:bg-gray-100 bg-gray-300'
                        )}
                        disabled={disableInput}
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

            <Button
              type='submit'
              className='w-[20rem] mx-auto col-start-1 col-end-3 text-sm md:text-md xl:text-base mt-12'
            >
              Registrar Casa Familiar
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
