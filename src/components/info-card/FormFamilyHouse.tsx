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
import { type FamilyHouseData } from '@/interfaces';

//* Creación de Casa Familiar
// ? Primer paso
// Selecciona la zona en el form, y se manda una solicitud busca al menos una casa con esa zona, y ve su supervisor
// si existe al menos una trae los predicadores de ese supervisor que estén disponibles osea que no tengan
// ninguna casa registrada con el o ella, si no existe ninguna casa, muestra todos los
// predicadores para setear el primer valor

//! Que pasa si un supervisor se va o elimina?
// Va busca la info encuentra casas con cierta Zona y predicadores, pero encuentra null el supervisor.
// Entonces regresa un error diciendo que no hay supervisor registrado para esta zona y predicadores
// "parece que los predicadores no tiene relación con algún supervisor, por favor asignar un supervisor para"
// "estos predicadores .... []" (Mostrar en alerta.. o modal) (buscamos en predicadores a todos los huérfanos)
// La búsqueda debe ser un tipo de búsqueda (Sin relaciones) , buscar predicadores sin (pastor, copastor, o supervisor)

// De esta manera una vez que seteamos el nuevo supervisor, lo toma la búsqueda de zona y me devuelve los
// predicadores disponibles

// ? Esto seria en la búsqueda del Update
// TODO : debería hacer una búsqueda(search by) por miembros y casas (huérfanos) (hacer select de los their),
// TODO : en miembros buscamos por miembros sin pastor, copastor, supervisor, predicador, para actualizar.
// TODO : en casas buscamos por casas sin predicador,(asignar predicador con el mismo supervisor de la zona), para actualizar.

// NOTE : ver si se hace el fetch aquí o el UpdateCard.
// NOTE : hay que personalizar el aviso de promover según su pagina pastor , copastor, leader....
// NOTE : hacer llamado según el ID para traer la data

const data: FamilyHouseData = {
  zone: 'zone-1',
  nameHouse: 'Guerreros de Jehova',
  country: 'Peru',
  department: 'Lima',
  province: 'Lima',
  district: 'Lima',
  address: 'Av. Coricancha 123',
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

  const [disableInput, setDisableInput] = useState(true);

  const form = useForm<z.infer<typeof formFamilyHouseSchema>>({
    resolver: zodResolver(formFamilyHouseSchema),
    defaultValues: {
      zone: '',
      nameHouse: '',
      country: '',
      department: '',
      province: '',
      district: '',
      address: '',
    },
  });

  //* Watchers
  const watchZone = form.watch('zone');

  useEffect(() => {
    if (form.getValues('zone')) {
      //* hacer llamada a api con el valor de la zona y setear los datos en un estado
      //* si regresa 0 setear todos los predicadores, si encuentra regresa los predicadores según su supervisor (disponibles)
      setDisableInput(false);
    }
  }, [watchZone]);

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
                className='max-w-[60rem] w-full flex flex-col md:grid sm:grid-cols-2 gap-x-10 gap-y-7'
              >
                <FormField
                  control={form.control}
                  name='zone'
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
                                      form.setValue('zone', zone.value);
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
                                  !field.value && 'text-slate-400 font-normal',
                                  disableInput && 'dark:bg-gray-100 bg-gray-300'
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
                  name='nameHouse'
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
                  Guardar cambios
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
