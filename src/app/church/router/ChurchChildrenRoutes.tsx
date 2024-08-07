import {
  ChurchCreatePage,
  ChurchDeletePage,
  ChurchesGeneralSearchPage,
  ChurchesSearchPageByTerm,
  ChurchUpdatePage,
} from '@/app/church/pages';

export const ChurchChildrenRoutes = [
  {
    path: '/churches/create-church',
    element: <ChurchCreatePage />,
  },
  {
    path: '/churches/search-churches',
    element: <ChurchesGeneralSearchPage />,
  },
  {
    path: '/churches/search-churches-by-term',
    element: <ChurchesSearchPageByTerm />,
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
