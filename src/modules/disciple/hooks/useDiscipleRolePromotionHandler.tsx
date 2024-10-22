import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type DiscipleFormData } from '@/modules/disciple/interfaces';

interface Options {
  discipleUpdateForm: UseFormReturn<DiscipleFormData, any, DiscipleFormData>;
  memberRoles: typeof MemberRole;
  setIsDisabledInput: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledPromoteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDiscipleRolePromotionHandler = ({
  discipleUpdateForm,
  memberRoles,
  setIsDisabledInput,
  setIsDisabledPromoteButton,
}: Options): void => {
  //* Delete old relation
  discipleUpdateForm.setValue('theirFamilyGroup', '');

  //* Conditional level up role
  const roles: MemberRole[] = discipleUpdateForm.getValues('roles');
  const hasMember = roles.includes(memberRoles.Disciple);
  const hasPreacher = roles.includes(memberRoles.Preacher);
  const hasTreasurer = roles.includes(memberRoles.Treasurer);
  const hasCopastor = roles.includes(memberRoles.Copastor);
  const hasPastor = roles.includes(memberRoles.Pastor);
  const hasSupervisor = roles.includes(memberRoles.Supervisor);

  //* disciple --> preacher
  if (hasMember && !hasCopastor && !hasSupervisor && !hasPreacher && !hasTreasurer && !hasPastor) {
    discipleUpdateForm.setValue('roles', [memberRoles.Disciple, memberRoles.Preacher]);
  }

  //* Set disabled states
  setIsDisabledInput(true);
  setIsDisabledPromoteButton(true);
};
