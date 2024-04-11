/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useRef } from 'react';

import { DialogTrigger } from '@radix-ui/react-dialog';

import { ZoneCreateForm } from '@/app/family-house/components';

import { useFamilyHouseStore } from '@/stores';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';

interface Props {
  isDisabled: boolean;
  form: any;
}

export const ZoneCreateCard = ({ isDisabled, form }: Props): JSX.Element => {
  const isCreateCardOpen = useFamilyHouseStore((state) => state.isCreateCardOpen);
  const setIsCreateCardOpen = useFamilyHouseStore((state) => state.setIsCreateCardOpen);

  const setIsInputZoneDisabled = useFamilyHouseStore((state) => state.setIsInputZoneDisabled);
  const setIsInputPreacherDisabled = useFamilyHouseStore(
    (state) => state.setIsInputPreacherDisabled
  );
  const setIsInputDisabled = useFamilyHouseStore((state) => state.setIsInputDisabled);

  const topRef = useRef<HTMLDivElement>(null);

  const handleCardClose = (): void => {
    setIsCreateCardOpen(false);
  };

  const handleContainerScroll = (): void => {
    if (topRef.current) {
      topRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isCreateCardOpen) {
      setIsInputZoneDisabled(false);
      setIsInputPreacherDisabled(true);
      setIsInputDisabled(true);
    }
  }, [isCreateCardOpen]);

  return (
    <Dialog open={isCreateCardOpen} onOpenChange={setIsCreateCardOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          disabled={isDisabled}
          onClick={() => {
            form.reset();
          }}
          className='w-full text-[14px] xl:text-[15px] disabled:bg-slate-500 disabled:text-white bg-green-500 text-green-900 hover:text-white hover:bg-green-600'
        >
          Crear nueva zona
        </Button>
      </DialogTrigger>
      <DialogContent
        ref={topRef}
        className='max-w-[40rem] p-8 md:p-6 max-h-full overflow-x-hidden overflow-y-auto'
      >
        <ZoneCreateForm onClose={handleCardClose} onScroll={handleContainerScroll} />
      </DialogContent>
    </Dialog>
  );
};
