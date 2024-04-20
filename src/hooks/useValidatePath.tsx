/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { type MemberRoles } from '@/shared/enums';

interface Options {
  path: string;
  memberRoles: typeof MemberRoles;
  isInputDisabled?: boolean;
}

export const useValidatePath = ({ path, isInputDisabled, memberRoles }: Options) => {
  let titleValue;
  let subTitleValue;
  let disabledRoles;
  let textValue;

  // create
  if (path === '/disciples/create-disciple') {
    titleValue = 'Discípulo';
    subTitleValue = 'discípulo';
    disabledRoles = [
      memberRoles.Member,
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
    ];
  }

  if (path === '/pastors/create-pastor') {
    titleValue = 'Pastor';
    subTitleValue = 'pastor';
    disabledRoles = [
      memberRoles.Member,
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
    ];
  }

  if (path === '/copastors/create-copastor') {
    titleValue = 'Co-Pastor';
    subTitleValue = 'co-pastor';
    disabledRoles = [
      memberRoles.Member,
      memberRoles.Pastor,
      memberRoles.Copastor,
      memberRoles.Supervisor,
      memberRoles.Preacher,
      memberRoles.Treasurer,
    ];
  }

  if (path === '/leaders/create-leader') {
    titleValue = 'Líder';
    subTitleValue = 'líder';
    disabledRoles = [memberRoles.Pastor, memberRoles.Copastor, memberRoles.Member];
  }

  // update
  if (path === '/leaders/update-leader' && !isInputDisabled) {
    disabledRoles = [...Object.values(memberRoles).filter((rol) => rol !== memberRoles.Treasurer)];
  }

  if (
    path === '/pastors/update-pastor' ||
    path === '/copastors/update-copastor' ||
    path === '/disciples/update-disciple' ||
    isInputDisabled
  ) {
    disabledRoles = [...Object.values(memberRoles).filter((rol) => rol)];
  }

  // update
  if (path === '/disciples/update-disciple') {
    textValue = 'Discípulo';
  }
  if (path === '/pastors/update-pastor') {
    textValue = 'Pastor';
  }
  if (path === '/copastors/update-copastor') {
    textValue = 'Co-Pastor';
  }
  if (path === '/leaders/update-leader') {
    textValue = 'Líder';
  }

  return {
    titleValue,
    subTitleValue,
    disabledRoles,
    textValue,
  };
};
