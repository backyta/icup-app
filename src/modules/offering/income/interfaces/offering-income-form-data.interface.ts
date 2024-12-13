export interface OfferingIncomeFormData {
  churchId              : string,
  type                  : string,
  subType              ?: string | undefined,
  category             ?: string | undefined,
  isNewDonor           ?: boolean | undefined;
  donorId              ?: string | undefined;
  donorFirstName       ?: string | undefined;
  donorLastName        ?: string | undefined;
  donorGender          ?: string | undefined;
  donorBirthDate       ?: Date | undefined;
  donorOriginCountry   ?: string | undefined;
  donorResidenceCountry?: string | undefined;
  donorEmail           ?: string | undefined;
  donorPhoneNumber     ?: string | undefined;
  donorResidenceCity   ?: string | undefined;
  donorPostalCode      ?: string | undefined;
  shift                ?: string | undefined,
  amount                : string,
  date                  : Date;
  currency              : string,
  comments             ?: string | undefined,
  fileNames            ?: string[] | undefined,
  imageUrls            ?: string[] | undefined,
  memberType           ?: string | undefined,
  familyGroupId        ?: string | undefined,
  memberId             ?: string | undefined,
  zoneId               ?: string | undefined,
  recordStatus         ?: string | undefined,
}

export type OfferingIncomeFormDataKeys =
  | 'type'
  | 'subType'
  | 'category'
  | 'isNewDonor'
  | 'donorId'
  | 'donorFirstName'
  | 'donorLastName'
  | 'donorGender'
  | 'donorBirthDate'
  | 'donorOriginCountry'
  | 'donorResidenceCountry'
  | 'donorEmail'
  | 'donorPhoneNumber'
  | 'donorResidenceCity'
  | 'donorPostalCode'
  | 'memberType'
  | 'amount'
  | 'shift'
  | 'currency'
  | 'comments'
  | 'fileNames'
  | 'imageUrls'
  | 'familyGroupId'
  | 'memberId'
  | 'zoneId'
  | 'churchId'
  | 'recordStatus'

