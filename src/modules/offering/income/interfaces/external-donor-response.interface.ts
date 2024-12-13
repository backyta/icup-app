import { 
  type CreatedBy,
  type UpdatedBy,
} from '@/shared/interfaces/relations-response.interface';

export interface ExternalDonorResponse {
  id              ?: string;
  firstNames       ?: string;
  lastNames        ?: string;
  age             ?: string;
  birthDate       ?: string;
  gender          ?: string;
  email           ?: string;
  phoneNumber     ?: string;
  originCountry   ?: string;
  residenceCountry?: string;
  cityCountry     ?: string;
  donorMessage    ?: string;
  createdAt       ?: Date;
  createdBy       ?: CreatedBy;
  updatedAt       ?: Date;
  updatedBy       ?: UpdatedBy;
  recordStatus    ?: string;
  memberType      ?: string;
}
