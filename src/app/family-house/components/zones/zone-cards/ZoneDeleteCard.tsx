import { useEffect, useRef } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { DialogTrigger } from '@radix-ui/react-dialog';

import { ZoneDeleteForm } from '@/app/family-house/components';
import { type FamilyHouseData } from '@/app/family-house/interfaces';

import { useFamilyHouseStore } from '@/stores';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';

interface Props {
  isDisabled: boolean;
  formFamilyHouse: UseFormReturn<FamilyHouseData, any, FamilyHouseData>;
}

export const ZoneDeleteCard = ({ isDisabled, formFamilyHouse }: Props): JSX.Element => {
  //* States
  const isDeleteCardOpen = useFamilyHouseStore((state) => state.isDeleteCardOpen);
  const setIsDeleteCardOpen = useFamilyHouseStore((state) => state.setIsDeleteCardOpen);

  const setIsInputDisabled = useFamilyHouseStore((state) => state.setIsInputDisabled);
  const setIsInputZoneDisabled = useFamilyHouseStore((state) => state.setIsInputZoneDisabled);
  const setIsInputPreacherDisabled = useFamilyHouseStore(
    (state) => state.setIsInputPreacherDisabled
  );

  const topRef = useRef<HTMLDivElement>(null);

  //* Functions
  const handleCardClose = (): void => {
    setIsDeleteCardOpen(false);
  };

  const handleContainerScroll = (): void => {
    if (topRef.current !== null) {
      topRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  //* Custom hooks
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
            formFamilyHouse.reset();
          }}
          className='w-full text-[14px] xl:text-[15px] disabled:bg-slate-500 disabled:text-white  bg-red-500 text-red-900 hover:text-white hover:bg-red-600'
        >
          Borrar zona
        </Button>
      </DialogTrigger>
      <DialogContent ref={topRef} className='max-w-[40rem] p-8 md:p-6 max-h-full overflow-y-auto'>
        <ZoneDeleteForm onClose={handleCardClose} onScroll={handleContainerScroll} />
      </DialogContent>
    </Dialog>
  );
};
