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
import { DisciplePage } from '@/pages/disciple/DisciplePage';
import { CreateDisciplePage } from '@/pages/disciple/CreateDisciplePage';
import { CreateUserPage } from '@/pages/user/CreateUserPage';
import { CreateFamilyHousePage } from '@/pages/family-house/CreateFamilyHousePage';
import { CreateOfferingPage } from '@/pages/offering/CreateOfferingPage';
import SearchDisciple from '@/pages/disciple/SearchDisciple';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      // dashboard and initial pages routes
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'disciples',
            element: <DisciplePage />,
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
      // routes disciple
      {
        path: '/disciples',
        element: <DashboardLayout />,
        children: [
          {
            path: '/disciples/create-disciple',
            element: <CreateDisciplePage />,
          },
          {
            path: '/disciples/search-disciple',
            element: <SearchDisciple />,
          },
        ],
      },
      // routes family-house
      {
        path: '/family-houses',
        element: <DashboardLayout />,
        children: [
          {
            path: '/family-houses/create-family-house',
            element: <CreateFamilyHousePage />,
          },
        ],
      },
      // routes offering
      {
        path: '/offerings',
        element: <DashboardLayout />,
        children: [
          {
            path: '/offerings/create-offering',
            element: <CreateOfferingPage />,
          },
        ],
      },
      // routes user
      {
        path: '/users',
        element: <DashboardLayout />,
        children: [
          {
            path: '/users/create-user',
            element: <CreateUserPage />,
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
