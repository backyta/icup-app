import { FamilyGroupCreatePage } from '@/modules/family-group/pages/FamilyGroupCreatePage';
import { FamilyGroupUpdatePage } from '@/modules/family-group/pages/FamilyGroupUpdatePage';
import { FamilyGroupInactivatePage } from '@/modules/family-group/pages/FamilyGroupInactivatePage';
import { FamilyGroupsSearchPageByTerm } from '@/modules/family-group/pages/FamilyGroupsSearchPageByTerm';
import { FamilyGroupsGeneralSearchPage } from '@/modules/family-group/pages/FamilyGroupsGeneralSearchPage';

export const FamilyGroupChildrenRoutes = [
  {
    path: '/family-groups/create',
    element: <FamilyGroupCreatePage />,
  },
  {
    path: '/family-groups/general-search',
    element: <FamilyGroupsGeneralSearchPage />,
  },
  {
    path: '/family-groups/search-by-term',
    element: <FamilyGroupsSearchPageByTerm />,
  },
  {
    path: '/family-groups/update',
    element: <FamilyGroupUpdatePage />,
  },
  {
    path: '/family-groups/inactivate',
    element: <FamilyGroupInactivatePage />,
  },
];
