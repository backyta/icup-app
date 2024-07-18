import {
  DiscipleCreatePage,
  DiscipleDeletePage,
  DisciplesGeneralSearchPage,
  DisciplesSearchPageByTerm,
  DiscipleUpdatePage,
} from '@/app/disciple/pages';

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
    path: '/disciples/search-by-term-disciples',
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
