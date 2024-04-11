import { MemberCreatePage } from '@/shared/pages';
import {
  DiscipleDeletePage,
  DisciplesGeneralSearchPage,
  DisciplesSearchPageByTerm,
  DiscipleUpdatePage,
} from '@/app/disciple/pages';

export const DiscipleChildrenRoutes = [
  {
    path: '/disciples/create-disciple',
    element: <MemberCreatePage />,
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
