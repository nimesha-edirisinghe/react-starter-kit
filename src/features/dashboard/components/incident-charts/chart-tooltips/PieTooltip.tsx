import { mockIncidents } from '~/mocks/fixtures/mockIncidents';

export const PieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
      <p className="font-medium text-slate-900">{data.name}</p>
      <p className="text-sm text-slate-600">
        {data.value} incidents ({((data.value / mockIncidents.length) * 100).toFixed(1)}%)
      </p>
    </div>
  );
};
