/* eslint-disable @typescript-eslint/promise-function-async */

import { useQuery } from '@tanstack/react-query';

import { LoadingSpinner } from '@/shared/components';

import { getDisciples } from '@/modules/disciple/services';
import { MemberInfoItem } from '@/modules/dashboard/components';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/shared/components/ui/card';

export function MembersInfoCard(): JSX.Element {
  //* Queries
  const query = useQuery({
    queryKey: ['last-disciples'],
    queryFn: () =>
      getDisciples({
        limit: '10',
        all: false,
        offset: '0',
        order: 'DESC',
      }),
    retry: 1,
  });

  return (
    <Card className='h-auto w-auto row-start-3 row-end-4 col-start-1 col-end-2 md:row-start-3 md:row-end-4 md:col-start-1 lg:row-start-3 lg:row-end-4 md:col-end-3 xl:col-start-1 xl:col-end-4 xl:row-start-2 xl:row-end-3 border-slate-400'>
      <CardHeader className='px-5 py-3 xl:p-3'>
        <CardTitle className='font-bold text-xl sm:text-[1.45rem] lg:text-[1.50rem] 2xl:text-3xl'>
          Discípulos Nuevos
        </CardTitle>
        <CardDescription className='pl-2 text-base'>
          Últimos discípulos registrados.
        </CardDescription>
      </CardHeader>
      {query.isLoading ? (
        <CardContent className='h-[45rem]'>
          <LoadingSpinner />
        </CardContent>
      ) : (
        query.data?.map((data) => <MemberInfoItem key={data.id} data={data} />)
      )}
    </Card>
  );
}
