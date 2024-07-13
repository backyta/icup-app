import { type UseFormReturn } from 'react-hook-form';

import { type MemberRoles } from '@/shared/enums';

import { type PreacherFormData } from '@/app/preacher/interfaces';

interface Options {
  formPreacherUpdate: UseFormReturn<PreacherFormData, any, PreacherFormData>;
  memberRoles: typeof MemberRoles;
  setIsDisabledInput: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledPromoteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useRoleUpdatePreacherHandler = ({
  formPreacherUpdate,
  memberRoles,
  setIsDisabledInput,
  setIsDisabledPromoteButton,
}: Options): void => {
  //* Delete old relation
  formPreacherUpdate.setValue('theirSupervisor', '');

  //* Conditional level up role
  const roles: MemberRoles[] = formPreacherUpdate.getValues('roles');
  const hasMember = roles.includes(memberRoles.Disciple);
  const hasPreacher = roles.includes(memberRoles.Preacher);
  const hasTreasurer = roles.includes(memberRoles.Treasurer);
  const hasCopastor = roles.includes(memberRoles.Copastor);
  const hasPastor = roles.includes(memberRoles.Pastor);
  const hasSupervisor = roles.includes(memberRoles.Supervisor);

  //* preacher --> supervisor
  if (hasMember && hasPreacher && !hasCopastor && !hasSupervisor && !hasTreasurer && !hasPastor) {
    formPreacherUpdate.setValue('roles', [memberRoles.Disciple, memberRoles.Supervisor]);
  }

  //* preacher + treasurer --> supervisor + treasurer
  if (hasMember && hasPreacher && hasTreasurer && !hasCopastor && !hasSupervisor && !hasPastor) {
    formPreacherUpdate.setValue('roles', [
      memberRoles.Disciple,
      memberRoles.Supervisor,
      memberRoles.Treasurer,
    ]);
  }

  //* Set disabled states
  setIsDisabledInput(true);
  setIsDisabledPromoteButton(true);
};
