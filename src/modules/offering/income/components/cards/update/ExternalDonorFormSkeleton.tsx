import { CardContent } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

export const ExternalDonorFormSkeleton = (): JSX.Element => {
  return (
    <CardContent className='py-3 px-4'>
      <div className='dark:text-slate-300 text-slate-500 font-bold text-[16px] mb-0 pl-0 md:pl-2'>
        <Skeleton className='h-5 w-96' />
      </div>
      <div>
        <form className='w-full flex flex-col md:grid md:grid-cols-2 gap-x-10 gap-y-0 px-2 sm:px-4'>
          <div className='col-start-1 col-end-2'>
            <div>
              <Skeleton className='h-4 w-24 mt-5' />
              <Skeleton className='h-8 w-full mt-2' />
            </div>

            <div>
              <Skeleton className='h-4 w-24 mt-6' />
              <Skeleton className='h-8 w-full mt-2' />
            </div>

            <div>
              <Skeleton className='h-4 w-24 mt-6' />
              <Skeleton className='h-8 w-full mt-2' />
            </div>

            <div>
              <Skeleton className='h-4 w-24 mt-6' />
              <Skeleton className='h-8 w-full mt-2' />
            </div>

            <div>
              <Skeleton className='h-4 w-24 mt-6' />
              <Skeleton className='h-8 w-full mt-2' />
            </div>
          </div>

          <div className='col-start-2 col-end-3'>
            <div>
              <Skeleton className='h-4 w-24 mt-5' />
              <Skeleton className='h-8 w-full mt-2' />
            </div>

            <div>
              <Skeleton className='h-4 w-24 mt-6' />
              <Skeleton className='h-8 w-full mt-2' />
            </div>

            <div>
              <Skeleton className='h-4 w-24 mt-6' />
              <Skeleton className='h-8 w-full mt-2' />
            </div>

            <div>
              <Skeleton className='h-4 w-24 mt-6' />
              <Skeleton className='h-8 w-full mt-2' />
            </div>

            <div>
              <Skeleton className='h-4 w-24 mt-6' />
              <Skeleton className='h-8 w-full mt-2' />
            </div>
          </div>

          <div className='sm:col-start-1 sm:col-end-3 w-full'>
            <Skeleton className='h-10 w-full mt-6' />
            <div className='flex flex-col  justify-center items-center mt-1'>
              <Skeleton className='text-center h-4 w-64 mt-2' />
              <Skeleton className='text-center h-4 w-60 mt-2' />
            </div>
          </div>
        </form>
      </div>
    </CardContent>
  );
};
