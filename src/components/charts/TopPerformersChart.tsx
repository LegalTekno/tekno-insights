
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { mockCompanies } from '@/utils/mockData';

const CHART_CONFIG = {
  revenue: {
    theme: {
      light: "#FA9F00",
      dark: "#FA9F00"
    }
  },
  valuation: {
    theme: {
      light: "#FFD8AA",
      dark: "#FFD8AA"
    }
  }
};

const TopPerformersChart = () => {
  // Filter out companies with no revenue data and sort by revenue
  const data = mockCompanies
    .filter(company => company.annualRevenue !== null)
    .sort((a, b) => (b.annualRevenue || 0) - (a.annualRevenue || 0))
    .slice(0, 5)  // Get top 5
    .map(company => ({
      name: company.name,
      revenue: company.annualRevenue,
      valuation: company.valuation
    }));

  return (
    <ChartContainer config={CHART_CONFIG} className="h-full w-full">
      <BarChart 
        data={data} 
        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
        barGap={0}
        barCategoryGap={10}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#CCCCCC', fontSize: 10 }}
          axisLine={{ stroke: '#333333' }}
          tickLine={{ stroke: '#333333' }}
        />
        <YAxis 
          tick={{ fill: '#CCCCCC', fontSize: 10 }}
          tickFormatter={(value) => `$${value}M`}
          axisLine={{ stroke: '#333333' }}
          tickLine={{ stroke: '#333333' }}
        />
        <Tooltip
          content={({ active, payload }) => (
            <ChartTooltipContent
              active={active}
              payload={payload}
              formatter={(value, name) => [`$${value}M`, name === 'revenue' ? 'Revenue' : 'Valuation']}
            />
          )}
        />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="valuation" fill="var(--color-valuation)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
};

export default TopPerformersChart;
