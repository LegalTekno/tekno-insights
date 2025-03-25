
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowRight, Filter } from 'lucide-react';

const Analytics = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock funding data
  const fundingData = [
    { category: 'Practice Management', funding: 720, deals: 42 },
    { category: 'Contract Management', funding: 460, deals: 28 },
    { category: 'E-Discovery', funding: 510, deals: 31 },
    { category: 'Legal Research', funding: 350, deals: 23 },
    { category: 'Regulatory Tech', funding: 290, deals: 19 },
    { category: 'IP Management', funding: 180, deals: 14 },
  ];
  
  // Mock market share data
  const marketShareData = [
    { name: 'Practice Management', value: 28 },
    { name: 'Contract Management', value: 18 },
    { name: 'E-Discovery', value: 20 },
    { name: 'Legal Research', value: 14 },
    { name: 'Regulatory Tech', value: 11 },
    { name: 'IP Management', value: 9 },
  ];
  
  // Colors for pie chart
  const COLORS = ['#E94C89', '#3B1A5C', '#8A42B3', '#FFD700', '#00BFFF', '#7A297B'];
  
  // Filter options
  const filterOptions = [
    { id: 'all', label: 'All Data' },
    { id: 'funding', label: 'Funding' },
    { id: 'deals', label: 'Deals' },
    { id: 'market-share', label: 'Market Share' },
  ];

  return (
    <div className="min-h-screen bg-theme-dark pt-24 px-4 pb-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="font-pixel text-3xl text-theme-pink mb-2">Market Analytics</h1>
          <p className="font-mono text-muted-foreground">
            Visual insights into legal tech funding, market share, and investment trends.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center mb-8 overflow-x-auto pb-2">
          <div className="flex items-center bg-theme-dark border border-theme-purple rounded-md p-1">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                className={`px-4 py-2 rounded text-sm font-mono whitespace-nowrap ${
                  activeFilter === option.id 
                    ? 'bg-theme-purple text-white' 
                    : 'text-muted-foreground hover:text-white'
                }`}
                onClick={() => setActiveFilter(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          <button className="ml-4 flex items-center text-sm font-mono text-muted-foreground hover:text-white">
            <Filter className="w-4 h-4 mr-1" />
            More Filters
          </button>
        </div>
        
        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Funding by Category */}
          <div className="bg-theme-dark border border-theme-purple rounded-lg p-6 animate-pixel-fade-in">
            <h3 className="font-pixel text-lg text-theme-pink mb-6">Funding by Category ($M)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={fundingData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#3B1A5C" />
                  <XAxis 
                    dataKey="category" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F0F17', borderColor: '#3B1A5C' }}
                    labelStyle={{ color: '#E94C89' }}
                  />
                  <Legend wrapperStyle={{ bottom: 0 }} />
                  <Bar dataKey="funding" fill="#E94C89" name="Funding ($M)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Market Share */}
          <div className="bg-theme-dark border border-theme-purple rounded-lg p-6 animate-pixel-fade-in">
            <h3 className="font-pixel text-lg text-theme-pink mb-6">Market Share by Category (%)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShareData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {marketShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Market Share']}
                    contentStyle={{ backgroundColor: '#0F0F17', borderColor: '#3B1A5C' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Deals by Category */}
          <div className="bg-theme-dark border border-theme-purple rounded-lg p-6 animate-pixel-fade-in">
            <h3 className="font-pixel text-lg text-theme-pink mb-6">Number of Deals by Category</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={fundingData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#3B1A5C" />
                  <XAxis 
                    dataKey="category" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F0F17', borderColor: '#3B1A5C' }}
                    labelStyle={{ color: '#E94C89' }}
                  />
                  <Legend wrapperStyle={{ bottom: 0 }} />
                  <Bar dataKey="deals" fill="#8A42B3" name="Number of Deals" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Investment Trends Card */}
          <div className="bg-theme-dark border border-theme-purple rounded-lg p-6 animate-pixel-fade-in">
            <h3 className="font-pixel text-lg text-theme-pink mb-4">Top Investment Trends</h3>
            
            <div className="space-y-4">
              {[
                { trend: 'AI-powered document automation tools', growth: '+38%' },
                { trend: 'Compliance management platforms', growth: '+27%' },
                { trend: 'Cloud-based practice management', growth: '+24%' },
                { trend: 'Legal research automation', growth: '+21%' },
                { trend: 'Contract analytics platforms', growth: '+18%' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-theme-purple/40 rounded bg-theme-dark hover:bg-theme-purple/10 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded flex items-center justify-center bg-theme-purple/20 mr-3 text-lg font-mono">
                      {index + 1}
                    </div>
                    <span className="font-mono text-theme-light">{item.trend}</span>
                  </div>
                  <div className="font-pixel text-theme-pink whitespace-nowrap">
                    {item.growth}
                  </div>
                </div>
              ))}
              
              <button className="flex items-center text-theme-pink text-sm font-mono mt-4 hover:translate-x-1 transition-transform">
                View All Trends <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
