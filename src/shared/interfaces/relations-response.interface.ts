
export interface Anexe {
  id:          string;
  churchName:  string;
  abbreviatedChurchName:  string;
  district:    string;
  urbanSector: string;
}

export interface Pastor {
  id:        string;
  firstName: string;
  lastName:  string;
}

export interface Copastor {
  id:        string;
  firstName: string;
  lastName:  string;
}

export interface Supervisor {
  id:        string;
  firstName: string;
  lastName:  string;
}

export interface Zone {
  id:       string;
  zoneName: string;
  district: string;
} 

export interface Preacher {
  id:        string;
  firstName: string;
  lastName:  string;
}

export interface FamilyGroup {
  id: string;
  familyGroupName: string;
  familyGroupCode: string;
  district: string;
  urbanSector: string;
}

export interface Disciple {
  id:        string;
  firstName: string;
  lastName:  string;
}

export interface ExternalDonor {
  id              : string;
  firstName       : string;
  lastName        : string;
  originCountry   : string;
  residenceCountry: string;
  residenceCity   : string;
}


export interface Member {
  id:               string;
  firstName:        string;
  lastName:         string;
  gender:           string;
  originCountry:    string;
  age:              number;
  birthDate:        Date;
  maritalStatus:    string;
  numberChildren:   number;
  conversionDate:   Date;
  email:            string;
  phoneNumber:      string;
  country:          string;
  department:       string;
  province:         string;
  district:         string;
  urbanSector:      string;
  address:          string;
  referenceAddress: string;
  roles:            string[];
  createdAt?:       Date;
  createdBy?:       CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
}

export interface CreatedBy {
  id:         string;
  firstName:  string;
  lastName:   string;
  email:      string;
  roles:      string[];
  createdAt?:  Date;
  createdBy?: CreatedBy;
  updatedAt?: Date;
  updatedBy?: UpdatedBy;
  recordStatus?:     string;
}

export interface UpdatedBy {
  id:          string;
  firstName:   string;
  lastName:    string;
  email:       string;
  roles:       string[];
  createdAt?:  Date;
  createdBy?:  CreatedBy;
  updatedAt?:  Date;
  updatedBy?:  UpdatedBy;
  recordStatus?:      string;
}

export interface MainChurch {
  id:               string;
  churchName?:       string;
  abbreviatedChurchName?: string;
  isAnexe?:          boolean;
  serviceTimes?:     string[];
  foundingDate?:     Date;
  email?:            string;
  phoneNumber?:      string;
  country?:          string;
  department?:       string;
  province?:         string;
  district?:         string;
  urbanSector?:      string;
  address?:          string;
  referenceAddress?: string;
  createdAt?:        Date;
  createdBy?:        CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  recordStatus?:           string;
}

export type TheirChurch = MainChurch;


export interface TheirPastor {
  id:               string;
  firstName?:        string;
  lastName?:         string;
  gender?:           string;
  originCountry?:    string;
  birthDate?:        Date;
  age?:              number;
  maritalStatus?:    string;
  numberChildren?:   number;
  conversionDate?:   Date;
  email?:            string;
  phoneNumber?:      string;
  country?:          string;
  department?:       string;
  province?:         string;
  district?:         string;
  urbanSector?:      string;
  address?:          string;
  referenceAddress?: string;
  roles?:            string[];
  createdAt?:        Date;
  createdBy?:        CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  recordStatus?:     string;
}

export interface TheirCopastor {
  id:               string;
  firstName?:        string;
  lastName?:         string;
  gender?:           string;
  originCountry?:    string;
  birthDate?:        Date;
  age?:              number;
  maritalStatus?:    string;
  numberChildren?:   number;
  conversionDate?:   Date;
  email?:            string;
  phoneNumber?:      string;
  country?:          string;
  department?:       string;
  province?:         string;
  district?:         string;
  urbanSector?:      string;
  address?:          string;
  referenceAddress?: string;
  roles?:            string[];
  createdAt?:        Date;
  createdBy?:        CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  recordStatus?:     string;
}

export interface TheirSupervisor {
  id:               string;
  firstName?:        string;
  lastName?:         string;
  gender?:           string;
  originCountry?:    string;
  birthDate?:        Date;
  age?:              number;
  maritalStatus?:    string;
  numberChildren?:   number;
  conversionDate?:   Date;
  email?:            string;
  phoneNumber?:      string;
  country?:          string;
  department?:       string;
  province?:         string;
  district?:         string;
  urbanSector?:      string;
  address?:          string;
  referenceAddress?: string;
  isDirectRelationToPastor?:  boolean;
  roles?:            string[];
  createdAt?:        Date;
  createdBy?:        CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  recordStatus?:     string;
}
export interface TheirPreacher {
  id:               string;
  firstName?:        string;
  lastName?:         string;
  gender?:           string;
  originCountry?:    string;
  birthDate?:        Date;
  age?:              number;
  maritalStatus?:    string;
  numberChildren?:   number;
  conversionDate?:   Date;
  email?:            string;
  phoneNumber?:      string;
  country?:          string;
  department?:       string;
  province?:         string;
  district?:         string;
  urbanSector?:      string;
  address?:          string;
  referenceAddress?: string;
  roles?:            string[];
  createdAt?:        Date;
  createdBy?:        CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  recordStatus?:     string;
}

export interface TheirZone {
  id:         string;
  zoneName?:   string;
  department?: string;
  province?:   string;
  district?:   string;
  createdAt?:  Date;
  createdBy?:  CreatedBy;
  updatedAt?: Date;
  updatedBy?: UpdatedBy;
  recordStatus?: string;
}

export interface TheirFamilyGroup {
  id:              string;
  familyGroupName: string;
  familyGroupCode: string;
  district:        string;
  urbanSector:     string;
  createdAt?:      Date;
  createdBy?:      CreatedBy;
  updatedAt?:      Date;
  updatedBy?:      UpdatedBy;
  recordStatus?:   string;
}
