import { createBrowserRouter } from 'react-router-dom';

// direct pages
import { DashboardLayout } from '@/layouts';
import { DashboardPage } from '@/app/dashboard/pages';
import { DiscipleOptionsPage } from '@/app/disciple/pages';
import { PastorOptionsPage } from '@/app/pastor/pages';
import { CopastorOptionsPage } from '@/app/copastor/pages';
import { LeaderOptionsPage } from '@/app/leader/pages';
import { FamilyHouseOptionsPage } from '@/app/family-house/pages';
import { OfferingOptionsPage } from '@/app/offering/pages';
import { UserOptionsPage } from '@/app/user/pages';

// routers by module
import { DiscipleChildrenRoutes } from '@/app/disciple/router';
import { PastorChildrenRoutes } from '@/app/pastor/router';
import { CopastorChildrenRoutes } from '@/app/copastor/router';
import { LeaderChildrenRoutes } from '@/app/leader/router';
import { FamilyHouseChildrenRoutes } from '@/app/family-house/router';
import { OfferingChildrenRoutes } from '@/app/offering/router';
import { UserChildrenRoutes } from '@/app/user/router';
import { Root } from '@/Root';

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
            element: <DiscipleOptionsPage />,
          },
          {
            path: 'pastors',
            element: <PastorOptionsPage />,
          },
          {
            path: 'copastors',
            element: <CopastorOptionsPage />,
          },
          {
            path: 'leaders',
            element: <LeaderOptionsPage />,
          },
          {
            path: 'family-houses',
            element: <FamilyHouseOptionsPage />,
          },
          {
            path: 'offerings',
            element: <OfferingOptionsPage />,
          },
          {
            path: 'users',
            element: <UserOptionsPage />,
          },
        ],
      },
      // routes disciple
      {
        path: '/disciples',
        element: <DashboardLayout />,
        children: DiscipleChildrenRoutes,
      },
      // routes pastor
      {
        path: '/pastors',
        element: <DashboardLayout />,
        children: PastorChildrenRoutes,
      },
      // routes co-pastor
      {
        path: '/copastors',
        element: <DashboardLayout />,
        children: CopastorChildrenRoutes,
      },
      // routes leader
      {
        path: '/leaders',
        element: <DashboardLayout />,
        children: LeaderChildrenRoutes,
      },
      // routes family-house
      {
        path: '/family-houses',
        element: <DashboardLayout />,
        children: FamilyHouseChildrenRoutes,
      },
      // routes offering
      {
        path: '/offerings',
        element: <DashboardLayout />,
        children: OfferingChildrenRoutes,
      },
      // routes user
      {
        path: '/users',
        element: <DashboardLayout />,
        children: UserChildrenRoutes,
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
