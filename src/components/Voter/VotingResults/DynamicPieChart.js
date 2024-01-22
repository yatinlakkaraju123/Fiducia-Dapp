import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const DynamicPieChart = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  // Convert BigInt values to regular numbers
  const formattedData = data.map(entry => ({
    ...entry,
    votes: Number(entry.votes),
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={formattedData}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        dataKey="votes"
        label
      >
        {formattedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default DynamicPieChart;
