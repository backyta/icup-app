import { useState, useMemo } from 'react';

import { useLocation } from 'react-router-dom';
import { BsFillPersonVcardFill } from 'react-icons/bs';
import { useMediaQuery } from '@react-hook/media-query';

import { cn } from '@/shared/lib/utils';

import { useFamilyGroupStore } from '@/stores/family-group';
import { FamilyGroupTabsCard } from '@/modules/family-group/components';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer';

interface FamilyGroupInfoCardProps {
  idRow: string;
}

export const FamilyGroupInfoCard = ({ idRow }: FamilyGroupInfoCardProps): JSX.Element => {
  //* States
  const dataSearchGeneralResponse = useFamilyGroupStore((state) => state.dataSearchGeneralResponse);
  const dataSearchByTermResponse = useFamilyGroupStore((state) => state.dataSearchByTermResponse);

  const [open, setOpen] = useState<boolean>(false);

  //* Hooks (external libraries)
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { pathname } = useLocation();

  //* Functions
  const currentFamilyGroup = useMemo(() => {
    return pathname === '/family-groups/general-search'
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
          <FamilyGroupTabsCard data={currentFamilyGroup} id={idRow} />
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
          <FamilyGroupTabsCard data={currentFamilyGroup} id={idRow} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
