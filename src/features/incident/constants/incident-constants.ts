export const SEVERITY_COLORS = {
  critical: 'bg-red-100 text-red-800',
  high: 'bg-orange-100 text-orange-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
  default: 'bg-gray-100 text-gray-800'
} as const;

export const STATUS_COLORS = {
  resolved: 'bg-green-100 text-green-800',
  investigating: 'bg-yellow-100 text-yellow-800',
  pending: 'bg-red-100 text-red-800',
  default: 'bg-gray-100 text-gray-800'
} as const;
