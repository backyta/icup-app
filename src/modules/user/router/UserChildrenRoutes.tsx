import { UserCreatePage } from '@/modules/user/pages/UserCreatePage';
import { UserUpdatePage } from '@/modules/user/pages/UserUpdatePage';
import { UserInactivatePage } from '@/modules/user/pages/UserInactivatePage';
import { UsersSearchPageByTerm } from '@/modules/user/pages/UsersSearchPageByTerm';
import { UsersGeneralSearchPage } from '@/modules/user/pages/UsersGeneralSearchPage';

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
