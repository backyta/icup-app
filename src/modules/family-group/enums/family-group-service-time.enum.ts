export enum FamilyGroupServiceTime {
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

export const FamilyGroupServiceTimeNames: Record<FamilyGroupServiceTime, string> = {
  [FamilyGroupServiceTime.Time0900]: '9:00 AM',
  [FamilyGroupServiceTime.Time1000]: '10:00 AM',
  [FamilyGroupServiceTime.Time1600]: '4:00 PM',
  [FamilyGroupServiceTime.Time1630]: '4:30 PM',
  [FamilyGroupServiceTime.Time1700]: '5:00 PM',
  [FamilyGroupServiceTime.Time1730]: '5:30 PM',
  [FamilyGroupServiceTime.Time1800]: '6:00 PM',
  [FamilyGroupServiceTime.Time1830]: '6:30 PM',
  [FamilyGroupServiceTime.Time1900]: '7:00 PM',
  [FamilyGroupServiceTime.Time1930]: '7:30 PM',
  [FamilyGroupServiceTime.Time2000]: '8:00 PM',
};
