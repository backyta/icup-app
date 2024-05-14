import type React from 'react';

import { type IconType } from 'react-icons';
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

interface MenuBarItem {
  title: string;
  subTitle: string;
  href: string;
  Icon: IconType;
}

interface Props {
  children: React.ReactNode;
  item: MenuBarItem;
}

export const MenuBarTooltip = ({ children, item }: Props): JSX.Element => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p key={item.title}>{item.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
