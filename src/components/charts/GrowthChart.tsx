
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { mockMarketTrends } from '@/utils/mockData';

const CHART_CONFIG = {
  growth: {
    theme: {
      light: "#0196C1",
      dark: "#0196C1"
    }
  }
};

const GrowthChart = () => {
  // Transform data for the chart
  const data = mockMarketTrends.map(trend => ({
    name: trend.trend,
    growth: trend.growthRate,
  }));

  return (
    <ChartContainer config={CHART_CONFIG} className="h-full w-full">
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#CCCCCC', fontSize: 10 }}
          axisLine={{ stroke: '#333333' }}
          tickLine={{ stroke: '#333333' }}
        />
        <YAxis 
          tick={{ fill: '#CCCCCC', fontSize: 10 }}
          tickFormatter={(value) => `${value}%`}
          axisLine={{ stroke: '#333333' }}
          tickLine={{ stroke: '#333333' }}
        />
        <Tooltip
          content={({ active, payload }) => (
            <ChartTooltipContent
              active={active}
              payload={payload}
              formatter={(value) => [`${value}%`, 'Growth Rate']}
            />
          )}
        />
        <Line 
          type="monotone" 
          dataKey="growth" 
          stroke="var(--color-growth)" 
          strokeWidth={2}
          dot={{ fill: "var(--color-growth)", r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default GrowthChart;
