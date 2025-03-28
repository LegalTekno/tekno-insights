
import React, { useState, useEffect } from 'react';
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
import { fetchMarketTrendsData } from '@/utils/legalpioneers';

const CHART_CONFIG = {
  growth: {
    theme: {
      light: "#0196C1",
      dark: "#0196C1"
    }
  }
};

const GrowthChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const trends = await fetchMarketTrendsData();
        // Transform data for the chart
        const chartData = trends
          .sort((a, b) => b.growthRate - a.growthRate)
          .map(trend => ({
            name: trend.trend,
            growth: trend.growthRate,
          }));
        
        setData(chartData);
      } catch (err) {
        console.error('Error loading growth data:', err);
        setError('Failed to load growth data');
        // Fallback to mock data
        setData(mockMarketTrends
          .map(trend => ({
            name: trend.trend,
            growth: trend.growthRate,
          }))
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="animate-pulse text-theme-light font-mono">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-red-500 font-mono">{error}</div>
      </div>
    );
  }

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
