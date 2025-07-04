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
    name: 'Alice Thompson',
    email: 'alice.thompson@formulazone.com',
    password: 'admin123!',
    token: 'admin-token-1',
    role: 'admin' as UserRole
  },
  {
    id: 'admin-2',
    name: 'Brian Maxwell',
    email: 'brian.maxwell@formulazone.com',
    password: 'admin123!',
    token: 'admin-token-2',
    role: 'admin' as UserRole
  },
  {
    id: 'admin-3',
    name: 'Cynthia Lee',
    email: 'cynthia.lee@formulazone.com',
    password: 'admin123!',
    token: 'admin-token-3',
    role: 'admin' as UserRole
  }
];

// Steward Users
export const mockStewardUsers = [
  {
    id: 'steward-1',
    name: 'Emma Collins',
    email: 'emma.collins@formulazone.com',
    password: 'steward123!',
    token: 'steward-token-1',
    role: 'steward' as UserRole
  },
  {
    id: 'steward-2',
    name: 'David Reynolds',
    email: 'david.reynolds@formulazone.com',
    password: 'steward123!',
    token: 'steward-token-2',
    role: 'steward' as UserRole
  },
  {
    id: 'steward-3',
    name: 'Lisa Patel',
    email: 'lisa.patel@formulazone.com',
    password: 'steward123!',
    token: 'steward-token-3',
    role: 'steward' as UserRole
  }
];

// Viewer Users
export const mockViewerUsers = [
  {
    id: 'viewer-1',
    name: 'Alex Carter',
    email: 'alex.carter@formulazone.com',
    password: 'viewer123!',
    token: 'viewer-token-1',
    role: 'viewer' as UserRole
  },
  {
    id: 'viewer-2',
    name: 'Maria Hernandez',
    email: 'maria.hernandez@formulazone.com',
    password: 'viewer123!',
    token: 'viewer-token-2',
    role: 'viewer' as UserRole
  },
  {
    id: 'viewer-3',
    name: 'Tom Richards',
    email: 'tom.richards@formulazone.com',
    password: 'viewer123!',
    token: 'viewer-token-3',
    role: 'viewer' as UserRole
  }
];

// All mock users combined
export const mockAllUsers = [...mockAdminUsers, ...mockStewardUsers, ...mockViewerUsers];

// Legacy single user for backward compatibility
export const mockAuthUser = mockAdminUsers[0];
