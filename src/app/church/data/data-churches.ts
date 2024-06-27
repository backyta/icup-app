import { type ChurchColumns } from './../interfaces/church-columns.interface';


export const dataChurches: ChurchColumns[] = 
[
  {
    id: "1",
    churchName: "Iglesia Presencia Divina",
    email: "iglesia.presencia.divina@iglesia.com",
    phoneNumber: "9999999999",
    district: 'Los Olivos',
    urbanSector: 'Puente Camote',
    updatedBy: 'Pepito Gomez'
  },
  {
    id: "2",
    churchName: "Iglesia Presencia Divina - Anexo 1",
    email: "iglesia.presencia.divina.1@iglesia.com",
    phoneNumber: "9999999999",
    district: 'SMP',
    urbanSector: 'Puente Nuevo',
    updatedBy: 'Pepito Gomez'
  },
  {
    id: "3",
    churchName: "Iglesia Presencia Divina - Anexo 2",
    email: "iglesia.presencia.divina.2@iglesia.com",
    phoneNumber: "9999999999",
    district: 'Independencia',
    urbanSector: 'Unificada',
    updatedBy: 'Pepito Gomez'
  },
  {
    id: "4",
    churchName: "Iglesia Presencia Divina - Anexo 3",
    email: "iglesia.presencia.divina.3@iglesia.com",
    phoneNumber: "9999999999",
    district: 'Comas',
    urbanSector: 'San Felipe',
    updatedBy: 'Pepito Gomez'
  },
];

export const churches = [
  { label: 'Iglesia Agua Viva - Central', value: 'id1' },
] as const;

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


