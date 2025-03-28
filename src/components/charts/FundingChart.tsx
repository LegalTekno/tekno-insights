
import React, { useState, useEffect } from 'react';
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
import { fetchLegalpioneerData } from '@/utils/legalpioneers';

const CHART_CONFIG = {
  funding: {
    theme: {
      light: "#DD517E",
      dark: "#DD517E"
    }
  }
};

const FundingChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const companies = await fetchLegalpioneerData();
        // Transform data for the chart
        const chartData = companies
          .filter(company => company.fundingTotal > 0)
          .sort((a, b) => b.fundingTotal - a.fundingTotal)
          .slice(0, 10) // Take top 10 companies by funding
          .map(company => ({
            name: company.name,
            funding: company.fundingTotal,
          }));
        
        setData(chartData);
      } catch (err) {
        console.error('Error loading funding data:', err);
        setError('Failed to load funding data');
        // Fallback to mock data
        setData(mockCompanies
          .sort((a, b) => b.fundingTotal - a.fundingTotal)
          .map(company => ({
            name: company.name,
            funding: company.fundingTotal,
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
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
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
              formatter={(value) => [`$${value}M`, 'Funding']}
            />
          )}
        />
        <Bar dataKey="funding" fill="var(--color-funding)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
};

export default FundingChart;
