import type { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

interface Props {
  href: string;
  Icon: IconType;
  title: string;
  subTitle: string;
}

export const SideMenuItem = ({
  href,
  Icon,
  title,
  subTitle,
}: Props): JSX.Element => {
  return (
    <NavLink key={href} to={href} end>
      <div>
        <Icon className='text-2xl' />
      </div>
      <div className='flex flex-col space-y-1'>
        <span className='text-lg lg:text-lg xl:text-xl font-bold leading-5 text-white'>
          {title}
        </span>
        <span className='text-sm text-white/70 hidden md:block'>
          {subTitle}
        </span>
      </div>
    </NavLink>
  );
};
