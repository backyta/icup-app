
export interface Anexe {
  id:          string;
  churchName:  string;
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
  department: string;
  province: string;
  district: string;
}

export interface Preacher {
  id:        string;
  firstName: string;
  lastName:  string;
}

export interface FamilyGroup {
  id: string,
  familyGroupName: string,
  familyGroupCode: string,
  district: string
  urbanSector: string
}

export interface Disciple {
  id:        string;
  firstName: string;
  lastName:  string;
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
  status:     string;
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
  status:      string;
}

export interface MainChurch {
  id:               string;
  churchName?:       string;
  isAnexe?:          boolean;
  worshipTimes?:     string[];
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
  createdAt:        Date;
  createdBy:        CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  status:           string;
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
  createdAt:        Date;
  createdBy:        CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  status:           string;
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
  createdAt:        Date;
  createdBy:        CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  status:           string;
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
  createdAt:        Date;
  createdBy:        CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  status:           string;
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
  createdAt:        Date;
  createdBy:        CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  status:           string;
}
export interface TheirDisciple {
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
  createdAt:        Date;
  createdBy:        CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  status:           string;
}

export interface TheirZone {
  id:         string;
  zoneName?:   string;
  country?:    string;
  department?: string;
  province?:   string;
  district?:   string;
  createdAt:  Date;
  createdBy:  CreatedBy;
  updatedAt?: Date;
  updatedBy?: UpdatedBy;
  status:     string;
}

export interface TheirFamilyGroup {
  id:              string;
  familyGroupName: string;
  familyGroupCode: string;
  district:        string;
  urbanSector:     string;
}