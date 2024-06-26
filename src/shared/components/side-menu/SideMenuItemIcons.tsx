import { NavLink } from 'react-router-dom';
import type { IconType } from 'react-icons';

interface Props {
  href: string;
  Icon: IconType;
  title: string;
  subTitle: string;
}

export const SideMenuItemIcons = ({ href, Icon }: Props): JSX.Element => {
  return (
    <NavLink key={href} to={href} end>
      <Icon className='text-[1.7rem] m-auto text-slate-300' />
    </NavLink>
  );
};
