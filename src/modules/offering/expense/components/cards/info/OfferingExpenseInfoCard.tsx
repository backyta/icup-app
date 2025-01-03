import { useState, useMemo } from 'react';

import { useLocation } from 'react-router-dom';
import { BsFillPersonVcardFill } from 'react-icons/bs';
import { useMediaQuery } from '@react-hook/media-query';

import { cn } from '@/shared/lib/utils';
import { useOfferingExpenseStore } from '@/stores/offering-expense/offering-expenses.store';

import { OfferingExpenseTabsCard } from '@/modules/offering/expense/components/cards/info/OfferingExpenseTabsCard';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/shared/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer';

interface OfferingExpenseInfoCardProps {
  idRow: string;
}

export const OfferingExpenseInfoCard = ({ idRow }: OfferingExpenseInfoCardProps): JSX.Element => {
  //* States
  const dataSearchGeneralResponse = useOfferingExpenseStore(
    (state) => state.dataSearchGeneralResponse
  );
  const dataSearchByTermResponse = useOfferingExpenseStore(
    (state) => state.dataSearchByTermResponse
  );

  const [open, setOpen] = useState<boolean>(false);

  //* Hooks (external libraries)
  const { pathname } = useLocation();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  //* Functions

  const currentOfferingExpense = useMemo(() => {
    return pathname === '/offerings/expenses/general-search'
      ? dataSearchGeneralResponse?.find((data) => data.id === idRow)
      : dataSearchByTermResponse?.find((data) => data.id === idRow);
  }, [pathname, dataSearchGeneralResponse, dataSearchByTermResponse, idRow]);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'mt-2 py-2 px-1 h-[2rem] bg-blue-400 text-white hover:bg-blue-500 hover:text-blue-950  dark:text-blue-950 dark:hover:bg-blue-500 dark:hover:text-white'
            )}
          >
            <BsFillPersonVcardFill className='w-8 h-[1.65rem]' />
          </Button>
        </DialogTrigger>

        <DialogContent className='max-w-[690px] w-full justify-center py-6 max-h-full overflow-y-auto overflow-x-hidden'>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <OfferingExpenseTabsCard data={currentOfferingExpense} id={idRow} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'mt-2 py-2 px-1 h-[2rem] bg-blue-400 text-white hover:bg-blue-500 hover:text-blue-950  dark:text-blue-950 dark:hover:bg-blue-500 dark:hover:text-white'
          )}
        >
          <BsFillPersonVcardFill className='w-8 h-[1.65rem]' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='flex justify-center py-8 px-6 max-h-full overflow-y-auto overflow-x-hidden'>
          <OfferingExpenseTabsCard data={currentOfferingExpense} id={idRow} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
