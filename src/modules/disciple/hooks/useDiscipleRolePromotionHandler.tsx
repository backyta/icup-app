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
  discipleUpdateForm.setValue('theirFamilyGroup', '');

  const currentRoles: MemberRole[] = discipleUpdateForm.getValues('roles');

  const hasRole = (role: MemberRole): boolean => currentRoles.includes(role);

  const isDisciple = hasRole(memberRoles.Disciple);
  const isEligibleForPreacher =
    !hasRole(memberRoles.Copastor) &&
    !hasRole(memberRoles.Supervisor) &&
    !hasRole(memberRoles.Pastor) &&
    !hasRole(memberRoles.Treasurer);

  const updatedRoles = currentRoles.filter((role) => role !== memberRoles.Disciple);

  if (isDisciple && isEligibleForPreacher) {
    discipleUpdateForm.setValue('roles', [...updatedRoles, memberRoles.Preacher]);
  }

  setIsDisabledInput(true);
  setIsDisabledPromoteButton(true);
};
