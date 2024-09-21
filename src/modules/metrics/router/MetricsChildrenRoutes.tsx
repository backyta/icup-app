import {
  MetricsMember,
  MetricsFamilyGroup,
  MetricsOfferingIncome,
  MetricsOfferingExpense,
  MetricsOfferingComparison,
} from '@/modules/metrics/pages';

export const MetricsChildrenRoutes = [
  {
    path: '/metrics/member',
    element: <MetricsMember />,
  },
  {
    path: '/metrics/family-group',
    element: <MetricsFamilyGroup />,
  },
  {
    path: '/metrics/offering-income',
    element: <MetricsOfferingIncome />,
  },
  {
    path: '/metrics/offering-expense',
    element: <MetricsOfferingExpense />,
  },
  {
    path: '/metrics/offering-comparison',
    element: <MetricsOfferingComparison />,
  },
];
