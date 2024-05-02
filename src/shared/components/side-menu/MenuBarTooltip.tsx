
import React from 'react';
import { 
TooltipContent,
Tooltip,
TooltipProvider,
TooltipTrigger 
} from '../ui/tooltip';

interface MenuBarItem {
    title: string
    [key: string]: any;
}

export const MenuBarTooltip: React.FC<{ children: any; item: MenuBarItem }> = ( { children , item } ) => {
  
  return(

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            { children }
          </TooltipTrigger>
          <TooltipContent >
            <p key={item.title}>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
  )
}