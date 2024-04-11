/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useRef } from 'react';

import { DialogTrigger } from '@radix-ui/react-dialog';

import { ZoneUpdateForm } from '@/app/family-house/components';

import { useFamilyHouseStore } from '@/stores';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';

interface Props {
  isDisabled: boolean;
  form: any;
}

export const ZoneUpdateCard = ({ isDisabled, form }: Props): JSX.Element => {
  const isUpdateCardOpen = useFamilyHouseStore((state) => state.isUpdateCardOpen);
  const setIsUpdateCardOpen = useFamilyHouseStore((state) => state.setIsUpdateCardOpen);

  const setIsInputZoneDisabled = useFamilyHouseStore((state) => state.setIsInputZoneDisabled);
  const setIsInputPreacherDisabled = useFamilyHouseStore(
    (state) => state.setIsInputPreacherDisabled
  );
  const setIsInputDisabled = useFamilyHouseStore((state) => state.setIsInputDisabled);

  const topRef = useRef<HTMLDivElement>(null);

  const handleCardClose = (): void => {
    setIsUpdateCardOpen(false);
  };

  const handleContainerScroll = (): void => {
    if (topRef.current) {
      topRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isUpdateCardOpen) {
      setIsInputZoneDisabled(false);
      setIsInputPreacherDisabled(true);
      setIsInputDisabled(true);
    }
  }, [isUpdateCardOpen]);

  return (
    <Dialog open={isUpdateCardOpen} onOpenChange={setIsUpdateCardOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          disabled={isDisabled}
          onClick={() => {
            form.reset();
          }}
          className='w-full text-[14px] xl:text-[15px] disabled:bg-slate-500 disabled:text-white  bg-orange-400 text-orange-900 hover:text-white hover:bg-orange-500'
        >
          Actualizar una zona
        </Button>
      </DialogTrigger>
      <DialogContent ref={topRef} className='max-w-[40rem] p-8 md:p-6 max-h-full overflow-y-auto'>
        <ZoneUpdateForm onClose={handleCardClose} onScroll={handleContainerScroll} />
      </DialogContent>
    </Dialog>
  );
};
