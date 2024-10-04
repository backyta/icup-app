/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useQuery } from '@tanstack/react-query';

import { MemberType } from '@/modules/offering/income/enums';

import { getSimpleZones } from '@/modules/zone/services';
import { getSimplePastors } from '@/modules/pastor/services';
import { getSimpleChurches } from '@/modules/church/services';
import { getSimpleCopastors } from '@/modules/copastor/services';
import { getSimplePreachers } from '@/modules/preacher/services';
import { getSimpleDisciples } from '@/modules/disciple/services';
import { getSimpleSupervisors } from '@/modules/supervisor/services';
import { getSimpleFamilyGroups } from '@/modules/family-group/services';

export const useModuleQueries = (memberType?: string | undefined) => {
  //* Queries
  const churchesQuery = useQuery({
    queryKey: ['churches'],
    queryFn: () => getSimpleChurches({ isSimpleQuery: true }),
    retry: 1,
  });

  const pastorsQuery = useQuery({
    queryKey: ['pastors'],
    queryFn: () => getSimplePastors({ isSimpleQuery: true }),
    enabled: !!memberType && memberType === MemberType.Pastor,
    retry: 1,
  });

  const copastorsQuery = useQuery({
    queryKey: ['copastors'],
    queryFn: () => getSimpleCopastors({ isSimpleQuery: true }),
    enabled: !!memberType && memberType === MemberType.Copastor,
    retry: 1,
  });

  const supervisorsQuery = useQuery({
    queryKey: ['supervisors'],
    queryFn: () => getSimpleSupervisors({ isNullZone: false, isSimpleQuery: true }),
    enabled: !!memberType && memberType === MemberType.Supervisor,
    retry: 1,
  });

  const preachersQuery = useQuery({
    queryKey: ['preachers'],
    queryFn: () => getSimplePreachers({ isSimpleQuery: true }),
    enabled: !!memberType && memberType === MemberType.Preacher,
    retry: 1,
  });

  const disciplesQuery = useQuery({
    queryKey: ['disciples'],
    queryFn: () => getSimpleDisciples({ isSimpleQuery: true }),
    enabled: !!memberType && memberType === MemberType.Disciple,
    retry: 1,
  });

  const familyGroupsQuery = useQuery({
    queryKey: ['family-groups'],
    queryFn: () => getSimpleFamilyGroups({ isSimpleQuery: true }),
  });

  const zonesQuery = useQuery({
    queryKey: ['zones'],
    queryFn: () => getSimpleZones({ isSimpleQuery: true }),
  });

  return {
    pastorsQuery,
    copastorsQuery,
    supervisorsQuery,
    preachersQuery,
    disciplesQuery,
    familyGroupsQuery,
    zonesQuery,
    churchesQuery,
  };
};
