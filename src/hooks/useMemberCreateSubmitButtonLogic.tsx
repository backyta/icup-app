/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MemberRoles } from '@/shared/enums';
import { useEffect } from 'react';

interface Options {
  form: any;
  pathname: string;
  memberRoles: typeof MemberRoles;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledMessageError: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabledMessageError: boolean;
}

// TODO : modificar nombre y seccionar custom hooks por módulos
export const useMemberCreateSubmitButtonLogic = ({
  form,
  pathname,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsDisabledMessageError,
  isDisabledMessageError,
}: Options): void => {
  const roles = form.watch('roles');
  const firstName = form.watch('firstName');
  const lastName = form.watch('lastName');
  const gender = form.watch('gender');
  const dateBirth = form.watch('dateBirth');
  const conversionDate = form.watch('conversionDate');
  const maritalStatus = form.watch('maritalStatus');
  const emailAddress = form.watch('emailAddress');
  const phoneNumber = form.watch('phoneNumber');
  const originCountry = form.watch('originCountry');
  const numberChildren = form.watch('numberChildren');
  const country = form.watch('country');
  const department = form.watch('department');
  const province = form.watch('province');
  const district = form.watch('district');
  const address = form.watch('address');

  const theirFamilyHouse = form.watch('theirFamilyHouse');
  const theirPastor = form.watch('theirPastor');
  const theirCopastor = form.watch('theirCopastor');
  const theirSupervisor = form.watch('theirSupervisor');

  useEffect(() => {
    // pastor
    if (
      pathname === '/pastors/create-pastor' &&
      firstName &&
      lastName &&
      gender &&
      dateBirth &&
      conversionDate &&
      maritalStatus &&
      emailAddress &&
      phoneNumber &&
      originCountry &&
      numberChildren &&
      country &&
      department &&
      province &&
      district &&
      address &&
      roles.includes(memberRoles.Member) &&
      roles.includes(memberRoles.Pastor)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsDisabledMessageError(false);
    }

    // leaders
    if (
      pathname === '/leaders/create-leader' &&
      firstName &&
      lastName &&
      gender &&
      dateBirth &&
      conversionDate &&
      maritalStatus &&
      emailAddress &&
      phoneNumber &&
      originCountry &&
      numberChildren &&
      country &&
      department &&
      province &&
      district &&
      address &&
      roles.includes(MemberRoles.Member) &&
      roles.includes(MemberRoles.Supervisor) &&
      theirSupervisor
    ) {
      form.resetField('theirSupervisor', { keepTouched: true });
      setIsSubmitButtonDisabled(true);
      setIsDisabledMessageError(true);
    }

    if (
      pathname === '/leaders/create-leader' &&
      firstName &&
      lastName &&
      gender &&
      dateBirth &&
      conversionDate &&
      maritalStatus &&
      emailAddress &&
      phoneNumber &&
      originCountry &&
      numberChildren &&
      country &&
      department &&
      province &&
      district &&
      address &&
      roles.includes(MemberRoles.Member) &&
      roles.includes(MemberRoles.Preacher) &&
      theirCopastor
    ) {
      form.resetField('theirCopastor', { keepTouched: true });
      setIsSubmitButtonDisabled(true);
      setIsDisabledMessageError(true);
    }

    // others pages
    if (
      firstName &&
      lastName &&
      gender &&
      dateBirth &&
      conversionDate &&
      maritalStatus &&
      emailAddress &&
      phoneNumber &&
      originCountry &&
      numberChildren &&
      country &&
      department &&
      province &&
      district &&
      address &&
      roles &&
      (theirFamilyHouse || theirPastor || theirCopastor || theirSupervisor)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsDisabledMessageError(false);
    }

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !dateBirth ||
      !conversionDate ||
      !maritalStatus ||
      !emailAddress ||
      !phoneNumber ||
      !originCountry ||
      !numberChildren ||
      !country ||
      !department ||
      !province ||
      !district ||
      !address ||
      roles.length === 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsDisabledMessageError(true);
    }
  }, [
    firstName,
    lastName,
    gender,
    conversionDate,
    dateBirth,
    maritalStatus,
    emailAddress,
    phoneNumber,
    originCountry,
    numberChildren,
    country,
    department,
    province,
    district,
    address,
    theirFamilyHouse,
    theirPastor,
    theirCopastor,
    theirSupervisor,
    roles,
  ]);

  useEffect(() => {
    if (pathname === '/disciples/create-disciple') {
      form.setValue('roles', [MemberRoles.Member]);
    }
    if (pathname === '/pastors/create-pastor') {
      form.setValue('roles', [MemberRoles.Member, MemberRoles.Pastor]);
    }
    if (pathname === '/copastors/create-copastor') {
      form.setValue('roles', [MemberRoles.Member, MemberRoles.Copastor]);
    }
  }, [isDisabledMessageError]);

  useEffect(() => {
    if (pathname === '/leaders/create-leader') {
      form.setValue('roles', [MemberRoles.Member]);
    }
  }, []);
};
