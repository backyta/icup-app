import {
  SupervisorCreatePage,
  SupervisorDeletePage,
  SupervisorUpdatePage,
  SupervisorsSearchPageByTerm,
  SupervisorsGeneralSearchPage,
} from '@/modules/supervisor/pages';

export const SupervisorChildrenRoutes = [
  {
    path: '/supervisors/create-supervisor',
    element: <SupervisorCreatePage />,
  },
  {
    path: '/supervisors/search-supervisors',
    element: <SupervisorsGeneralSearchPage />,
  },
  {
    path: '/supervisors/search-supervisors-by-term',
    element: <SupervisorsSearchPageByTerm />,
  },
  {
    path: '/supervisors/update-supervisor',
    element: <SupervisorUpdatePage />,
  },
  {
    path: '/supervisors/delete-supervisor',
    element: <SupervisorDeletePage />,
  },
];
