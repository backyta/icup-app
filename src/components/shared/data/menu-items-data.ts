
import { FcBullish, FcHome, FcConferenceCall, FcPodiumWithSpeaker, FcBusinesswoman, FcLike, FcReadingEbook   } from "react-icons/fc";
import { MenuItem } from "../interfaces/menu-items.interface";

export const menuItems: MenuItem[] = [
  { title: 'Dashboard', subTitle: 'Visualizar data general', href: '/dashboard', Icon: FcBullish },
  { title: 'Pastores', subTitle: 'Modulo de Pastores', href: '/dashboard/bears', Icon: FcPodiumWithSpeaker },
  { title: 'Co-Pastores', subTitle: 'Modulo de Co-Pastores', href: '/dashboard/person', Icon: FcBusinesswoman },
  { title: 'Lideres', subTitle: 'Modulo de Lideres', href: '/dashboard/tasks', Icon: FcConferenceCall },
  { title: 'Casas Familiares', subTitle: 'Modulo de Casas Familiares', href: '/dashboard/tasks', Icon: FcHome },
  { title: 'Ofrendas', subTitle: 'Modulo de Ofrendas', href: '/dashboard/wedding-invitation', Icon: FcLike },
  { title: 'Usuarios', subTitle: 'Modulo de usuarios', href: '/dashboard/wedding-invitation', Icon: FcReadingEbook },
];