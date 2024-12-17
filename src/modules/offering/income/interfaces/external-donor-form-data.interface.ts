export interface ExternalDonorFormData {
  externalDonorFirstNames      : string;
  externalDonorLastNames       : string;
  externalDonorGender          : string;
  externalDonorBirthDate       ?: Date | undefined | null;
  externalDonorEmail           ?: string | undefined;
  externalDonorPhoneNumber     ?: string | undefined;
  externalDonorOriginCountry   ?: string | undefined;
  externalDonorResidenceCountry?: string | undefined;
  externalDonorResidenceCity   ?: string | undefined;
  externalDonorPostalCode      ?: string | undefined;
}

export type ExternalDonorFormDataDataKeys =
| 'externalDonorFirstNames'
| 'externalDonorLastNames'
| 'externalDonorGender'
| 'externalDonorBirthDate'
| 'externalDonorEmail'
| 'externalDonorPhoneNumber'
| 'externalDonorOriginCountry'
| 'externalDonorResidenceCountry'
| 'externalDonorResidenceCity'
| 'externalDonorPostalCode'