import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CHART_COLORS = ['#3498db', '#e67e22'];

const SummaryChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="placeholder">No activity found for this period</div>;
  }

  const totals = data.reduce((acc, curr) => {
    const type = curr.movementType;
    acc[type] = (acc[type] || 0) + (curr.quantity || 0);
    return acc;
  }, { IN: 0, OUT: 0 });

  const chartData = [
    { name: 'IN', value: totals.IN },
    { name: 'OUT', value: totals.OUT }
  ];

  return (
    <div className="card chart-card">
      <h3>Inventory Flow Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%" cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SummaryChart;
