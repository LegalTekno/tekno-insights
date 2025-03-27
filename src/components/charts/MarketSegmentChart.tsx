
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { mockCompanies, mockCategories } from '@/utils/mockData';

// Calculate data for pie chart based on company categories
const calculateCategoryDistribution = () => {
  const categoryCounts = {};
  
  mockCompanies.forEach(company => {
    if (categoryCounts[company.category]) {
      categoryCounts[company.category]++;
    } else {
      categoryCounts[company.category] = 1;
    }
  });
  
  return Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
  }));
};

const COLORS = ['#DD517E', '#461E52', '#FA9F00', '#0196C1', '#FFD8AA'];

const CHART_CONFIG = {
  segments: {
    theme: {
      light: "#DD517E",
      dark: "#DD517E"
    }
  }
};

const MarketSegmentChart = () => {
  const data = calculateCategoryDistribution();

  return (
    <ChartContainer config={CHART_CONFIG} className="h-full w-full">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => (
            <ChartTooltipContent
              active={active}
              payload={payload}
              formatter={(value, name) => [value, name]}
            />
          )}
        />
      </PieChart>
    </ChartContainer>
  );
};

export default MarketSegmentChart;
