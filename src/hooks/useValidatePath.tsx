/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { type MemberRoles } from '@/shared/enums';

interface Options {
  path: string;
  memberRoles: typeof MemberRoles;
  isInputDisabled?: boolean;
}

// NOTE : eliminar los title y subtitle
export const useValidatePath = ({ path, isInputDisabled, memberRoles }: Options) => {
  let disabledRoles;

  //* Create and Update forms
  if (path === '/disciples/create-disciple' || path === '/disciples/update-disciple') {
    disabledRoles = [
      memberRoles.Disciple,
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
    ];
  }

  if (path === '/pastors/create-pastor' || path === '/pastors/update-pastor') {
    disabledRoles = [
      memberRoles.Disciple,
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
    ];
  }

  if (path === '/copastors/create-copastor' || path === '/copastors/update-copastor') {
    disabledRoles = [
      memberRoles.Disciple,
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
    ];
  }

  if (path === '/supervisors/create-supervisor' || path === '/supervisors/update-supervisor') {
    disabledRoles = [
      memberRoles.Disciple,
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Preacher,
      memberRoles.Supervisor,
    ];
  }

  if (path === '/preachers/create-preacher' || path === '/preachers/update-preacher') {
    disabledRoles = [
      memberRoles.Disciple,
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Preacher,
      memberRoles.Supervisor,
    ];
  }

  if (isInputDisabled) {
    disabledRoles = [
      memberRoles.Disciple,
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Preacher,
      memberRoles.Supervisor,
      memberRoles.Treasurer,
    ];
  }

  return {
    disabledRoles,
  };
};
