import { type MemberColumns } from '@/shared/interfaces';
import { Gender } from '@/shared/enums';

export const dataMembers: MemberColumns[] = 
[
  {
    id: '1',
    first_name: 'Roberto Carlos',
    last_name: 'García Martínez',
    date_birth: '1985-03-15',
    gender: Gender.Male,
    zone: 'A',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '2',
    first_name: 'María Fernanda',
    last_name: 'Martínez Alvarez',
    date_birth: '1990-07-21',
    gender: Gender.Female,
    zone: 'B',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '3',
    first_name: 'Juan Pablo',
    last_name: 'López García',
    date_birth: '1988-12-10',
    gender: Gender.Male,
    zone: 'C',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '4',
    first_name: 'Ana María',
    last_name: 'Sánchez Castro',
    date_birth: '1983-05-02',
    gender: Gender.Female,
    zone: 'A',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '5',
    first_name: 'Pedro José',
    last_name: 'Hernández Martínez',
    date_birth: '1995-09-28',
    gender: Gender.Male,
    zone: 'B',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '6',
    first_name: 'Luisa Fernanda',
    last_name: 'Gómez Castro',
    date_birth: '1998-11-17',
    gender: Gender.Female,
    zone: 'B',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '7',
    first_name: 'Diego Alejandro',
    last_name: 'Díaz Alvarez',
    date_birth: '1987-04-09',
    gender: Gender.Male,
    zone: 'A',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '8',
    first_name: 'Camila Andrea',
    last_name: 'Alvarez Sánchez',
    date_birth: '1992-08-03',
    gender: Gender.Female,
    zone: 'A',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '9',
    first_name: 'José Antonio',
    last_name: 'Pérez Castro',
    date_birth: '1980-01-25',
    gender: Gender.Male,
    zone: 'C',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '10',
    first_name: 'Laura Alejandra',
    last_name: 'Castro Sánchez',
    date_birth: '1994-06-12',
    gender: Gender.Female,
    zone: 'A', 
    updated_by:'Pepito Gomez',
  },
  {
    id: '11',
    first_name: 'Laura Alejandra',
    last_name: 'Castro García',
    date_birth: '1994-06-12',
    gender: Gender.Female,
    zone: 'A',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '12',
    first_name: 'Juan Carlos',
    last_name: 'Gomez Ramirez',
    date_birth: '1985-09-22',
    gender: Gender.Male,
    zone: 'C',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '13',
    first_name: 'María Fernanda',
    last_name: 'López Perez',
    date_birth: '1990-03-15',
    gender: Gender.Female,
    zone: 'A',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '14',
    first_name: 'Pedro Antonio',
    last_name: 'Martinez Gonzalez',
    date_birth: '1982-11-30',
    gender: Gender.Male,
    zone: 'C',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '15',
    first_name: 'Ana Gabriela',
    last_name: 'Hernandez Sanchez',
    date_birth: '1987-07-18',
    gender: Gender.Female,
    zone: 'A',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '16',
    first_name: 'Diego Alejandro',
    last_name: 'Rodriguez Gomez',
    date_birth: '1993-04-04',
    gender: Gender.Male,
    zone: 'C',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '17',
    first_name: 'Elena Sofia',
    last_name: 'Perez Garcia',
    date_birth: '1989-10-12',
    gender: Gender.Female,
    zone: 'A',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '18',
    first_name: 'Andres Felipe',
    last_name: 'Gonzalez Martinez',
    date_birth: '1984-01-28',
    gender: Gender.Male,
    zone: 'B',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '19',
    first_name: 'Valentina',
    last_name: 'Lopez Rodriguez',
    date_birth: '1996-08-05',
    gender: Gender.Female,
    zone: 'A',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '20',
    first_name: 'Gabriel Alejandro',
    last_name: 'Gomez Perez',
    date_birth: '1988-12-19',
    gender: Gender.Male,
    zone: 'C',
    updated_by: 'Pepito Gomez'
  },
  {
    id: '21',
    first_name: 'Cristina',
    last_name: 'Hernandez Martinez',
    date_birth: '1991-05-26',
    gender: Gender.Female,
    zone: 'AB',
    updated_by: 'Pepito Gomez'
  },
];


export const pastors = [
  { label: 'Michael Rodrigo Terrones Meza', value: 'id1' },
  { label: 'Carlos Ramiro Rodriguez Perez', value: 'id2' },
  { label: 'Daniel Romero Ventura Paredes', value: 'id3' },
] as const;

export const copastors = [
  { label: 'Luz Maria Salgado Quito', value: 'id1' },
  { label: 'Mercedes Paula Pelayo Terrones', value: 'id2' },
  { label: 'Rosarios Agustina Rojas Prado', value: 'id3' },
] as const;

export const supervisors = [
  { label: 'Luz Maria Salgado Quito', value: 'id1' },
  { label: 'Mercedes Paula Pelayo Terrones', value: 'id2' },
  { label: 'Rosarios Agustina Rojas Prado', value: 'id3' },
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

export const disciples = [
  { label: 'Abigail Rosa Palacios Guerra', value: 'id1' },
  { label: 'Kevin Roberto Arteaga Moreno', value: 'id2' },
  { label: 'Luisa Sofia Castro Ramirez', value: 'id3' },
  { label: 'Roxana Teodosea Jaimes Jimenez', value: 'id4' },
  { label: 'Pamela Marcea Castro Perez', value: 'id5' },
  { label: 'Carlos Alberto Carranza Ramirez', value: 'id6' },
  { label: 'Karina Rosa Fajardo Jaimes', value: 'id7' },
  { label: 'Jairo Pedro Guitierrez Rojas', value: 'id8' },
] as const;

export const districts = [
  { label: 'Independencia', value: 'independencia' },
  { label: 'Puente-Piedra', value: 'puente_piedra' },
] as const;

export const months = [
  { label: 'Enero', value: 'january' },
  { label: 'Febrero', value: 'february' },
  { label: 'Marzo', value: 'march' },
  { label: 'Abril', value: 'april' },
  { label: 'Mayo', value: 'may' },
  { label: 'Junio', value: 'june' },
  { label: 'Julio', value: 'july' },
  { label: 'Agosto', value: 'august' },
  { label: 'Septiembre', value: 'september' },
  { label: 'Octubre', value: 'october' },
  { label: 'Noviembre', value: 'november' },
  { label: 'Diciembre', value: 'december' },
] as const;

export const years = [
  { label: '2024', value: '2024' },
  { label: '2025', value: '2025' },
  { label: '2026', value: '2026' },
] as const;