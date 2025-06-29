export const formatIncidentType = (type: string): string => {
  return type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
};

export const createSearchableText = (incident: any): string => {
  return [
    incident.description,
    incident.circuit,
    incident.location,
    ...incident.drivers,
    ...incident.teams,
    incident.type.replace('_', ' ')
  ]
    .join(' ')
    .toLowerCase();
};
