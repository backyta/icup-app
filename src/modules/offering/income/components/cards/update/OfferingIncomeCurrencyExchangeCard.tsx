import { useRef, useState, useCallback } from 'react';

import { MdCurrencyExchange } from 'react-icons/md';
import { useMediaQuery } from '@react-hook/media-query';

import { OfferingIncomeCurrencyExchangeForm } from '@/modules/offering/income/components/cards/update/OfferingIncomeCurrencyExchangeForm';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { AlertDialogDescription } from '@/shared/components/ui/alert-dialog';

interface UserPasswordUpdateCardProps {
  idRow: string;
}

export const OfferingIncomeCurrencyExchangeCard = ({
  idRow,
}: UserPasswordUpdateCardProps): JSX.Element => {
  //* States
  const [isOpen, setIsOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  //* Library hooks
  const isDesktop = useMediaQuery('(min-width: 768px)');

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
            className='mt-2 py-2 px-1 h-[2rem] bg-teal-400 text-white hover:bg-teal-500 hover:text-teal-950  dark:text-teal-950 dark:hover:bg-teal-500 dark:hover:text-white'
          >
            <MdCurrencyExchange className='w-8 h-[1.6rem]' />
          </Button>
        </DialogTrigger>

        <DialogContent
          ref={topRef}
          className='md:max-w-[540px] lg:max-w-[500px] xl:max-w-[600px] w-full max-h-full justify-center pt-[0.9rem] pb-[1.3rem] overflow-x-hidden overflow-y-auto'
        >
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <OfferingIncomeCurrencyExchangeForm
            id={idRow}
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
          className='mt-2 py-2 px-1 h-[2rem] bg-teal-400 text-white hover:bg-teal-500 hover:text-teal-950  dark:text-teal-950 dark:hover:bg-teal-500 dark:hover:text-white'
        >
          <MdCurrencyExchange className='w-8 h-[1.6rem]' />
        </Button>
      </DialogTrigger>

      <DialogContent
        ref={topRef}
        className='max-w-auto sm:max-w-[490px] w-full max-h-full justify-center pt-6 pb-4 px-6 md:px-8  overflow-y-auto overflow-x-hidden'
      >
        <DialogTitle></DialogTitle>
        <AlertDialogDescription></AlertDialogDescription>
        <OfferingIncomeCurrencyExchangeForm
          id={idRow}
          dialogClose={handleContainerClose}
          scrollToTop={handleContainerScroll}
        />
      </DialogContent>
    </Dialog>
  );
};
