
import { FcBullish, FcHome, FcConferenceCall, FcPodiumWithSpeaker, FcBusinesswoman, FcLike, FcReadingEbook   } from "react-icons/fc";
import { type MenuItem } from "../interfaces/menu-items.interface";

export const menuItems: MenuItem[] = [
  { title: 'Panel de Control', subTitle: 'Visualizar data general', href: '/dashboard', Icon: FcBullish },
  { title: 'Pastores', subTitle: 'Modulo de Pastores', href: '/pastors', Icon: FcPodiumWithSpeaker },
  { title: 'Co-Pastores', subTitle: 'Modulo de Co-Pastores', href: '/copastors', Icon: FcBusinesswoman },
  { title: 'Lideres', subTitle: 'Modulo de Lideres', href: '/leaders', Icon: FcConferenceCall },
  { title: 'Casas Familiares', subTitle: 'Modulo de Casas Familiares', href: '/family-houses', Icon: FcHome },
  { title: 'Ofrendas', subTitle: 'Modulo de Ofrendas', href: '/offerings', Icon: FcLike },
  { title: 'Usuarios', subTitle: 'Modulo de usuarios', href: '/users', Icon: FcReadingEbook },
];

