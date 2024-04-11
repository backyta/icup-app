/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useRef } from 'react';

import { DialogTrigger } from '@radix-ui/react-dialog';

import { useFamilyHouseStore } from '@/stores';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { ZoneDeleteForm } from './ZoneDeleteForm';

interface Props {
  isDisabled: boolean;
  form: any;
}

export const ZoneDeleteCard = ({ isDisabled, form }: Props): JSX.Element => {
  const isDeleteCardOpen = useFamilyHouseStore((state) => state.isDeleteCardOpen);
  const setIsDeleteCardOpen = useFamilyHouseStore((state) => state.setIsDeleteCardOpen);

  const setIsInputZoneDisabled = useFamilyHouseStore((state) => state.setIsInputZoneDisabled);
  const setIsInputPreacherDisabled = useFamilyHouseStore(
    (state) => state.setIsInputPreacherDisabled
  );
  const setIsInputDisabled = useFamilyHouseStore((state) => state.setIsInputDisabled);

  const topRef = useRef<HTMLDivElement>(null);

  const handleCardClose = (): void => {
    setIsDeleteCardOpen(false);
  };

  const handleContainerScroll = (): void => {
    if (topRef.current) {
      topRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isDeleteCardOpen) {
      setIsInputZoneDisabled(false);
      setIsInputPreacherDisabled(true);
      setIsInputDisabled(true);
    }
  }, [isDeleteCardOpen]);

  return (
    <Dialog open={isDeleteCardOpen} onOpenChange={setIsDeleteCardOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          disabled={isDisabled}
          onClick={() => {
            form.reset();
          }}
          className='w-full text-[14px] xl:text-[15px] disabled:bg-slate-500 disabled:text-white  bg-red-500 text-red-900 hover:text-white hover:bg-red-600'
        >
          Borrar una zona
        </Button>
      </DialogTrigger>
      <DialogContent ref={topRef} className='max-w-[40rem] p-8 md:p-6 max-h-full overflow-y-auto'>
        <ZoneDeleteForm onClose={handleCardClose} onScroll={handleContainerScroll} />
      </DialogContent>
    </Dialog>
  );
};
