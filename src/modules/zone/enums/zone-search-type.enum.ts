export enum ZoneSearchType {
  ZoneName = 'zone_name',
  Country = 'country',
  Department = 'department',
  Province = 'province',
  District = 'district',
  RecordStatus = 'record_status',
}

export const ZoneSearchTypeNames: Record<ZoneSearchType, string> = {
  [ZoneSearchType.ZoneName]: 'Nombre de Zona',
  [ZoneSearchType.Country]: 'País',
  [ZoneSearchType.Department]: 'Departamento',
  [ZoneSearchType.Province]: 'Provincia',
  [ZoneSearchType.District]: 'Distrito',
  [ZoneSearchType.RecordStatus]: 'Estado de registro',
};
