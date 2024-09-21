/* eslint-disable @typescript-eslint/promise-function-async */

import { useState } from 'react';

import { ArrowUpDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { DashboardSearchType } from '@/modules/dashboard/enums';
import { FamilyGroupInfoItem } from '@/modules/dashboard/components';

import { LoadingSpinner } from '@/shared/components';

import { getProportionFamilyGroups } from '@/modules/dashboard/services';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

export function HousesInfoCard(): JSX.Element {
  //* States
  const [changedValue, setChangedValue] = useState<boolean>(true);

  const toggleChangeValue = (): void => {
    setChangedValue(!changedValue);
  };

  //* Queries
  const query = useQuery({
    queryKey: ['proportion-family-groups', changedValue ? 'most-populated' : 'less-populated'],
    queryFn: () =>
      getProportionFamilyGroups({
        searchType: changedValue
          ? DashboardSearchType.MostPopulatedFamilyGroups
          : DashboardSearchType.LessPopulatedFamilyGroups,
        selectTerm: changedValue ? 'most-populated' : 'less-populated',
        limit: '',
        all: true,
        offset: '0',
        order: 'ASC',
      }),
    retry: 1,
  });

  return (
    <Card className='w-auto h-auto row-start-4 row-end-5 col-start-1 col-end-2 md:row-end-4 md:col-start-1 md:col-end-3 lg:row-start-4 lg:row-end-5  xl:col-start-4 xl:col-end-7 xl:row-start-2 xl:row-end-3  border-slate-400'>
      <CardHeader className='px-5 py-3 xl:p-3 2xl:p-3'>
        <div className='flex items-center align-middle justify-between'>
          <CardTitle className='font-bold text-xl sm:text-[1.45rem] lg:text-[1.50rem] 2xl:text-3xl'>
            Grupos Familiares
          </CardTitle>
          <Button onClick={toggleChangeValue} className='px-2'>
            <ArrowUpDown className='h-4 w-6 sm:h-6 sm:w-6' />
          </Button>
        </div>
        <CardDescription className='pl-2 text-base'>
          {`Grupos familiares con  ${changedValue ? 'más' : 'menos'} discípulos.`}
        </CardDescription>
      </CardHeader>
      {query.isLoading ? (
        <CardContent className='h-[45rem]'>
          <LoadingSpinner />
        </CardContent>
      ) : (
        query.data?.map((data) => <FamilyGroupInfoItem key={data.id} data={data} />)
      )}
    </Card>
  );
}
