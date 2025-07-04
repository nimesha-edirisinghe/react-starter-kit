import type { IncidentFormData } from '../types/incident';

export const validateIncidentForm = (formData: IncidentFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.type) errors.type = 'Incident Type is required';
  if (!formData.raceCategory) errors.raceCategory = 'Category is required';
  if (!formData.location.trim()) errors.location = 'Location is required';
  if (!formData.severity) errors.severity = 'Severity is required';
  if (!formData.status) errors.status = 'Status is required';
  if (!formData.drivers.trim()) errors.drivers = 'Driver(s) involved is required';
  if (!formData.lapNumber) errors.lapNumber = 'Lap Number is required';
  if (!formData.description.trim()) errors.description = 'Description is required';

  if (formData.lapNumber && Number(formData.lapNumber) <= 0) {
    errors.lapNumber = 'Lap Number must be greater than 0';
  }

  return errors;
};
