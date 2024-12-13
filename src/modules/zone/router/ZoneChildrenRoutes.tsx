import { ZoneUpdatePage } from '@/modules/zone/pages/ZoneUpdatePage';
import { ZoneCreatePage } from '@/modules/zone/pages/ZoneCreatePage';
import { ZoneInactivatePage } from '@/modules/zone/pages/ZoneInactivatePage';
import { ZonesSearchPageByTerm } from '@/modules/zone/pages/ZonesSearchPageByTerm';
import { ZonesGeneralSearchPage } from '@/modules/zone/pages/ZonesGeneralSearchPage';

export const ZoneChildrenRoutes = [
  {
    path: '/zones/create',
    element: <ZoneCreatePage />,
  },
  {
    path: '/zones/general-search',
    element: <ZonesGeneralSearchPage />,
  },
  {
    path: '/zones/search-by-term',
    element: <ZonesSearchPageByTerm />,
  },
  {
    path: '/zones/update',
    element: <ZoneUpdatePage />,
  },
  {
    path: '/zones/inactivate',
    element: <ZoneInactivatePage />,
  },
];
