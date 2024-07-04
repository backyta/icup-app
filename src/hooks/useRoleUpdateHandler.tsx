import { type UseFormReturn } from 'react-hook-form';

import { type MemberRoles } from '@/shared/enums';
import { type MemberData } from '@/shared/interfaces';

interface Options {
  formMemberUpdate: UseFormReturn<MemberData, any, MemberData>;
  memberRoles: typeof MemberRoles;
  setIsDisabledInput: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledPromoteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useRoleUpdateHandler = ({
  formMemberUpdate,
  memberRoles,
  setIsDisabledInput,
  setIsDisabledPromoteButton,
}: Options): void => {
  // delete all roles
  formMemberUpdate.setValue('theirCopastor', '');
  formMemberUpdate.setValue('theirPastor', '');
  formMemberUpdate.setValue('theirFamilyHouse', '');
  formMemberUpdate.setValue('theirSupervisor', '');

  // conditional level up role
  const roles: MemberRoles[] = formMemberUpdate.getValues('roles');
  const hasMember = roles.includes(memberRoles.Disciple);
  const hasPreacher = roles.includes(memberRoles.Preacher);
  const hasTreasurer = roles.includes(memberRoles.Treasurer);
  const hasCopastor = roles.includes(memberRoles.Copastor);
  const hasPastor = roles.includes(memberRoles.Pastor);
  const hasSupervisor = roles.includes(memberRoles.Supervisor);

  if (hasMember) {
    // Member -> Preacher
    if (!hasPreacher && !hasSupervisor && !hasTreasurer && !hasCopastor && !hasPastor) {
      formMemberUpdate.setValue('roles', [memberRoles.Disciple, memberRoles.Preacher]);
    }
    // preacher -> Supervisor
    else if (hasPreacher && !hasSupervisor && !hasTreasurer && !hasCopastor && !hasPastor) {
      formMemberUpdate.setValue('roles', [memberRoles.Disciple, memberRoles.Supervisor]);
    }
    // preacher + treasurer -> Supervisor + treasurer
    else if (hasPreacher && hasTreasurer && !hasSupervisor && !hasCopastor && !hasPastor) {
      formMemberUpdate.setValue('roles', [
        memberRoles.Disciple,
        memberRoles.Supervisor,
        memberRoles.Treasurer,
      ]);
    }
    // supervisor or supervisor + treasurer -> copastor
    else if (
      hasSupervisor &&
      (!hasTreasurer || hasTreasurer) &&
      !hasPreacher &&
      !hasCopastor &&
      !hasPastor
    ) {
      formMemberUpdate.setValue('roles', [memberRoles.Disciple, memberRoles.Copastor]);
    }
    // copastor --> pastor
    else if (
      hasMember &&
      hasCopastor &&
      !hasSupervisor &&
      !hasPreacher &&
      !hasTreasurer &&
      !hasPastor
    ) {
      formMemberUpdate.setValue('roles', [memberRoles.Disciple, memberRoles.Pastor]);
    }
  }

  // set disabled states
  setIsDisabledInput(true);
  setIsDisabledPromoteButton(true);
};
