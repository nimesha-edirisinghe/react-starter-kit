export const authQueryKeys = {
  // Base key for all auth queries
  all: ['auth'] as const,

  // Current user data
  user: () => [...authQueryKeys.all, 'user'] as const,

  // User permissions
  permissions: () => [...authQueryKeys.all, 'permissions'] as const,

  // User profile
  profile: () => [...authQueryKeys.all, 'profile'] as const,

  // User roles
  roles: () => [...authQueryKeys.all, 'roles'] as const,

  // Session data
  session: () => [...authQueryKeys.all, 'session'] as const
} as const;
