import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type CopastorFormData } from '@/modules/copastor/interfaces';

interface Options {
  copastorUpdateForm: UseFormReturn<CopastorFormData, any, CopastorFormData>;
  memberRoles: typeof MemberRole;
  setIsDisabledInput: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledPromoteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useCopastorRolePromotionHandler = ({
  copastorUpdateForm,
  memberRoles,
  setIsDisabledInput,
  setIsDisabledPromoteButton,
}: Options): void => {
  copastorUpdateForm.setValue('theirPastor', '');

  const currentRoles: MemberRole[] = copastorUpdateForm.getValues('roles');

  const hasRole = (role: MemberRole): boolean => currentRoles.includes(role);
  const isCopastor = hasRole(memberRoles.Copastor);
  const isEligibleForPromotion =
    !hasRole(memberRoles.Supervisor) &&
    !hasRole(memberRoles.Preacher) &&
    !hasRole(memberRoles.Treasurer) &&
    !hasRole(memberRoles.Pastor) &&
    !hasRole(memberRoles.Disciple);

  const updatedRoles = currentRoles.filter((role) => role !== memberRoles.Copastor);

  if (isCopastor && isEligibleForPromotion) {
    copastorUpdateForm.setValue('roles', [...updatedRoles, memberRoles.Pastor]);
  }

  setIsDisabledInput(true);
  setIsDisabledPromoteButton(true);
};
