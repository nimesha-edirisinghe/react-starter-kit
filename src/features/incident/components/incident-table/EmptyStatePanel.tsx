interface EmptyStatePanelProps {
  message?: string;
  subMessage?: string;
}

export function EmptyStatePanel({
  message = 'No incidents found',
  subMessage = 'Try adjusting your filters to see more results'
}: EmptyStatePanelProps) {
  return (
    <div className="text-center py-8">
      <div className="text-slate-500 mb-2">{message}</div>
      <div className="text-sm text-slate-400">{subMessage}</div>
    </div>
  );
}
