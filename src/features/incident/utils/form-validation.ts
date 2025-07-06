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

  const lapNumber = Number(formData.lapNumber);
  if (formData.lapNumber && (isNaN(lapNumber) || lapNumber < 1 || lapNumber > 100)) {
    errors.lapNumber = 'Lap Number must be between 1 and 100';
  }

  if (formData.location.length > 100) {
    errors.location = 'Location must not exceed 100 characters';
  }

  if (formData.description.length > 255) {
    errors.description = 'Description must not exceed 255 characters';
  }

  return errors;
};
