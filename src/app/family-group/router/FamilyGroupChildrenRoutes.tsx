import {
  FamilyGroupCreatePage,
  FamilyGroupDeletePage,
  FamilyGroupGeneralSearchPage,
  FamilyGroupSearchPageByTerm,
  FamilyGroupUpdatePage,
} from '@/app/family-group/pages';

export const FamilyGroupChildrenRoutes = [
  {
    path: '/family-groups/create-family-group',
    element: <FamilyGroupCreatePage />,
  },
  {
    path: '/family-groups/search-family-groups',
    element: <FamilyGroupGeneralSearchPage />,
  },
  {
    path: '/family-groups/search-by-term-family-groups',
    element: <FamilyGroupSearchPageByTerm />,
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
