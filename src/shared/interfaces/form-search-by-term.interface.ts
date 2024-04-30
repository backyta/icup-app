import { type UserRoles } from '@/app/user/enums';
import { type TypesSearch } from '@/shared/enums';

export interface FormSearchByTerm {
  type: TypesSearch;
  order: string;
  subType?: string | undefined;
  termInput?: string | undefined;
  termSelect?: string | undefined;
  termMultiSelect?: UserRoles[] | undefined;
  termDate?: {
        from: Date;
        to?: Date | undefined;
    } | undefined;
  termNames?: string | undefined;
  termLastNames?: string | undefined;
  limit?: string | undefined;
  limitAll?: boolean | undefined;
}