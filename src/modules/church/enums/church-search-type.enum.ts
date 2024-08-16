export enum ChurchSearchType {
  ChurchName = 'church_name',
  FoundingDate = 'founding_date',
  Department = 'department',
  Province = 'province',
  District = 'district',
  UrbanSector = 'urban_sector',
  Address = 'address',
  RecordStatus = 'record_status',
}

export const ChurchSearchTypeNames: Record<ChurchSearchType, string> = {
  [ChurchSearchType.ChurchName]: 'Nombre Iglesia',
  [ChurchSearchType.FoundingDate]: 'Fecha de Fundación',
  [ChurchSearchType.Department]: 'Departamento',
  [ChurchSearchType.Province]: 'Provincia',
  [ChurchSearchType.District]: 'Distrito',
  [ChurchSearchType.UrbanSector]: 'Sector Urbano',
  [ChurchSearchType.Address]: 'Dirección',
  [ChurchSearchType.RecordStatus]: 'Estado de registro',
};
