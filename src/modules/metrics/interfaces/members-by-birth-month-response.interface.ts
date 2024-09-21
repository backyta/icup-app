interface BirthMonthStats  {
  membersCount: number;
  averageAge: number;
}

export type MembersByBirthMonthResponse = Record<string, BirthMonthStats>;