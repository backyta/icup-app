import {
  PastorUpdatePage,
  PastorCreatePage,
  PastorInactivatePage,
  PastorsSearchPageByTerm,
  PastorsGeneralSearchPage,
} from '@/modules/pastor/pages';

export const PastorChildrenRoutes = [
  {
    path: '/pastors/create',
    element: <PastorCreatePage />,
  },
  {
    path: '/pastors/general-search',
    element: <PastorsGeneralSearchPage />,
  },
  {
    path: '/pastors/search-by-term',
    element: <PastorsSearchPageByTerm />,
  },
  {
    path: '/pastors/update',
    element: <PastorUpdatePage />,
  },
  {
    path: '/pastors/inactivate',
    element: <PastorInactivatePage />,
  },
];
