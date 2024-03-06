/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SubTypeSearchNames, TypeSearch, TypeSearchNames, TermSelectTypeNames, SubTypeSearch } from "@/enums";
import { 
  subTypesActivities,
  subTypesCopastorFullName,
  subTypesCopastorLastNames,
  subTypesCopastorNames,
  subTypesDiscipleFullName,
  subTypesDiscipleLastNames,
  subTypesDiscipleNames,
  subTypesFamilyHouse,
  subTypesFamilyHouseFullName,
  subTypesFamilyHouseLastNames,
  subTypesFamilyHouseNames,
  subTypesFastingVigilGeneral,
  subTypesFastingVigilZonal,
  subTypesGroundChurch,
  subTypesLeaderFullName,
  subTypesLeaderLastNames,
  subTypesLeaderNames,
  subTypesPastorFullName,
  subTypesPastorLastNames,
  subTypesPastorNames,
  subTypesSundayWorship,
  subTypesTithe,
  subTypesUserFullName,
  subTypesUserLastNames,
  subTypesUserNames,
  subTypesYoungWorship,
  typesCopastor, 
  typesDisciple, 
  typesFamilyHouse, 
  typesLeader, 
  typesOffering, 
  typesPastor, 
  typesUser } from ".";

  // TODO : convertir la data del form al DTO que recibe el backend
  // TODO : colocar orden de inversion en el ID.
  // TODO : colocar el drawer en oscuro cuando esta en tema claro para hacer contraste (probar)
  
export const validationDisableTypes = (currentPath: string) => {
  
  //* Disabled Types by module
  const disabledTypesDisciples = Object.values(TypeSearchNames).filter(value => !typesDisciple.includes(value) ) 
  const disabledTypesPastors = Object.values(TypeSearchNames).filter(value => !typesPastor.includes(value) ) 
  const disabledTypesCopastors = Object.values(TypeSearchNames).filter(value => !typesCopastor.includes(value) ) 
  const disabledTypesLeaders = Object.values(TypeSearchNames).filter(value => !typesLeader.includes(value) ) 
  const disabledTypesFamilyHouses = Object.values(TypeSearchNames).filter(value => !typesFamilyHouse.includes(value) ) 
  const disabledTypesOfferings = Object.values(TypeSearchNames).filter(value => !typesOffering.includes(value) ) 
  const disabledTypesUsers = Object.values(TypeSearchNames).filter(value => !typesUser.includes(value) ) 
  
  if (currentPath === '/disciples/search-by-term-disciples') {
      return {
        disabledTypes : [
        ...disabledTypesDisciples
      ]   
    }
  }

  if (currentPath === '/pastors/search-by-term-pastors') {
    return {
        disabledTypes : [
          ...disabledTypesPastors
      ]
    }
  }

  if (currentPath === '/copastors/search-by-term-copastors') {
    return { 
     disabledTypes : [
      ...disabledTypesCopastors
     ],
   }
  }

   if (currentPath === '/leaders/search-by-term-leaders') {
    return {
      disabledTypes : [
        ...disabledTypesLeaders
      ],
    }
  }

  if (currentPath === '/family-houses/search-by-term-family-houses') {
    return {
      disabledTypes : [
        ...disabledTypesFamilyHouses
      ]
    }
  } 

  if (currentPath === '/offerings/search-by-term-offerings') {
    return {
      disabledTypes : [
        ...disabledTypesOfferings
      ],
    }
  }
  
  if (currentPath === '/users/search-by-term-users') {
    return {
      disabledTypes : [
        ...disabledTypesUsers
      ],
    }
  }
}

export const validationDisableSubTypes = (currentPath: string, type: string ) => {

  //* Disabled Sub-types by module
  //* Disciple
  const disabledSubTypesDiscipleNames = Object.values(SubTypeSearchNames).filter(value => !subTypesDiscipleNames.includes(value) ) 
  const disabledSubTypesDiscipleLastNames = Object.values(SubTypeSearchNames).filter(value => !subTypesDiscipleLastNames.includes(value) ) 
  const disabledSubTypesDiscipleFullName = Object.values(SubTypeSearchNames).filter(value => !subTypesDiscipleFullName.includes(value) ) 
  

  
  if (currentPath === '/disciples/search-by-term-disciples' && type === TypeSearch.firstName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesDiscipleNames,
      ],
    }
  }

  if (currentPath === '/disciples/search-by-term-disciples' && type === TypeSearch.lastName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesDiscipleLastNames
      ],
    }
  }

  if (currentPath === '/disciples/search-by-term-disciples' && type === TypeSearch.fullName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesDiscipleFullName
      ],
    }
  }

  //* Pastor
  const disabledSubTypesPastorNames = Object.values(SubTypeSearchNames).filter(value => !subTypesPastorNames.includes(value) ) 
  const disabledSubTypesPastorLastNames = Object.values(SubTypeSearchNames).filter(value => !subTypesPastorLastNames.includes(value) ) 
  const disabledSubTypesPastorFullName = Object.values(SubTypeSearchNames).filter(value => !subTypesPastorFullName.includes(value) ) 
  
  
  if (currentPath === '/pastors/search-by-term-pastors' && type === TypeSearch.firstName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesPastorNames,
      ],
    }
  }

  if (currentPath === '/pastors/search-by-term-pastors' && type === TypeSearch.lastName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesPastorLastNames
      ],
    }
  }

  if (currentPath === '/pastors/search-by-term-pastors' && type === TypeSearch.fullName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesPastorFullName
      ],
    }
  }

  //* Co-Pastor
  const disabledSubTypesCopastorNames = Object.values(SubTypeSearchNames).filter(value => !subTypesCopastorNames.includes(value) ) 
  const disabledSubTypesCopastorLastNames = Object.values(SubTypeSearchNames).filter(value => !subTypesCopastorLastNames.includes(value) ) 
  const disabledSubTypesCopastorFullName = Object.values(SubTypeSearchNames).filter(value => !subTypesCopastorFullName.includes(value) ) 
  
  if (currentPath === '/copastors/search-by-term-copastors' && type === TypeSearch.firstName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesCopastorNames,
      ],
    }
  }

  if (currentPath === '/copastors/search-by-term-copastors' && type === TypeSearch.lastName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesCopastorLastNames
      ],
    }
  }

  if (currentPath === '/copastors/search-by-term-copastors' && type === TypeSearch.fullName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesCopastorFullName
      ],
    }
  }

  //* Leader
  const disabledSubTypesLeaderNames = Object.values(SubTypeSearchNames).filter(value => !subTypesLeaderNames.includes(value) ) 
  const disabledSubTypesLeaderLastNames = Object.values(SubTypeSearchNames).filter(value => !subTypesLeaderLastNames.includes(value) ) 
  const disabledSubTypesLeaderFullName = Object.values(SubTypeSearchNames).filter(value => !subTypesLeaderFullName.includes(value) ) 
  
  if (currentPath === '/leaders/search-by-term-leaders' && type === TypeSearch.firstName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesLeaderNames,
      ],
    }
  }

  if (currentPath === '/leaders/search-by-term-leaders' && type === TypeSearch.lastName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesLeaderLastNames
      ],
    }
  }

  if (currentPath === '/leaders/search-by-term-leaders' && type === TypeSearch.fullName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesLeaderFullName
      ],
    }
  }
  
  //* Family House
  const disabledSubTypesFamilyHouseNames = Object.values(SubTypeSearchNames).filter(value => !subTypesFamilyHouseNames.includes(value) ) 
  const disabledSubTypesFamilyHouseLastNames = Object.values(SubTypeSearchNames).filter(value => !subTypesFamilyHouseLastNames.includes(value) ) 
  const disabledSubTypesFamilyHouseFullName = Object.values(SubTypeSearchNames).filter(value => !subTypesFamilyHouseFullName.includes(value) ) 
  
  if (currentPath === '/family-houses/search-by-term-family-houses' && type === TypeSearch.firstName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesFamilyHouseNames,
      ],
    }
  }

  if (currentPath === '/family-houses/search-by-term-family-houses' && type === TypeSearch.lastName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesFamilyHouseLastNames
      ],
    }
  }

  if (currentPath === '/family-houses/search-by-term-family-houses' && type === TypeSearch.fullName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesFamilyHouseFullName
      ],
    }
  }

  //* Offerings (Tithe)
  const disabledSubTypesTithe = Object.values(SubTypeSearchNames).filter(value => !subTypesTithe.includes(value) ) 
  
  if (currentPath === '/offerings/search-by-term-offerings' && type === TypeSearch.tithe) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesTithe,
      ],
    }
  }

  //* Offerings (Worship sunday, Sunday School)
  const disabledSubTypesSundayWorship = Object.values(SubTypeSearchNames).filter(value => !subTypesSundayWorship.includes(value) ) 
  
  if (currentPath === '/offerings/search-by-term-offerings' && (type === TypeSearch.sunday_worship || type === TypeSearch.sunday_school)) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesSundayWorship,
      ],
    }
  }

  //* Offerings (Family House)
  const disabledSubTypesFamilyHouse = Object.values(SubTypeSearchNames).filter(value => !subTypesFamilyHouse.includes(value) ) 
  
  if (currentPath === '/offerings/search-by-term-offerings' && type === TypeSearch.family_house) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesFamilyHouse,
      ],
    }
  }

  //* Offerings (Fasting, Vigil General)
  const disabledSubTypesFastingVigilGeneral = Object.values(SubTypeSearchNames).filter(value => !subTypesFastingVigilGeneral.includes(value) ) 
  
  if (currentPath === '/offerings/search-by-term-offerings' && (type === TypeSearch.general_fasting || type === TypeSearch.general_vigil )) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesFastingVigilGeneral,
      ],
    }
  }

  //* Offerings (Fasting, Vigil Zonal)
  const disabledSubTypesFastingVigilZonal = Object.values(SubTypeSearchNames).filter(value => !subTypesFastingVigilZonal.includes(value) ) 
  
  if (currentPath === '/offerings/search-by-term-offerings' && (type === TypeSearch.zonal_fasting || type === TypeSearch.zonal_vigil )) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesFastingVigilZonal,
      ],
    }
  }

  //* Offerings (Young Worship)
  const disabledSubTypesYoungWorship = Object.values(SubTypeSearchNames).filter(value => !subTypesYoungWorship.includes(value) ) 
  
  if (currentPath === '/offerings/search-by-term-offerings' &&  type === TypeSearch.youth_worship ) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesYoungWorship,
      ],
    }
  }

  //* Offerings (Activities)
  const disabledSubTypesActivities = Object.values(SubTypeSearchNames).filter(value => !subTypesActivities.includes(value) ) 
  
  if (currentPath === '/offerings/search-by-term-offerings' &&  type === TypeSearch.activities ) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesActivities,
      ],
    }
  }

  //* Offerings (Ground Church)
  const disabledSubTypesGroundChurch = Object.values(SubTypeSearchNames).filter(value => !subTypesGroundChurch.includes(value) ) 
  
  if (currentPath === '/offerings/search-by-term-offerings' &&  (type === TypeSearch.church_ground || type === TypeSearch.special )) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesGroundChurch,
      ],
    }
  }

  //* Users 
  const disabledSubTypesUserNames = Object.values(SubTypeSearchNames).filter(value => !subTypesUserNames.includes(value) ) 
  const disabledSubTypesUserLastNames = Object.values(SubTypeSearchNames).filter(value => !subTypesUserLastNames.includes(value) ) 
  const disabledSubTypesUserFullName = Object.values(SubTypeSearchNames).filter(value => !subTypesUserFullName.includes(value) ) 
  
  if (currentPath === '/users/search-by-term-users' &&  type === TypeSearch.firstName ) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesUserNames,
      ],
    }
  }

  if (currentPath === '/users/search-by-term-users' &&  type === TypeSearch.lastName ) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesUserLastNames,
      ],
    }
  }

  if (currentPath === '/users/search-by-term-users' &&  type === TypeSearch.fullName ) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesUserFullName,
      ],
    }
  }

 
}


export const validationDisableTermSelect = (type: string, subType:string | undefined) => {

  //* Disabled Term Select
  if (type === TypeSearch.monthBirth) {
    return {
      disabledTermSelect : [
        TermSelectTypeNames.male,
        TermSelectTypeNames.female,
        TermSelectTypeNames.single,
        TermSelectTypeNames.married,
        TermSelectTypeNames.widowed,
        TermSelectTypeNames.divorced,
        TermSelectTypeNames.other,
        TermSelectTypeNames.active,
        TermSelectTypeNames.inactive,
      ]
    }
  } 
  
  if (type === TypeSearch.gender) {
    return {
      disabledTermSelect : [
        TermSelectTypeNames.january,
        TermSelectTypeNames.february,
        TermSelectTypeNames.march,
        TermSelectTypeNames.april,
        TermSelectTypeNames.may,
        TermSelectTypeNames.june,
        TermSelectTypeNames.july,
        TermSelectTypeNames.august,
        TermSelectTypeNames.september,
        TermSelectTypeNames.october,
        TermSelectTypeNames.november,
        TermSelectTypeNames.december,
        TermSelectTypeNames.single,
        TermSelectTypeNames.married,
        TermSelectTypeNames.widowed,
        TermSelectTypeNames.divorced,
        TermSelectTypeNames.other,
        TermSelectTypeNames.active,
        TermSelectTypeNames.inactive,
      ]
    }
  }

  if (type === TypeSearch.maritalStatus) {
    return {
      disabledTermSelect : [
        TermSelectTypeNames.january,
        TermSelectTypeNames.february,
        TermSelectTypeNames.march,
        TermSelectTypeNames.april,
        TermSelectTypeNames.may,
        TermSelectTypeNames.june,
        TermSelectTypeNames.july,
        TermSelectTypeNames.august,
        TermSelectTypeNames.september,
        TermSelectTypeNames.october,
        TermSelectTypeNames.november,
        TermSelectTypeNames.december,
        TermSelectTypeNames.male,
        TermSelectTypeNames.female,
        TermSelectTypeNames.active,
        TermSelectTypeNames.inactive,
      ]
    }
  }
  
  if (type === TypeSearch.isActive) {
    return {
      disabledTermSelect : [
        TermSelectTypeNames.january,
        TermSelectTypeNames.february,
        TermSelectTypeNames.march,
        TermSelectTypeNames.april,
        TermSelectTypeNames.may,
        TermSelectTypeNames.june,
        TermSelectTypeNames.july,
        TermSelectTypeNames.august,
        TermSelectTypeNames.september,
        TermSelectTypeNames.october,
        TermSelectTypeNames.november,
        TermSelectTypeNames.december,
        TermSelectTypeNames.male,
        TermSelectTypeNames.female,
        TermSelectTypeNames.single,
        TermSelectTypeNames.married,
        TermSelectTypeNames.widowed,
        TermSelectTypeNames.divorced,
        TermSelectTypeNames.other,
        TermSelectTypeNames.day,
        TermSelectTypeNames.night,
      ]
    }
  }

  if (subType === SubTypeSearch.offeringShift || subType === SubTypeSearch.offeringDateShift  ) {
    return {
      disabledTermSelect : [
        TermSelectTypeNames.january,
        TermSelectTypeNames.february,
        TermSelectTypeNames.march,
        TermSelectTypeNames.april,
        TermSelectTypeNames.may,
        TermSelectTypeNames.june,
        TermSelectTypeNames.july,
        TermSelectTypeNames.august,
        TermSelectTypeNames.september,
        TermSelectTypeNames.october,
        TermSelectTypeNames.november,
        TermSelectTypeNames.december,
        TermSelectTypeNames.male,
        TermSelectTypeNames.female,
        TermSelectTypeNames.single,
        TermSelectTypeNames.married,
        TermSelectTypeNames.widowed,
        TermSelectTypeNames.divorced,
        TermSelectTypeNames.other,
        TermSelectTypeNames.active,
        TermSelectTypeNames.inactive,
      ]
    }
  }
}