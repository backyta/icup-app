/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useQuery } from '@tanstack/react-query';

import { MemberType } from '@/modules/offering/income/enums';

import { getAllChurches } from '@/modules/pastor/services';
import { getAllPastors } from '@/modules/copastor/services';
import { getAllSupervisors } from '@/modules/preacher/services';
import { getAllCopastors } from '@/modules/supervisor/services';
import { getAllFamilyGroups } from '@/modules/disciple/services';
import { getAllDisciples } from '@/modules/offering/income/services';
import { getAllPreachers, getAllZones } from '@/modules/family-group/services';

export const useModuleQueries = (memberType?: string | undefined) => {
  //* Queries
  const churchesQuery = useQuery({
    queryKey: ['churches'],
    queryFn: getAllChurches,
    retry: 1,
  });

  const pastorsQuery = useQuery({
    queryKey: ['pastors'],
    queryFn: getAllPastors,
    enabled: !!memberType && memberType === MemberType.Pastor,
    retry: 1,
  });

  const copastorsQuery = useQuery({
    queryKey: ['copastors'],
    queryFn: getAllCopastors,
    enabled: !!memberType && memberType === MemberType.Copastor,
    retry: 1,
  });

  const supervisorsQuery = useQuery({
    queryKey: ['supervisors'],
    queryFn: () => getAllSupervisors({ isNull: false }),
    enabled: !!memberType && memberType === MemberType.Supervisor,
    retry: 1,
  });

  const preachersQuery = useQuery({
    queryKey: ['preachers'],
    queryFn: getAllPreachers,
    enabled: !!memberType && memberType === MemberType.Preacher,
    retry: 1,
  });

  const disciplesQuery = useQuery({
    queryKey: ['disciples'],
    queryFn: getAllDisciples,
    enabled: !!memberType && memberType === MemberType.Disciple,
    retry: 1,
  });

  const familyGroupsQuery = useQuery({
    queryKey: ['family-groups'],
    queryFn: getAllFamilyGroups,
  });

  const zonesQuery = useQuery({
    queryKey: ['zones'],
    queryFn: getAllZones,
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
