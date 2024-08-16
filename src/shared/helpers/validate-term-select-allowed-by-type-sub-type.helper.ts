import {  SearchType, SearchSelectOptionNames, SearchSubType } from '@/shared/enums';

interface DisabledSelectTermResult {
  disabledSelectTerm: string[];
}

// TODO : eliminar esto tmb cuando ya este todo
export const validateSelectTermByTypeAndSubtype = (type: string, subType:string | undefined = undefined): DisabledSelectTermResult | undefined => {

  //* Disabled Term Select
  if (type === SearchType.BirthMonth) {
    return {
      disabledSelectTerm : [
        SearchSelectOptionNames.male,
        SearchSelectOptionNames.female,
        SearchSelectOptionNames.single,
        SearchSelectOptionNames.married,
        SearchSelectOptionNames.widowed,
        SearchSelectOptionNames.divorced,
        SearchSelectOptionNames.other,
        SearchSelectOptionNames.active,
        SearchSelectOptionNames.inactive,
        SearchSelectOptionNames.day,
        SearchSelectOptionNames.afternoon,
      ]
    }
  } 
  
  if (type === SearchType.Gender) {
    return {
      disabledSelectTerm : [
        SearchSelectOptionNames.january,
        SearchSelectOptionNames.february,
        SearchSelectOptionNames.march,
        SearchSelectOptionNames.april,
        SearchSelectOptionNames.may,
        SearchSelectOptionNames.june,
        SearchSelectOptionNames.july,
        SearchSelectOptionNames.august,
        SearchSelectOptionNames.september,
        SearchSelectOptionNames.october,
        SearchSelectOptionNames.november,
        SearchSelectOptionNames.december,
        SearchSelectOptionNames.single,
        SearchSelectOptionNames.married,
        SearchSelectOptionNames.widowed,
        SearchSelectOptionNames.divorced,
        SearchSelectOptionNames.other,
        SearchSelectOptionNames.active,
        SearchSelectOptionNames.inactive,
        SearchSelectOptionNames.day,
        SearchSelectOptionNames.afternoon,
      ]
    }
  }

  if (type === SearchType.MaritalStatus) {
    return {
      disabledSelectTerm : [
        SearchSelectOptionNames.january,
        SearchSelectOptionNames.february,
        SearchSelectOptionNames.march,
        SearchSelectOptionNames.april,
        SearchSelectOptionNames.may,
        SearchSelectOptionNames.june,
        SearchSelectOptionNames.july,
        SearchSelectOptionNames.august,
        SearchSelectOptionNames.september,
        SearchSelectOptionNames.october,
        SearchSelectOptionNames.november,
        SearchSelectOptionNames.december,
        SearchSelectOptionNames.male,
        SearchSelectOptionNames.female,
        SearchSelectOptionNames.active,
        SearchSelectOptionNames.inactive,
        SearchSelectOptionNames.day,
        SearchSelectOptionNames.afternoon,
      ]
    }
  }
  
  if (type === SearchType.Status) {
    return {
      disabledSelectTerm : [
        SearchSelectOptionNames.january,
        SearchSelectOptionNames.february,
        SearchSelectOptionNames.march,
        SearchSelectOptionNames.april,
        SearchSelectOptionNames.may,
        SearchSelectOptionNames.june,
        SearchSelectOptionNames.july,
        SearchSelectOptionNames.august,
        SearchSelectOptionNames.september,
        SearchSelectOptionNames.october,
        SearchSelectOptionNames.november,
        SearchSelectOptionNames.december,
        SearchSelectOptionNames.male,
        SearchSelectOptionNames.female,
        SearchSelectOptionNames.single,
        SearchSelectOptionNames.married,
        SearchSelectOptionNames.widowed,
        SearchSelectOptionNames.divorced,
        SearchSelectOptionNames.other,
        SearchSelectOptionNames.day,
        SearchSelectOptionNames.afternoon,
        SearchSelectOptionNames.active,
      ]
    }
  }

  if (subType === SearchSubType.OfferingByShift || subType === SearchSubType.OfferingByDateShift  ) {
    return {
      disabledSelectTerm : [
        SearchSelectOptionNames.january,
        SearchSelectOptionNames.february,
        SearchSelectOptionNames.march,
        SearchSelectOptionNames.april,
        SearchSelectOptionNames.may,
        SearchSelectOptionNames.june,
        SearchSelectOptionNames.july,
        SearchSelectOptionNames.august,
        SearchSelectOptionNames.september,
        SearchSelectOptionNames.october,
        SearchSelectOptionNames.november,
        SearchSelectOptionNames.december,
        SearchSelectOptionNames.male,
        SearchSelectOptionNames.female,
        SearchSelectOptionNames.single,
        SearchSelectOptionNames.married,
        SearchSelectOptionNames.widowed,
        SearchSelectOptionNames.divorced,
        SearchSelectOptionNames.other,
        SearchSelectOptionNames.active,
        SearchSelectOptionNames.inactive,
      ]
    }
  }
}