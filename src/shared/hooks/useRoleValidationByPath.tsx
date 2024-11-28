/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { type MemberRole } from '@/shared/enums';

interface Options {
  path: string;
  memberRoles: typeof MemberRole;
}

export const useRoleValidationByPath = ({ path, memberRoles }: Options) => {
  let disabledRoles;

  //* Create and Update forms
  if (path === '/disciples/create' || path === '/disciples/update') {
    disabledRoles = [
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
      memberRoles.Disciple,
    ];
  }

  if (path === '/pastors/create' || path === '/pastors/update') {
    disabledRoles = [
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
      memberRoles.Disciple,
    ];
  }

  if (path === '/copastors/create' || path === '/copastors/update') {
    disabledRoles = [
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
      memberRoles.Disciple,
    ];
  }

  if (path === '/supervisors/create' || path === '/supervisors/update') {
    disabledRoles = [
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Preacher,
      memberRoles.Supervisor,
      memberRoles.Disciple,
    ];
  }

  if (path === '/preachers/create' || path === '/preachers/update') {
    disabledRoles = [
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Preacher,
      memberRoles.Supervisor,
      memberRoles.Disciple,
    ];
  }

  return {
    disabledRoles,
  };
};
