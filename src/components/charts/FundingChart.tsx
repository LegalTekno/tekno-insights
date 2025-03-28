
import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { mockCompanies } from '@/utils/mockData';
import { fetchLegalpioneerData, fetchQuarterlyData } from '@/utils/legalpioneers';
import { isWithinInterval } from 'date-fns';

const CHART_CONFIG = {
  funding: {
    theme: {
      light: "#0EA5E9",
      dark: "#0EA5E9"
    }
  }
};

interface FundingChartProps {
  startDate?: Date;
  endDate?: Date;
}

const FundingChart = ({ startDate, endDate }: FundingChartProps) => {
  const [data, setData] = useState([]);
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
        const quarterlyData = await fetchQuarterlyData();
        
        // Filter data by date range if provided
        let filteredData = quarterlyData;
        if (startDate && endDate) {
          filteredData = quarterlyData.filter(item => {
            const [q, year] = item.quarter.split(' ');
            const quarterMap = { Q1: 0, Q2: 3, Q3: 6, Q4: 9 };
            const quarter = quarterMap[q];
            const itemDate = new Date(parseInt(year), quarter, 1);
            return isWithinInterval(itemDate, { start: startDate, end: endDate });
          });
        }
        
        // Transform for the chart
        const chartData = filteredData
          .map(item => ({
            name: item.quarter,
            funding: item.funding,
          }))
          .slice(-10); // Get the latest 10 quarters
        
        setData(chartData);
      } catch (err) {
        console.error('Error loading funding data:', err);
        setError('Failed to load funding data');
        
        // Fallback to company-based data
        const companies = await fetchLegalpioneerData();
        const chartData = companies
          .filter(company => company.fundingTotal > 0)
          .sort((a, b) => b.fundingTotal - a.fundingTotal)
          .slice(0, 10) // Take top 10 companies by funding
          .map(company => ({
            name: company.name,
            funding: company.fundingTotal,
          }));
        
        setData(chartData);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [startDate, endDate]);

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

  // Calculate average for reference line
  const average = data.length > 0 
    ? data.reduce((sum, item) => sum + (item.funding as number), 0) / data.length 
    : 0;

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
        <ReferenceLine y={average} stroke="#DD517E" strokeDasharray="3 3" />
        <Bar 
          dataKey="funding" 
          fill="var(--color-funding)" 
          radius={[4, 4, 0, 0]} 
          label={windowWidth > 768 ? { position: 'top', fill: '#CCCCCC', fontSize: 10 } : false}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default FundingChart;
