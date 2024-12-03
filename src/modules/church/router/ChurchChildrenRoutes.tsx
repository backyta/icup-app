import {
  ChurchUpdatePage,
  ChurchCreatePage,
  ChurchInactivatePage,
  ChurchesSearchPageByTerm,
  ChurchesGeneralSearchPage,
} from '@/modules/church/pages';

export const ChurchChildrenRoutes = [
  {
    path: '/churches/create',
    element: <ChurchCreatePage />,
  },
  {
    path: '/churches/general-search',
    element: <ChurchesGeneralSearchPage />,
  },
  {
    path: '/churches/search-by-term',
    element: <ChurchesSearchPageByTerm />,
  },
  {
    path: '/churches/update',
    element: <ChurchUpdatePage />,
  },
  {
    path: '/churches/inactivate',
    element: <ChurchInactivatePage />,
  },
];
