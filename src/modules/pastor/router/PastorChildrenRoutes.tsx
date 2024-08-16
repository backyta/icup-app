import {
  PastorUpdatePage,
  PastorCreatePage,
  PastorDeletePage,
  PastorsSearchPageByTerm,
  PastorsGeneralSearchPage,
} from '@/modules/pastor/pages';

export const PastorChildrenRoutes = [
  {
    path: '/pastors/create-pastor',
    element: <PastorCreatePage />,
  },
  {
    path: '/pastors/search-pastors',
    element: <PastorsGeneralSearchPage />,
  },
  {
    path: '/pastors/search-pastors-by-term',
    element: <PastorsSearchPageByTerm />,
  },
  {
    path: '/pastors/update-pastor',
    element: <PastorUpdatePage />,
  },
  {
    path: '/pastors/delete-pastor',
    element: <PastorDeletePage />,
  },
];
