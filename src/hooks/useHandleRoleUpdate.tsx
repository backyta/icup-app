// import { MemberRoles as memberRoles } from '@/shared/enums';

import { type MemberRoles } from '@/shared/enums';

interface Options {
  form: any;
  memberRoles: typeof MemberRoles;
  setIsDisabledInput: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledPromoteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useHandleRoleUpdate = ({
  form,
  memberRoles,
  setIsDisabledInput,
  setIsDisabledPromoteButton,
}: Options): void => {
  // Delete all roles
  form.setValue('theirCopastor', '');
  form.setValue('theirPastor', '');
  form.setValue('theirFamilyHouse', '');
  form.setValue('theirSupervisor', '');

  // Conditional level up role
  const roles: MemberRoles[] = form.getValues('roles');
  const hasMember = roles.includes(memberRoles.Member);
  const hasPreacher = roles.includes(memberRoles.Preacher);
  const hasTreasurer = roles.includes(memberRoles.Treasurer);
  const hasCopastor = roles.includes(memberRoles.Copastor);
  const hasPastor = roles.includes(memberRoles.Pastor);
  const hasSupervisor = roles.includes(memberRoles.Supervisor);

  if (hasMember) {
    // Member -> Preacher
    if (!hasPreacher && !hasSupervisor && !hasTreasurer && !hasCopastor && !hasPastor) {
      form.setValue('roles', [memberRoles.Member, memberRoles.Preacher]);
    }
    // preacher -> Supervisor
    else if (hasPreacher && !hasSupervisor && !hasTreasurer && !hasCopastor && !hasPastor) {
      form.setValue('roles', [memberRoles.Member, memberRoles.Supervisor]);
    }
    // preacher + treasurer -> Supervisor + treasurer
    else if (hasPreacher && hasTreasurer && !hasSupervisor && !hasCopastor && !hasPastor) {
      form.setValue('roles', [memberRoles.Member, memberRoles.Supervisor, memberRoles.Treasurer]);
    }
    // supervisor or supervisor + treasurer -> copastor
    else if (hasSupervisor && (!hasTreasurer || hasTreasurer) && !hasPreacher && !hasCopastor && !hasPastor) {
      form.setValue('roles', [memberRoles.Member, memberRoles.Copastor]);
    }
    // copastor --> pastor
    else if (hasMember && hasCopastor && !hasSupervisor && !hasPreacher && !hasTreasurer && !hasPastor) {
      form.setValue('roles', [memberRoles.Member, memberRoles.Pastor]);
    }
  }

  // set disabled states
  setIsDisabledInput(true);
  setIsDisabledPromoteButton(true);
};
