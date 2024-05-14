import { useEffect, useRef } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { DialogTrigger } from '@radix-ui/react-dialog';

import { ZoneUpdateForm } from '@/app/family-house/components';
import { type FamilyHouseData } from '@/app/family-house/interfaces';

import { useFamilyHouseStore } from '@/stores';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';

interface Props {
  isDisabled: boolean;
  formFamilyHouse: UseFormReturn<FamilyHouseData, any, FamilyHouseData>;
}

export const ZoneUpdateCard = ({ isDisabled, formFamilyHouse }: Props): JSX.Element => {
  //* States
  const isUpdateCardOpen = useFamilyHouseStore((state) => state.isUpdateCardOpen);
  const setIsUpdateCardOpen = useFamilyHouseStore((state) => state.setIsUpdateCardOpen);

  const setIsInputDisabled = useFamilyHouseStore((state) => state.setIsInputDisabled);
  const setIsInputZoneDisabled = useFamilyHouseStore((state) => state.setIsInputZoneDisabled);
  const setIsInputPreacherDisabled = useFamilyHouseStore(
    (state) => state.setIsInputPreacherDisabled
  );

  const topRef = useRef<HTMLDivElement>(null);

  //* Functions
  const handleCardClose = (): void => {
    setIsUpdateCardOpen(false);
  };

  const handleContainerScroll = (): void => {
    if (topRef.current !== null) {
      topRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  //* Custom hooks
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
            formFamilyHouse.reset();
          }}
          className='w-full text-[14px] xl:text-[15px] disabled:bg-slate-500 disabled:text-white  bg-orange-400 text-orange-900 hover:text-white hover:bg-orange-500'
        >
          Actualizar zona
        </Button>
      </DialogTrigger>
      <DialogContent ref={topRef} className='max-w-[40rem] p-8 md:p-6 max-h-full overflow-y-auto'>
        <ZoneUpdateForm onClose={handleCardClose} onScroll={handleContainerScroll} />
      </DialogContent>
    </Dialog>
  );
};
