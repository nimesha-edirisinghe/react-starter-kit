import { UserRole } from '~/features/auth/types/auth';

export interface UserI {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
