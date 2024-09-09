import {
  CopastorUpdatePage,
  CopastorCreatePage,
  CopastorDeletePage,
  CopastorsSearchPageByTerm,
  CopastorsGeneralSearchPage,
} from '@/modules/copastor/pages';

export const CopastorChildrenRoutes = [
  {
    path: '/copastors/create',
    element: <CopastorCreatePage />,
  },
  {
    path: '/copastors/general-search',
    element: <CopastorsGeneralSearchPage />,
  },
  {
    path: '/copastors/search-by-term',
    element: <CopastorsSearchPageByTerm />,
  },
  {
    path: '/copastors/update',
    element: <CopastorUpdatePage />,
  },
  {
    path: '/copastors/delete',
    element: <CopastorDeletePage />,
  },
];
