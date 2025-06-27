import { UserI } from '~/features/users/types/user';

export const mockUsers: UserI[] = [
  { id: 1, name: 'Alice Doe', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'steward' },
  { id: 3, name: 'Charlie Johnson', email: 'charlie.johnson@example.com', role: 'viewer' },
  { id: 4, name: 'Dana Lee', email: 'dana.lee@example.com', role: 'viewer' },
  { id: 5, name: 'Evan Kim', email: 'evan.kim@example.com', role: 'steward' },
  { id: 6, name: 'Fiona Patel', email: 'fiona.patel@example.com', role: 'viewer' },
  { id: 7, name: 'George Wu', email: 'george.wu@example.com', role: 'viewer' },
  { id: 8, name: 'Hannah Scott', email: 'hannah.scott@example.com', role: 'steward' },
  { id: 9, name: 'Ian Martinez', email: 'ian.martinez@example.com', role: 'viewer' },
  { id: 10, name: 'Julia Nguyen', email: 'julia.nguyen@example.com', role: 'viewer' }
];
