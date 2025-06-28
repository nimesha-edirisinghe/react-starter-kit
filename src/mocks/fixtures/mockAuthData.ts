import { UserRole } from '~/features/auth/types/auth';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  token?: string;
  role: UserRole;
}

export const mockAdminUsers = [
  {
    id: 'admin-1',
    name: 'John Admin',
    email: 'admin1@racing.com',
    password: 'admin123',
    token: 'admin-token-1',
    role: 'admin' as UserRole
  },
  {
    id: 'admin-2',
    name: 'Sarah Manager',
    email: 'admin2@racing.com',
    password: 'admin123',
    token: 'admin-token-2',
    role: 'admin' as UserRole
  },
  {
    id: 'admin-3',
    name: 'Mike Director',
    email: 'admin3@racing.com',
    password: 'admin123',
    token: 'admin-token-3',
    role: 'admin' as UserRole
  }
];

// Steward Users
export const mockStewardUsers = [
  {
    id: 'steward-1',
    name: 'Emma Steward',
    email: 'steward1@racing.com',
    password: 'steward123',
    token: 'steward-token-1',
    role: 'steward' as UserRole
  },
  {
    id: 'steward-2',
    name: 'David Official',
    email: 'steward2@racing.com',
    password: 'steward123',
    token: 'steward-token-2',
    role: 'steward' as UserRole
  },
  {
    id: 'steward-3',
    name: 'Lisa Referee',
    email: 'steward3@racing.com',
    password: 'steward123',
    token: 'steward-token-3',
    role: 'steward' as UserRole
  }
];

// Viewer Users
export const mockViewerUsers = [
  {
    id: 'viewer-1',
    name: 'Alex Viewer',
    email: 'viewer1@racing.com',
    password: 'viewer123',
    token: 'viewer-token-1',
    role: 'viewer' as UserRole
  },
  {
    id: 'viewer-2',
    name: 'Maria Observer',
    email: 'viewer2@racing.com',
    password: 'viewer123',
    token: 'viewer-token-2',
    role: 'viewer' as UserRole
  },
  {
    id: 'viewer-3',
    name: 'Tom Spectator',
    email: 'viewer3@racing.com',
    password: 'viewer123',
    token: 'viewer-token-3',
    role: 'viewer' as UserRole
  }
];

// All mock users combined
export const mockAllUsers = [...mockAdminUsers, ...mockStewardUsers, ...mockViewerUsers];

// Legacy single user for backward compatibility
export const mockAuthUser = mockAdminUsers[0];
