export enum SearchTypeChurch {

  ChurchName = 'church_name',
  FoundingDate = 'founding_date',
  Department = 'department',
  Province = 'province',
  District = 'district',
  UrbanSector = 'urban_sector',
  Address = 'address',
  Status = 'status',
}

export const SearchTypeChurchKeys: Record<SearchTypeChurch, string> =  {
  church_name: 'Nombre Iglesia',
  founding_date: 'Fecha de Fundación',
  department : 'Departamento',
  province : 'Provincia',
  district : 'Distrito',
  urban_sector: 'Sector Urbano',
  address : 'Dirección',
  status : 'Estado de registro',
}
