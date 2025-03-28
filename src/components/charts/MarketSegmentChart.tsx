
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegendContent } from '@/components/ui/chart';
import { mockCompanies, mockCategories } from '@/utils/mockData';
import { fetchLegalpioneerData } from '@/utils/legalpioneers';

const COLORS = ['#DD517E', '#461E52', '#FA9F00', '#0196C1', '#FFD8AA', '#8B5CF6', '#D946EF', '#F97316', '#0EA5E9'];

const CHART_CONFIG = {
  segments: {
    theme: {
      light: "#DD517E",
      dark: "#DD517E"
    }
  }
};

// Calculate data for pie chart based on company categories
const calculateCategoryDistribution = (companies: any[]) => {
  const categoryCounts: Record<string, number> = {};
  
  companies.forEach(company => {
    if (categoryCounts[company.category]) {
      categoryCounts[company.category]++;
    } else {
      categoryCounts[company.category] = 1;
    }
  });
  
  return Object.entries(categoryCounts)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value);
};

const MarketSegmentChart = () => {
  const [data, setData] = useState<Array<{name: string, value: number}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const companies = await fetchLegalpioneerData();
        const chartData = calculateCategoryDistribution(companies);
        setData(chartData);
      } catch (err) {
        console.error('Error loading market segment data:', err);
        setError('Failed to load market segment data');
        // Fallback to mock data
        setData(calculateCategoryDistribution(mockCompanies));
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

  // Dynamically adjust chart size based on window width
  const chartSize = windowWidth < 640 ? 60 : (windowWidth < 1024 ? 80 : 100);

  return (
    <ChartContainer config={CHART_CONFIG} className="h-full w-full">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={chartSize}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => windowWidth > 768 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
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
              formatter={(value: number, name: string) => {
                const total = data.reduce((acc, curr) => acc + curr.value, 0);
                return [`${value} Companies (${((value / total) * 100).toFixed(1)}%)`, name];
              }}
            />
          )}
        />
        <Legend 
          content={({ payload }) => <ChartLegendContent payload={payload} />}
          layout={windowWidth < 768 ? "horizontal" : "vertical"}
          verticalAlign="middle"
          align={windowWidth < 768 ? "center" : "right"}
        />
      </PieChart>
    </ChartContainer>
  );
};

export default MarketSegmentChart;
