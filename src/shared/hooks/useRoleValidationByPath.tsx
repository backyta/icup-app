/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { MemberRole } from '@/shared/enums/member-role.enum';

interface Options {
  path: string;
}

export const useRoleValidationByPath = ({ path }: Options) => {
  let disabledRoles;

  //? Create and Update forms
  //* Pastor
  if (path === '/pastors/create') {
    disabledRoles = [
      MemberRole.Pastor,
      MemberRole.Copastor,
      MemberRole.Supervisor,
      MemberRole.Preacher,
      MemberRole.Treasurer,
      MemberRole.Disciple,
      MemberRole.Presbyter,
    ];
  }

  if (path === '/pastors/update') {
    disabledRoles = [
      MemberRole.Pastor,
      MemberRole.Copastor,
      MemberRole.Supervisor,
      MemberRole.Preacher,
      MemberRole.Treasurer,
      MemberRole.Disciple,
    ];
  }

  //* Co-pastor
  if (path === '/copastors/create') {
    disabledRoles = [
      MemberRole.Pastor,
      MemberRole.Copastor,
      MemberRole.Supervisor,
      MemberRole.Preacher,
      MemberRole.Treasurer,
      MemberRole.Disciple,
      MemberRole.Presbyter,
    ];
  }

  if (path === '/copastors/update') {
    disabledRoles = [
      MemberRole.Pastor,
      MemberRole.Copastor,
      MemberRole.Supervisor,
      MemberRole.Preacher,
      MemberRole.Treasurer,
      MemberRole.Disciple,
    ];
  }

  //* Supervisor
  if (path === '/supervisors/create' || path === '/supervisors/update') {
    disabledRoles = [
      MemberRole.Pastor,
      MemberRole.Copastor,
      MemberRole.Preacher,
      MemberRole.Supervisor,
      MemberRole.Disciple,
      MemberRole.Presbyter,
    ];
  }

  //* Predicador
  if (path === '/preachers/create' || path === '/preachers/update') {
    disabledRoles = [
      MemberRole.Pastor,
      MemberRole.Copastor,
      MemberRole.Preacher,
      MemberRole.Supervisor,
      MemberRole.Disciple,
      MemberRole.Presbyter,
    ];
  }

  //* Disciple
  if (path === '/disciples/create' || path === '/disciples/update') {
    disabledRoles = [
      MemberRole.Pastor,
      MemberRole.Copastor,
      MemberRole.Supervisor,
      MemberRole.Preacher,
      MemberRole.Treasurer,
      MemberRole.Disciple,
      MemberRole.Presbyter,
    ];
  }

  return {
    disabledRoles,
  };
};
