/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { formSearchZoneSchema, formZoneSchema } from '@/app/family-house/validations';
import { type DataZoneKeys, type ZoneData } from '@/app/family-house/interfaces';

import { cn } from '@/shared/lib/utils';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';

import { supervisors, zones } from '@/shared/data';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Toaster, toast } from 'sonner';
import { useZoneUpdateSubmitButtonsLogic } from '@/hooks/useZoneUpdateSubmitButtonsLogic';

// data ficticia
const data: ZoneData = {
  zoneName: 'Pisac Alto',
  country: 'Peru',
  department: 'Ayacucho',
  province: 'Huamanga',
  district: 'Pacaycasa',
  theirSupervisor: 'id2',
};

// NOTE: notes.
/* // Agregar un botón de buscar y un input de zona o supervisor */
/* // El input listara todos los supervisores y zonas */
/* Ver si solo buscar por nombre de zona y traer todas las conciencias en una lista */
/*  Elegir de esa lista uno (hacer solicitud y traer) su data y setear en input, ahi podremos */
/* modificar y luego en guardar cambios */
/* //TODO : trabajar en buscar la zona por nombre o por supervisor(puede no haber) y mostrar las zonas  */
/* //TODO : con un input y su datos y un botón que diga editar (habilitar el input)  */

/* className='w-full text-[14px]  disabled:bg-slate-500 disabled:text-white bg-orange-400 text-orange-700 hover:text-white hover:bg-orange-500'> */

// ?  Hacer componte de search Search Zone
/* Se hará una búsqueda directa a la tabla zonas y se guardara en un array */
/* y se leerá todas las zonas de ese array y se meterán al combox */
/* Al elegir una buscara solo 1 (zona unique), buscar por id */
/*  Si hay zonas en otros lados del país con el mismo nombre identificar por, distrito, deptm. */
/* En el front traer la data y hacer un map para componer el name Pisac Alto - Huanc. Huanuco, Pisac Alto, Indp. Lima */

interface Props {
  onClose: () => void;
  onScroll: () => void;
}

export const ZoneUpdateForm = ({ onClose, onScroll }: Props): JSX.Element => {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);

  const [isShowEditMode, setIsShowEditMode] = useState(true);

  const [isSearchZoneUpdateOpen, setIsSearchZoneUpdateOpen] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const [isInputSupervisorOpen, setIsInputSupervisorOpen] = useState(false);

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

  useZoneUpdateSubmitButtonsLogic({
    formSearchZone,
    formUpdateZone,
    setIsSearchButtonDisabled,
    setIsSubmitButtonDisabled,
  });

  const handleSubmitUpdateZone = (values: z.infer<typeof formZoneSchema>): void => {
    console.log({ values });
  };

  const handleSubmitSearchZone = (values: z.infer<typeof formSearchZoneSchema>): void => {
    for (const key in data) {
      formUpdateZone.setValue(key as DataZoneKeys, data[key as DataZoneKeys]);
    }
    setIsShowEditMode(false);
    console.log({ values });
  };

  return (
    <Card className='w-full'>
      <CardContent className='py-3 px-4'>
        <h2 className='text-center text-orange-500 font-bold text-[26px] md:text-3xl pt-0 pb-1'>
          Actualizar una zona
        </h2>
        <p className='pb-2 text-center font-medium text-[14px] md:text-[14.5px]'>
          Modifica los datos para actualizar el registro de una zona
        </p>
        <div>
          <Form {...formSearchZone}>
            <form
              onSubmit={formSearchZone.handleSubmit(handleSubmitSearchZone)}
              className='w-full flex flex-col md:grid sm:grid-cols-2 gap-y-4 gap-x-8 md:gap-y-7 md:items-center md:px-2'
            >
              {/* HACER COMPONENTE */}
              <FormField
                control={formSearchZone.control}
                name='zoneName'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='text-[14px] font-bold'>Zonas</FormLabel>
                      <FormDescription className='text-[14px]'>
                        Seleccione un zona a buscar.
                      </FormDescription>
                      <Popover
                        open={isSearchZoneUpdateOpen}
                        onOpenChange={setIsSearchZoneUpdateOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={isInputDisabled}
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-full justify-between text-black dark:text-white',
                                !field.value && 'text-slate-400 font-normal'
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
                                    formSearchZone.setValue('zoneName', zone.value);
                                    setIsSearchZoneUpdateOpen(false);
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
              <Button
                disabled={isSearchButtonDisabled || isInputDisabled}
                type='submit'
                className='md:mt-[3.5rem] w-full text-[14px] bg-green-500 text-green-950 hover:bg-green-500 hover:text-white'
              >
                Buscar
              </Button>
            </form>
          </Form>

          {/* Update Zone */}
          {!isShowEditMode && (
            <Form {...formUpdateZone}>
              <form
                onSubmit={formUpdateZone.handleSubmit(handleSubmitUpdateZone)}
                className='max-w-[60rem] w-full flex flex-col md:grid sm:grid-cols-2 gap-y-2 gap-x-8 md:gap-y-4 md:px-2'
              >
                <span className='text-[18px] md:text-[22px] text-center font-bold inline-block col-start-1 col-end-3 row-start-1 row-end-2 mt-4 text-slate-600 dark:text-slate-300'>
                  Información de la Zona
                </span>
                <FormField
                  control={formUpdateZone.control}
                  name='zoneName'
                  render={({ field }) => {
                    return (
                      <FormItem className='col-start-1 col-end-2 row-start-2 row-end-3'>
                        <FormLabel className='text-[14px] font-bold'>Nombre</FormLabel>

                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            className='text-black dark:text-white'
                            placeholder='Eje: A, Tahua-1, P-1...'
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
                  control={formUpdateZone.control}
                  name='country'
                  render={({ field }) => {
                    return (
                      <FormItem className=''>
                        <FormLabel className='text-[14px] font-bold'>País</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            className='text-black dark:text-white'
                            placeholder='Eje: A, Tahua-1, P-1...'
                            type='text'
                            {...field}
                          />
                        </FormControl>
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
                        <FormLabel className='text-[14px] font-bold'>Departamento</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            className='text-black dark:text-white'
                            placeholder='Eje: A, Tahua-1, P-1...'
                            type='text'
                            {...field}
                          />
                        </FormControl>
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
                        <FormLabel className='text-[14px] font-bold'>Provincia</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            className='text-black dark:text-white'
                            placeholder='Eje: A, Tahua-1, P-1...'
                            type='text'
                            {...field}
                          />
                        </FormControl>
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
                        <FormLabel className='text-[14px] font-bold'>Distrito</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            className='text-black dark:text-white'
                            placeholder='Eje: A, Tahua-1, P-1...'
                            type='text'
                            {...field}
                          />
                        </FormControl>
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
                        <FormLabel className='text-[14px] font-bold'>Supervisor</FormLabel>

                        <Popover
                          open={isInputSupervisorOpen}
                          onOpenChange={setIsInputSupervisorOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isInputDisabled}
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between text-black dark:text-white',
                                  !field.value && 'text-slate-400 font-normal'
                                )}
                              >
                                {field.value
                                  ? supervisors.find(
                                      (supervisor) => supervisor.value === field.value
                                    )?.label
                                  : 'Busque y seleccione un supervisor'}
                                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align='center' className='w-auto p-2'>
                            <Command>
                              <CommandInput
                                placeholder='Busque un supervisor...'
                                className='h-9 text-sm lg:text-[15px]'
                              />
                              <CommandEmpty>Supervisor no encontrado.</CommandEmpty>
                              <CommandGroup className='max-h-[200px] h-auto'>
                                {supervisors.map((supervisor) => (
                                  <CommandItem
                                    className='text-[13px] md:text-[14px]'
                                    value={supervisor.label}
                                    key={supervisor.value}
                                    onSelect={() => {
                                      formUpdateZone.setValue('theirSupervisor', supervisor.value);
                                      setIsInputSupervisorOpen(false);
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
                            formUpdateZone.getValues('theirSupervisor') && 'hidden'
                          )}
                        >
                          Por favor elige un Supervisor.
                        </span>
                      </FormItem>
                    );
                  }}
                />

                <div className='w-full md:mx-auto md:w-[50%] sm:col-start-1 sm:col-end-3 sm:row-start-5 sm:row-end-6 mt-2 md:mt-0'>
                  <Toaster position='top-center' richColors />
                  <Button
                    disabled={isSubmitButtonDisabled}
                    type='submit'
                    className='w-full text-[14px] bg-orange-500 text-white hover:bg-orange-600'
                    onClick={() => {
                      // TODO : agregar promesa cuando se consulte hacer timer y luego mostrar toast (fetch real)
                      setTimeout(() => {
                        if (Object.keys(formUpdateZone.formState.errors).length === 0) {
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
                        if (Object.keys(formUpdateZone.formState.errors).length === 0) {
                          onClose();
                        }
                      }, 1800);
                    }}
                  >
                    Guardar cambios
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
