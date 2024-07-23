import { getDisciples } from '@/app/disciple/services';
import { type DiscipleQueryParams } from '@/app/disciple/interfaces';

import { MemberInfoItem } from '@/app/dashboard/components';

import { LoadingSpinner } from '@/layouts/components';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

import { useQuery } from '@tanstack/react-query';

const searchParams = {
  limit: '7',
  all: false,
  offset: '0',
  order: 'DESC',
};

export function MembersInfoCard(): JSX.Element {
  //* Querys
  const query = useQuery({
    queryKey: ['last-disciples', searchParams],
    queryFn: async () => await getDisciples(searchParams as DiscipleQueryParams),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return (
    <Card className='h-auto w-auto row-start-3 row-end-4 col-start-1 col-end-2 md:row-start-3 md:row-end-4 md:col-start-1 lg:row-start-3 lg:row-end-4 md:col-end-3 xl:col-start-1 xl:col-end-4 xl:row-start-2 xl:row-end-3 border-slate-400'>
      <CardHeader className='xl:p-3 2xl:p-5'>
        <CardTitle className='font-bold text-xl sm:text-[1.45rem] lg:text-[1.50rem] 2xl:text-3xl'>
          Discípulos Nuevos
        </CardTitle>
        <CardDescription className='pl-2 text-base'>
          Últimos discípulos registrados.
        </CardDescription>
      </CardHeader>
      {query.isLoading ? (
        <LoadingSpinner />
      ) : (
        query.data?.map((data) => <MemberInfoItem key={data.id} data={data} />)
      )}
    </Card>
  );
}
