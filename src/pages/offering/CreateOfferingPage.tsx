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
import { formOfferingSchema } from '@/validations/form-offering-schema';
import {
  SubTypesOffering,
  SubTypesOfferingNames,
} from '@/enums/sub-type-offering.enum';
import { CurrencyTypeNames } from '@/enums/currency-type.enum';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

const members = [
  { label: 'Abigail Angeli Porras Angeles', value: 'id1' },
  { label: 'Kevin Michael Baca Angeles', value: 'id2' },
  { label: 'Luisa Margarita Angeles Tolentino', value: 'id3' },
  { label: 'Roxana Margot Bernal Jimenez', value: 'id4' },
  { label: 'Pamela Chillon Castro', value: 'id5' },
  { label: 'Carlos Alberto Carranza Ramirez', value: 'id6' },
  { label: 'Karina Rosa Camarena Jaimes', value: 'id7' },
  { label: 'Jairo Pedro Guitierrez Rojas', value: 'id8' },
] as const;

const copastors = [
  { label: 'Mercedes Lucia Aparcano Jimenez', value: 'id1' },
  { label: 'Luz Roxana Condori Perola', value: 'id2' },
  { label: 'Rosario Julia Gutierrez Solis', value: 'id3' },
] as const;

const familyHouses = [
  { label: 'Guerreros de Dios', value: 'id1' },
  { label: 'Hijos de la Fe', value: 'id2' },
  { label: 'Guardianes Celestiales', value: 'id3' },
  { label: 'Ángeles de la Luz', value: 'id4' },
  { label: 'Estrellas del Cielo', value: 'id5' },
  { label: 'Soldados de la Verdad', value: 'id6' },
  { label: 'Esperanza Eterna', value: 'id7' },
  { label: 'Luz del Mundo', value: 'id8' },
  { label: 'Hijos de la Gracia', value: 'id9' },
  { label: 'Herederos del Reino', value: 'id10' },
  { label: 'Paladines de la Justicia', value: 'id11' },
  { label: 'Siervos del Altísimo', value: 'id12' },
  { label: 'Amigos de la Paz', value: 'id13' },
  { label: 'Caminantes del Camino', value: 'id14' },
  { label: 'Almas Renovadas', value: 'id15' },
] as const;

/* //TODO : setear las zonas de la DB registradas, si no hay colocar por defecto */
// TODO : trabajar en el cuadro de arrastar y soltar

export const CreateOfferingPage = (): JSX.Element => {
  const form = useForm<z.infer<typeof formOfferingSchema>>({
    resolver: zodResolver(formOfferingSchema),
    defaultValues: {
      amount: '',
      currency: '',
      comments: '',
      urlFile: '',
    },
  });

  const type = form.watch('type');
  const subType = form.watch('subType');

  const handleSubmit = (values: z.infer<typeof formOfferingSchema>): void => {
    console.log({ values });
  };

  return (
    <>
      <h1 className='text-center pb-4 px-2 pt-2 lg:pt-4 p-4 font-sans text-2xl sm:text-3xl font-bold text-offering-color text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Ofrendas
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h1 className='text-left px-4 py-2 sm:px-10 sm:pt-4 pb-0 2xl:text-center 2xl:pt-4 font-sans font-bold text-green-500 text-[1.6rem] sm:text-[2.0rem] md:text-[1.85rem] lg:text-[1.95rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Crear un nuevo registro de ofrenda
      </h1>
      <p className='text-slate-500 text-left font-sans text-[14px] font-bold px-4 sm:px-10 sm:text-sm md:text-[15px] 2xl:text-center'>
        Por favor llena los siguientes datos para crear un nuevo registro de
        ofrenda.
      </p>

      <div className='flex min-h-screen flex-col items-center justify-between px-8 py-4 sm:px-10 sm:py-10 2xl:px-36 2xl:py-12'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='max-w-md w-full flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-sm md:text-[16px]'>
                      Tipo de Ofrenda
                    </FormLabel>
                    <FormDescription>
                      Asignar una un tipo de ofrenda al registro.
                    </FormDescription>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona una tipo de ofrenda' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='tithe'>Diezmos</SelectItem>
                        <SelectItem value='offering'>Ofrendas</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {type === 'offering' && (
              <FormField
                control={form.control}
                name='subType'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='text-sm md:text-[16px]'>
                        Sub-Tipo de Ofrenda
                      </FormLabel>
                      <FormDescription>
                        Asignar una un sub-tipo de ofrenda al registro.
                      </FormDescription>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Selecciona una sub-tipo de ofrenda' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(SubTypesOfferingNames).map(
                            ([key, value]) => (
                              <SelectItem
                                className='font-medium'
                                key={key}
                                value={key}
                              >
                                {value}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[16px]'>Monto</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Monto de la ofrenda o diezmo'
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
            {/* TODO : agregar un drop de imagen  */}
            <FormField
              control={form.control}
              name='currency'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-sm md:text-[16px]'>
                      Divisa / Moneda
                    </FormLabel>
                    <FormDescription>
                      Asignar una un tipo de divisa o moneda al registro.
                    </FormDescription>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona una tipo de divisa o moneda' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(CurrencyTypeNames).map(
                          ([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='comments'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Comentarios</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Comentarios referente al registro de la ofrenda'
                        // autoComplete='new-password'
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
              name='urlFile'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Subir imagen</FormLabel>
                    <FormControl>
                      <Input
                        // autoComplete='new-password'
                        type='file'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {(type === 'tithe' ||
              (type === 'offering' && subType === SubTypesOffering.special) ||
              (type === 'offering' &&
                subType === SubTypesOffering.churchGround)) && (
              <FormField
                control={form.control}
                name='memberID'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Miembro</FormLabel>
                    <FormDescription>
                      Seleccione un miembro para asignarlo al registro.
                    </FormDescription>
                    <Popover>
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
                              ? members.find(
                                  (member) => member.value === field.value
                                )?.label
                              : 'Busque y seleccione un miembro'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[20rem] p-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un miembro...'
                            className='h-9'
                          />
                          <CommandEmpty>Miembro no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[200px] h-auto'>
                            {members.map((member) => (
                              <CommandItem
                                value={member.label}
                                key={member.value}
                                onSelect={() => {
                                  form.setValue('memberID', member.value);
                                }}
                              >
                                {member.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    member.value === field.value
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
                )}
              />
            )}
            {type === 'offering' && subType === SubTypesOffering.familyHome && (
              <FormField
                control={form.control}
                name='familyHouseID'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Casa Familiar</FormLabel>
                    <FormDescription>
                      Selecciones una Casa familiar para asignarlo al registro.
                    </FormDescription>
                    <Popover>
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
                              ? familyHouses.find(
                                  (familyHouse) =>
                                    familyHouse.value === field.value
                                )?.label
                              : 'Busque y seleccione una casa familiar'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[20rem] p-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque una casa familiar...'
                            className='h-9'
                          />
                          <CommandEmpty>
                            Casa familiar no encontrada.
                          </CommandEmpty>
                          <CommandGroup className='max-h-[200px] h-auto'>
                            {familyHouses.map((familyHouse) => (
                              <CommandItem
                                value={familyHouse.label}
                                key={familyHouse.value}
                                onSelect={() => {
                                  form.setValue(
                                    'familyHouseID',
                                    familyHouse.value
                                  );
                                }}
                              >
                                {familyHouse.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    familyHouse.value === field.value
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
                )}
              />
            )}
            {((type === 'offering' &&
              subType === SubTypesOffering.zonalFasting) ||
              (type === 'offering' &&
                subType === SubTypesOffering.zonalVigil)) && (
              <FormField
                control={form.control}
                name='copastorID'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Co-Pastor</FormLabel>
                    <FormDescription>
                      Selecciones un Co-Pastor para asignarlo al registro.
                    </FormDescription>
                    <Popover>
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
                              ? copastors.find(
                                  (copastor) => copastor.value === field.value
                                )?.label
                              : 'Busque y seleccione un Co-Pastor'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[20rem] p-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un Co-Pastor...'
                            className='h-9'
                          />
                          <CommandEmpty>
                            Casa familiar no encontrada.
                          </CommandEmpty>
                          <CommandGroup className='max-h-[200px] h-auto'>
                            {copastors.map((copastor) => (
                              <CommandItem
                                value={copastor.label}
                                key={copastor.value}
                                onSelect={() => {
                                  form.setValue('copastorID', copastor.value);
                                }}
                              >
                                {copastor.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    copastor.value === field.value
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
                )}
              />
            )}

            <Button type='submit' className='w-full'>
              Registrar Casa Familiar
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
