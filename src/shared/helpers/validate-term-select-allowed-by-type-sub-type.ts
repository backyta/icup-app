/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {  TypesSearch, SearchSelectionOptionsNames, SubTypesSearch } from "@/shared/enums";

export const validateTermSelectByTypeAndSubtype = (type: string, subType:string | undefined) => {

  //* Disabled Term Select
  if (type === TypesSearch.MonthBirth) {
    return {
      disabledTermSelect : [
        SearchSelectionOptionsNames.male,
        SearchSelectionOptionsNames.female,
        SearchSelectionOptionsNames.single,
        SearchSelectionOptionsNames.married,
        SearchSelectionOptionsNames.widowed,
        SearchSelectionOptionsNames.divorced,
        SearchSelectionOptionsNames.other,
        SearchSelectionOptionsNames.active,
        SearchSelectionOptionsNames.inactive,
        SearchSelectionOptionsNames.day,
        SearchSelectionOptionsNames.afternoon,
      ]
    }
  } 
  
  if (type === TypesSearch.Gender) {
    return {
      disabledTermSelect : [
        SearchSelectionOptionsNames.january,
        SearchSelectionOptionsNames.february,
        SearchSelectionOptionsNames.march,
        SearchSelectionOptionsNames.april,
        SearchSelectionOptionsNames.may,
        SearchSelectionOptionsNames.june,
        SearchSelectionOptionsNames.july,
        SearchSelectionOptionsNames.august,
        SearchSelectionOptionsNames.september,
        SearchSelectionOptionsNames.october,
        SearchSelectionOptionsNames.november,
        SearchSelectionOptionsNames.december,
        SearchSelectionOptionsNames.single,
        SearchSelectionOptionsNames.married,
        SearchSelectionOptionsNames.widowed,
        SearchSelectionOptionsNames.divorced,
        SearchSelectionOptionsNames.other,
        SearchSelectionOptionsNames.active,
        SearchSelectionOptionsNames.inactive,
        SearchSelectionOptionsNames.day,
        SearchSelectionOptionsNames.afternoon,
      ]
    }
  }

  if (type === TypesSearch.MaritalStatus) {
    return {
      disabledTermSelect : [
        SearchSelectionOptionsNames.january,
        SearchSelectionOptionsNames.february,
        SearchSelectionOptionsNames.march,
        SearchSelectionOptionsNames.april,
        SearchSelectionOptionsNames.may,
        SearchSelectionOptionsNames.june,
        SearchSelectionOptionsNames.july,
        SearchSelectionOptionsNames.august,
        SearchSelectionOptionsNames.september,
        SearchSelectionOptionsNames.october,
        SearchSelectionOptionsNames.november,
        SearchSelectionOptionsNames.december,
        SearchSelectionOptionsNames.male,
        SearchSelectionOptionsNames.female,
        SearchSelectionOptionsNames.active,
        SearchSelectionOptionsNames.inactive,
        SearchSelectionOptionsNames.day,
        SearchSelectionOptionsNames.afternoon,
      ]
    }
  }
  
  if (type === TypesSearch.Status) {
    return {
      disabledTermSelect : [
        SearchSelectionOptionsNames.january,
        SearchSelectionOptionsNames.february,
        SearchSelectionOptionsNames.march,
        SearchSelectionOptionsNames.april,
        SearchSelectionOptionsNames.may,
        SearchSelectionOptionsNames.june,
        SearchSelectionOptionsNames.july,
        SearchSelectionOptionsNames.august,
        SearchSelectionOptionsNames.september,
        SearchSelectionOptionsNames.october,
        SearchSelectionOptionsNames.november,
        SearchSelectionOptionsNames.december,
        SearchSelectionOptionsNames.male,
        SearchSelectionOptionsNames.female,
        SearchSelectionOptionsNames.single,
        SearchSelectionOptionsNames.married,
        SearchSelectionOptionsNames.widowed,
        SearchSelectionOptionsNames.divorced,
        SearchSelectionOptionsNames.other,
        SearchSelectionOptionsNames.day,
        SearchSelectionOptionsNames.afternoon,
        SearchSelectionOptionsNames.active,
      ]
    }
  }

  if (subType === SubTypesSearch.OfferingByShift || subType === SubTypesSearch.OfferingByDateShift  ) {
    return {
      disabledTermSelect : [
        SearchSelectionOptionsNames.january,
        SearchSelectionOptionsNames.february,
        SearchSelectionOptionsNames.march,
        SearchSelectionOptionsNames.april,
        SearchSelectionOptionsNames.may,
        SearchSelectionOptionsNames.june,
        SearchSelectionOptionsNames.july,
        SearchSelectionOptionsNames.august,
        SearchSelectionOptionsNames.september,
        SearchSelectionOptionsNames.october,
        SearchSelectionOptionsNames.november,
        SearchSelectionOptionsNames.december,
        SearchSelectionOptionsNames.male,
        SearchSelectionOptionsNames.female,
        SearchSelectionOptionsNames.single,
        SearchSelectionOptionsNames.married,
        SearchSelectionOptionsNames.widowed,
        SearchSelectionOptionsNames.divorced,
        SearchSelectionOptionsNames.other,
        SearchSelectionOptionsNames.active,
        SearchSelectionOptionsNames.inactive,
      ]
    }
  }
}