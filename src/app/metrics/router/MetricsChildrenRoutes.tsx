import {
  MetricsMember,
  MetricsFamilyHouse,
  MetricsOfferingIncome,
  MetricsOfferingExpenses,
} from '@/app/metrics/pages';

export const MetricsChildrenRoutes = [
  {
    path: '/metrics/metrics-member',
    element: <MetricsMember />,
  },
  {
    path: '/metrics/metrics-family-house',
    element: <MetricsFamilyHouse />,
  },
  {
    path: '/metrics/metrics-offering-income',
    element: <MetricsOfferingIncome />,
  },
  {
    path: '/metrics/metrics-offering-expenses',
    element: <MetricsOfferingExpenses />,
  },
];
