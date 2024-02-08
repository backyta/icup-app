import { createBrowserRouter } from 'react-router-dom';

import { Root } from '../Root';

import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { PastorPage } from '@/pages/pastor/PastorPage';
import { CopastorPage } from '@/pages/copastor/CopastorPage';
import { LeaderPage } from '@/pages/leader/LeaderPage';
import { FamilyHousePage } from '@/pages/family-house/FamilyHousePage';
import { OfferingPage } from '@/pages/offering/OfferingPage';
import { UserPage } from '@/pages/user/UserPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      /// Dashboard Routes
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'pastors',
            element: <PastorPage />,
          },
          {
            path: 'copastors',
            element: <CopastorPage />,
          },
          {
            path: 'leaders',
            element: <LeaderPage />,
          },
          {
            path: 'family-houses',
            element: <FamilyHousePage />,
          },
          {
            path: 'offerings',
            element: <OfferingPage />,
          },
          {
            path: 'users',
            element: <UserPage />,
          },
        ],
      },

      /// Auth Routes
      // {
      //   path: 'auth',
      //   element: <AuthLayout />,
      //   children: [
      //     {
      //       path: 'login',
      //       element: <LoginPage />
      //     }
      //   ]

      // },
    ],
  },
]);
