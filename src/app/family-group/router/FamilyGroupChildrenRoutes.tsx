import {
  FamilyGroupCreatePage,
  FamilyGroupDeletePage,
  FamilyGroupsGeneralSearchPage,
  FamilyGroupsSearchPageByTerm,
  FamilyGroupUpdatePage,
} from '@/app/family-group/pages';

export const FamilyGroupChildrenRoutes = [
  {
    path: '/family-groups/create-family-group',
    element: <FamilyGroupCreatePage />,
  },
  {
    path: '/family-groups/search-family-groups',
    element: <FamilyGroupsGeneralSearchPage />,
  },
  {
    path: '/family-groups/search-family-groups-by-term',
    element: <FamilyGroupsSearchPageByTerm />,
  },
  {
    path: '/family-groups/update-family-group',
    element: <FamilyGroupUpdatePage />,
  },
  {
    path: '/family-groups/delete-family-group',
    element: <FamilyGroupDeletePage />,
  },
];
