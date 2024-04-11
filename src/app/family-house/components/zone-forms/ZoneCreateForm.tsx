/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster, toast } from 'sonner';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { formZoneSchema } from '@/app/family-house/validations';

import { cn } from '@/shared/lib/utils';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';

import { Card, CardContent } from '@/shared/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';

import { supervisors } from '@/shared/data';

interface Props {
  onClose: () => void;
  onScroll: () => void;
}

export const ZoneCreateForm = ({ onClose, onScroll }: Props): JSX.Element => {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [isInputSupervisorOpen, setIsInputSupervisorOpen] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const form = useForm<z.infer<typeof formZoneSchema>>({
    resolver: zodResolver(formZoneSchema),
    defaultValues: {
      zoneName: '',
      country: '',
      department: '',
      province: '',
      district: '',
    },
  });

  //* Watchers
  const watchZoneName = form.watch('zoneName');
  const watchCountry = form.watch('country');
  const watchDepartment = form.watch('department');
  const watchProvincia = form.watch('province');
  const watchDistrict = form.watch('district');
  const watchTheirSupervisor = form.watch('theirSupervisor');

  useEffect(() => {
    if (
      watchZoneName &&
      watchCountry &&
      watchDepartment &&
      watchDistrict &&
      watchProvincia &&
      watchTheirSupervisor
    ) {
      setIsSubmitButtonDisabled(false);
    }

    if (
      !watchZoneName ||
      !watchCountry ||
      !watchDepartment ||
      !watchDistrict ||
      !watchProvincia ||
      !watchTheirSupervisor
    ) {
      setIsSubmitButtonDisabled(true);
    }
  }, [
    watchZoneName,
    watchCountry,
    watchDepartment,
    watchProvincia,
    watchDistrict,
    watchTheirSupervisor,
  ]);

  const handleSubmit = (values: z.infer<typeof formZoneSchema>): void => {
    console.log({ values });
  };

  return (
    <Card className='w-full'>
      <CardContent className='py-3 px-4'>
        <h2 className='text-center text-green-500 font-bold text-[26px] md:text-3xl pt-0 pb-1'>
          Crear nueva zona
        </h2>
        <p className='pb-4 text-center font-medium text-[14px] md:text-[14.5px]'>
          Por favor llena los siguientes datos para crear una nueva zona
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='w-full flex flex-col gap-2 md:grid sm:grid-cols-2 md:gap-x-8 md:gap-y-4 md:px-2'
          >
            <FormField
              control={form.control}
              name='zoneName'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[14px] font-bold'>Nombre</FormLabel>
                    <FormDescription className='[14px]'>
                      Asignar una nombre a la zona.
                    </FormDescription>
                    <FormControl>
                      <Input
                        disabled={isInputDisabled}
                        className='text-black dark:text-white text-[13px]'
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
              control={form.control}
              name='country'
              render={({ field }) => {
                return (
                  <FormItem className=''>
                    <FormLabel className='text-[14px] font-bold'>País</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isInputDisabled}
                        className='text-black dark:text-white text-[14px]'
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
              control={form.control}
              name='department'
              render={({ field }) => {
                return (
                  <FormItem className=''>
                    <FormLabel className='text-[14px] font-bold'>Departamento</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isInputDisabled}
                        className='text-black dark:text-white text-[14px]'
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
              control={form.control}
              name='province'
              render={({ field }) => {
                return (
                  <FormItem className=''>
                    <FormLabel className='text-[14px] font-bold'>Provincia</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isInputDisabled}
                        className='text-black dark:text-white text-[14px]'
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
              control={form.control}
              name='district'
              render={({ field }) => {
                return (
                  <FormItem className=''>
                    <FormLabel className='text-[14px] font-bold'>Distrito</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isInputDisabled}
                        className='text-black dark:text-white text-[14px]'
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
              control={form.control}
              name='theirSupervisor'
              render={({ field }) => {
                return (
                  <FormItem className='order-first md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 flex flex-col'>
                    <FormLabel className='text-[14px] font-bold'>Supervisor</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Seleccione un supervisor para esta zona.
                    </FormDescription>
                    <Popover open={isInputSupervisorOpen} onOpenChange={setIsInputSupervisorOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isInputDisabled}
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between text-black dark:text-white text-[14px]',
                              !field.value && 'text-slate-400 font-normal'
                            )}
                          >
                            {field.value
                              ? supervisors.find((supervisor) => supervisor.value === field.value)
                                  ?.label
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
                                  form.setValue('theirSupervisor', supervisor.value);
                                  setIsInputSupervisorOpen(false);
                                }}
                              >
                                {supervisor.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    supervisor.value === field.value ? 'opacity-100' : 'opacity-0'
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

            <div className='w-full md:mx-auto md:w-[50%] sm:col-start-1 sm:col-end-3 sm:row-start-4 sm:row-end-5  mt-2 md:mt-0'>
              <Toaster position='top-center' richColors />
              <Button
                disabled={isSubmitButtonDisabled}
                type='submit'
                className='w-full text-[14px] bg-green-500 text-white hover:bg-green-600'
                onClick={() => {
                  // TODO : agregar promesa cuando se consulte hacer timer y luego mostrar toast (fetch real)
                  setTimeout(() => {
                    if (Object.keys(form.formState.errors).length === 0) {
                      toast.success('Se ha registrado exitosamente', {
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
                      onClose();
                    }
                  }, 1800);
                }}
              >
                Registrar zona
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
