/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useCallback, useEffect, useRef, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { MdDeleteForever } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  ChurchInactivationCategory,
  ChurchInactivationCategoryNames,
} from '@/modules/church/enums/church-inactivation-category.enum';
import {
  AdministrativeReasonsNames,
  ExternalFactorsReasonsNames,
  StrategicDecisionsReasonsNames,
  FinancialChallengesReasonsNames,
  NaturalCircumstancesReasonsNames,
  CommunityRelatedIssuesReasonsNames,
  LegalOrRegulatoryIssuesReasonsNames,
} from '@/modules/church/enums/church-inactivation-reason.enum';

import { useChurchInactivationMutation } from '@/modules/church/hooks/useChurchInactivationMutation';

import { churchInactivationFormSchema } from '@/modules/church/validations/church-inactivation-form-schema';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
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

interface ChurchInactivateCardProps {
  idRow: string;
}

export const ChurchInactivateCard = ({ idRow }: ChurchInactivateCardProps): JSX.Element => {
  //* States
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isSelectInputDisabled, setIsSelectInputDisabled] = useState<boolean>(false);
  const topRef = useRef<HTMLDivElement>(null);

  //* Form
  const form = useForm<z.infer<typeof churchInactivationFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(churchInactivationFormSchema),
    defaultValues: {
      churchInactivationCategory: '',
      churchInactivationReason: '',
    },
  });

  //* Watchers
  const churchInactivationCategory = form.watch('churchInactivationCategory');
  const churchInactivationReason = form.watch('churchInactivationReason');

  //* Effects
  useEffect(() => {
    if (!churchInactivationCategory && !churchInactivationReason) {
      setIsButtonDisabled(true);
    }
    if (churchInactivationCategory && churchInactivationReason) {
      setIsButtonDisabled(false);
    }
  }, [form, churchInactivationCategory, churchInactivationReason]);

  useEffect(() => {
    const originalUrl = window.location.href;

    if (idRow && isCardOpen) {
      const url = new URL(window.location.href);
      url.pathname = `/churches/inactivate/${idRow}/remove`;

      window.history.replaceState({}, '', url);

      return () => {
        window.history.replaceState({}, '', originalUrl);
      };
    }
  }, [idRow, isCardOpen]);

  //* Functions
  const handleContainerScroll = useCallback((): void => {
    if (topRef.current !== null) {
      topRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  //* Custom hooks
  const churchInactivationMutation = useChurchInactivationMutation({
    setIsCardOpen,
    setIsButtonDisabled,
    setIsSelectInputDisabled,
    scrollToTop: handleContainerScroll,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof churchInactivationFormSchema>): void => {
    setIsSelectInputDisabled(true);
    setIsButtonDisabled(true);

    churchInactivationMutation.mutate({
      id: idRow,
      churchInactivationCategory: formData.churchInactivationCategory,
      churchInactivationReason: formData.churchInactivationReason,
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
            ¿Estas seguro de inactivar a esta Iglesia?
          </h2>
          <p>
            <span className='text-blue-500 font-bold mb-3 inline-block text-[16px] md:text-[18px]'>
              Luego de realizar esta operación sucederá lo siguiente:
            </span>
            <br />
            <span className='inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ El registro de esta Iglesia se colocara en estado{' '}
              <span className='font-bold'>INACTIVO.</span>
            </span>
            <span className='inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ El registro de esta Iglesia se eliminara de los lugares donde estaba relacionado
              con algunos de estos roles:
              <li>Pastor, Co-Pastor, Supervisor, Zona, Predicador, G. Familiar, Discípulo.</li>
            </span>
            <span className='inline-block text-[14px] md:text-[15px]'>
              ✅ Para poder activarlo nuevamente deberás hacerlo desde el modulo{' '}
              <span className='font-bold'>Actualizar Iglesia.</span>
            </span>
            <br />
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name='churchInactivationCategory'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold text-red-500'>
                        ¿Cual es el motivo por el cual se esta inactivando este registro?
                      </FormLabel>
                      <FormDescription className='text-[14px] pl-1'>
                        Elige una categoría de eliminación.
                      </FormDescription>
                      <Select
                        disabled={isSelectInputDisabled}
                        value={field.value}
                        onOpenChange={() => {
                          form.resetField('churchInactivationReason', {
                            defaultValue: '',
                          });
                        }}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona una categoría' />
                            ) : (
                              'Selecciona una categoría'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(ChurchInactivationCategoryNames).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name='churchInactivationReason'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormDescription className='text-[14px] pl-1'>
                        Elige un motivo de eliminación según su categoría.
                      </FormDescription>
                      <Select
                        disabled={isSelectInputDisabled}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona un motivo' />
                            ) : (
                              'Selecciona un motivo'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='mr-[0rem] w-[85%] sm:ml-[0rem] sm:w-[95%] md:mx-auto md:w-full'>
                          {Object.entries(
                            churchInactivationCategory === ChurchInactivationCategory.Administrative
                              ? AdministrativeReasonsNames
                              : churchInactivationCategory ===
                                  ChurchInactivationCategory.CommunityRelatedIssues
                                ? CommunityRelatedIssuesReasonsNames
                                : churchInactivationCategory ===
                                    ChurchInactivationCategory.NaturalCircumstances
                                  ? NaturalCircumstancesReasonsNames
                                  : churchInactivationCategory ===
                                      ChurchInactivationCategory.FinancialChallenges
                                    ? FinancialChallengesReasonsNames
                                    : churchInactivationCategory ===
                                        ChurchInactivationCategory.ExternalFactors
                                      ? ExternalFactorsReasonsNames
                                      : churchInactivationCategory ===
                                          ChurchInactivationCategory.LegalOrRegulatoryIssues
                                        ? LegalOrRegulatoryIssuesReasonsNames
                                        : churchInactivationCategory ===
                                            ChurchInactivationCategory.StrategicDecisions
                                          ? StrategicDecisionsReasonsNames
                                          : []
                          ).map(([key, value]) => (
                            <SelectItem className='' key={key} value={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div className='flex justify-center md:justify-end gap-x-4 mt-4'>
                <Button
                  disabled={isButtonDisabled}
                  className='w-full md:w-auto bg-red-500 text-red-950 hover:bg-red-500 hover:text-white text-[14px]'
                  type='button'
                  onClick={() => {
                    setIsCardOpen(false);
                  }}
                >
                  No, cancelar
                </Button>
                <Button
                  disabled={isButtonDisabled}
                  type='submit'
                  className='w-full md:w-auto bg-green-500 text-green-950 hover:bg-green-500 hover:text-white text-[14px]'
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
