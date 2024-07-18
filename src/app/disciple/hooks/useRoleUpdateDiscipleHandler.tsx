import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type DiscipleFormData } from '@/app/disciple/interfaces';

interface Options {
  formDiscipleUpdate: UseFormReturn<DiscipleFormData, any, DiscipleFormData>;
  memberRoles: typeof MemberRole;
  setIsDisabledInput: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledPromoteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useRoleUpdateDiscipleHandler = ({
  formDiscipleUpdate,
  memberRoles,
  setIsDisabledInput,
  setIsDisabledPromoteButton,
}: Options): void => {
  //* Delete old relation
  formDiscipleUpdate.setValue('theirFamilyGroup', '');

  //* Conditional level up role
  const roles: MemberRole[] = formDiscipleUpdate.getValues('roles');
  const hasMember = roles.includes(memberRoles.Disciple);
  const hasPreacher = roles.includes(memberRoles.Preacher);
  const hasTreasurer = roles.includes(memberRoles.Treasurer);
  const hasCopastor = roles.includes(memberRoles.Copastor);
  const hasPastor = roles.includes(memberRoles.Pastor);
  const hasSupervisor = roles.includes(memberRoles.Supervisor);

  //* disciple --> preacher
  if (hasMember && !hasCopastor && !hasSupervisor && !hasPreacher && !hasTreasurer && !hasPastor) {
    formDiscipleUpdate.setValue('roles', [memberRoles.Disciple, memberRoles.Preacher]);
  }

  //* Set disabled states
  setIsDisabledInput(true);
  setIsDisabledPromoteButton(true);
};
