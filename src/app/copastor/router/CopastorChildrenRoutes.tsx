import {
  CopastorCreatePage,
  CopastorDeletePage,
  CopastorsGeneralSearchPage,
  CopastorsSearchPageByTerm,
  CopastorUpdatePage,
} from '@/app/copastor/pages';

export const CopastorChildrenRoutes = [
  {
    path: '/copastors/create-copastor',
    element: <CopastorCreatePage />,
  },
  {
    path: '/copastors/search-copastors',
    element: <CopastorsGeneralSearchPage />,
  },
  {
    path: '/copastors/search-copastors-by-term',
    element: <CopastorsSearchPageByTerm />,
  },
  {
    path: '/copastors/update-copastor',
    element: <CopastorUpdatePage />,
  },
  {
    path: '/copastors/delete-copastor',
    element: <CopastorDeletePage />,
  },
];
