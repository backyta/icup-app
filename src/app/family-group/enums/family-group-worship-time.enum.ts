export enum FamilyGroupWorshipTime {
  Time0900 = '9:00',
  Time1000 = '10:00',
  Time1600 = '16:00',
  Time1630 = '16:30',
  Time1700 = '17:00',
  Time1730 = '17:30',
  Time1800 = '18:00',
  Time1830 = '18:30',
  Time1900 = '19:00',
  Time1930 = '19:30',
  Time2000 = '20:00',
}

export const FamilyGroupWorshipTimeNames: Record<FamilyGroupWorshipTime, string> = {
  [FamilyGroupWorshipTime.Time0900]: '9:00 AM',
  [FamilyGroupWorshipTime.Time1000]: '10:00 AM',
  [FamilyGroupWorshipTime.Time1600]: '4:00 PM',
  [FamilyGroupWorshipTime.Time1630]: '4:30 PM',
  [FamilyGroupWorshipTime.Time1700]: '5:00 PM',
  [FamilyGroupWorshipTime.Time1730]: '5:30 PM',
  [FamilyGroupWorshipTime.Time1800]: '6:00 PM',
  [FamilyGroupWorshipTime.Time1830]: '6:30 PM',
  [FamilyGroupWorshipTime.Time1900]: '7:00 PM',
  [FamilyGroupWorshipTime.Time1930]: '7:30 PM',
  [FamilyGroupWorshipTime.Time2000]: '8:00 PM',
};
