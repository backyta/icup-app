import { createBrowserRouter } from 'react-router-dom';

import { Root } from '@/Root';
import { RedirectIfMatch } from '@/router';
import { DashboardLayout, AuthLayout } from '@/layouts';

// ?  Direct pages
//* Members
import { DashboardPage } from '@/app/dashboard/pages';
import { ChurchOptionsPage } from '@/app/church/pages';
import { PastorOptionsPage } from '@/app/pastor/pages';
import { CopastorOptionsPage } from '@/app/copastor/pages';
import { SupervisorOptionsPage } from '@/app/supervisor/pages';
import { PreacherOptionsPage } from '@/app/preacher/pages';
import { DiscipleOptionsPage } from '@/app/disciple/pages';
//* Family groups and zones
import { FamilyGroupOptionsPage } from '@/app/family-group/pages';
import { ZoneOptionsPage } from '@/app/zone/pages';
//* Offerings
import { OfferingOptionsPage } from '@/app/offering/pages';
import { OfferingIncomeOptionsPage } from '@/app/offering/income/pages';
import { OfferingExpensesOptionsPage } from '@/app/offering/expenses/pages';
//* Metrics and charts
import { MetricsOptionsPage } from '@/app/metrics/pages';
//* Users
import { UserOptionsPage } from '@/app/user/pages';

// ? Routers by module
//* Members
import { ChurchChildrenRoutes } from '@/app/church/router';
import { PastorChildrenRoutes } from '@/app/pastor/router';
import { CopastorChildrenRoutes } from '@/app/copastor/router';
import { SupervisorChildrenRoutes } from '@/app/supervisor/router';
import { PreacherChildrenRoutes } from '@/app/preacher/router';
import { DiscipleChildrenRoutes } from '@/app/disciple/router';
//* Family groups and zones
import { FamilyGroupChildrenRoutes } from '@/app/family-group/router';
import { ZoneChildrenRoutes } from '@/app/zone/router';
//* Offering
import { OfferingIncomeChildrenRoutes } from '@/app/offering/income/router';
import { OfferingExpensesChildrenRoutes } from '@/app/offering/expenses/router';
//* Metrics and charts
import { MetricsChildrenRoutes } from '@/app/metrics/router';
//* Users
import { UserChildrenRoutes } from '@/app/user/router';
//* Auth
import { AuthChildrenRoutes } from '@/auth/router';

//* NotFound page
import { NotFoundPage } from '@/pages';

// ? Browser router
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          // * Main pages by module
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/churches', element: <ChurchOptionsPage /> },
          { path: '/pastors', element: <PastorOptionsPage /> },
          { path: '/copastors', element: <CopastorOptionsPage /> },
          { path: '/supervisors', element: <SupervisorOptionsPage /> },
          { path: '/preachers', element: <PreacherOptionsPage /> },
          { path: '/disciples', element: <DiscipleOptionsPage /> },
          { path: '/family-groups', element: <FamilyGroupOptionsPage /> },
          { path: '/zones', element: <ZoneOptionsPage /> },
          { path: '/offerings', element: <OfferingOptionsPage /> },
          { path: '/offerings/income', element: <OfferingIncomeOptionsPage /> },
          { path: '/offerings/expenses', element: <OfferingExpensesOptionsPage /> },
          { path: '/metrics', element: <MetricsOptionsPage /> },
          { path: '/users', element: <UserOptionsPage /> },
        ],
      },

      // ? Children routes and pages by module
      //* Members
      { path: '/churches', element: <DashboardLayout />, children: ChurchChildrenRoutes },
      { path: '/disciples', element: <DashboardLayout />, children: DiscipleChildrenRoutes },
      { path: '/pastors', element: <DashboardLayout />, children: PastorChildrenRoutes },
      { path: '/copastors', element: <DashboardLayout />, children: CopastorChildrenRoutes },
      { path: '/supervisors', element: <DashboardLayout />, children: SupervisorChildrenRoutes },
      { path: '/preachers', element: <DashboardLayout />, children: PreacherChildrenRoutes },
      { path: '/family-groups', element: <DashboardLayout />, children: FamilyGroupChildrenRoutes },
      { path: '/zones', element: <DashboardLayout />, children: ZoneChildrenRoutes },

      //* Offering income
      {
        path: '/offerings/income',
        element: <DashboardLayout />,
        children: OfferingIncomeChildrenRoutes,
      },

      //* Offering expenses
      {
        path: '/offerings/expenses',
        element: <DashboardLayout />,
        children: OfferingExpensesChildrenRoutes,
      },

      //* Users
      { path: '/users', element: <DashboardLayout />, children: UserChildrenRoutes },

      //* Metrics and charts
      { path: '/metrics', element: <DashboardLayout />, children: MetricsChildrenRoutes },

      //* Auth
      { path: '/auth', element: <AuthLayout />, children: AuthChildrenRoutes },
    ],
  },
  {
    path: '*',
    element: <RedirectIfMatch />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
]);
