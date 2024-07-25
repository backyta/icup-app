export enum ChurchWorshipTime {
  Time0900 = '9:00',
  Time1000 = '10:00',
  Time1100 = '11:00',
  Time1600 = '16:00',
  Time1700 = '17:00',
  Time1800 = '18:00',
  Time1900 = '19:00',
  Time2000 = '20:00',
}

export const ChurchWorshipTimeNames: Record<ChurchWorshipTime, string> = {
  [ChurchWorshipTime.Time0900]: '9:00 AM',
  [ChurchWorshipTime.Time1000]: '10:00 AM',
  [ChurchWorshipTime.Time1100]: '11:00 AM',
  [ChurchWorshipTime.Time1600]: '4:00 PM',
  [ChurchWorshipTime.Time1700]: '5:00 PM',
  [ChurchWorshipTime.Time1800]: '6:00 PM',
  [ChurchWorshipTime.Time1900]: '7:00 PM',
  [ChurchWorshipTime.Time2000]: '8:00 PM',
};
