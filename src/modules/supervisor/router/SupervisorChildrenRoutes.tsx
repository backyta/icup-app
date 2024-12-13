import { SupervisorUpdatePage } from '@/modules/supervisor/pages/SupervisorUpdatePage';
import { SupervisorCreatePage } from '@/modules/supervisor/pages/SupervisorCreatePage';
import { SupervisorInactivatePage } from '@/modules/supervisor/pages/SupervisorInactivatePage';
import { SupervisorsSearchPageByTerm } from '@/modules/supervisor/pages/SupervisorsSearchPageByTerm';
import { SupervisorsGeneralSearchPage } from '@/modules/supervisor/pages/SupervisorsGeneralSearchPage';

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
