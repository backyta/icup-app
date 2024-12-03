import {
  SupervisorCreatePage,
  SupervisorInactivatePage,
  SupervisorUpdatePage,
  SupervisorsSearchPageByTerm,
  SupervisorsGeneralSearchPage,
} from '@/modules/supervisor/pages';

export const SupervisorChildrenRoutes = [
  {
    path: '/supervisors/create',
    element: <SupervisorCreatePage />,
  },
  {
    path: '/supervisors/general-search',
    element: <SupervisorsGeneralSearchPage />,
  },
  {
    path: '/supervisors/search-by-term',
    element: <SupervisorsSearchPageByTerm />,
  },
  {
    path: '/supervisors/update',
    element: <SupervisorUpdatePage />,
  },
  {
    path: '/supervisors/inactivate',
    element: <SupervisorInactivatePage />,
  },
];
