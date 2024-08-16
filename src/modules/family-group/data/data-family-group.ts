import { type FamilyGroupColumns } from '@/modules/family-group/interfaces';

export const dataFamilyGroups: FamilyGroupColumns[] = 
[
  {
    id: "1",
    zone: "A",
    code: "A-1",
    name_house: "Guerreros de Dios",
    count_members: 6,
    district: 'Independencia',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "2",
    zone: "B",
    code: "B-1",
    name_house: "Hijos del Cielo",
    count_members: 8,
    district: 'Comas',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "3",
    zone: "C",
    code: "C-1",
    name_house: "Luz Divina",
    count_members: 4,
    district: 'Comas',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "4",
    zone: "A",
    code: "A-2",
    name_house: "Ángeles de Esperanza",
    count_members: 10,
    district: 'Independencia',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "5",
    zone: "B",
    code: "B-2",
    name_house: "Sembradores de Paz",
    count_members: 5,
    district: 'Independencia',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "6",
    zone: "C",
    code: "C-2",
    name_house: "Familia Bendecida",
    count_members: 7,
    district: 'Comas',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "7",
    zone: "A",
    code: "A-3",
    name_house: "Guardianes Celestiales",
    count_members: 9,
    district: 'Comas',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "8",
    zone: "B",
    code: "B-3",
    name_house: "Hijos del Amor",
    count_members: 3,
    district: 'Independencia',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "9",
    zone: "C",
    code: "C-3",
    name_house: "Estrellas Brillantes",
    count_members: 11,
    district: 'Comas',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "10",
    zone: "A",
    code: "A-4",
    name_house: "Siervos de la Luz",
    count_members: 6,
    district: 'Independencia',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "11",
    zone: "B",
    code: "B-4",
    name_house: "Ministros del Reino",
    count_members: 8,
    district: 'Comas',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "12",
    zone: "C",
    code: "C-4",
    name_house: "Mensajeros del Éxito",
    count_members: 4,
    district: 'Comas',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "13",
    zone: "A",
    code: "A-5",
    name_house: "Portadores de Fe",
    count_members: 10,
    district: 'Independencia',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "14",
    zone: "B",
    code: "B-5",
    name_house: "Caminantes de la Esperanza",
    count_members: 5,
    district: 'Comas',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "15",
    zone: "C",
    code: "C-5",
    name_house: "Seguidores de la Verdad",
    count_members: 7,
    district: 'Independencia',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "16",
    zone: "A",
    code: "A-6",
    name_house: "Luchadores de la Bondad",
    count_members: 9,
    district: 'Independencia',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "17",
    zone: "B",
    code: "B-6",
    name_house: "Siervos del Amor",
    count_members: 3,
    district: 'Comas',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "18",
    zone: "C",
    code: "C-6",
    name_house: "Constructores del Cielo",
    count_members: 11,
    district: 'Comas',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "19",
    zone: "A",
    code: "A-7",
    name_house: "Viajeros del Alma",
    count_members: 6,
    district: 'Independencia',
     updated_by: 'Pepito Gomez'
  },
  {
    id: "20",
    zone: "B",
    code: "B-7",
    name_house: "Sembradores de Alegría",
    count_members: 8,
    district: 'Comas',
     updated_by: 'Pepito Gomez'
  }
  
];

export const preachers = [
  { label: 'Juan Carlos Medina Salinas', value: 'id1' },
  { label: 'María Elena Huamaní Ramos', value: 'id2' },
  { label: 'Jorge Luis Sánchez Cárdenas', value: 'id3' },
  { label: 'Rosa María Torres Díaz', value: 'id4' },
  { label: 'Luis Alberto Rodríguez Soto', value: 'id5' },
  { label: 'Ana María Gutiérrez Flores', value: 'id6' },
  { label: 'Pedro Pablo Pérez Torres', value: 'id7' },
  { label: 'Silvia Esther Chávez Díaz', value: 'id8' },
  { label: 'Fernando José López Ramírez', value: 'id9' },
  { label: 'Carmen Rosa Silva García', value: 'id10' },
] as const;

export const supervisors = [
  { label: 'Luz Maria Salgado Quito', value: 'id1' },
  { label: 'Mercedes Paula Pelayo Terrones', value: 'id2' },
  { label: 'Rosarios Agustina Rojas Prado', value: 'id3' },
] as const;

export const zones = [
  { label: 'Zona A', value: 'zone-1' },
  { label: 'Zona B', value: 'zone-2' },
  { label: 'Zona C', value: 'zone-3' },
  { label: 'Zona D', value: 'zone-4' },
] as const;

export const familyHouses = [
  { label: 'C-1 - Los Enviados de Jehová', value: 'id1' },
  { label: 'A-2 - Los Guardianes del Amor', value: 'id2' },
  { label: 'A-3 - Los Protectores del Hogar', value: 'id3' },
  { label: 'B-2 - La Familia Unida', value: 'id4' },
  { label: 'C-3 - Los Guardianes de la Luz', value: 'id5' },
  { label: 'A-1 - Los Guerreros de la Fe', value: 'id6' },
  { label: 'C-2 - La Casa del Amor Infinito', value: 'id7' },
  { label: 'A-4 - Los Mensajeros de la Paz', value: 'id8' },
  { label: 'C-4 - La Familia del Renacer', value: 'id9' },
  { label: 'B-1 - Los Hijos de la Esperanza', value: 'id10' },
] as const;
