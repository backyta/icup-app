export enum DashboardSearchType {
  LatestSundayOfferings = 'latest_sunday_offerings',
  TopFamilyGroupOfferings = 'top_family_group_offerings',
  MostPopulatedFamilyGroups = 'most_populated_family_groups',
  LessPopulatedFamilyGroups = 'less_populated_family_groups'
}

export const DashboardSearchTypeNames: Record<DashboardSearchType, string> =  {
  [DashboardSearchType.LatestSundayOfferings]: 'Ultimas Ofrendas Dominicales',
  [DashboardSearchType.TopFamilyGroupOfferings]: 'Top Ofrendas Grupos Familiares',
  [DashboardSearchType.MostPopulatedFamilyGroups]: 'Grupos Familiares mas poblados',
  [DashboardSearchType.LessPopulatedFamilyGroups]: 'Grupos Familiares menos poblados'
}