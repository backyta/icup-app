/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {  SearchType, SearchSelectionOptionNames, SearchSubType } from '@/shared/enums';

export const validateSelectTermByTypeAndSubtype = (type: string, subType:string | undefined) => {

  //* Disabled Term Select
  if (type === SearchType.MonthBirth) {
    return {
      disabledSelectTerm : [
        SearchSelectionOptionNames.male,
        SearchSelectionOptionNames.female,
        SearchSelectionOptionNames.single,
        SearchSelectionOptionNames.married,
        SearchSelectionOptionNames.widowed,
        SearchSelectionOptionNames.divorced,
        SearchSelectionOptionNames.other,
        SearchSelectionOptionNames.active,
        SearchSelectionOptionNames.inactive,
        SearchSelectionOptionNames.day,
        SearchSelectionOptionNames.afternoon,
      ]
    }
  } 
  
  if (type === SearchType.Gender) {
    return {
      disabledSelectTerm : [
        SearchSelectionOptionNames.january,
        SearchSelectionOptionNames.february,
        SearchSelectionOptionNames.march,
        SearchSelectionOptionNames.april,
        SearchSelectionOptionNames.may,
        SearchSelectionOptionNames.june,
        SearchSelectionOptionNames.july,
        SearchSelectionOptionNames.august,
        SearchSelectionOptionNames.september,
        SearchSelectionOptionNames.october,
        SearchSelectionOptionNames.november,
        SearchSelectionOptionNames.december,
        SearchSelectionOptionNames.single,
        SearchSelectionOptionNames.married,
        SearchSelectionOptionNames.widowed,
        SearchSelectionOptionNames.divorced,
        SearchSelectionOptionNames.other,
        SearchSelectionOptionNames.active,
        SearchSelectionOptionNames.inactive,
        SearchSelectionOptionNames.day,
        SearchSelectionOptionNames.afternoon,
      ]
    }
  }

  if (type === SearchType.MaritalStatus) {
    return {
      disabledSelectTerm : [
        SearchSelectionOptionNames.january,
        SearchSelectionOptionNames.february,
        SearchSelectionOptionNames.march,
        SearchSelectionOptionNames.april,
        SearchSelectionOptionNames.may,
        SearchSelectionOptionNames.june,
        SearchSelectionOptionNames.july,
        SearchSelectionOptionNames.august,
        SearchSelectionOptionNames.september,
        SearchSelectionOptionNames.october,
        SearchSelectionOptionNames.november,
        SearchSelectionOptionNames.december,
        SearchSelectionOptionNames.male,
        SearchSelectionOptionNames.female,
        SearchSelectionOptionNames.active,
        SearchSelectionOptionNames.inactive,
        SearchSelectionOptionNames.day,
        SearchSelectionOptionNames.afternoon,
      ]
    }
  }
  
  if (type === SearchType.Status) {
    return {
      disabledSelectTerm : [
        SearchSelectionOptionNames.january,
        SearchSelectionOptionNames.february,
        SearchSelectionOptionNames.march,
        SearchSelectionOptionNames.april,
        SearchSelectionOptionNames.may,
        SearchSelectionOptionNames.june,
        SearchSelectionOptionNames.july,
        SearchSelectionOptionNames.august,
        SearchSelectionOptionNames.september,
        SearchSelectionOptionNames.october,
        SearchSelectionOptionNames.november,
        SearchSelectionOptionNames.december,
        SearchSelectionOptionNames.male,
        SearchSelectionOptionNames.female,
        SearchSelectionOptionNames.single,
        SearchSelectionOptionNames.married,
        SearchSelectionOptionNames.widowed,
        SearchSelectionOptionNames.divorced,
        SearchSelectionOptionNames.other,
        SearchSelectionOptionNames.day,
        SearchSelectionOptionNames.afternoon,
        SearchSelectionOptionNames.active,
      ]
    }
  }

  if (subType === SearchSubType.OfferingByShift || subType === SearchSubType.OfferingByDateShift  ) {
    return {
      disabledSelectTerm : [
        SearchSelectionOptionNames.january,
        SearchSelectionOptionNames.february,
        SearchSelectionOptionNames.march,
        SearchSelectionOptionNames.april,
        SearchSelectionOptionNames.may,
        SearchSelectionOptionNames.june,
        SearchSelectionOptionNames.july,
        SearchSelectionOptionNames.august,
        SearchSelectionOptionNames.september,
        SearchSelectionOptionNames.october,
        SearchSelectionOptionNames.november,
        SearchSelectionOptionNames.december,
        SearchSelectionOptionNames.male,
        SearchSelectionOptionNames.female,
        SearchSelectionOptionNames.single,
        SearchSelectionOptionNames.married,
        SearchSelectionOptionNames.widowed,
        SearchSelectionOptionNames.divorced,
        SearchSelectionOptionNames.other,
        SearchSelectionOptionNames.active,
        SearchSelectionOptionNames.inactive,
      ]
    }
  }
}