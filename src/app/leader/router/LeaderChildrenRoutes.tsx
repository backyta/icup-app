import { MemberCreatePage } from '@/shared/pages';
import {
  LeaderDeletePage,
  LeadersGeneralSearchPage,
  LeadersSearchPageByTerm,
  LeaderUpdatePage,
} from '@/app/leader/pages';

export const LeaderChildrenRoutes = [
  {
    path: '/leaders/create-leader',
    element: <MemberCreatePage />,
  },
  {
    path: '/leaders/search-leaders',
    element: <LeadersGeneralSearchPage />,
  },
  {
    path: '/leaders/search-by-term-leaders',
    element: <LeadersSearchPageByTerm />,
  },
  {
    path: '/leaders/update-leader',
    element: <LeaderUpdatePage />,
  },
  {
    path: '/leaders/delete-leader',
    element: <LeaderDeletePage />,
  },
];
