import { type Gender } from '@/shared/enums';

export interface MemberColumns {
  id: string;
  first_name: string;
  last_name: string;
  gender: Gender; 
  date_birth: string;
  zone: string;
  updated_by?: string;
}
