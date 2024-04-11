import {
  UserCreatePage,
  UserDeletePage,
  UserUpdatePage,
  UsersGeneralSearchPage,
  UsersSearchPageByTerm,
} from '@/app/user/pages';

export const UserChildrenRoutes = [
  {
    path: '/users/create-user',
    element: <UserCreatePage />,
  },
  {
    path: '/users/search-users',
    element: <UsersGeneralSearchPage />,
  },
  {
    path: '/users/search-by-term-users',
    element: <UsersSearchPageByTerm />,
  },
  {
    path: '/users/update-user',
    element: <UserUpdatePage />,
  },
  {
    path: '/users/delete-user',
    element: <UserDeletePage />,
  },
];
