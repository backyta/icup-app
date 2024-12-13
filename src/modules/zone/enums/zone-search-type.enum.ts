export enum ZoneSearchType {
  FirstNames = 'first_names',
  LastNames = 'last_names',
  FullNames = 'full_names',
  ZoneName = 'zone_name',
  Country = 'country',
  Department = 'department',
  Province = 'province',
  District = 'district',
  RecordStatus = 'record_status',
}

export const ZoneSearchTypeNames: Record<ZoneSearchType, string> = {
  [ZoneSearchType.FirstNames]: 'Nombres',
  [ZoneSearchType.LastNames]: 'Apellidos',
  [ZoneSearchType.FullNames]: 'Nombres y Apellidos',
  [ZoneSearchType.ZoneName]: 'Nombre de Zona',
  [ZoneSearchType.Country]: 'País',
  [ZoneSearchType.Department]: 'Departamento',
  [ZoneSearchType.Province]: 'Provincia',
  [ZoneSearchType.District]: 'Distrito',
  [ZoneSearchType.RecordStatus]: 'Estado de registro',
};
