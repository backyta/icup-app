import { useState } from 'react';

import { TiPrinter } from 'react-icons/ti';
import { useQuery } from '@tanstack/react-query';

import { cn } from '@/shared/lib/utils';
import { AiOutlineLoading } from 'react-icons/ai';

import { generateTicketByOfferingIncomeId } from '@/modules/offering/income/services/offering-income.service';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';

interface OfferingIncomeInfoCardProps {
  idRow: string;
}

export const OfferingIncomeGenerateTicket = ({
  idRow,
}: OfferingIncomeInfoCardProps): JSX.Element => {
  //* States
  const [open, setOpen] = useState<boolean>(false);

  //* Query Report and Event trigger
  const generateReportQuery = useQuery({
    queryKey: ['offering-income-generate-ticket', idRow],
    queryFn: () => generateTicketByOfferingIncomeId({ id: idRow, setOpen }),
    retry: 1,
    enabled: false,
  });

  const handleGenerateReport = (): void => {
    generateReportQuery.refetch();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleGenerateReport}
          variant='outline'
          className={cn(
            'mt-2 py-2 px-1 h-[2rem] bg-emerald-400 text-white hover:bg-emerald-500 hover:text-emerald-950 dark:text-emerald-950 dark:hover:bg-emerald-500 dark:hover:text-white'
          )}
        >
          <TiPrinter className='w-8 h-[1.65rem]' />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-[350px] sm:max-w-[400px] w-full justify-center py-8 px-6 sm:px-8 max-h-full overflow-y-auto text-center bg-white dark:bg-slate-950 rounded-lg shadow-md'>
        <DialogTitle className='text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100'>
          Generando ticket
        </DialogTitle>
        <div className='flex flex-col items-center justify-center gap-6 mt-6'>
          <AiOutlineLoading className='w-16 h-16 sm:w-20 sm:h-20 text-emerald-400 animate-spin' />
          <DialogDescription className='text-lg sm:text-xl text-gray-700 dark:text-gray-300'>
            Por favor, espere mientras generamos su ticket...
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};
