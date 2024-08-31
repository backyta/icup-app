/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { Toaster, toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdDeleteForever } from 'react-icons/md';

import { TypesReasonEliminationOfferingExpenseNames } from '@/modules/offering/expenses/enums';

import { offeringDeleteFormSchema } from '@/modules/offering/shared/validations';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export const OfferingExpensesDeleteCard = (): JSX.Element => {
  //* States
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isSelectInputDisabled, setIsSelectInputDisabled] = useState<boolean>(false);

  //* Form
  const form = useForm<z.infer<typeof offeringDeleteFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(offeringDeleteFormSchema),
    defaultValues: {
      reasonType: '',
      date: undefined,
      userID: '',
    },
  });

  //* Watchers
  const reasonType = form.watch('reasonType');

  //* Effects
  useEffect(() => {
    if (reasonType === '') {
      setIsButtonDisabled(true);
    }
    if (reasonType !== '') {
      setIsButtonDisabled(false);
    }
  }, [form, reasonType]);

  //* Form handler
  const handleSubmit = (values: z.infer<typeof offeringDeleteFormSchema>): void => {
    values.date = new Date();
    values.userID = 'id-1';
    console.log({ values });
  };

  return (
    <Dialog open={isCardOpen} onOpenChange={setIsCardOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            form.reset();
          }}
          className='mt-2 lg:-ml-5 xl:-ml-7 2xl:-ml-8 mr-4 py-2 px-1 h-[2rem] bg-red-400 text-white hover:bg-red-500 hover:text-red-950  dark:text-red-950 dark:hover:bg-red-500 dark:hover:text-white'
        >
          <MdDeleteForever className='w-8 h-[1.65rem]' />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[23rem] sm:w-[25rem] md:w-full'>
        <div className='h-auto'>
          <h2 className='text-yellow-500 font-bold text-xl text-center md:text-[25px] pb-2'>
            ¿Estas seguro de eliminar este registro?
          </h2>
          <p className='h-[21rem] md:h-[14.5rem]'>
            <span className='w-full text-left text-blue-500 font-medium mb-3 inline-block text-[16px] md:text-[18px]'>
              Luego de eliminar sucederá lo siguiente:
            </span>
            <br />
            <span className='w-full text-left inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ El registro de esta Salida de Ofrenda se colocara en estado{' '}
              <span className='font-bold text-red-500'>INACTIVO.</span>
            </span>
            <span className='w-full text-left inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ Este registro no podrá ser activado nuevamente, se quedara inactivo de modo
              permanente para control interno.
            </span>
            <span className='w-full text-left mb-2 text-[14px] md:text-[15px] flex flex-col'>
              ✅ Se añadirán a los comentarios del registro:
              <span className='pl-8'>- El motivo de eliminación</span>
              <span className='pl-8'>- La fecha en la que se elimino</span>
              <span className='pl-8'>- El usuario que ejecuto esta acción</span>
            </span>
            <br />
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name='reasonType'
                render={({ field }) => {
                  return (
                    <FormItem className='mb-4 mt-4'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold text-red-500'>
                        ¿Cual es el motivo por el cual se esta eliminando este registro?
                      </FormLabel>
                      <FormDescription className='text-[14px] pl-1 mt-10'>
                        Elige un motivo de eliminación.
                      </FormDescription>
                      <Select
                        disabled={isSelectInputDisabled}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona una tipo de ofrenda' />
                            ) : (
                              'Selecciona una tipo'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(TypesReasonEliminationOfferingExpenseNames).map(
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
              <div className='flex justify-end gap-x-4'>
                <Toaster position='top-center' richColors />
                <Button
                  type='button'
                  disabled={isButtonDisabled}
                  className='bg-red-500 text-red-950 hover:bg-red-500 hover:text-white text-[14px]'
                  onClick={() => {
                    setIsCardOpen(false);
                  }}
                >
                  No, cancelar
                </Button>
                <Button
                  disabled={isButtonDisabled}
                  type='submit'
                  className='bg-green-500 text-green-950 hover:bg-green-500 hover:text-white text-[14px]'
                  onClick={() => {
                    toast.success('Registro eliminado exitosamente', {
                      position: 'top-center',
                      className: 'justify-center',
                    });
                    setTimeout(() => {
                      setIsButtonDisabled(true);
                      setIsSelectInputDisabled(true);
                    }, 100);

                    setTimeout(() => {
                      setIsSelectInputDisabled(false);
                      setIsCardOpen(false);
                    }, 1300);
                  }}
                >
                  Sí, eliminar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
