import { type MenuItem } from '@/shared/interfaces';
import { 
  FcBullish, 
  FcHome, 
  FcConferenceCall,
  FcSportsMode, 
  FcPodiumWithSpeaker, 
  FcBusinesswoman, 
  FcLike, 
  FcReadingEbook , 
  FcStatistics
  } from 'react-icons/fc';

import { PiChurch } from "react-icons/pi";

export const menuItems: MenuItem[] = [
  { title: 'Panel de Control', subTitle: 'Resumen semanal general', href: '/dashboard', Icon: FcBullish },
  { title: 'Iglesias', subTitle: 'Módulos de Iglesias', href: '/churches', Icon: PiChurch },
  { title: 'Discípulos', subTitle: 'Modulo de Discípulos', href: '/disciples', Icon: FcSportsMode  },
  { title: 'Pastores', subTitle: 'Modulo de Pastores', href: '/pastors', Icon: FcPodiumWithSpeaker },
  { title: 'Co-Pastores', subTitle: 'Modulo de Co-Pastores', href: '/copastors', Icon: FcBusinesswoman },
  { title: 'Lideres', subTitle: 'Modulo de Lideres', href: '/leaders', Icon: FcConferenceCall },
  { title: 'Casas Familiares', subTitle: 'Modulo de Casas Familiares', href: '/family-houses', Icon: FcHome },
  { title: 'Ofrendas', subTitle: 'Modulo de Ofrendas', href: '/offerings', Icon: FcLike },
  { title: 'Usuarios', subTitle: 'Modulo de Usuarios', href: '/users', Icon: FcReadingEbook },
  { title: 'Métricas y Estadísticas', subTitle: 'Modulo de Métricas', href: '/metrics', Icon: FcStatistics },
];