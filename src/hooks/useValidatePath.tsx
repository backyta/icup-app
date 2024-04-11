/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { MemberRoles } from '@/shared/enums';

interface Options {
  path: string;
  idDisabled?: boolean;
}

export const useValidatePath = ({ path, idDisabled }: Options) => {
  let titleValue;
  let subTitleValue;
  let disabledRoles;

  //* Create
  if (path === '/disciples/create-disciple') {
    titleValue = 'Discípulo';
    subTitleValue = 'discípulo';
    disabledRoles = [
      MemberRoles.Member,
      MemberRoles.Pastor,
      MemberRoles.Copastor,
      MemberRoles.Supervisor,
      MemberRoles.Preacher,
      MemberRoles.Treasurer,
    ];
  }

  if (path === '/pastors/create-pastor') {
    titleValue = 'Pastor';
    subTitleValue = 'pastor';
    disabledRoles = [
      MemberRoles.Member,
      MemberRoles.Pastor,
      MemberRoles.Copastor,
      MemberRoles.Supervisor,
      MemberRoles.Preacher,
      MemberRoles.Treasurer,
    ];
  }

  if (path === '/copastors/create-copastor') {
    titleValue = 'Co-Pastor';
    subTitleValue = 'co-pastor';
    disabledRoles = [
      MemberRoles.Member,
      MemberRoles.Pastor,
      MemberRoles.Copastor,
      MemberRoles.Supervisor,
      MemberRoles.Preacher,
      MemberRoles.Treasurer,
    ];
  }

  if (path === '/leaders/create-leader') {
    titleValue = 'Líder';
    subTitleValue = 'líder';
    disabledRoles = [MemberRoles.Pastor, MemberRoles.Copastor, MemberRoles.Member];
  }

  //* Update
  if (path === '/leaders/update-leader' && !idDisabled) {
    disabledRoles = [...Object.values(MemberRoles).filter((rol) => rol !== MemberRoles.Treasurer)];
  }

  if (
    path === '/pastors/update-pastor' ||
    path === '/copastors/update-copastor' ||
    path === '/disciples/update-disciple' ||
    idDisabled
  ) {
    disabledRoles = [...Object.values(MemberRoles).filter((rol) => rol)];
  }

  return {
    titleValue,
    subTitleValue,
    disabledRoles,
  };
};
