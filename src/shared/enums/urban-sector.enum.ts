export enum UrbanSector {
  //* Independencia 
  Payet = 'Payet',
  Tahuantinsuyo = 'Tahuantinsuyo',
  Independencia = 'Independencia',
  Ermitaño = 'Ermitaño',
  Unificada = 'Unificada',
  Industrial = 'Industrial',

  //* Puente Piedra
  Ensenada = 'Ensenada',
  Laderas = 'Laderas',
  Chillón = 'Chillón',
  ShangriLa = 'Shangri La',
  TamboIngaOeste = 'Tambo Inga Oeste',
  TamboIngaEste = 'Tambo Inga Este',
  PampaLibre = 'Pampa Libre',
  Gallinazos = 'Gallinazos',
  SantaRosa = 'Santa Rosa',
  Cercado = 'Cercado',
  LasVegas = 'Las Vegas',
  LaGrama = 'La Grama',
  Copacabana = 'Copacabana',
  ElDorado = 'El Dorado',
  LeoncioPrado = 'Leoncio Prado',
  Jerusalén = 'Jerusalén',
  Lomas = 'Lomas',
}

export const UrbanSectorNames: Record<UrbanSector, string> = {
  //* Independencia
  [UrbanSector.Payet]: 'Sect. Payet',
  [UrbanSector.Tahuantinsuyo]: 'Sect. Tahuantinsuyo',
  [UrbanSector.Independencia]: 'Sect. Independencia',
  [UrbanSector.Ermitaño]: 'Sect. Ermitaño',
  [UrbanSector.Unificada]: 'Sect. Unificada',
  [UrbanSector.Industrial]: 'Sect. Industrial',

  //* Puente Piedra
  [UrbanSector.Ensenada]: 'Sect. Ensenada',
  [UrbanSector.Laderas]: 'Sect. Laderas',
  [UrbanSector.Chillón]: 'Sect. Chillón',
  [UrbanSector.ShangriLa]: 'Sect. Shangri-La',
  [UrbanSector.TamboIngaOeste]: 'Sect. Tambo Inga Oeste',
  [UrbanSector.TamboIngaEste]: 'Sect. Tambo Inga Este',
  [UrbanSector.PampaLibre]: 'Sect. Pampa Libre',
  [UrbanSector.Gallinazos]: 'Sect. Gallinazos',
  [UrbanSector.SantaRosa]: 'Sect. Santa Rosa',
  [UrbanSector.Cercado]: 'Sect. Cercado',
  [UrbanSector.LasVegas]: 'Sect. Las Vegas',
  [UrbanSector.LaGrama]: 'Sect. La Grama',
  [UrbanSector.Copacabana]: 'Sect. Copacabana',
  [UrbanSector.ElDorado]: 'Sect. El Dorado',
  [UrbanSector.LeoncioPrado]: 'Sect. Leoncio Prado',
  [UrbanSector.Jerusalén]: 'Sect. Jerusalén',
  [UrbanSector.Lomas]: 'Sect. Lomas',
};

// TODO : agregar provincias distritos y sectores urbanos