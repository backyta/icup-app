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
import { OfferingIncomeOptionsPage } from '@/app/offering/income/pages';
import { OfferingExpensesOptionsPage } from '@/app/offering/expenses/pages';
import { UserOptionsPage } from '@/app/user/pages';

// routers by module
import { DiscipleChildrenRoutes } from '@/app/disciple/router';
import { PastorChildrenRoutes } from '@/app/pastor/router';
import { CopastorChildrenRoutes } from '@/app/copastor/router';
import { LeaderChildrenRoutes } from '@/app/leader/router';
import { FamilyHouseChildrenRoutes } from '@/app/family-house/router';
import { OfferingIncomeChildrenRoutes } from '@/app/offering/income/router';
import { OfferingExpensesChildrenRoutes } from '@/app/offering/expenses/router';
import { UserChildrenRoutes } from '@/app/user/router';

import { Root } from '@/Root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          // Main modules pages
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/disciples', element: <DiscipleOptionsPage /> },
          { path: '/pastors', element: <PastorOptionsPage /> },
          { path: '/copastors', element: <CopastorOptionsPage /> },
          { path: '/leaders', element: <LeaderOptionsPage /> },
          { path: '/family-houses', element: <FamilyHouseOptionsPage /> },
          { path: '/offerings', element: <OfferingOptionsPage /> },
          { path: '/offerings/income', element: <OfferingIncomeOptionsPage /> },
          { path: '/offerings/expenses', element: <OfferingExpensesOptionsPage /> },
          { path: '/users', element: <UserOptionsPage /> },
        ],
      },
      // Specific routes for each type of module
      { path: '/disciples', element: <DashboardLayout />, children: DiscipleChildrenRoutes },
      { path: '/pastors', element: <DashboardLayout />, children: PastorChildrenRoutes },
      { path: '/copastors', element: <DashboardLayout />, children: CopastorChildrenRoutes },
      { path: '/leaders', element: <DashboardLayout />, children: LeaderChildrenRoutes },
      { path: '/family-houses', element: <DashboardLayout />, children: FamilyHouseChildrenRoutes },

      // Routes offering (income)
      {
        path: '/offerings/income',
        element: <DashboardLayout />,
        children: OfferingIncomeChildrenRoutes,
      },

      // Routes offering (expenses)
      {
        path: '/offerings/expenses',
        element: <DashboardLayout />,
        children: OfferingExpensesChildrenRoutes,
      },

      // Routes user
      { path: '/users', element: <DashboardLayout />, children: UserChildrenRoutes },

      /// Auth Routes
      // TODO 2 : Crear ruta para auth/login con su layout y login page
    ],
  },
]);
