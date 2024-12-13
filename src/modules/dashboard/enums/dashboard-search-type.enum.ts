export enum DashboardSearchType {
  LastSundaysOfferings      = 'last_sundays_offerings',
  TopFamilyGroupsOfferings  = 'top_family_groups_offerings',
  MostPopulatedFamilyGroups = 'most_populated_family_groups',
  LessPopulatedFamilyGroups = 'less_populated_family_groups'
}

export const DashboardSearchTypeNames: Record<DashboardSearchType, string> =  {
  [DashboardSearchType.LastSundaysOfferings]     : 'Ultimas Ofrendas Dominicales',
  [DashboardSearchType.TopFamilyGroupsOfferings] : 'Top Ofrendas Grupos Familiares',
  [DashboardSearchType.MostPopulatedFamilyGroups]: 'Grupos Familiares mas poblados',
  [DashboardSearchType.LessPopulatedFamilyGroups]: 'Grupos Familiares menos poblados'
}