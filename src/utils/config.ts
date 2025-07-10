const getEnvVar = (name: string): string => {
  const value = import.meta.env[name as keyof ImportMetaEnv];
  if (!value) throw new Error(`Missing env variable: ${name}`);
  return value;
};

export const config = {
  nodeEnv: getEnvVar('VITE_NODE_ENV'),
  apiBaseUrl: getEnvVar('VITE_API_BASE_URL'),
  enableMSW: getEnvVar('VITE_ENABLE_MSW'),
  wsUrl: getEnvVar('VITE_WS_URL')
};
