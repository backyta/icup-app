/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useCallback, useEffect, useRef, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/shared/lib/utils';
import { MdDeleteForever } from 'react-icons/md';

import { offeringInactivateFormSchema } from '@/modules/offering/shared/validations';

import {
  OfferingIncomeInactivationReason,
  OfferingIncomeInactivationReasonNames,
} from '@/modules/offering/income/enums';
import { useOfferingIncomeInactivationMutation } from '@/modules/offering/income/hooks';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/shared/components/ui/form';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/shared/components/ui/select';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';

interface OfferingIncomeInactivateCardProps {
  id: string;
}

export const OfferingIncomeInactivateCard = ({
  id,
}: OfferingIncomeInactivateCardProps): JSX.Element => {
  //* States
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isSelectInputDisabled, setIsSelectInputDisabled] = useState<boolean>(false);
  const topRef = useRef<HTMLDivElement>(null);

  //* Form
  const form = useForm<z.infer<typeof offeringInactivateFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(offeringInactivateFormSchema),
    defaultValues: {
      offeringInactivationReason: '',
    },
  });

  //* Watchers
  const offeringInactivationReason = form.watch('offeringInactivationReason');

  //* Effects
  useEffect(() => {
    if (!offeringInactivationReason) {
      setIsButtonDisabled(true);
    }
    if (offeringInactivationReason) {
      setIsButtonDisabled(false);
    }
  }, [form, offeringInactivationReason]);

  useEffect(() => {
    const originalUrl = window.location.href;

    if (id && isCardOpen) {
      const url = new URL(window.location.href);
      url.pathname = `/offerings/income/inactivate/${id}/remove`;

      window.history.replaceState({}, '', url);

      return () => {
        window.history.replaceState({}, '', originalUrl);
      };
    }
  }, [id, isCardOpen]);

  //* Functions
  const handleContainerScroll = useCallback((): void => {
    if (topRef.current !== null) {
      topRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  //* Custom hooks
  const offeringIncomeInactivationMutation = useOfferingIncomeInactivationMutation({
    setIsSelectInputDisabled,
    setIsCardOpen,
    setIsButtonDisabled,
    scrollToTop: handleContainerScroll,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof offeringInactivateFormSchema>): void => {
    setIsSelectInputDisabled(true);
    setIsButtonDisabled(true);

    offeringIncomeInactivationMutation.mutate({
      id,
      offeringInactivationReason: formData.offeringInactivationReason,
    });
  };

  return (
    <Dialog open={isCardOpen} onOpenChange={setIsCardOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            form.reset();
          }}
          className='mt-2 py-2 px-1 h-[2rem] bg-red-400 text-white hover:bg-red-500 hover:text-red-950  dark:text-red-950 dark:hover:bg-red-500 dark:hover:text-white'
        >
          <MdDeleteForever className='w-8 h-[1.65rem]' />
        </Button>
      </DialogTrigger>
      <DialogContent
        ref={topRef}
        className='w-[23rem] sm:w-[25rem] md:w-full max-h-full overflow-x-hidden overflow-y-auto'
      >
        <div className='h-auto'>
          <h2 className='text-yellow-500 font-bold text-xl text-center md:text-[25px] pb-3'>
            ¿Estas seguro de inactivar este registro?
          </h2>
          <p className={cn('h-[19rem] md:h-[16.5rem]')}>
            <span className='w-full text-left text-blue-500 font-bold mb-2 inline-block text-[15px] md:text-[17px]'>
              Luego de realizar esta operación sucederá lo siguiente:
            </span>
            <br />
            <span className='w-full text-left inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ El registro de este Ingreso de Ofrenda se colocara en estado{' '}
              <span className='font-bold '>INACTIVO.</span>
            </span>
            <span className='w-full text-left inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ Este registro no podrá ser activado nuevamente, se quedara inactivo de modo
              permanente para control interno.
            </span>
            <span className='w-full text-left mb-2 text-[14px] md:text-[15px] flex flex-col'>
              ✅ Se añadirán a los detalles y/u observaciones del registro:
              <span className='pl-8'>- El motivo de eliminación.</span>
              <span className='pl-8'>- La fecha en la que se elimino.</span>
              <span className='pl-8'>- El usuario que ejecuto esta acción.</span>
              <span className='pl-8'>- Información del tipo de cambio (si se requiere).</span>
            </span>

            <br />
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name='offeringInactivationReason'
                render={({ field }) => {
                  return (
                    <FormItem className={cn('mb-4')}>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold text-red-500'>
                        ¿Cual es el motivo por el cual se esta eliminando este registro?
                      </FormLabel>
                      <FormDescription className='text-[14px] pl-1'>
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
                              'Selecciona un motivo'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(OfferingIncomeInactivationReasonNames).map(
                            ([key, value]) =>
                              key !== OfferingIncomeInactivationReason.CurrencyExchange && (
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
                >
                  Sí, inactivar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
