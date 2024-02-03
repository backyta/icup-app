import { createBrowserRouter } from 'react-router-dom';

import { Root } from '../Root';


import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Dashboard } from '@/pages/dashboard/DashboardPage';


export const router = createBrowserRouter( [
  {
    path: '/',
    element: <Root />,
    children: [
      /// Dashboard Routes
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <Dashboard />
          },
          // {
          //   path: 'pastors',
          //   element: <PastorPage />
          // },
          // {
          //   path: 'copastors',
          //   element: <CopastorPage />
          // },
          // {
          //   path: 'preachers',
          //   element: <PreacherPage />
          // },
          // {
          //   path: 'family-house',
          //   element: <FamilyHousePage />
          // },
          // {
          //   path: 'offeings',
          //   element: <OfrendasPage />
          // },
          // {
          //   path: 'users',
          //   element: <UsersPage />
          // }

        ]
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
] );