
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  TooltipProps
} from 'recharts';

// Custom colors for the chart
const COLORS = [
  '#0EA5E9', // blue
  '#DD517E', // pink 
  '#FA9F00', // orange
  '#0196C1', // teal
  '#8B5CF6', // purple
  '#FFD8AA', // cream
];

// Map metric IDs to display names
const METRIC_NAMES = {
  'funding': 'Funding',
  'exits': 'Exits',
  'growth': 'Growth Rate',
  'seed': 'Seed Investments',
  'companies': 'Company Count',
  'investors': 'Investor Count'
};

interface ReportChartProps {
  data: any[];
  chartType: string;
  metrics: string[];
}

// Define proper type for the CustomTooltip component
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const ReportChart = ({ data, chartType, metrics }: ReportChartProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // For pie charts, we need to transform the data
  const getPieData = () => {
    if (metrics.length === 0 || !data.length) return [];
    
    // For pie charts, we'll use the most recent data point
    const latestDataPoint = data[data.length - 1];
    
    return metrics.map((metric, index) => ({
      name: METRIC_NAMES[metric as keyof typeof METRIC_NAMES] || metric,
      value: latestDataPoint[metric] || 0
    }));
  };

  // Custom tooltip for all chart types with proper type definition
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    
    return (
      <div className="p-2 bg-theme-dark border border-theme-purple rounded shadow-lg">
        {label && <p className="font-mono text-xs text-theme-light mb-1">{label}</p>}
        {payload.map((entry, index) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  };

  // Render the appropriate chart based on chartType
  const renderChart = () => {
    if (!data.length || !metrics.length) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground font-mono">
            Select at least one metric to visualize
          </p>
        </div>
      );
    }

    // Determine if we should show labels based on screen size and data points
    const showLabels = windowWidth > 768 && data.length <= 15;
    
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="quarter" 
                tick={{ fill: '#CCCCCC', fontSize: 10 }}
              />
              <YAxis tick={{ fill: '#CCCCCC', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {metrics.map((metric, index) => (
                <Line 
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={COLORS[index % COLORS.length]}
                  activeDot={{ r: 6 }}
                  name={METRIC_NAMES[metric as keyof typeof METRIC_NAMES] || metric}
                  label={showLabels ? {
                    position: 'top',
                    fontSize: 10,
                    fill: COLORS[index % COLORS.length]
                  } : false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="quarter" 
                tick={{ fill: '#CCCCCC', fontSize: 10 }}
              />
              <YAxis tick={{ fill: '#CCCCCC', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {metrics.map((metric, index) => (
                <Bar 
                  key={metric}
                  dataKey={metric}
                  fill={COLORS[index % COLORS.length]}
                  name={METRIC_NAMES[metric as keyof typeof METRIC_NAMES] || metric}
                  label={showLabels ? {
                    position: 'top',
                    fontSize: 10,
                    fill: COLORS[index % COLORS.length]
                  } : false}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        const pieData = getPieData();
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => windowWidth >= 640 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                labelLine={windowWidth >= 640}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="quarter" 
                tick={{ fill: '#CCCCCC', fontSize: 10 }}
              />
              <YAxis tick={{ fill: '#CCCCCC', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {metrics.map((metric, index) => (
                <Area 
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  fill={COLORS[index % COLORS.length]}
                  stroke={COLORS[index % COLORS.length]}
                  fillOpacity={0.3}
                  name={METRIC_NAMES[metric as keyof typeof METRIC_NAMES] || metric}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground font-mono">
              Select a chart type to visualize
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-full w-full">
      {renderChart()}
    </div>
  );
};

export default ReportChart;
