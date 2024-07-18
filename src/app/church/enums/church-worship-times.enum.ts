export enum ChurchWorshipTimes {
  Time0900 = '9:00',
  Time1000 = '10:00',
  Time1100 = '11:00',
  Time1600 = '16:00',
  Time1700 = '17:00',
  Time1800 = '18:00',
  Time1900 = '19:00',
  Time2000 = '20:00',
 
}

export const ChurchWorshipTimesNames: Record<ChurchWorshipTimes, string> = {
  [ChurchWorshipTimes.Time0900]: '9:00 AM',
  [ChurchWorshipTimes.Time1000]: '10:00 AM',
  [ChurchWorshipTimes.Time1100]: '11:00 AM',
  [ChurchWorshipTimes.Time1600]: '4:00 PM',
  [ChurchWorshipTimes.Time1700]: '5:00 PM',
  [ChurchWorshipTimes.Time1800]: '6:00 PM',
  [ChurchWorshipTimes.Time1900]: '7:00 PM',
  [ChurchWorshipTimes.Time2000]: '8:00 PM',
};
