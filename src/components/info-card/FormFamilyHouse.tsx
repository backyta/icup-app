/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';

import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Card, CardContent } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

import { formFamilyHouseSchema } from '@/validations';
import { preachers, zones } from '@/data';
import { type DataFamilyHouseKeys, type FamilyHouseData } from '@/interfaces';
import { Toaster, toast } from 'sonner';

// Si quiero modificar la casa, la zona si cambia debe tener un predicador que tenga un supervisor
// a cargo de esa zona, los predicadores deben estar disponibles de lo contrario lanzar error
// Al hacer click hacer lógica para consultar datos de los preacher disponibles según la zona y su supervisor
// Si no hay se lanza un error diciendo que no hay predicadores disponibles  (deshabilitar el botón si lanza error)

// ? Esto seria en la búsqueda del Update
// TODO : debería hacer una búsqueda(search by) por miembros y casas (huérfanos) (hacer select de los their),
// TODO : en miembros buscamos por miembros sin pastor, copastor, supervisor, predicador, para actualizar.
// TODO : en casas buscamos por casas sin predicador,(asignar predicador con el mismo supervisor de la zona), para actualizar.

// NOTE : ver si se hace el fetch aquí o el UpdateCard.
// NOTE : hay que personalizar el aviso de promover según su pagina pastor , copastor, leader....
// NOTE : hacer llamado según el ID para traer la data

const data: FamilyHouseData = {
  zoneName: zones[1].value,
  houseName: 'Los Guerreros de Dios',
  country: 'Peru',
  department: 'Lima',
  province: 'Lima',
  district: 'Independencia',
  address: 'Av. Hayan Capac 123',
  theirPreacher: 'id2',
};

// NOTE : ver si pasar mas props y colocar en interfaces folder
interface FormMemberProps {
  onSubmit: () => void;
}

// TODO : se podrá cambiar o actualizar de zona a la casa y tendrá el mismo efecto al colocar su predicador.
// NOTE : si es nueva zona entonces

//* Para actualizar
// Sera como un crear los datos estarán seteados pero podre cambiar de zona y este me listara todos sus predicadores
// No se podrá cambiar de zona y de predicador de otra zona ala vez, primero debo cambiar el supervisor de predicador
// para que pueda aparecer en dicha zona.

// Al cambiar el supervisor del predicador (se borran su relaciones anteriores) , por lo que esta libre de la
// casa anterior, entonces solo se necesita buscar por zona al actualizar y me regresara a los predicadores disponibles o solos.

// TODO : setear los datos y trabajar en el onSubmit cerrar modal
// TODO : Acomodar la vista y fingir el seto nuevo de data con los datos que ya tengo (que funcione el form)

export const FormFamilyHouse = ({ onSubmit }: FormMemberProps): JSX.Element => {
  const [openPreacher, setOpenPreacher] = useState(false);
  const [openZone, setOpenZone] = useState(false);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const [disableInput, setDisableInput] = useState(false);

  const form = useForm<z.infer<typeof formFamilyHouseSchema>>({
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
  //* Watchers

  const watchPreacher = form.watch('theirPreacher');
  const watchZoneName = form.watch('zoneName');
  const watchCountry = form.watch('country');
  const watchDepartment = form.watch('department');
  const watchProvince = form.watch('province');
  const watchDistrict = form.watch('district');
  const watchAddress = form.watch('address');

  useEffect(() => {
    for (const key in data) {
      form.setValue(
        key as DataFamilyHouseKeys,
        data[key as DataFamilyHouseKeys]
      );
    }
  }, []);

  useEffect(() => {
    if (
      form.getValues('zoneName') &&
      form.getValues('country') &&
      form.getValues('department') &&
      form.getValues('province') &&
      form.getValues('district') &&
      form.getValues('address') &&
      form.getValues('theirPreacher')
    ) {
      setIsSubmitButtonDisabled(false);
    }

    if (
      !form.getValues('zoneName') ||
      !form.getValues('country') ||
      !form.getValues('department') ||
      !form.getValues('province') ||
      !form.getValues('district') ||
      !form.getValues('address') ||
      !form.getValues('theirPreacher')
    ) {
      setIsSubmitButtonDisabled(true);
    }
  }, [
    watchPreacher,
    watchZoneName,
    watchCountry,
    watchDepartment,
    watchProvince,
    watchDistrict,
    watchAddress,
  ]);

  const handleSubmit = (
    values: z.infer<typeof formFamilyHouseSchema>
  ): void => {
    // TODO : enviar datos al backend actualizar
    console.log({ values });
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[890px] xl:w-[1000px] overflow-y-auto'
    >
      <TabsList className='grid w-full md:grid-cols-1 px-auto'>
        <TabsTrigger
          value='general-info'
          className='text-[14px] md:text-[15px]'
        >
          Actualizar información de casa familiar
        </TabsTrigger>
      </TabsList>

      <TabsContent value='general-info' className='overflow-y-auto'>
        <Card className='w-full'>
          <CardContent className='py-3 px-4'>
            {/* Aca podría ser un componente pasamos todos por props */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='max-w-[60rem] w-full flex flex-col md:grid sm:grid-cols-2 gap-x-10 gap-y-7 px-2 sm:px-6'
              >
                <FormField
                  control={form.control}
                  name='zoneName'
                  render={({ field }) => {
                    return (
                      <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                        <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                          Zona
                        </FormLabel>
                        <FormDescription className='text-sm lg:text-[15px]'>
                          Asignar una zona a la que pertenecerá la casa
                          familiar.
                        </FormDescription>
                        <Popover open={openZone} onOpenChange={setOpenZone}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={disableInput}
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between',
                                  !field.value && 'text-slate-500 font-normal'
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
                                      form.setValue('zoneName', zone.value);
                                      setOpenZone(false);
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
                        <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                          Predicador
                        </FormLabel>
                        <FormDescription className='text-sm lg:text-[15px]'>
                          Seleccione un predicador para esta casa familiar.
                        </FormDescription>
                        <Popover
                          open={openPreacher}
                          onOpenChange={setOpenPreacher}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={disableInput}
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between',
                                  !field.value && 'text-slate-400 font-normal'
                                )}
                              >
                                {field.value
                                  ? preachers.find(
                                      (preacher) =>
                                        preacher.value === field.value
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
                              <CommandEmpty>
                                Predicador no encontrado.
                              </CommandEmpty>
                              <CommandGroup className='max-h-[200px] h-auto'>
                                {preachers.map((preacher) => (
                                  <CommandItem
                                    className='text-[13px] md:text-[14px]'
                                    value={preacher.label}
                                    key={preacher.value}
                                    onSelect={() => {
                                      form.setValue(
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
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
                  name='department'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                          Departamento
                        </FormLabel>
                        <FormDescription className='text-sm lg:text-[15px]'>
                          Asignar un departamento a la pertenece la casa
                          familiar.
                        </FormDescription>
                        <FormControl>
                          <Input
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
                  control={form.control}
                  name='province'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                          Provincia
                        </FormLabel>
                        <FormDescription className='text-sm lg:text-[15px]'>
                          Asignar una provincia a la que pertenece la casa
                          familiar.
                        </FormDescription>
                        <FormControl>
                          <Input
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
                  control={form.control}
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
                  control={form.control}
                  name='address'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                          Dirección
                        </FormLabel>
                        <FormDescription className='text-sm lg:text-[15px]'>
                          Asignar una dirección al que pertenece la casa
                          familiar.
                        </FormDescription>
                        <FormControl>
                          <Input
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
                <div className='w-[20rem] mx-auto col-start-1 col-end-3 text-sm md:text-md xl:text-base mt-4'>
                  <Toaster position='top-center' richColors />
                  <Button
                    disabled={isSubmitButtonDisabled}
                    type='submit'
                    className='w-full text-[14px]'
                    onClick={() => {
                      // TODO : agregar promesa cuando se consulte hacer timer y luego mostrar toast (fetch real)
                      setTimeout(() => {
                        if (Object.keys(form.formState.errors).length === 0) {
                          toast.success('Cambios guardados correctamente', {
                            position: 'top-center',
                            className: 'justify-center',
                          });

                          setDisableInput(true);
                          setIsSubmitButtonDisabled(true);
                        }
                      }, 100);
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
