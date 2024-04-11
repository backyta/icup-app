import {
  FamilyHouseCreatePage,
  FamilyHouseDeletePage,
  FamilyHousesGeneralSearchPage,
  FamilyHousesSearchPageByTerm,
  FamilyHouseUpdatePage,
} from '@/app/family-house/pages';

export const FamilyHouseChildrenRoutes = [
  {
    path: '/family-houses/create-family-house',
    element: <FamilyHouseCreatePage />,
  },
  {
    path: '/family-houses/search-family-houses',
    element: <FamilyHousesGeneralSearchPage />,
  },
  {
    path: '/family-houses/search-by-term-family-houses',
    element: <FamilyHousesSearchPageByTerm />,
  },
  {
    path: '/family-houses/update-family-house',
    element: <FamilyHouseUpdatePage />,
  },
  {
    path: '/family-houses/delete-family-house',
    element: <FamilyHouseDeletePage />,
  },
];
