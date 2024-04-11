/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { SubTypeSearchNames, TypeSearch, TypeSearchNames, TermSelectOptionsNames, SubTypeSearch } from "@/shared/enums";
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
  typesUser } from "@/shared/helpers";

export const validationDisableTypes = (currentPath: string) => {
  
  //* Disabled Types by module
  const disabledTypesDisciples = Object.values(TypeSearchNames).filter(value => !typesDisciple.includes(value) ) 
  const disabledTypesPastors = Object.values(TypeSearchNames).filter(value => !typesPastor.includes(value) ) 
  const disabledTypesCopastors = Object.values(TypeSearchNames).filter(value => !typesCopastor.includes(value) ) 
  const disabledTypesLeaders = Object.values(TypeSearchNames).filter(value => !typesLeader.includes(value) ) 
  const disabledTypesFamilyHouses = Object.values(TypeSearchNames).filter(value => !typesFamilyHouse.includes(value) ) 
  const disabledTypesOfferings = Object.values(TypeSearchNames).filter(value => !typesOffering.includes(value) ) 
  const disabledTypesUsers = Object.values(TypeSearchNames).filter(value => !typesUser.includes(value) ) 
  
  if (currentPath === '/disciples/search-by-term-disciples' || currentPath === '/disciples/update-disciple' || currentPath === '/disciples/delete-disciple') {
      return {
        disabledTypes : [
        ...disabledTypesDisciples
      ]   
    }
  }

  if (currentPath === '/pastors/search-by-term-pastors' || currentPath === '/pastors/update-pastor' || currentPath === '/pastors/delete-pastor') {
    return {
        disabledTypes : [
          ...disabledTypesPastors
      ]
    }
  }

  if (currentPath === '/copastors/search-by-term-copastors' || currentPath === '/copastors/update-copastor' || currentPath === '/copastors/delete-copastor') {
    return { 
     disabledTypes : [
      ...disabledTypesCopastors
     ],
   }
  }

   if (currentPath === '/leaders/search-by-term-leaders' || currentPath === '/leaders/update-leader' || currentPath === '/leaders/delete-leader') {
    return {
      disabledTypes : [
        ...disabledTypesLeaders
      ],
    }
  }

  if (currentPath === '/family-houses/search-by-term-family-houses' || currentPath === '/family-houses/update-family-house' || currentPath === '/family-houses/delete-family-house') {
    return {
      disabledTypes : [
        ...disabledTypesFamilyHouses
      ]
    }
  } 

  if (currentPath === '/offerings/search-by-term-offerings' || currentPath === '/offerings/update-offering' || currentPath === '/offerings/delete-offering') {
    return {
      disabledTypes : [
        ...disabledTypesOfferings
      ],
    }
  }
  
  if (currentPath === '/users/search-by-term-users' || currentPath === '/users/update-user' || currentPath === '/users/delete-user') {
    return {
      disabledTypes : [
        ...disabledTypesUsers
      ],
    }
  }
}

// TODO : continuar aquí validación y cambiando hasta que se logre y revisar todos los módulos que estén con los filtros correctos

export const validationDisableSubTypes = (currentPath: string, type: string ) => {

  //* Disabled Sub-types by module
  //* Disciple
  const disabledSubTypesDiscipleNames = Object.keys(SubTypeSearchNames).filter(value => !subTypesDiscipleNames.includes(value as SubTypeSearch) ) 
  const disabledSubTypesDiscipleLastNames = Object.keys(SubTypeSearchNames).filter(value => !subTypesDiscipleLastNames.includes(value as SubTypeSearch) ) 
  const disabledSubTypesDiscipleFullName = Object.keys(SubTypeSearchNames).filter(value => !subTypesDiscipleFullName.includes(value as SubTypeSearch) ) 

  
  
  if ((currentPath === '/disciples/search-by-term-disciples' || currentPath === '/disciples/update-disciple' || currentPath === '/disciples/delete-disciple') && type === TypeSearch.FirstName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesDiscipleNames,
      ],
    }
  }

  if ((currentPath === '/disciples/search-by-term-disciples' || currentPath === '/disciples/update-disciple' || currentPath === '/disciples/delete-disciple') && type === TypeSearch.LastName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesDiscipleLastNames
      ],
    }
  }

  if ((currentPath === '/disciples/search-by-term-disciples' || currentPath === '/disciples/update-disciple' || currentPath === '/disciples/delete-disciple') && type === TypeSearch.FullName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesDiscipleFullName
      ],
    }
  }

  //* Pastor
  const disabledSubTypesPastorNames = Object.keys(SubTypeSearchNames).filter(value => !subTypesPastorNames.includes(value as SubTypeSearch) ) 
  const disabledSubTypesPastorLastNames = Object.keys(SubTypeSearchNames).filter(value => !subTypesPastorLastNames.includes(value as SubTypeSearch) ) 
  const disabledSubTypesPastorFullName = Object.keys(SubTypeSearchNames).filter(value => !subTypesPastorFullName.includes(value as SubTypeSearch) ) 
  
  
  if ((currentPath === '/pastors/search-by-term-pastors' || currentPath === '/pastors/update-pastor' || currentPath === '/pastors/delete-pastor') && type === TypeSearch.FirstName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesPastorNames,
      ],
    }
  }

  if ((currentPath === '/pastors/search-by-term-pastors' || currentPath === '/pastors/update-pastor' || currentPath === '/pastors/delete-pastor') && type === TypeSearch.LastName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesPastorLastNames
      ],
    }
  }

  if ((currentPath === '/pastors/search-by-term-pastors' || currentPath === '/pastors/update-pastor' || currentPath === '/pastors/delete-pastor') && type === TypeSearch.FullName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesPastorFullName
      ],
    }
  }

  //* Co-Pastor
  const disabledSubTypesCopastorNames = Object.keys(SubTypeSearchNames).filter(value => !subTypesCopastorNames.includes(value as SubTypeSearch) ) 
  const disabledSubTypesCopastorLastNames = Object.keys(SubTypeSearchNames).filter(value => !subTypesCopastorLastNames.includes(value as SubTypeSearch) ) 
  const disabledSubTypesCopastorFullName = Object.keys(SubTypeSearchNames).filter(value => !subTypesCopastorFullName.includes(value as SubTypeSearch) ) 
  
  if ((currentPath === '/copastors/search-by-term-copastors' || currentPath === '/copastors/update-copastor' || currentPath === '/copastors/delete-copastor') && type === TypeSearch.FirstName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesCopastorNames,
      ],
    }
  }

  if ((currentPath === '/copastors/search-by-term-copastors' || currentPath === '/copastors/update-copastor' || currentPath === '/copastors/delete-copastor') && type === TypeSearch.LastName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesCopastorLastNames
      ],
    }
  }

  if ((currentPath === '/copastors/search-by-term-copastors' || currentPath === '/copastors/update-copastor' || currentPath === '/copastors/delete-copastor') && type === TypeSearch.FullName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesCopastorFullName
      ],
    }
  }

  //* Leader
  const disabledSubTypesLeaderNames = Object.keys(SubTypeSearchNames).filter(value => !subTypesLeaderNames.includes(value as SubTypeSearch) ) 
  const disabledSubTypesLeaderLastNames = Object.keys(SubTypeSearchNames).filter(value => !subTypesLeaderLastNames.includes(value as SubTypeSearch) ) 
  const disabledSubTypesLeaderFullName = Object.keys(SubTypeSearchNames).filter(value => !subTypesLeaderFullName.includes(value as SubTypeSearch) ) 
  
  if ((currentPath === '/leaders/search-by-term-leaders' || currentPath === '/leaders/update-leader' || currentPath === '/leaders/delete-leader')&& type === TypeSearch.FirstName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesLeaderNames,
      ],
    }
  }

  if ((currentPath === '/leaders/search-by-term-leaders' || currentPath === '/leaders/update-leader' || currentPath === '/leaders/delete-leader')  && type === TypeSearch.LastName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesLeaderLastNames
      ],
    }
  }

  if ((currentPath === '/leaders/search-by-term-leaders' || currentPath === '/leaders/update-leader' || currentPath === '/leaders/delete-leader')  && type === TypeSearch.FullName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesLeaderFullName
      ],
    }
  }
  
  //* Family House
  const disabledSubTypesFamilyHouseNames = Object.keys(SubTypeSearchNames).filter(value => !subTypesFamilyHouseNames.includes(value as SubTypeSearch) ) 
  const disabledSubTypesFamilyHouseLastNames = Object.keys(SubTypeSearchNames).filter(value => !subTypesFamilyHouseLastNames.includes(value as SubTypeSearch) ) 
  const disabledSubTypesFamilyHouseFullName = Object.keys(SubTypeSearchNames).filter(value => !subTypesFamilyHouseFullName.includes(value as SubTypeSearch) ) 
  
  if ((currentPath === '/family-houses/search-by-term-family-houses' || currentPath === '/family-houses/update-family-house' || currentPath === '/family-houses/delete-family-house') && type === TypeSearch.FirstName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesFamilyHouseNames,
      ],
    }
  }

  if ((currentPath === '/family-houses/search-by-term-family-houses' || currentPath === '/family-houses/update-family-house' || currentPath === '/family-houses/delete-family-house') && type === TypeSearch.LastName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesFamilyHouseLastNames
      ],
    }
  }

  if ((currentPath === '/family-houses/search-by-term-family-houses' ||  currentPath === '/family-houses/update-family-house' || currentPath === '/family-houses/delete-family-house') && type === TypeSearch.FullName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesFamilyHouseFullName
      ],
    }
  }

  //* Offerings (Tithe)
  const disabledSubTypesTithe = Object.keys(SubTypeSearchNames).filter(value => !subTypesTithe.includes(value as SubTypeSearch) ) 
  
  if ((currentPath === '/offerings/search-by-term-offerings' || currentPath === '/offerings/update-offering' || currentPath === '/offerings/delete-offering') && type === TypeSearch.Tithe) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesTithe,
      ],
    }
  }

  //* Offerings (Worship sunday, Sunday School)
  const disabledSubTypesSundayWorship = Object.keys(SubTypeSearchNames).filter(value => !subTypesSundayWorship.includes(value as SubTypeSearch) ) 
  
  if ((currentPath === '/offerings/search-by-term-offerings' || currentPath === '/offerings/update-offering' || currentPath === '/offerings/delete-offering') && (type === TypeSearch.Sunday_worship || type === TypeSearch.Sunday_school)) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesSundayWorship,
      ],
    }
  }

  //* Offerings (Family House)
  const disabledSubTypesFamilyHouse = Object.keys(SubTypeSearchNames).filter(value => !subTypesFamilyHouse.includes(value as SubTypeSearch) ) 
  
  if ((currentPath === '/offerings/search-by-term-offerings' || currentPath === '/offerings/update-offering' || currentPath === '/offerings/delete-offering') && type === TypeSearch.Family_house) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesFamilyHouse,
      ],
    }
  }

  //* Offerings (Fasting, Vigil General)
  const disabledSubTypesFastingVigilGeneral = Object.keys(SubTypeSearchNames).filter(value => !subTypesFastingVigilGeneral.includes(value as SubTypeSearch) ) 
  
  if ((currentPath === '/offerings/search-by-term-offerings' || currentPath === '/offerings/update-offering' || currentPath === '/offerings/delete-offering') && (type === TypeSearch.General_fasting || type === TypeSearch.General_vigil )) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesFastingVigilGeneral,
      ],
    }
  }

  //* Offerings (Fasting, Vigil Zonal)
  const disabledSubTypesFastingVigilZonal = Object.keys(SubTypeSearchNames).filter(value => !subTypesFastingVigilZonal.includes(value as SubTypeSearch) ) 
  
  if ((currentPath === '/offerings/search-by-term-offerings' || currentPath === '/offerings/update-offering' || currentPath === '/offerings/delete-offering') && (type === TypeSearch.Zonal_fasting || type === TypeSearch.Zonal_vigil )) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesFastingVigilZonal,
      ],
    }
  }

  //* Offerings (Young Worship)
  const disabledSubTypesYoungWorship = Object.keys(SubTypeSearchNames).filter(value => !subTypesYoungWorship.includes(value as SubTypeSearch) ) 
  
  if ((currentPath === '/offerings/search-by-term-offerings' || currentPath === '/offerings/update-offering' || currentPath === '/offerings/delete-offering') &&  type === TypeSearch.Youth_worship ) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesYoungWorship,
      ],
    }
  }

  //* Offerings (Activities)
  const disabledSubTypesActivities = Object.keys(SubTypeSearchNames).filter(value => !subTypesActivities.includes(value as SubTypeSearch) ) 
  
  if ((currentPath === '/offerings/search-by-term-offerings' || currentPath === '/offerings/update-offering' || currentPath === '/offerings/delete-offering') &&  type === TypeSearch.Activities ) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesActivities,
      ],
    }
  }

  //* Offerings (Ground Church)
  const disabledSubTypesGroundChurch = Object.keys(SubTypeSearchNames).filter(value => !subTypesGroundChurch.includes(value as SubTypeSearch) ) 
  
  if ((currentPath === '/offerings/search-by-term-offerings' || currentPath === '/offerings/update-offering' || currentPath === '/offerings/delete-offering') &&  (type === TypeSearch.Church_ground || type === TypeSearch.Special )) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesGroundChurch,
      ],
    }
  }

  //* Users 
  const disabledSubTypesUserNames = Object.keys(SubTypeSearchNames).filter(value => !subTypesUserNames.includes(value as SubTypeSearch) ) 
  const disabledSubTypesUserLastNames = Object.keys(SubTypeSearchNames).filter(value => !subTypesUserLastNames.includes(value as SubTypeSearch) ) 
  const disabledSubTypesUserFullName = Object.keys(SubTypeSearchNames).filter(value => !subTypesUserFullName.includes(value as SubTypeSearch) ) 
  
  if ((currentPath === '/users/search-by-term-users' || currentPath === '/users/update-user' || currentPath === '/users/delete-user' )   &&  type === TypeSearch.FirstName ) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesUserNames,
      ],
    }
  }

  if ((currentPath === '/users/search-by-term-users' || currentPath === '/users/update-user' || currentPath === '/users/delete-user')  &&  type === TypeSearch.LastName ) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesUserLastNames,
      ],
    }
  }

  if ((currentPath === '/users/search-by-term-users' || currentPath === '/users/update-user' || currentPath === '/users/delete-user')  &&  type === TypeSearch.FullName ) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesUserFullName,
      ],
    }
  }

 
}

// TODO : arreglar aquí los select para el update
export const validationDisableTermSelect = (type: string, subType:string | undefined) => {

  //* Disabled Term Select
  if (type === TypeSearch.MonthBirth) {
    return {
      disabledTermSelect : [
        TermSelectOptionsNames.male,
        TermSelectOptionsNames.female,
        TermSelectOptionsNames.single,
        TermSelectOptionsNames.married,
        TermSelectOptionsNames.widowed,
        TermSelectOptionsNames.divorced,
        TermSelectOptionsNames.other,
        TermSelectOptionsNames.active,
        TermSelectOptionsNames.inactive,
        TermSelectOptionsNames.day,
        TermSelectOptionsNames.night,

      ]
    }
  } 
  
  if (type === TypeSearch.Gender) {
    return {
      disabledTermSelect : [
        TermSelectOptionsNames.january,
        TermSelectOptionsNames.february,
        TermSelectOptionsNames.march,
        TermSelectOptionsNames.april,
        TermSelectOptionsNames.may,
        TermSelectOptionsNames.june,
        TermSelectOptionsNames.july,
        TermSelectOptionsNames.august,
        TermSelectOptionsNames.september,
        TermSelectOptionsNames.october,
        TermSelectOptionsNames.november,
        TermSelectOptionsNames.december,
        TermSelectOptionsNames.single,
        TermSelectOptionsNames.married,
        TermSelectOptionsNames.widowed,
        TermSelectOptionsNames.divorced,
        TermSelectOptionsNames.other,
        TermSelectOptionsNames.active,
        TermSelectOptionsNames.inactive,
        TermSelectOptionsNames.day,
        TermSelectOptionsNames.night,
      ]
    }
  }

  if (type === TypeSearch.MaritalStatus) {
    return {
      disabledTermSelect : [
        TermSelectOptionsNames.january,
        TermSelectOptionsNames.february,
        TermSelectOptionsNames.march,
        TermSelectOptionsNames.april,
        TermSelectOptionsNames.may,
        TermSelectOptionsNames.june,
        TermSelectOptionsNames.july,
        TermSelectOptionsNames.august,
        TermSelectOptionsNames.september,
        TermSelectOptionsNames.october,
        TermSelectOptionsNames.november,
        TermSelectOptionsNames.december,
        TermSelectOptionsNames.male,
        TermSelectOptionsNames.female,
        TermSelectOptionsNames.active,
        TermSelectOptionsNames.inactive,
        TermSelectOptionsNames.day,
        TermSelectOptionsNames.night,
      ]
    }
  }
  
  if (type === TypeSearch.IsActive) {
    return {
      disabledTermSelect : [
        TermSelectOptionsNames.january,
        TermSelectOptionsNames.february,
        TermSelectOptionsNames.march,
        TermSelectOptionsNames.april,
        TermSelectOptionsNames.may,
        TermSelectOptionsNames.june,
        TermSelectOptionsNames.july,
        TermSelectOptionsNames.august,
        TermSelectOptionsNames.september,
        TermSelectOptionsNames.october,
        TermSelectOptionsNames.november,
        TermSelectOptionsNames.december,
        TermSelectOptionsNames.male,
        TermSelectOptionsNames.female,
        TermSelectOptionsNames.single,
        TermSelectOptionsNames.married,
        TermSelectOptionsNames.widowed,
        TermSelectOptionsNames.divorced,
        TermSelectOptionsNames.other,
        TermSelectOptionsNames.day,
        TermSelectOptionsNames.night,
      ]
    }
  }

  if (subType === SubTypeSearch.OfferingShift || subType === SubTypeSearch.OfferingDateShift  ) {
    return {
      disabledTermSelect : [
        TermSelectOptionsNames.january,
        TermSelectOptionsNames.february,
        TermSelectOptionsNames.march,
        TermSelectOptionsNames.april,
        TermSelectOptionsNames.may,
        TermSelectOptionsNames.june,
        TermSelectOptionsNames.july,
        TermSelectOptionsNames.august,
        TermSelectOptionsNames.september,
        TermSelectOptionsNames.october,
        TermSelectOptionsNames.november,
        TermSelectOptionsNames.december,
        TermSelectOptionsNames.male,
        TermSelectOptionsNames.female,
        TermSelectOptionsNames.single,
        TermSelectOptionsNames.married,
        TermSelectOptionsNames.widowed,
        TermSelectOptionsNames.divorced,
        TermSelectOptionsNames.other,
        TermSelectOptionsNames.active,
        TermSelectOptionsNames.inactive,
      ]
    }
  }
}