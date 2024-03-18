/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { TiDeleteOutline } from 'react-icons/ti';

import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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

import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from '@/components/ui/select';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  SubTypesOffering,
  SubTypesOfferingNames,
  CurrencyTypeNames,
} from '@/enums';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

import { formOfferingSchema } from '@/validations';
import { type FilesProps, type RejectedProps } from '@/interfaces';

export const members = [
  { label: 'Abigail Angeli Porras Angeles', value: 'id1' },
  { label: 'Kevin Michael Baca Angeles', value: 'id2' },
  { label: 'Luisa Margarita Angeles Tolentino', value: 'id3' },
  { label: 'Roxana Margot Bernal Jimenez', value: 'id4' },
  { label: 'Pamela Chillon Castro', value: 'id5' },
  { label: 'Carlos Alberto Carranza Ramirez', value: 'id6' },
  { label: 'Karina Rosa Camarena Jaimes', value: 'id7' },
  { label: 'Jairo Pedro Guitierrez Rojas', value: 'id8' },
] as const;

export const copastors = [
  { label: 'Mercedes Lucia Aparcano Jimenez', value: 'id1' },
  { label: 'Luz Roxana Condori Perola', value: 'id2' },
  { label: 'Rosario Julia Gutierrez Solis', value: 'id3' },
] as const;

export const familyHouses = [
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

// TODO : en ofrenda hacer la relación de ayuno y vigilia zonal al ID del miembro del encargado no al del copastor
// TODO : por que este puede eliminarse o subir de nivel y ya no existiría

export const OfferingCreatePage = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FilesProps[]>([]);
  const [rejected, setRejected] = useState<RejectedProps[]>([]);

  const form = useForm<z.infer<typeof formOfferingSchema>>({
    resolver: zodResolver(formOfferingSchema),
    defaultValues: {
      amount: '',
      comments: '',
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: any[], rejectedFiles: any[]) => {
      if (acceptedFiles?.length) {
        const mappedFiles = acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setFiles((previousFiles) => [...previousFiles, ...mappedFiles]);

        // Obtén una lista de URLs de archivo y actualiza el campo de formulario
        const allFileNames = [
          ...files.map((file) => file.name),
          ...mappedFiles.map((file) => file.name),
        ];

        form.setValue('urlFile', allFileNames); // Actualiza el campo de formulario con las URLs de los archivos
      }

      if (rejectedFiles?.length) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    },
    [form, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  // TODO : revisar los use effect y la fuga de memoria.
  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  useEffect(() => {
    const allFileNames = [...files.map((file) => file.name)];
    form.setValue('urlFile', allFileNames);
  }, [files]);

  const removeFile = (name: any): void => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = (): void => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name: any): void => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const type = form.watch('type');
  const subType = form.watch('subType');

  const handleSubmit = (values: z.infer<typeof formOfferingSchema>): void => {
    console.log({ values });
  };

  return (
    <>
      <h1 className='text-center pt-1 pb-4 font-sans text-2xl sm:text-3xl font-bold text-offering-color text-[2.1rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl'>
        Modulo Ofrendas
      </h1>

      <hr className='md:p-[0.02rem] bg-slate-500' />

      <h1 className='text-left px-4 py-2 sm:px-10 sm:pt-4 sm:pb-2 2xl:px-24 2xl:pt-4 font-sans text-2xl sm:text-2xl font-bold text-green-500 text-[1.55rem] sm:text-[2.0rem] md:text-[1.75rem] lg:text-[1.8rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Crear un nuevo registro de ofrenda
      </h1>
      <p className='dark:text-slate-300 text-left font-sans text-[13px] font-bold px-4 sm:px-10 sm:text-sm md:text-base 2xl:px-24'>
        Por favor llena los siguientes datos para crear un nuevo registro de
        ofrenda.
      </p>

      <div className='flex min-h-screen flex-col items-center justify-between px-8 py-4 sm:px-16 sm:py-10 lg:px-16 lg:py-10 2xl:px-32 2xl:py-10'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='w-full grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-10 lg:gap-y-15 lg:gap-x-20'
          >
            <div className='lg:col-start-1 lg:col-end-2'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                        Tipo
                      </FormLabel>
                      <FormDescription className='text-sm lg:text-[15px]'>
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
                      <FormItem className='mt-4'>
                        <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                          Sub-Tipo
                        </FormLabel>
                        <FormDescription className='text-sm lg:text-[15px]'>
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
                    <FormItem className='mt-4'>
                      <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                        Monto
                      </FormLabel>
                      <FormDescription className='text-sm lg:text-[15px]'>
                        Digita la cantidad de la ofrenda o diezmo.
                      </FormDescription>
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
                    <FormItem className='mt-4'>
                      <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                        Divisa / Moneda
                      </FormLabel>
                      <FormDescription className='text-sm lg:text-[15px]'>
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
                              <SelectItem key={key} value={key}>
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
                    <FormItem className='mt-4'>
                      <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                        Comentarios
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Comentarios referente al registro de la ofrenda'
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
                    <FormItem className='flex flex-col mt-4'>
                      <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                        Miembro
                      </FormLabel>
                      <FormDescription className='text-sm lg:text-[15px]'>
                        Seleccione un miembro para asignarlo al registro.
                      </FormDescription>
                      <Popover open={open} onOpenChange={setOpen}>
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
                        <PopoverContent className='mr-30 w-[20rem] p-2\'>
                          <Command>
                            <CommandInput
                              placeholder='Busque un miembro...'
                              className='h-9 text-sm lg:text-[15px]'
                            />
                            <CommandEmpty>Miembro no encontrado.</CommandEmpty>
                            <CommandGroup className='max-h-[200px] h-auto'>
                              {members.map((member) => (
                                <CommandItem
                                  className='text-sm lg:text-[15px]'
                                  value={member.label}
                                  key={member.value}
                                  onSelect={() => {
                                    form.setValue('memberID', member.value);
                                    setOpen(false);
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
              {type === 'offering' &&
                subType === SubTypesOffering.familyHouse && (
                  <FormField
                    control={form.control}
                    name='familyHouseID'
                    render={({ field }) => (
                      <FormItem className='flex flex-col mt-4'>
                        <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                          Casa Familiar
                        </FormLabel>
                        <FormDescription className='text-sm lg:text-[15px]'>
                          Selecciones una Casa familiar para asignarlo al
                          registro.
                        </FormDescription>
                        <Popover open={open} onOpenChange={setOpen}>
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
                                className='h-9 text-sm lg:text-[15px]'
                              />
                              <CommandEmpty>
                                Casa familiar no encontrada.
                              </CommandEmpty>
                              <CommandGroup className='max-h-[200px] h-auto'>
                                {familyHouses.map((familyHouse) => (
                                  <CommandItem
                                    className='text-sm lg:text-[15px]'
                                    value={familyHouse.label}
                                    key={familyHouse.value}
                                    onSelect={() => {
                                      form.setValue(
                                        'familyHouseID',
                                        familyHouse.value
                                      );
                                      setOpen(false);
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
              {/* TODO : no copastor si no Member ID encargado, normalmente es supervisor copastor o pastor. (filtrar por esos) */}
              {((type === 'offering' &&
                subType === SubTypesOffering.zonalFasting) ||
                (type === 'offering' &&
                  subType === SubTypesOffering.zonalVigil)) && (
                <FormField
                  control={form.control}
                  name='copastorID'
                  render={({ field }) => (
                    <FormItem className='flex flex-col mt-4'>
                      <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                        Co-Pastor
                      </FormLabel>
                      <FormDescription className='text-sm lg:text-[15px]'>
                        Selecciones un Co-Pastor para asignarlo al registro.
                      </FormDescription>
                      <Popover open={open} onOpenChange={setOpen}>
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
                                : 'Busque y seleccione un co-pastor'}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[20rem] p-2'>
                          <Command>
                            <CommandInput
                              placeholder='Busque un co-pastor...'
                              className='h-9 text-sm lg:text-[15px]'
                            />
                            <CommandEmpty>
                              Co-Pastor no encontrada.
                            </CommandEmpty>
                            <CommandGroup className='max-h-[200px] h-auto'>
                              {copastors.map((copastor) => (
                                <CommandItem
                                  className='text-sm lg:text-[15px]'
                                  value={copastor.label}
                                  key={copastor.value}
                                  onSelect={() => {
                                    form.setValue('copastorID', copastor.value);
                                    setOpen(false);
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
            </div>
            <div className='lg:col-start-2 lg:col-end-3'>
              <FormField
                control={form.control}
                name='urlFile'
                render={() => {
                  return (
                    <FormItem className='mt-4 md:mt-0'>
                      <FormLabel className='text-[14px] sm:text-[15px] lg:text-base font-bold'>
                        Subir imagen
                      </FormLabel>
                      <FormControl>
                        <div
                          {...getRootProps({
                            className:
                              'font-medium text-sm sm:text-[15px] p-10 sm:p-12 md:p-16 max-w-[25rem] md:max-w-[25rem] m-auto border border-dashed border-black dark:border-white hover:bg-green-200 dark:hover:text-black ease-in duration-200 text-center',
                          })}
                        >
                          <input
                            {...getInputProps()}
                            className='m-auto w-[20rem]'
                          />

                          {isDragActive ? (
                            <p>Suelte sus archivos aquí ...</p>
                          ) : (
                            <p>
                              Arrastre y suelte sus archivos aquí, o haga clic
                              para seleccionar.
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <section className='mt-10'>
                <div className='flex gap-4 items-center justify-between'>
                  <h2 className='title text-base sm:text-lg lg:text-xl font-bold'>
                    Pre-visualización
                  </h2>
                  <button
                    type='button'
                    onClick={removeAll}
                    className='mt-1 text-[10px] lg:text-[11px] w-[8rem] md:w-[10rem] p-2 uppercase tracking-wider font-bold text-red-500 border border-red-400 rounded-md  hover:bg-secondary-400 hover:text-white ease-in duration-200 hover:bg-red-500 transition-colors'
                  >
                    Remover todos los archivos
                  </button>
                </div>

                {/* Accepted files */}
                <h3 className='title text-sm md:text-[15px] lg:text-base font-semibold mt-5 border-b pb-3'>
                  Archivos Aceptados
                </h3>
                <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 gap-x-5 gap-y-20'>
                  {files.map((file) => (
                    <li
                      key={file.name}
                      className='relative h-32 rounded-md shadow-lg'
                    >
                      <img
                        src={file.preview}
                        alt={file.name}
                        width={100}
                        height={100}
                        onLoad={() => {
                          URL.revokeObjectURL(file.preview);
                        }}
                        className='h-full w-full object-contain rounded-md'
                      />
                      <button
                        type='button'
                        className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                        onClick={() => {
                          removeFile(file.name);
                        }}
                      >
                        <TiDeleteOutline className='w-12 h-12 fill-red-500 hover:fill-secondary-400 transition-colors' />
                      </button>
                      <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                        {file.name}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Rejected Files */}
                <h3 className='title text-[15px] sm:text-base font-semibold mt-20 border-b pb-3'>
                  Archivos rechazados
                </h3>
                <ul className='mt-6 flex flex-col'>
                  {rejected.map(({ file, errors }) => (
                    <li
                      key={file.name}
                      className='flex items-start justify-between'
                    >
                      <div>
                        <p className='mt-2 text-neutral-500 text-sm font-medium'>
                          {file.name}
                        </p>
                        <ul className='text-[14px] text-red-400 flex gap-3 font-medium'>
                          {errors.map((error) => (
                            <li key={error.code}>{error.message}</li>
                          ))}
                        </ul>
                      </div>
                      <button
                        type='button'
                        className='mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-red-500 border border-red-400 rounded-md px-3 hover:bg-red-500 hover:text-white ease-in duration-200 transition-colors'
                        onClick={() => {
                          removeRejected(file.name);
                        }}
                      >
                        remove
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <Button
              type='submit'
              className='lg:text-lg lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3 w-60 m-auto 2xl:w-80 text-sm md:text-base xl:text-lg'
            >
              Registrar Ofrenda
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
