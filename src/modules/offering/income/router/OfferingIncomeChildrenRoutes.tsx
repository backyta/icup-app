import {
  OfferingIncomeCreatePage,
  OfferingIncomeDeletePage,
  OfferingIncomeUpdatePage,
  OfferingsIncomeGeneralSearchPage,
  OfferingsIncomeSearchPageByTerm,
} from '@/modules/offering/income/pages';

export const OfferingIncomeChildrenRoutes = [
  {
    path: '/offerings/income/create-offering-income',
    element: <OfferingIncomeCreatePage />,
  },
  {
    path: '/offerings/income/search-offerings-income',
    element: <OfferingsIncomeGeneralSearchPage />,
  },
  {
    path: '/offerings/income/search-by-term-offerings-income',
    element: <OfferingsIncomeSearchPageByTerm />,
  },
  {
    path: '/offerings/income/update-offering-income',
    element: <OfferingIncomeUpdatePage />,
  },
  {
    path: '/offerings/income/delete-offering-income',
    element: <OfferingIncomeDeletePage />,
  },
];
