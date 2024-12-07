import {
  UserCreatePage,
  UserInactivatePage,
  UserUpdatePage,
  UsersSearchPageByTerm,
  UsersGeneralSearchPage,
} from '@/modules/user/pages';

export const UserChildrenRoutes = [
  {
    path: '/users/create',
    element: <UserCreatePage />,
  },
  {
    path: '/users/general-search',
    element: <UsersGeneralSearchPage />,
  },
  {
    path: '/users/search-by-term',
    element: <UsersSearchPageByTerm />,
  },
  {
    path: '/users/update',
    element: <UserUpdatePage />,
  },
  {
    path: '/users/inactivate',
    element: <UserInactivatePage />,
  },
];
