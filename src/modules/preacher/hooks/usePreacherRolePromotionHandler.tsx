import { type UseFormReturn } from 'react-hook-form';
import { type MemberRole } from '@/shared/enums/member-role.enum';
import { type PreacherFormData } from '@/modules/preacher/interfaces/preacher-form-data.interface';

interface Options {
  preacherUpdateForm: UseFormReturn<PreacherFormData, any, undefined>;
  memberRoles: typeof MemberRole;
  setIsDisabledInput: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledPromoteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePreacherRolePromotionHandler = ({
  preacherUpdateForm,
  memberRoles,
  setIsDisabledInput,
  setIsDisabledPromoteButton,
}: Options): void => {
  preacherUpdateForm.setValue('theirSupervisor', '');

  const currentRoles: MemberRole[] = preacherUpdateForm.getValues('roles');

  const hasRole = (role: MemberRole): boolean => currentRoles.includes(role);

  const isPreacher = hasRole(memberRoles.Preacher);
  const isTreasurer = hasRole(memberRoles.Treasurer);
  const isEligibleForSupervisor =
    !hasRole(memberRoles.Disciple) &&
    !hasRole(memberRoles.Copastor) &&
    !hasRole(memberRoles.Supervisor) &&
    !hasRole(memberRoles.Pastor);

  const rolesExcludingPreacherAndTreasurer = currentRoles.filter(
    (role) => role !== memberRoles.Preacher && role !== memberRoles.Treasurer
  );

  const rolesExcludingOnlyPreacher = currentRoles.filter((role) => role !== memberRoles.Preacher);

  if (isPreacher && isEligibleForSupervisor && !isTreasurer) {
    preacherUpdateForm.setValue('roles', [
      ...rolesExcludingPreacherAndTreasurer,
      memberRoles.Supervisor,
    ]);
  }

  if (isPreacher && isTreasurer && isEligibleForSupervisor) {
    preacherUpdateForm.setValue('roles', [
      ...rolesExcludingOnlyPreacher,
      memberRoles.Supervisor,
      memberRoles.Treasurer,
    ]);
  }

  setIsDisabledInput(true);
  setIsDisabledPromoteButton(true);
};
