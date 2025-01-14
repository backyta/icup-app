/* eslint-disable react/prop-types */

import type * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { es } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps): JSX.Element {
  const currentYear = new Date().getFullYear();
  return (
    <DayPicker
      locale={es}
      captionLayout='dropdown-buttons'
      fromYear={1930}
      toYear={currentYear}
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4 text-sm',
        button: 'flex justify-end mb-4 w-[1.5]',

        dropdown_icon: '',
        caption_dropdowns: 'flex gap-x-2 -ml-2',
        dropdown:
          'text-black text-[1rem] md:text-[0.9rem] w-auto border-none bg-slate-100 dark:bg-slate-300 rounded-md',
        dropdown_month: 'w-full flex text-[0rem]',
        dropdown_year: 'w-full flex text-[0rem]',
        caption: 'flex flex-col justify-items-start pt-1 relative items-center',
        caption_label: 'text-sm font-medium hidden',

        nav: 'space-x-1 flex items-center text-[2rem]',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-8 w-8 p-0 dark:bg-slate-300 bg-slate-100 text-slate-950'
        ),
        nav_button_previous: 'absolute left-0',
        nav_button_next: 'absolute right-0',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[1rem] md:text-[0.9rem]',
        row: 'flex w-full mt-2',
        cell: 'h-5 md:h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-6 w-6 md:h-9 w-9 p-0  font-normal aria-selected:opacity-100 text-[14px] md:text-[14px]'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',

        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className='h-4 w-4' />,
        IconRight: () => <ChevronRight className='h-4 w-4' />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
