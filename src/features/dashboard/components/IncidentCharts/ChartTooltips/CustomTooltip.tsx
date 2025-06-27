/* eslint-disable @typescript-eslint/no-explicit-any */
export const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
      <p className="font-medium text-slate-900">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};
