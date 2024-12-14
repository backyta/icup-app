import { useRef, useState, useCallback, useMemo } from 'react';

import { GiCardExchange } from 'react-icons/gi';
import { useMediaQuery } from '@react-hook/media-query';

import { ZoneSupervisorUpdateForm } from '@/modules/zone/components/cards/update/ZoneSupervisorUpdateForm';

import { useZoneStore } from '@/stores/zone/zone.store';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';

interface FamilyGroupPreacherUpdateCardProps {
  idRow: string;
}

export const ZoneSupervisorUpdateCard = ({
  idRow,
}: FamilyGroupPreacherUpdateCardProps): JSX.Element => {
  //* States
  const [isOpen, setIsOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const dataSearchByTermResponse = useZoneStore((state) => state.dataSearchByTermResponse);

  //* Library hooks
  const isDesktop = useMediaQuery('(min-width: 768px)');

  //* Functions
  const currentZone = useMemo(
    () => dataSearchByTermResponse?.find((data) => data?.id === idRow),
    [dataSearchByTermResponse, idRow]
  );

  const handleContainerClose = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const handleContainerScroll = useCallback((): void => {
    if (topRef.current !== null) {
      topRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='mt-2 py-2 px-1 h-[2rem] bg-emerald-400 text-white hover:bg-emerald-500 hover:text-emerald-950  dark:text-emerald-950 dark:hover:bg-emerald-500 dark:hover:text-white'
          >
            <GiCardExchange className='w-8 h-[1.6rem]' />
          </Button>
        </DialogTrigger>

        <DialogContent
          ref={topRef}
          className='md:max-w-[600px] lg:max-w-[600px] xl:max-w-[650px] w-full max-h-full justify-center pt-[0.9rem] pb-[1.3rem] overflow-x-hidden overflow-y-auto'
        >
          <ZoneSupervisorUpdateForm
            id={idRow}
            data={currentZone}
            dialogClose={handleContainerClose}
            scrollToTop={handleContainerScroll}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='mt-2 py-2 px-1 h-[2rem] bg-emerald-400 text-white hover:bg-emerald-500 hover:text-emerald-950  dark:text-emerald-950 dark:hover:bg-emerald-500 dark:hover:text-white'
        >
          <GiCardExchange className='w-8 h-[1.6rem]' />
        </Button>
      </DialogTrigger>

      <DialogContent
        ref={topRef}
        className='max-w-auto sm:max-w-[530px] w-full max-h-full justify-center pt-6 pb-4 px-8 overflow-y-auto overflow-x-hidden'
      >
        <ZoneSupervisorUpdateForm
          id={idRow}
          data={currentZone}
          dialogClose={handleContainerClose}
          scrollToTop={handleContainerScroll}
        />
      </DialogContent>
    </Dialog>
  );
};