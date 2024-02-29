/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SubTypeSearchNames, TypeSearch, TypeSearchNames, TermSelectTypeNames } from "@/enums";

export const validationDisableTypes = (currentPath: string ) => {

  //* Disabled Types and Sub-types
  if (currentPath === '/disciples/search-by-term-disciples') {
    return {
        disabledTypes : [
        TypeSearchNames.sunday_worship,
        TypeSearchNames.family_house,
        TypeSearchNames.general_fasting,
        TypeSearchNames.general_vigil,
        TypeSearchNames.zonal_fasting,
        TypeSearchNames.zonal_vigil,
        TypeSearchNames.sunday_school,
        TypeSearchNames.youth_worship,
        TypeSearchNames.activities,
        TypeSearchNames.church_ground,
        TypeSearchNames.special,
        TypeSearchNames.tithe,
        TypeSearchNames.roles,
      ],
      disabledSubTypes : [
        SubTypeSearchNames.pastor_names,
        SubTypeSearchNames.copastor_pastor,
        SubTypeSearchNames.copastor_names,
        SubTypeSearchNames.leader_pastor,
        SubTypeSearchNames.leader_copastor,
        SubTypeSearchNames.leader_supervisor,
        SubTypeSearchNames.leader_names,
        SubTypeSearchNames.family_house_pastor,
        SubTypeSearchNames.family_house_copastor,
        SubTypeSearchNames.family_house_supervisor,
        SubTypeSearchNames.family_house_preacher,
        SubTypeSearchNames.family_house_name,
        SubTypeSearchNames.offering_copastor,
        SubTypeSearchNames.offering_preacher,
        SubTypeSearchNames.offering_member,
        SubTypeSearchNames.offering_date,
        SubTypeSearchNames.user_names,
      ]
    }
  }

  if (currentPath === '/pastors/search-by-term-pastors') {
    return {
        disabledTypes : [
        TypeSearchNames.sunday_worship,
        TypeSearchNames.family_house,
        TypeSearchNames.general_fasting,
        TypeSearchNames.general_vigil,
        TypeSearchNames.zonal_fasting,
        TypeSearchNames.zonal_vigil,
        TypeSearchNames.sunday_school,
        TypeSearchNames.youth_worship,
        TypeSearchNames.activities,
        TypeSearchNames.church_ground,
        TypeSearchNames.special,
        TypeSearchNames.tithe,
        TypeSearchNames.roles,
        TypeSearchNames.zone,
        TypeSearchNames.code,
        TypeSearchNames.name_house,
      ],
      disabledSubTypes : [
        SubTypeSearchNames.member_pastor,
        SubTypeSearchNames.member_copastor,
        SubTypeSearchNames.member_supervisor,
        SubTypeSearchNames.member_preacher,
        SubTypeSearchNames.member_names,
        SubTypeSearchNames.copastor_pastor,
        SubTypeSearchNames.copastor_names,
        SubTypeSearchNames.leader_pastor,
        SubTypeSearchNames.leader_copastor,
        SubTypeSearchNames.leader_supervisor,
        SubTypeSearchNames.leader_names,
        SubTypeSearchNames.family_house_pastor,
        SubTypeSearchNames.family_house_copastor,
        SubTypeSearchNames.family_house_supervisor,
        SubTypeSearchNames.family_house_preacher,
        SubTypeSearchNames.family_house_name,
        SubTypeSearchNames.offering_copastor,
        SubTypeSearchNames.offering_preacher,
        SubTypeSearchNames.offering_member,
        SubTypeSearchNames.user_names,
        SubTypeSearchNames.offering_date,
      ]
    } 
  }

  if (currentPath === '/copastors/search-by-term-copastors') {
    return { 
     disabledTypes : [
       TypeSearchNames.sunday_worship,
       TypeSearchNames.family_house,
       TypeSearchNames.general_fasting,
       TypeSearchNames.general_vigil,
       TypeSearchNames.zonal_fasting,
       TypeSearchNames.zonal_vigil,
       TypeSearchNames.sunday_school,
       TypeSearchNames.youth_worship,
       TypeSearchNames.activities,
       TypeSearchNames.church_ground,
       TypeSearchNames.special,
       TypeSearchNames.tithe,
       TypeSearchNames.roles,
       TypeSearchNames.zone,
       TypeSearchNames.code,
       TypeSearchNames.name_house,
     ],
     disabledSubTypes : [
       SubTypeSearchNames.member_pastor,
       SubTypeSearchNames.member_copastor,
       SubTypeSearchNames.member_supervisor,
       SubTypeSearchNames.member_preacher,
       SubTypeSearchNames.member_names,
       SubTypeSearchNames.copastor_pastor,
       SubTypeSearchNames.copastor_names,
       SubTypeSearchNames.leader_pastor,
       SubTypeSearchNames.leader_copastor,
       SubTypeSearchNames.leader_supervisor,
       SubTypeSearchNames.leader_names,
       SubTypeSearchNames.family_house_pastor,
       SubTypeSearchNames.family_house_copastor,
       SubTypeSearchNames.family_house_supervisor,
       SubTypeSearchNames.family_house_preacher,
       SubTypeSearchNames.family_house_name,
       SubTypeSearchNames.offering_copastor,
       SubTypeSearchNames.offering_preacher,
       SubTypeSearchNames.offering_member,
       SubTypeSearchNames.user_names,
       SubTypeSearchNames.offering_date,
     ]
   }
  }

   if (currentPath === '/leaders/search-by-term-leaders') {
    return {
      disabledTypes : [
      TypeSearchNames.sunday_worship,
      TypeSearchNames.family_house,
      TypeSearchNames.general_fasting,
      TypeSearchNames.general_vigil,
      TypeSearchNames.zonal_fasting,
      TypeSearchNames.zonal_vigil,
      TypeSearchNames.sunday_school,
      TypeSearchNames.youth_worship,
      TypeSearchNames.activities,
      TypeSearchNames.church_ground,
      TypeSearchNames.special,
      TypeSearchNames.tithe,
      TypeSearchNames.roles,
    ],
  
    disabledSubTypes : [
      SubTypeSearchNames.member_pastor,
      SubTypeSearchNames.member_copastor,
      SubTypeSearchNames.member_supervisor,
      SubTypeSearchNames.member_preacher,
      SubTypeSearchNames.member_names,
      SubTypeSearchNames.pastor_names,
      SubTypeSearchNames.copastor_pastor,
      SubTypeSearchNames.copastor_names,
      SubTypeSearchNames.family_house_pastor,
      SubTypeSearchNames.family_house_copastor,
      SubTypeSearchNames.family_house_supervisor,
      SubTypeSearchNames.family_house_preacher,
      SubTypeSearchNames.family_house_name,
      SubTypeSearchNames.offering_copastor,
      SubTypeSearchNames.offering_preacher,
      SubTypeSearchNames.offering_member,
      SubTypeSearchNames.user_names,
      SubTypeSearchNames.offering_date,
    ]
  }
}

  if (currentPath === '/family-houses/search-by-term-family-houses') {
    return {
      disabledTypes : [
        TypeSearchNames.sunday_worship,
        TypeSearchNames.family_house,
        TypeSearchNames.general_fasting,
        TypeSearchNames.general_vigil,
        TypeSearchNames.zonal_fasting,
        TypeSearchNames.zonal_vigil,
        TypeSearchNames.sunday_school,
        TypeSearchNames.youth_worship,
        TypeSearchNames.activities,
        TypeSearchNames.church_ground,
        TypeSearchNames.special,
        TypeSearchNames.tithe,
        TypeSearchNames.roles,
        TypeSearchNames.first_name,
        TypeSearchNames.last_name,
        TypeSearchNames.full_name,
        TypeSearchNames.date_birth,
        TypeSearchNames.gender,
        TypeSearchNames.marital_status,
        TypeSearchNames.origin_country,
      ],

      disabledSubTypes : [
        SubTypeSearchNames.member_pastor,
        SubTypeSearchNames.member_copastor,
        SubTypeSearchNames.member_supervisor,
        SubTypeSearchNames.member_preacher,
        SubTypeSearchNames.member_names,
        SubTypeSearchNames.pastor_names,
        SubTypeSearchNames.copastor_pastor,
        SubTypeSearchNames.copastor_names,
        SubTypeSearchNames.leader_pastor,
        SubTypeSearchNames.leader_copastor,
        SubTypeSearchNames.leader_supervisor,
        SubTypeSearchNames.leader_names,
        SubTypeSearchNames.offering_copastor,
        SubTypeSearchNames.offering_preacher,
        SubTypeSearchNames.offering_member,
        SubTypeSearchNames.user_names,
        SubTypeSearchNames.offering_date,
      ]
    }
  } 

  if (currentPath === '/offerings/search-by-term-offerings') {
    return {
      disabledTypes : [
      TypeSearchNames.first_name,
      TypeSearchNames.last_name,
      TypeSearchNames.full_name,
      TypeSearchNames.zone,
      TypeSearchNames.code,
      TypeSearchNames.name_house,
      TypeSearchNames.is_active,
      TypeSearchNames.address,
      TypeSearchNames.roles,
      TypeSearchNames.date_birth,
      TypeSearchNames.gender,
      TypeSearchNames.marital_status,
      TypeSearchNames.origin_country,
      TypeSearchNames.department,
      TypeSearchNames.province,
      TypeSearchNames.district,
    ],
  
    disabledSubTypes : [
      SubTypeSearchNames.member_pastor, 
      SubTypeSearchNames.member_copastor, 
      SubTypeSearchNames.member_supervisor, 
      SubTypeSearchNames.member_preacher, 
      SubTypeSearchNames.member_names, 
      SubTypeSearchNames.pastor_names,
      SubTypeSearchNames.copastor_pastor, 
      SubTypeSearchNames.copastor_names, 
      SubTypeSearchNames.leader_pastor, 
      SubTypeSearchNames.leader_copastor,
      SubTypeSearchNames.leader_supervisor,
      SubTypeSearchNames.leader_names,
      SubTypeSearchNames.family_house_pastor,
      SubTypeSearchNames.family_house_copastor,
      SubTypeSearchNames.family_house_supervisor,
      SubTypeSearchNames.family_house_preacher,
      SubTypeSearchNames.family_house_name,
      SubTypeSearchNames.user_names, 
      SubTypeSearchNames.offering_date, 
    ]
  }
}
  
  if (currentPath === '/users/search-by-term-users') {
    return {
      disabledTypes : [
        TypeSearchNames.sunday_worship,
        TypeSearchNames.family_house,
        TypeSearchNames.general_fasting,
        TypeSearchNames.general_vigil,
        TypeSearchNames.zonal_fasting,
        TypeSearchNames.zonal_vigil,
        TypeSearchNames.sunday_school,
        TypeSearchNames.youth_worship,
        TypeSearchNames.activities,
        TypeSearchNames.church_ground,
        TypeSearchNames.special,
        TypeSearchNames.tithe,
        TypeSearchNames.date_birth,
        TypeSearchNames.gender,
        TypeSearchNames.marital_status,
        TypeSearchNames.zone,
        TypeSearchNames.code,
        TypeSearchNames.name_house,
        TypeSearchNames.address,
        TypeSearchNames.origin_country,
        TypeSearchNames.department,
        TypeSearchNames.province,
        TypeSearchNames.district,
      ],

      disabledSubTypes : [
        SubTypeSearchNames.member_pastor, 
        SubTypeSearchNames.member_copastor, 
        SubTypeSearchNames.member_supervisor, 
        SubTypeSearchNames.member_preacher, 
        SubTypeSearchNames.member_names, 
        SubTypeSearchNames.pastor_names,
        SubTypeSearchNames.copastor_pastor, 
        SubTypeSearchNames.copastor_names, 
        SubTypeSearchNames.leader_pastor, 
        SubTypeSearchNames.leader_copastor,
        SubTypeSearchNames.leader_supervisor,
        SubTypeSearchNames.leader_names,
        SubTypeSearchNames.family_house_pastor,
        SubTypeSearchNames.family_house_copastor,
        SubTypeSearchNames.family_house_supervisor,
        SubTypeSearchNames.family_house_preacher,
        SubTypeSearchNames.family_house_name,
        SubTypeSearchNames.offering_copastor, 
        SubTypeSearchNames.offering_preacher, 
        SubTypeSearchNames.offering_member, 
        SubTypeSearchNames.offering_date, 
      
      ]
    }
  }


}

export const validationDisableTermSelect = (type: string) => {

  //* Disabled Term Select
  if (type === TypeSearch.date_birth) {
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
      ]
    }
  }
}