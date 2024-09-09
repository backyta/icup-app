import {
  OfferingIncomeCreatePage,
  OfferingIncomeDeletePage,
  OfferingIncomeUpdatePage,
  OfferingsIncomeGeneralSearchPage,
  OfferingsIncomeSearchPageByTerm,
} from '@/modules/offering/income/pages';

export const OfferingIncomeChildrenRoutes = [
  {
    path: '/offerings/incomes/create',
    element: <OfferingIncomeCreatePage />,
  },
  {
    path: '/offerings/incomes/general-search',
    element: <OfferingsIncomeGeneralSearchPage />,
  },
  {
    path: '/offerings/incomes/search-by-term',
    element: <OfferingsIncomeSearchPageByTerm />,
  },
  {
    path: '/offerings/incomes/update',
    element: <OfferingIncomeUpdatePage />,
  },
  {
    path: '/offerings/incomes/delete',
    element: <OfferingIncomeDeletePage />,
  },
];
