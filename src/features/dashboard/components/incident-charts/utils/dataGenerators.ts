// Generate comprehensive mock data
export const generateTrendData = () => {
  const data = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date.toISOString().split('T')[0],
      incidents: Math.floor(Math.random() * 12) + 3,
      resolved: Math.floor(Math.random() * 8) + 2,
      critical: Math.floor(Math.random() * 3) + 1,
      pending: Math.floor(Math.random() * 4) + 1,
      responseTime: Math.floor(Math.random() * 10) + 2
    });
  }

  return data;
};

// Generate hourly distribution data
export const generateHourlyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, '0')}:00`,
    incidents: Math.floor(Math.random() * 10) + 1,
    severity: Math.floor(Math.random() * 4) + 1
  }));
};

// Generate circuit performance data
export const generateCircuitData = () => {
  return [
    { circuit: 'Monaco', incidents: 8, resolved: 6, avgResponseTime: 4.5, riskScore: 85 },
    { circuit: 'Silverstone', incidents: 6, resolved: 5, avgResponseTime: 3.2, riskScore: 65 },
    { circuit: 'Spa', incidents: 7, resolved: 4, avgResponseTime: 5.1, riskScore: 78 },
    { circuit: 'Monza', incidents: 5, resolved: 5, avgResponseTime: 2.8, riskScore: 45 },
    { circuit: 'Suzuka', incidents: 4, resolved: 3, avgResponseTime: 3.7, riskScore: 55 },
    { circuit: 'COTA', incidents: 6, resolved: 4, avgResponseTime: 3.9, riskScore: 62 }
  ];
};
