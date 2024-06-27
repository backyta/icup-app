
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
  district: string;
}

export interface Preacher {
  id:        string;
  firstName: string;
  lastName:  string;
}

export interface FamilyHouse {
  id: string,
  houseName: string,
  zoneName: string,
  codeHouse: string,
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
  churchName:       string;
  isAnexe:          boolean;
  worshipTimes:     string[];
  foundingDate:     Date;
  email:            string;
  phoneNumber:      string;
  country:          string;
  department:       string;
  province:         string;
  district:         string;
  urbanSector:      string;
  address:          string;
  referenceAddress: string;
  createdAt:        Date;
  updatedAt:        Date;
  status:           string;
  createdBy:        CreatedBy;
  updatedBy:        UpdatedBy;
}












