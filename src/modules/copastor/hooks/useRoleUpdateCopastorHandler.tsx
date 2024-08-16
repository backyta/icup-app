import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';

import { type CopastorFormData } from '@/modules/copastor/interfaces';

interface Options {
  copastorUpdateForm: UseFormReturn<CopastorFormData, any, CopastorFormData>;
  memberRoles: typeof MemberRole;
  setIsDisabledInput: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledPromoteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useRoleUpdateCopastorHandler = ({
  copastorUpdateForm,
  memberRoles,
  setIsDisabledInput,
  setIsDisabledPromoteButton,
}: Options): void => {
  //* Delete old relation
  copastorUpdateForm.setValue('theirPastor', '');

  //* Conditional level up role
  const roles: MemberRole[] = copastorUpdateForm.getValues('roles');
  const hasMember = roles.includes(memberRoles.Disciple);
  const hasPreacher = roles.includes(memberRoles.Preacher);
  const hasTreasurer = roles.includes(memberRoles.Treasurer);
  const hasCopastor = roles.includes(memberRoles.Copastor);
  const hasPastor = roles.includes(memberRoles.Pastor);
  const hasSupervisor = roles.includes(memberRoles.Supervisor);

  //* copastor --> pastor
  if (hasMember && hasCopastor && !hasSupervisor && !hasPreacher && !hasTreasurer && !hasPastor) {
    copastorUpdateForm.setValue('roles', [memberRoles.Disciple, memberRoles.Pastor]);
  }

  //* Set disabled states
  setIsDisabledInput(true);
  setIsDisabledPromoteButton(true);
};
