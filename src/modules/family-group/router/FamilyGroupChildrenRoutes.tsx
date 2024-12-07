import {
  FamilyGroupCreatePage,
  FamilyGroupUpdatePage,
  FamilyGroupInactivatePage,
  FamilyGroupsSearchPageByTerm,
  FamilyGroupsGeneralSearchPage,
} from '@/modules/family-group/pages';

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
