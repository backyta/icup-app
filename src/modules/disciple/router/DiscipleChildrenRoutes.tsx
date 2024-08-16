import {
  DiscipleCreatePage,
  DiscipleUpdatePage,
  DiscipleDeletePage,
  DisciplesSearchPageByTerm,
  DisciplesGeneralSearchPage,
} from '@/modules/disciple/pages';

export const DiscipleChildrenRoutes = [
  {
    path: '/disciples/create-disciple',
    element: <DiscipleCreatePage />,
  },
  {
    path: '/disciples/search-disciples',
    element: <DisciplesGeneralSearchPage />,
  },
  {
    path: '/disciples/search-disciples-by-term',
    element: <DisciplesSearchPageByTerm />,
  },
  {
    path: '/disciples/update-disciple',
    element: <DiscipleUpdatePage />,
  },
  {
    path: '/disciples/delete-disciple',
    element: <DiscipleDeletePage />,
  },
];
