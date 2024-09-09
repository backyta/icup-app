import {
  DiscipleCreatePage,
  DiscipleUpdatePage,
  DiscipleDeletePage,
  DisciplesSearchPageByTerm,
  DisciplesGeneralSearchPage,
} from '@/modules/disciple/pages';

export const DiscipleChildrenRoutes = [
  {
    path: '/disciples/create',
    element: <DiscipleCreatePage />,
  },
  {
    path: '/disciples/general-search',
    element: <DisciplesGeneralSearchPage />,
  },
  {
    path: '/disciples/search-by-term',
    element: <DisciplesSearchPageByTerm />,
  },
  {
    path: '/disciples/update',
    element: <DiscipleUpdatePage />,
  },
  {
    path: '/disciples/delete',
    element: <DiscipleDeletePage />,
  },
];
