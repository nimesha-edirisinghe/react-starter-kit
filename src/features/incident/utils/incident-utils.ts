export const formatIncidentType = (type: string): string => {
  return type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
};
