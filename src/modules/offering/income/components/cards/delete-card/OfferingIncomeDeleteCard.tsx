/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useMemo, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/shared/lib/utils';
import { MdDeleteForever } from 'react-icons/md';

import { useOfferingIncomeStore } from '@/stores';

import { CurrencyType } from '@/modules/offering/shared/enums';
import { offeringDeleteFormSchema } from '@/modules/offering/shared/validations';

import {
  ExchangeCurrencyType,
  ExchangeCurrencyTypeNames,
  OfferingIncomeReasonEliminationType,
  OfferingIncomeReasonEliminationTypeNames,
} from '@/modules/offering/income/enums';
import { useOfferingIncomeDeletionMutation } from '@/modules/offering/income/hooks';

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
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';

interface OfferingIncomeDeleteCardProps {
  idRow: string;
}

export const OfferingIncomeDeleteCard = ({ idRow }: OfferingIncomeDeleteCardProps): JSX.Element => {
  //* States
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isSelectInputDisabled, setIsSelectInputDisabled] = useState<boolean>(false);

  //* Form
  const form = useForm<z.infer<typeof offeringDeleteFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(offeringDeleteFormSchema),
    defaultValues: {
      reasonEliminationType: '',
      exchangeRate: '',
      exchangeCurrencyType: '',
    },
  });

  const dataSearchByTermResponse = useOfferingIncomeStore(
    (state) => state.dataSearchByTermResponse
  );
  //* Functions
  const currentOfferingIncome = useMemo(
    () => dataSearchByTermResponse?.find((data) => data?.id === idRow),
    [dataSearchByTermResponse, idRow]
  );

  //* Watchers
  const exchangeRate = form.watch('exchangeRate');
  const reasonEliminationType = form.watch('reasonEliminationType');
  const exchangeCurrencyType = form.watch('exchangeCurrencyType');

  //* Effects
  useEffect(() => {
    if (reasonEliminationType === '') {
      setIsButtonDisabled(true);
    }
    if (reasonEliminationType !== '') {
      setIsButtonDisabled(false);
    }

    if (
      reasonEliminationType === OfferingIncomeReasonEliminationType.CurrencyExchange &&
      (!exchangeRate || !exchangeCurrencyType)
    ) {
      setIsButtonDisabled(true);
    }
  }, [form, exchangeRate, exchangeCurrencyType, reasonEliminationType]);

  useEffect(() => {
    form.resetField('exchangeRate', {
      keepDirty: true,
    });
    form.resetField('exchangeCurrencyType', {
      keepDirty: true,
    });
  }, [reasonEliminationType]);

  useEffect(() => {
    const originalUrl = window.location.href;

    if (idRow && isCardOpen) {
      const url = new URL(window.location.href);
      url.pathname = `/offerings/income/delete/${idRow}/remove`;

      window.history.replaceState({}, '', url);

      return () => {
        window.history.replaceState({}, '', originalUrl);
      };
    }
  }, [idRow, isCardOpen]);

  //* Custom hooks
  const offeringIncomeDeletionMutation = useOfferingIncomeDeletionMutation({
    setIsSelectInputDisabled,
    setIsCardOpen,
    setIsButtonDisabled,
    setIsInputDisabled,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof offeringDeleteFormSchema>): void => {
    setIsSelectInputDisabled(true);
    setIsInputDisabled(true);
    setIsButtonDisabled(true);

    offeringIncomeDeletionMutation.mutate({
      id: idRow,
      reasonEliminationType: formData.reasonEliminationType,
      exchangeRate: formData.exchangeRate ?? undefined,
      exchangeCurrencyType: formData.exchangeCurrencyType ?? undefined,
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
      <DialogContent className='w-[23rem] sm:w-[25rem] md:w-full'>
        <div className='h-auto'>
          <h2 className='text-yellow-500 font-bold text-xl text-center md:text-[25px] pb-3'>
            ¿Estas seguro de eliminar este registro?
          </h2>
          <p
            className={cn(
              'h-[17.5rem] md:h-[16rem]',
              reasonEliminationType === OfferingIncomeReasonEliminationType.CurrencyExchange &&
                'h-[34.5rem] md:h-[28.5rem]'
            )}
          >
            <span className='w-full text-left text-blue-500 font-bold mb-2 inline-block text-[15px] md:text-[17px]'>
              Luego de eliminar sucederá lo siguiente:
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
              ✅ Se añadirán a los comentarios del registro:
              <span className='pl-8'>- El motivo de eliminación.</span>
              <span className='pl-8'>- La fecha en la que se elimino.</span>
              <span className='pl-8'>- El usuario que ejecuto esta acción.</span>
              <span className='pl-8'>- Información del tipo de cambio (si se requiere).</span>
            </span>
            {reasonEliminationType === OfferingIncomeReasonEliminationType.CurrencyExchange && (
              <span className='w-full text-left mb-2 text-[14px] md:text-[15px] flex flex-col'>
                <span className='text-teal-500 font-bold text-[14px] md:text-[15px] mb-1'>
                  ¿Que sucederá si se realiza una eliminación por cambio de divisa?
                </span>
                <span className='pl-2'>
                  - <span className='font-medium'>El sistema buscará un registro existente</span>{' '}
                  con el tipo de divisa de destino, la fecha y datos similares.
                </span>
                <span className='pl-2'>
                  - <span className='font-medium'>El registro de destino será actualizado</span>,
                  incrementando su monto con el valor calculado en el tipo de cambio.
                </span>
                <span className='pl-2'>
                  - <span className='font-medium'>Si no se encuentra un registro</span>, el sistema
                  creará uno nuevo para este cambio de divisa.
                </span>
                <span className='pl-2'>
                  - <span className='font-medium'>El registro original</span>, cuyo monto fue
                  transformado, será eliminado.
                </span>
              </span>
            )}
            <br />
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name='reasonEliminationType'
                render={({ field }) => {
                  return (
                    <FormItem
                      className={cn(
                        reasonEliminationType !==
                          OfferingIncomeReasonEliminationType.CurrencyExchange && 'mb-4'
                      )}
                    >
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
                              'Selecciona una tipo'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(OfferingIncomeReasonEliminationTypeNames).map(
                            ([key, value]) =>
                              ((key !== OfferingIncomeReasonEliminationType.CurrencyExchange &&
                                currentOfferingIncome?.currency === CurrencyType.PEN) ||
                                (key === OfferingIncomeReasonEliminationType.CurrencyExchange &&
                                  currentOfferingIncome?.currency !== CurrencyType.PEN) ||
                                key !== OfferingIncomeReasonEliminationType.CurrencyExchange) && (
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

              {reasonEliminationType === OfferingIncomeReasonEliminationType.CurrencyExchange && (
                <div className='md:flex  md:gap-10'>
                  <FormField
                    control={form.control}
                    name='exchangeCurrencyType'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-3 mb-3 md:mb-6 w-full'>
                          <FormDescription className='text-orange-500 text-[14px] pl-1 font-medium'>
                            Tipo de cambio (moneda)
                          </FormDescription>
                          <Select
                            value={field.value}
                            disabled={isInputDisabled}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                {field.value ? (
                                  <SelectValue placeholder='Selecciona las monedas' />
                                ) : (
                                  'Selecciona las monedas'
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {currentOfferingIncome?.currency === CurrencyType.USD
                                ? Object.entries(ExchangeCurrencyTypeNames).map(
                                    ([key, value]) =>
                                      key !== ExchangeCurrencyType.EURtoPEN && (
                                        <SelectItem className={`text-[14px]`} key={key} value={key}>
                                          {value}
                                        </SelectItem>
                                      )
                                  )
                                : Object.entries(ExchangeCurrencyTypeNames).map(
                                    ([key, value]) =>
                                      key !== ExchangeCurrencyType.USDtoPEN && (
                                        <SelectItem className={`text-[14px]`} key={key} value={key}>
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
                    name='exchangeRate'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-3 mb-6 w-full'>
                          <FormDescription className='text-green-500 text-[14px] pl-1 font-medium'>
                            Tipo de cambio (precio)
                          </FormDescription>
                          <FormControl>
                            <Input
                              className=''
                              disabled={isInputDisabled}
                              placeholder='Precio tipo de cambio...'
                              type='text'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              )}

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
