import {
  OfferingIncomeCreatePage,
  OfferingIncomeDeletePage,
  OfferingIncomeUpdatePage,
  OfferingsIncomeGeneralSearchPage,
  OfferingsIncomeSearchPageByTerm,
} from '@/modules/offering/income/pages';

export const OfferingIncomeChildrenRoutes = [
  {
    path: '/offerings/income/create',
    element: <OfferingIncomeCreatePage />,
  },
  {
    path: '/offerings/income/general-search',
    element: <OfferingsIncomeGeneralSearchPage />,
  },
  {
    path: '/offerings/income/search-by-term',
    element: <OfferingsIncomeSearchPageByTerm />,
  },
  {
    path: '/offerings/income/update',
    element: <OfferingIncomeUpdatePage />,
  },
  {
    path: '/offerings/income/delete',
    element: <OfferingIncomeDeletePage />,
  },
];
