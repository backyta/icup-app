import { createBrowserRouter } from 'react-router-dom';

import { Root } from '@/Root';
import { RedirectIfMatch } from '@/router/RedirectIfMatch';

import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';

// ?  Direct pages
//* Members
import { DashboardPage } from '@/modules/dashboard/pages/DashboardPage';
import { ChurchOptionsPage } from '@/modules/church/pages/ChurchOptionsPage';
import { PastorOptionsPage } from '@/modules/pastor/pages/PastorOptionsPage';
import { CopastorOptionsPage } from '@/modules/copastor/pages/CopastorOptionsPage';
import { DiscipleOptionsPage } from '@/modules/disciple/pages/DiscipleOptionsPage';
import { PreacherOptionsPage } from '@/modules/preacher/pages/PreacherOptionsPage';
import { SupervisorOptionsPage } from '@/modules/supervisor/pages/SupervisorOptionsPage';

//* Family groups and zones
import { ZoneOptionsPage } from '@/modules/zone/pages/ZoneOptionsPage';
import { FamilyGroupOptionsPage } from '@/modules/family-group/pages/FamilyGroupOptionsPage';

//* Offerings
import { OfferingOptionsPage } from '@/modules/offering/shared/pages/OfferingOptionsPage';
import { OfferingIncomeOptionsPage } from '@/modules/offering/income/pages/OfferingIncomeOptionsPage';
import { OfferingExpenseOptionsPage } from '@/modules/offering/expense/pages/OfferingExpenseOptionsPage';

//* Metrics and charts
import { MetricsOptionsPage } from '@/modules/metrics/pages/MetricsOptionsPage';

//* Users
import { UserOptionsPage } from '@/modules/user/pages/UserOptionsPage';

// ? Routers by module
//* Members
import { ChurchChildrenRoutes } from '@/modules/church/router/ChurchChildrenRoutes';
import { PastorChildrenRoutes } from '@/modules/pastor/router/PastorChildrenRoutes';
import { CopastorChildrenRoutes } from '@/modules/copastor/router/CopastorChildrenRoutes';
import { PreacherChildrenRoutes } from '@/modules/preacher/router/PreacherChildrenRoutes';
import { DiscipleChildrenRoutes } from '@/modules/disciple/router/DiscipleChildrenRoutes';
import { SupervisorChildrenRoutes } from '@/modules/supervisor/router/SupervisorChildrenRoutes';

//* Family groups and zones
import { ZoneChildrenRoutes } from '@/modules/zone/router/ZoneChildrenRoutes';
import { FamilyGroupChildrenRoutes } from '@/modules/family-group/router/FamilyGroupChildrenRoutes';

//* Offering
import { OfferingIncomeChildrenRoutes } from '@/modules/offering/income/router/OfferingIncomeChildrenRoutes';
import { OfferingExpenseChildrenRoutes } from '@/modules/offering/expense/router/OfferingExpenseChildrenRoutes';

//* Metrics and charts
import { MetricsChildrenRoutes } from '@/modules/metrics/router/MetricsChildrenRoutes';

//* Users
import { UserChildrenRoutes } from '@/modules/user/router/UserChildrenRoutes';

//* Auth
import { AuthChildrenRoutes } from '@/modules/auth/router/AuthChildrenRoutes';

//* NotFound page
import { NotFoundPage } from '@/shared/pages/NotFoundPage';

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
          { path: '/offerings/expenses', element: <OfferingExpenseOptionsPage /> },
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
        children: OfferingExpenseChildrenRoutes,
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
