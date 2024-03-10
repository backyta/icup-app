/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from 'react';
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

import { formFamilyHouseSchema } from '@/validations/form-family-house-schema';
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

const zones = [
  { label: 'Zona A', value: 'zone-1' },
  { label: 'Zona B', value: 'zone-2' },
  { label: 'Zona C', value: 'zone-3' },
  { label: 'Zona D', value: 'zone-4' },
] as const;

export const FamilyHouseCreatePage = (): JSX.Element => {
  const [openPreacher, setOpenPreacher] = useState(false);
  const [openZone, setOpenZone] = useState(false);

  const form = useForm<z.infer<typeof formFamilyHouseSchema>>({
    resolver: zodResolver(formFamilyHouseSchema),
    defaultValues: {
      zone: '',
      nameHouse: '',
      country: 'Peru',
      department: 'Lima',
      province: '',
      district: '',
      address: '',
    },
  });

  const handleSubmit = (
    values: z.infer<typeof formFamilyHouseSchema>
  ): void => {
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
      <p className='dark:text-slate-300 text-left font-sans text-[14px] font-bold px-4 sm:px-10 text-sm md:text-[15px] xl:text-base  2xl:text-center'>
        Por favor llena los siguientes datos para crear una nueva casa familiar.
      </p>

      <div className='flex min-h-screen flex-col items-center justify-between px-8 py-4 sm:px-10 sm:py-6 2xl:px-36 2xl:py-8'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='max-w-md w-full flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='zone'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Zona
                    </FormLabel>
                    <FormDescription className='text-sm lg:text-[15px]'>
                      Asignar una zona a la que pertenecerá la casa familiar.
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
                              ? zones.find((zone) => zone.value === field.value)
                                  ?.label
                              : 'Busque y seleccione una zona'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='mr-30 w-[20rem] p-2\'>
                        <Command>
                          <CommandInput
                            placeholder='Busque una zona...'
                            className='h-9 text-sm lg:text-[15px]'
                          />
                          <CommandEmpty>Zona no encontrada.</CommandEmpty>
                          <CommandGroup className='max-h-[200px] h-auto'>
                            {zones.map((zone) => (
                              <CommandItem
                                className='text-sm lg:text-[15px]'
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
                        placeholder='Nombre de la casa familiar'
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
                        placeholder='País de la casa familiar'
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
                      Asignar un departamento a la pertenece la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder='Departamento de la casa familiar'
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
                      Asignar una provincia a la que pertenece la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder='Provincia de la casa familiar'
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
                        placeholder='Distrito de la casa familiar'
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
                      Asignar una dirección al que pertenece la casa familiar.
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder='Distrito de la casa familiar'
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
              name='theirPreacher'
              render={({ field }) => {
                return (
                  <FormItem className='flex flex-col mt-4'>
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
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-slate-500 font-normal'
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
                      <PopoverContent className='mr-30 w-[20rem] p-2\'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un predicador...'
                            className='h-9 text-sm lg:text-[15px]'
                          />
                          <CommandEmpty>Predicador no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[200px] h-auto'>
                            {preachers.map((preacher) => (
                              <CommandItem
                                className='text-sm lg:text-[15px]'
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
            <Button
              type='submit'
              className='w-full text-sm md:text-base xl:text-lg mt-12'
            >
              Registrar Casa Familiar
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
