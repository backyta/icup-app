import { cn } from '@/shared/lib/utils';

import { Skeleton } from '@/shared/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

export const FinancialBalanceComparativeMetricsSkeleton = (): JSX.Element => {
  return (
    <div
      className={cn(
        'mt-5 px-2 pb-10 sm:pb-10 md:px-6 xl:pb-14 flex flex-col xl:flex xl:flex-col gap-10 h-[230rem] sm:h-[245rem] md:h-[253rem] lg:h-[275rem] xl:h-auto'
      )}
    >
      <Card
        className={cn(
          'bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-auto sm:h-[34.2rem] md:h-[34.2rem] lg:h-[36.3rem] 2xl:h-[36.3rem] m-0 border-slate-200 dark:border-slate-800'
        )}
      >
        <CardHeader className='flex flex-col sm:flex-row items-center justify-between px-4 py-2.5'>
          <Skeleton className='h-7 w-64 mt-1' />
          <div className='flex'>
            <Skeleton className='h-10 w-16 mt-1' />
            <Skeleton className='h-10 w-16 mt-1' />
          </div>
        </CardHeader>
        <CardContent className='h-full px-2 sm:px-4 py-0'>
          <Skeleton className='h-[12.5rem] mlg:h-[13.5rem] w-full mt-1' />
          <Skeleton className='h-3 w-10 mt-3 mx-auto' />
          <Skeleton className='h-[12.5rem] lg:h-[13.5rem] w-full mt-3' />
          <Skeleton className='h-3 w-10 mt-3 mx-auto mb-3' />
        </CardContent>
      </Card>

      <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col row-start-auto col-start-2 col-end-3 h-[31rem] sm:h-[26rem] md:h-[26rem] lg:h-[30rem] 2xl:h-[30rem] m-0 border-slate-200 dark:border-slate-800'>
        <CardHeader className='flex flex-col sm:flex-row items-center justify-between px-4 py-2.5'>
          <Skeleton className='h-7 w-64 mt-1' />
          <div className='flex'>
            <Skeleton className='h-10 w-16 mt-1' />
            <Skeleton className='h-10 w-16 mt-1' />
          </div>
        </CardHeader>
        <CardContent className='h-full px-2 sm:px-4 py-0'>
          <Skeleton className='h-[22rem] w-full mt-1' />
          <div className='flex justify-center gap-10'>
            <Skeleton className='h-3 w-10 mt-3' />
            <Skeleton className='h-3 w-10 mt-3' />
          </div>
        </CardContent>
      </Card>

      <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col row-start-auto col-start-1 col-end-2 h-[31rem] sm:h-[26rem] md:h-[26rem] lg:h-[30rem] 2xl:h-[30rem] m-0 border-slate-200 dark:border-slate-800'>
        <CardHeader className='flex flex-col sm:flex-row items-center justify-between px-4 py-2.5'>
          <Skeleton className='h-7 w-64 mt-1' />
          <div className='flex'>
            <Skeleton className='h-10 w-16 mt-1' />
            <Skeleton className='h-10 w-16 mt-1' />
          </div>
        </CardHeader>
        <CardContent className='h-full px-2 sm:px-4 py-0'>
          <Skeleton className='h-[22rem] w-full mt-1' />
          <div className='flex justify-center gap-10'>
            <Skeleton className='h-3 w-10 mt-3' />
            <Skeleton className='h-3 w-10 mt-3' />
          </div>
        </CardContent>
      </Card>

      <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col row-start-auto col-start-2 col-end-3 h-[31rem] sm:h-[26rem] md:h-[26rem] lg:h-[30rem] 2xl:h-[30rem] m-0 border-slate-200 dark:border-slate-800'>
        <CardHeader className='flex flex-col sm:flex-row items-center justify-between px-4 py-2.5'>
          <Skeleton className='h-7 w-64 mt-1' />
          <div className='flex'>
            <Skeleton className='h-10 w-16 mt-1' />
            <Skeleton className='h-10 w-16 mt-1' />
          </div>
        </CardHeader>
        <CardContent className='h-full px-2 sm:px-4 py-0'>
          <Skeleton className='h-[22rem] w-full mt-1' />
          <div className='flex justify-center gap-10'>
            <Skeleton className='h-3 w-10 mt-3' />
            <Skeleton className='h-3 w-10 mt-3' />
          </div>
        </CardContent>
      </Card>

      <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col row-start-auto col-start-1 col-end-2 h-[31rem] sm:h-[26rem] md:h-[26rem] lg:h-[30rem] 2xl:h-[30rem] m-0 border-slate-200 dark:border-slate-800'>
        <CardHeader className='flex flex-col sm:flex-row items-center justify-between px-4 py-2.5'>
          <Skeleton className='h-7 w-64 mt-1' />
          <div className='flex'>
            <Skeleton className='h-10 w-16 mt-1' />
            <Skeleton className='h-10 w-16 mt-1' />
          </div>
        </CardHeader>
        <CardContent className='h-full px-2 sm:px-4 py-0'>
          <Skeleton className='h-[22rem] w-full mt-1' />
          <div className='flex justify-center gap-10'>
            <Skeleton className='h-3 w-10 mt-3' />
            <Skeleton className='h-3 w-10 mt-3' />
          </div>
        </CardContent>
      </Card>

      <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col row-start-auto col-start-2 col-end-3 h-[31rem] sm:h-[26rem] md:h-[26rem] lg:h-[30rem] 2xl:h-[30rem] m-0 border-slate-200 dark:border-slate-800'>
        <CardHeader className='flex flex-col sm:flex-row items-center justify-between px-4 py-2.5'>
          <Skeleton className='h-7 w-64 mt-1' />
          <div className='flex'>
            <Skeleton className='h-10 w-16 mt-1' />
            <Skeleton className='h-10 w-16 mt-1' />
          </div>
        </CardHeader>
        <CardContent className='h-full px-2 sm:px-4 py-0'>
          <Skeleton className='h-[22rem] w-full mt-1' />
          <div className='flex justify-center gap-10'>
            <Skeleton className='h-3 w-10 mt-3' />
            <Skeleton className='h-3 w-10 mt-3' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
