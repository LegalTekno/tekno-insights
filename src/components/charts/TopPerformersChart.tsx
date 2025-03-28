
import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { mockCompanies } from '@/utils/mockData';
import { fetchLegalpioneerData } from '@/utils/legalpioneers';
import { isWithinInterval, parseISO } from 'date-fns';

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

interface TopPerformersChartProps {
  startDate?: Date;
  endDate?: Date;
}

const TopPerformersChart = ({ startDate, endDate }: TopPerformersChartProps) => {
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
        let companies = await fetchLegalpioneerData();
        
        // Filter by date range if provided
        if (startDate && endDate) {
          companies = companies.filter(company => {
            // Check if the company has funding rounds within the date range
            if (!company.fundingRounds || company.fundingRounds.length === 0) {
              return false;
            }
            
            return company.fundingRounds.some(round => {
              const roundDate = parseISO(round.date);
              return isWithinInterval(roundDate, { start: startDate, end: endDate });
            });
          });
        }
        
        // Filter out companies with no revenue data and sort by revenue
        const chartData = companies
          .filter(company => company.annualRevenue !== null)
          .sort((a, b) => (b.annualRevenue || 0) - (a.annualRevenue || 0))
          .slice(0, 5)  // Get top 5
          .map(company => ({
            name: company.name,
            revenue: company.annualRevenue,
            valuation: company.valuation
          }));
        
        setData(chartData);
      } catch (err) {
        console.error('Error loading top performers data:', err);
        setError('Failed to load top performers data');
        // Fallback to mock data
        setData(mockCompanies
          .filter(company => company.annualRevenue !== null)
          .sort((a, b) => (b.annualRevenue || 0) - (a.annualRevenue || 0))
          .slice(0, 5)
          .map(company => ({
            name: company.name,
            revenue: company.annualRevenue,
            valuation: company.valuation
          }))
        );
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
        <Legend />
        <Bar 
          dataKey="revenue" 
          fill="var(--color-revenue)" 
          radius={[4, 4, 0, 0]} 
          name="Revenue"
          label={windowWidth > 768 ? { position: 'top', fill: '#CCCCCC', fontSize: 10 } : false}
        />
        <Bar 
          dataKey="valuation" 
          fill="var(--color-valuation)" 
          radius={[4, 4, 0, 0]} 
          name="Valuation"
        />
      </BarChart>
    </ChartContainer>
  );
};

export default TopPerformersChart;
