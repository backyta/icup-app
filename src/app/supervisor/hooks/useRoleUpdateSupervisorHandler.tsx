import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type SupervisorFormData } from '@/app/supervisor/interfaces';

interface Options {
  formSupervisorUpdate: UseFormReturn<SupervisorFormData, any, SupervisorFormData>;
  memberRoles: typeof MemberRole;
  setIsDisabledInput: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledPromoteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useRoleUpdateSupervisorHandler = ({
  formSupervisorUpdate,
  memberRoles,
  setIsDisabledInput,
  setIsDisabledPromoteButton,
}: Options): void => {
  //* Delete old relation
  formSupervisorUpdate.setValue('theirCopastor', '');

  //* Conditional level up role
  const roles: MemberRole[] = formSupervisorUpdate.getValues('roles');
  const hasMember = roles.includes(memberRoles.Disciple);
  const hasPreacher = roles.includes(memberRoles.Preacher);
  const hasTreasurer = roles.includes(memberRoles.Treasurer);
  const hasCopastor = roles.includes(memberRoles.Copastor);
  const hasPastor = roles.includes(memberRoles.Pastor);
  const hasSupervisor = roles.includes(memberRoles.Supervisor);

  //* supervisor --> co-pastor
  if (hasMember && hasSupervisor && !hasCopastor && !hasPreacher && !hasTreasurer && !hasPastor) {
    formSupervisorUpdate.setValue('roles', [memberRoles.Disciple, memberRoles.Copastor]);
  }

  //* Set disabled states
  setIsDisabledInput(true);
  setIsDisabledPromoteButton(true);
};
