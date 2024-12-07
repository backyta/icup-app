/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useCallback, useEffect, useRef, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { MdDeleteForever } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';

import { useFamilyGroupInactivationMutation } from '@/modules/family-group/hooks';
import { familyGroupInactivationFormSchema } from '@/modules/family-group/validations';

import {
  ExternalFactorsReasonsNames,
  LeadershipIssuesReasonsNames,
  HostUnavailabilityReasonsNames,
  FamilyGroupInactivationCategory,
  AdministrativeChangesReasonsNames,
  UnavoidableCircumstancesReasonsNames,
  FamilyGroupInactivationCategoryNames,
  LackOfActivityOrCommitmentReasonsNames,
} from '@/modules/family-group/enums';

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

interface FamilyGroupInactivateCardProps {
  idRow: string;
}

export const FamilyGroupInactivateCard = ({
  idRow,
}: FamilyGroupInactivateCardProps): JSX.Element => {
  //* States
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isSelectInputDisabled, setIsSelectInputDisabled] = useState<boolean>(false);
  const topRef = useRef<HTMLDivElement>(null);

  //* Form
  const form = useForm<z.infer<typeof familyGroupInactivationFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(familyGroupInactivationFormSchema),
    defaultValues: {
      familyGroupInactivationCategory: '',
      familyGroupInactivationReason: '',
    },
  });

  //* Watchers
  const familyGroupInactivationCategory = form.watch('familyGroupInactivationCategory');
  const familyGroupInactivationReason = form.watch('familyGroupInactivationReason');

  //* Effects
  useEffect(() => {
    if (!familyGroupInactivationCategory && !familyGroupInactivationReason) {
      setIsButtonDisabled(true);
    }
    if (familyGroupInactivationCategory && familyGroupInactivationReason) {
      setIsButtonDisabled(false);
    }
  }, [form, familyGroupInactivationCategory, familyGroupInactivationReason]);

  useEffect(() => {
    const originalUrl = window.location.href;

    if (idRow && isCardOpen) {
      const url = new URL(window.location.href);
      url.pathname = `/family-groups/inactivate/${idRow}/remove`;

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
  const familyGroupInactivationMutation = useFamilyGroupInactivationMutation({
    setIsCardOpen,
    setIsButtonDisabled,
    scrollToTop: handleContainerScroll,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof familyGroupInactivationFormSchema>): void => {
    setIsSelectInputDisabled(true);
    setIsButtonDisabled(true);

    familyGroupInactivationMutation.mutate({
      id: idRow,
      familyGroupInactivationCategory: formData.familyGroupInactivationCategory,
      familyGroupInactivationReason: formData.familyGroupInactivationReason,
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
            ¿Estas seguro de inactivar a este Grupo Familiar?
          </h2>
          <p>
            <span className='text-blue-500 font-bold mb-3 inline-block text-[16px] md:text-[18px]'>
              Luego de realizar esta operación sucederá lo siguiente:
            </span>
            <br />
            <span className='inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ El registro de este Grupo Familiar se colocara en estado{' '}
              <span className='font-bold'>INACTIVO.</span>
            </span>
            <span className='inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ El registro de este Grupo Familiar se eliminara de los lugares donde estaba
              relacionado con algunos de estos roles:
              <li>Pastor, Co-Pastor, Supervisor, Zona, Predicador, G. Familiar, Discípulo.</li>
            </span>
            <span className='inline-block text-[14px] md:text-[15px]'>
              ✅ Para poder activarlo nuevamente deberás hacerlo desde el modulo{' '}
              <span className='font-bold'>Actualizar Grupo Familiar.</span>
            </span>
            <br />
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name='familyGroupInactivationCategory'
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
                          form.resetField('familyGroupInactivationReason', {
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
                          {Object.entries(FamilyGroupInactivationCategoryNames).map(
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
                name='familyGroupInactivationReason'
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
                        <SelectContent className='w-screen sm:ml-[0rem] sm:w-[95%] md:mx-auto md:w-full'>
                          {Object.entries(
                            familyGroupInactivationCategory ===
                              FamilyGroupInactivationCategory.AdministrativeChanges
                              ? AdministrativeChangesReasonsNames
                              : familyGroupInactivationCategory ===
                                  FamilyGroupInactivationCategory.ExternalFactors
                                ? ExternalFactorsReasonsNames
                                : familyGroupInactivationCategory ===
                                    FamilyGroupInactivationCategory.HostUnavailability
                                  ? HostUnavailabilityReasonsNames
                                  : familyGroupInactivationCategory ===
                                      FamilyGroupInactivationCategory.LackOfActivityOrCommitment
                                    ? LackOfActivityOrCommitmentReasonsNames
                                    : familyGroupInactivationCategory ===
                                        FamilyGroupInactivationCategory.LeadershipIssues
                                      ? LeadershipIssuesReasonsNames
                                      : familyGroupInactivationCategory ===
                                          FamilyGroupInactivationCategory.UnavoidableCircumstances
                                        ? UnavoidableCircumstancesReasonsNames
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
