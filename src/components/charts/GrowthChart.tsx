
import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Dot
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { mockMarketTrends } from '@/utils/mockData';
import { fetchQuarterlyData } from '@/utils/legalpioneers';
import { isWithinInterval } from 'date-fns';

const CHART_CONFIG = {
  growth: {
    theme: {
      light: "#0196C1",
      dark: "#0196C1"
    }
  },
  seed: {
    theme: {
      light: "#DD517E",
      dark: "#DD517E"
    }
  }
};

interface GrowthChartProps {
  startDate?: Date;
  endDate?: Date;
}

const GrowthChart = ({ startDate, endDate }: GrowthChartProps) => {
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
        
        // Transform for the chart - similar to the mockup showing Growth vs Seed
        const chartData = filteredData
          .map(item => ({
            name: item.quarter,
            growth: item.growth,
            seed: item.seed,
          }))
          .slice(-12); // Get latest 12 quarters
        
        setData(chartData);
      } catch (err) {
        console.error('Error loading growth data:', err);
        setError('Failed to load growth data');
        // Fallback to mock data
        setData(mockMarketTrends
          .map(trend => ({
            name: trend.trend,
            growth: trend.growthRate,
            seed: trend.growthRate * 0.6, // Mock seed data as a percentage of growth
          }))
          .slice(0, 10)
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

  // Custom dot component to add labels
  const CustomizedDot = (props: any) => {
    const { cx, cy, value } = props;
    if (windowWidth <= 768) return <Dot {...props} />;
    
    return (
      <g>
        <circle cx={cx} cy={cy} r={4} fill={props.fill} />
        <text 
          x={cx} 
          y={cy - 10} 
          textAnchor="middle" 
          fill="#CCCCCC" 
          fontSize={10}
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <ChartContainer config={CHART_CONFIG} className="h-full w-full">
      <LineChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#CCCCCC', fontSize: 10 }}
          axisLine={{ stroke: '#333333' }}
          tickLine={{ stroke: '#333333' }}
        />
        <YAxis 
          tick={{ fill: '#CCCCCC', fontSize: 10 }}
          tickFormatter={(value) => `${value}`}
          axisLine={{ stroke: '#333333' }}
          tickLine={{ stroke: '#333333' }}
        />
        <Tooltip
          content={({ active, payload }) => (
            <ChartTooltipContent
              active={active}
              payload={payload}
              formatter={(value, name) => [`${value}`, name === 'growth' ? 'Growth' : 'Seed']}
            />
          )}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="growth" 
          stroke="var(--color-growth)" 
          strokeWidth={2}
          dot={<CustomizedDot fill="var(--color-growth)" />}
          activeDot={{ r: 7 }}
          name="Growth"
        />
        <Line 
          type="monotone" 
          dataKey="seed" 
          stroke="var(--color-seed)" 
          strokeWidth={2}
          dot={<CustomizedDot fill="var(--color-seed)" />}
          activeDot={{ r: 7 }}
          name="Seed"
        />
      </LineChart>
    </ChartContainer>
  );
};

export default GrowthChart;
