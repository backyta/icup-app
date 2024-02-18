/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import type * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from '@/components/ui/select';
import { formFamilyHouseSchema } from '@/validations/form-family-house-schema';

export const CreateFamilyHousePage = (): JSX.Element => {
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
            {/* //TODO : setear las zonas de la DB, si no hay colocar por defecto */}
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
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona una zona para la casa familiar' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='A'>Zona A</SelectItem>
                        <SelectItem value='B'>Zona B</SelectItem>
                        <SelectItem value='C'>Zona C</SelectItem>
                        <SelectItem value='D'>Zona D</SelectItem>
                      </SelectContent>
                    </Select>
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
                        // autoComplete='new-password'
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
                        // autoComplete='new-password'
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
                        // autoComplete='new-password'
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
                        // autoComplete='new-password'
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
                        // autoComplete='new-password'
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
                  <FormItem>
                    <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                      Preacher
                    </FormLabel>
                    <FormDescription>
                      Asignar un predicador para esta casa familiar.
                    </FormDescription>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona un predicador' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='id11'>Carlos Carranza</SelectItem>
                        <SelectItem value='id2'>Pamela Chillon</SelectItem>
                        <SelectItem value='id3'>Suzy Basurto</SelectItem>
                      </SelectContent>
                    </Select>
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
