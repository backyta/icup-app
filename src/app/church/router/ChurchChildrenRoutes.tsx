import {
  ChurchCreatePage,
  ChurchDeletePage,
  ChurchGeneralSearchPage,
  ChurchSearchPageByTerm,
  ChurchUpdatePage,
} from '@/app/church/pages';

export const ChurchChildrenRoutes = [
  {
    path: '/churches/create-church',
    element: <ChurchCreatePage />,
  },
  {
    path: '/churches/search-churches',
    element: <ChurchGeneralSearchPage />,
  },
  {
    path: '/churches/search-by-term-churches',
    element: <ChurchSearchPageByTerm />,
  },
  {
    path: '/churches/update-church',
    element: <ChurchUpdatePage />,
  },
  {
    path: '/churches/delete-church',
    element: <ChurchDeletePage />,
  },
];
