/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from 'react';

import { type z } from 'zod';
import { Toaster, toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/shared/lib/utils';
import { supervisors, zones } from '@/app/family-house/data';

import { formSearchZoneSchema, formZoneSchema } from '@/app/family-house/validations';
import { type ZoneDataKeys, type ZoneData } from '@/app/family-house/interfaces';

import { useZoneDeleteSubmitButtonsLogic } from '@/hooks';

import { Country, Department, District, Province } from '@/shared/enums';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';

//* data ficticia
const data: ZoneData = {
  zoneName: 'Pisac Alto',
  country: Country.Peru,
  department: Department.Lima,
  province: Province.Lima,
  district: District.Independencia,
  theirSupervisor: 'id2',
};

interface Props {
  onClose: () => void;
  onScroll: () => void;
}

export const ZoneDeleteForm = ({ onClose, onScroll }: Props): JSX.Element => {
  //* States
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [isShowEditMode, setIsShowEditMode] = useState<boolean>(true);

  const [isInputSearchZoneDisabled, setIsInputSearchZoneDisabled] = useState<boolean>(false);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState<boolean>(true);

  const [isSearchZoneUpdateOpen, setIsSearchZoneUpdateOpen] = useState<boolean>(false);
  const [isInputSupervisorOpen, setIsInputSupervisorOpen] = useState<boolean>(false);

  //* Forms
  const formDeleteZone = useForm<z.infer<typeof formZoneSchema>>({
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

  //* Forms handlers
  const handleSubmitUpdateZone = (values: z.infer<typeof formZoneSchema>): void => {
    console.log({ values });
  };

  const handleSubmitSearchZone = (values: z.infer<typeof formSearchZoneSchema>): void => {
    for (const key in data) {
      formDeleteZone.setValue(key as ZoneDataKeys, data[key as ZoneDataKeys]);
    }
    setIsShowEditMode(false);
    console.log({ values });
  };

  //* Custom hooks
  useZoneDeleteSubmitButtonsLogic({
    formSearchZone,
    formDeleteZone,
    setIsSearchButtonDisabled,
    setIsSubmitButtonDisabled,
  });

  return (
    <Card className='w-full'>
      <CardContent className='py-3 px-4'>
        <h2 className='text-center text-red-500 font-bold text-[26px] md:text-3xl pt-0 pb-1'>
          Eliminar una zona una zona
        </h2>
        <p className='pb-4 text-center font-medium text-[14px] md:text-[14.5px]'>
          Busca y selecciona la zona que sera eliminada
        </p>
        <div>
          <Form {...formSearchZone}>
            <form
              onSubmit={formSearchZone.handleSubmit(handleSubmitSearchZone)}
              className='w-full flex flex-col md:grid sm:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-7 md:items-center md:px-2'
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
                        Por favor seleccione un zona.
                      </FormDescription>
                      <Popover
                        open={isSearchZoneUpdateOpen}
                        onOpenChange={setIsSearchZoneUpdateOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={isInputSearchZoneDisabled}
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
                disabled={isSearchButtonDisabled}
                type='submit'
                className='md:mt-[3.5rem] text-[14px] text-green-950 bg-green-500 hover:bg-green-500 hover:text-white'
              >
                Buscar
              </Button>
            </form>
          </Form>

          {/* Update Zone */}
          {!isShowEditMode && (
            <Form {...formDeleteZone}>
              <form
                onSubmit={formDeleteZone.handleSubmit(handleSubmitUpdateZone)}
                className='max-w-[60rem] w-full flex flex-col md:grid sm:grid-cols-2 gap-x-8 gap-y-2 md:gap-y-4 md:px-2'
              >
                <span className='text-[18px] md:text-[22px] text-center font-bold inline-block col-start-1 col-end-3 row-start-1 row-end-2 mt-4 text-slate-400 '>
                  Información de la Zona
                </span>
                <FormField
                  control={formDeleteZone.control}
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
                  control={formDeleteZone.control}
                  name='country'
                  render={({ field }) => {
                    return (
                      <FormItem className=''>
                        <FormLabel className='text-[14px] font-medium'>País</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            className='text-black dark:text-white'
                            placeholder='Eje: Peru, Ecuador, Colombia...'
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
                  control={formDeleteZone.control}
                  name='department'
                  render={({ field }) => {
                    return (
                      <FormItem className=''>
                        <FormLabel className='text-[14px] font-bold'>Departamento</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            className='text-black dark:text-white'
                            placeholder='Eje: Lima, Ancash...'
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
                  control={formDeleteZone.control}
                  name='province'
                  render={({ field }) => {
                    return (
                      <FormItem className=''>
                        <FormLabel className='text-[14px] font-bold'>Provincia</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            className='text-black dark:text-white'
                            placeholder='Eje: Lima, Huaraz...'
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
                  control={formDeleteZone.control}
                  name='district'
                  render={({ field }) => {
                    return (
                      <FormItem className=''>
                        <FormLabel className='text-[14px] font-bold'>Distrito</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isInputDisabled}
                            className='text-black dark:text-white'
                            placeholder='Eje: Los Olivos, Huarmey ...'
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
                  control={formDeleteZone.control}
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
                                className='h-9 text-[14px]'
                              />
                              <CommandEmpty>Supervisor no encontrado.</CommandEmpty>
                              <CommandGroup className='max-h-[200px] h-auto'>
                                {supervisors.map((supervisor) => (
                                  <CommandItem
                                    className='text-[14px]'
                                    value={supervisor.label}
                                    key={supervisor.value}
                                    onSelect={() => {
                                      formDeleteZone.setValue('theirSupervisor', supervisor.value);
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
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className='w-full md:mx-auto md:w-[50%] col-start-1 col-end-3 row-start-5 row-end-6 mt-2 md:mt-0'>
                  <Toaster position='top-center' richColors />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={isSubmitButtonDisabled}
                        type='submit'
                        className='w-full text-[14px] text-white bg-red-500  hover:bg-red-600'
                      >
                        Eliminar registro
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-[23rem] sm:w-[25rem] md:w-full'>
                      <AlertDialogHeader className='h-auto'>
                        <AlertDialogTitle className='text-yellow-500 font-bold text-xl text-center md:text-[25px] pb-2'>
                          ¿Estas seguro de eliminar a esta zona?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <span className='text-left text-red-500 font-bold mb-3 inline-block text-[16px] md:text-[18px]'>
                            Después de eliminar sucederá lo siguiente:
                          </span>
                          <br />
                          <span className='text-left inline-block mb-2 text-[14px] md:text-[15px]'>
                            ❌ La zona se eliminara de todos los lugares donde guardaba relación.
                          </span>
                          <span className='text-left inline-block mb-2 text-[14px] md:text-[15px]'>
                            ❌ Las casas que estaban asignadas a esta zona quedaran sin
                            identificación de zona.
                          </span>
                          <span className='w-full text-left text-green-500 font-bold mb-3 inline-block text-[16px] md:text-[18px]'>
                            Consideraciones
                          </span>
                          <span className='text-left inline-block mb-2 text-[14px] md:text-[15px]'>
                            ✅ Se deberá asignar una nueva zona a estas casas familiares sin zona,
                            hacerlo desde la pestaña
                            <span className='font-bold'> actualizar casa familiar.</span>
                          </span>
                          <span className='text-left inline-block mb-2 text-[14px] md:text-[15px]'>
                            ✅ La zona esta ligada al <span className='font-bold'>supervisor</span>,
                            por lo que si se asigna una nueva zona a una{' '}
                            <span className='font-bold'>casa familiar (sin zona) </span>
                            esta zona quedara vinculada al{' '}
                            <span className='font-bold'>supervisor</span>.
                          </span>
                          <span className='text-left inline-block mb-2 text-[14px] md:text-[15px]'>
                            ✅ Por lo tanto, todas las demás{' '}
                            <span className='font-bold'>casas familiares </span> que tengan a este{' '}
                            <span className='font-bold'>supervisor </span>
                            tendrán esa zona asignada de manera automática.
                          </span>

                          <br />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className='bg-red-500 text-red-950 hover:bg-red-500 hover:text-white text-[14px]'>
                          No, Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className='bg-green-500 text-green-950 hover:bg-green-500 hover:text-white text-[14px]'
                          onClick={() => {
                            // NOTE : agregar promesa cuando se consulte hacer timer y luego mostrar toast (fetch real)
                            // NOTE : hacer petición al backend para borrar
                            setTimeout(() => {
                              if (Object.keys(formDeleteZone.formState.errors).length === 0) {
                                toast.success('Registro eliminado exitosamente', {
                                  position: 'top-center',
                                  className: 'justify-center',
                                });

                                setIsInputDisabled(true);
                                setIsSubmitButtonDisabled(true);
                                setIsInputSearchZoneDisabled(true);
                                setIsSearchButtonDisabled(true);
                              }
                            }, 100);

                            setTimeout(() => {
                              onScroll();
                            }, 150);

                            setTimeout(() => {
                              if (Object.keys(formDeleteZone.formState.errors).length === 0) {
                                onClose();
                              }
                            }, 1800);
                          }}
                        >
                          Sí, Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </form>
            </Form>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
