import {
  ZoneDeletePage,
  ZoneUpdatePage,
  ZoneCreatePage,
  ZonesSearchPageByTerm,
  ZonesGeneralSearchPage,
} from '@/modules/zone/pages';

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
    path: '/zones/delete',
    element: <ZoneDeletePage />,
  },
];
