import { OfferingIncomeCreatePage } from '@/modules/offering/income/pages/OfferingIncomeCreatePage';
import { OfferingIncomeUpdatePage } from '@/modules/offering/income/pages/OfferingIncomeUpdatePage';
import { OfferingIncomeInactivatePage } from '@/modules/offering/income/pages/OfferingIncomeInactivatePage';
import { OfferingsIncomeSearchPageByTerm } from '@/modules/offering/income/pages/OfferingsIncomeSearchPageByTerm';
import { OfferingsIncomeGeneralSearchPage } from '@/modules/offering/income/pages/OfferingsIncomeGeneralSearchPage';

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
    path: '/offerings/income/inactivate',
    element: <OfferingIncomeInactivatePage />,
  },
];
