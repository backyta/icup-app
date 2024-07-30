import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type PreacherFormData } from '@/app/preacher/interfaces';

interface Options {
  preacherUpdateForm: UseFormReturn<PreacherFormData, any, PreacherFormData>;
  memberRoles: typeof MemberRole;
  setIsDisabledInput: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledPromoteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useRoleUpdatePreacherHandler = ({
  preacherUpdateForm,
  memberRoles,
  setIsDisabledInput,
  setIsDisabledPromoteButton,
}: Options): void => {
  //* Delete old relation
  preacherUpdateForm.setValue('theirSupervisor', '');

  //* Conditional level up role
  const roles: MemberRole[] = preacherUpdateForm.getValues('roles');
  const hasMember = roles.includes(memberRoles.Disciple);
  const hasPreacher = roles.includes(memberRoles.Preacher);
  const hasTreasurer = roles.includes(memberRoles.Treasurer);
  const hasCopastor = roles.includes(memberRoles.Copastor);
  const hasPastor = roles.includes(memberRoles.Pastor);
  const hasSupervisor = roles.includes(memberRoles.Supervisor);

  //* preacher --> supervisor
  if (hasMember && hasPreacher && !hasCopastor && !hasSupervisor && !hasTreasurer && !hasPastor) {
    preacherUpdateForm.setValue('roles', [memberRoles.Disciple, memberRoles.Supervisor]);
  }

  //* preacher + treasurer --> supervisor + treasurer
  if (hasMember && hasPreacher && hasTreasurer && !hasCopastor && !hasSupervisor && !hasPastor) {
    preacherUpdateForm.setValue('roles', [
      memberRoles.Disciple,
      memberRoles.Supervisor,
      memberRoles.Treasurer,
    ]);
  }

  //* Set disabled states
  setIsDisabledInput(true);
  setIsDisabledPromoteButton(true);
};
