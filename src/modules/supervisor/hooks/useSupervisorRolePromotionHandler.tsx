import { type UseFormReturn } from 'react-hook-form';
import { type MemberRole } from '@/shared/enums/member-role.enum';
import { type SupervisorFormData } from '@/modules/supervisor/interfaces/supervisor-form-data.interface';

interface Options {
  supervisorUpdateForm: UseFormReturn<SupervisorFormData, any, undefined>;
  memberRoles: typeof MemberRole;
  setIsDisabledInput: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledPromoteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSupervisorRolePromotionHandler = ({
  supervisorUpdateForm,
  memberRoles,
  setIsDisabledInput,
  setIsDisabledPromoteButton,
}: Options): void => {
  supervisorUpdateForm.setValue('theirCopastor', '');

  const currentRoles: MemberRole[] = supervisorUpdateForm.getValues('roles');

  const hasRole = (role: MemberRole): boolean => currentRoles.includes(role);

  const isSupervisor = hasRole(memberRoles.Supervisor);
  const isTreasurer = hasRole(memberRoles.Treasurer);
  const isEligibleForCopastor =
    !hasRole(memberRoles.Disciple) &&
    !hasRole(memberRoles.Copastor) &&
    !hasRole(memberRoles.Preacher) &&
    !hasRole(memberRoles.Pastor);

  const updatedRoles = currentRoles.filter(
    (role) => role !== memberRoles.Supervisor && role !== memberRoles.Treasurer
  );

  if (isSupervisor && isEligibleForCopastor && !isTreasurer) {
    supervisorUpdateForm.setValue('roles', [...updatedRoles, memberRoles.Copastor]);
  }

  if (isSupervisor && isTreasurer && isEligibleForCopastor) {
    supervisorUpdateForm.setValue('roles', [...updatedRoles, memberRoles.Copastor]);
  }

  setIsDisabledInput(true);
  setIsDisabledPromoteButton(true);
};
