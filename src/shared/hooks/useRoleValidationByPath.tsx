/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { type MemberRole } from '@/shared/enums/member-role.enum';

interface Options {
  path: string;
  memberRoles: typeof MemberRole;
}

export const useRoleValidationByPath = ({ path, memberRoles }: Options) => {
  let disabledRoles;

  // ? Create and Update forms
  //* Pastor
  if (path === '/pastors/create') {
    disabledRoles = [
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
      memberRoles.Disciple,
      memberRoles.Presbyter,
    ];
  }

  if (path === '/pastors/update') {
    disabledRoles = [
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
      memberRoles.Disciple,
    ];
  }

  //* Co-pastor
  if (path === '/copastors/create') {
    disabledRoles = [
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
      memberRoles.Disciple,
      memberRoles.Presbyter,
    ];
  }

  if (path === '/copastors/update') {
    disabledRoles = [
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
      memberRoles.Disciple,
    ];
  }

  //* Supervisor
  if (path === '/supervisors/create' || path === '/supervisors/update') {
    disabledRoles = [
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Preacher,
      memberRoles.Supervisor,
      memberRoles.Disciple,
      memberRoles.Presbyter,
    ];
  }

  //* Predicador
  if (path === '/preachers/create' || path === '/preachers/update') {
    disabledRoles = [
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Preacher,
      memberRoles.Supervisor,
      memberRoles.Disciple,
      memberRoles.Presbyter,
    ];
  }

  //* Disciple
  if (path === '/disciples/create' || path === '/disciples/update') {
    disabledRoles = [
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
      memberRoles.Disciple,
      memberRoles.Presbyter,
    ];
  }

  return {
    disabledRoles,
  };
};
