export enum District {
  Independencia = 'Independencia',
  PuentePiedra = 'Puente Piedra',
  LosOlivos = 'Los Olivos',
  Comas = 'Comas',
  Carabayllo = 'Carabayllo',
}

export const DistrictNames: Record<District, string> = {
  [District.Comas]: 'Comas',
  [District.Carabayllo]: 'Carabayllo',
  [District.Independencia]: 'Independencia',
  [District.LosOlivos]: 'Los Olivos',
  [District.PuentePiedra]: 'Puente Piedra',
};