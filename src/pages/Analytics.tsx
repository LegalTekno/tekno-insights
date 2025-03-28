
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import FundingChart from '@/components/charts/FundingChart';
import MarketSegmentChart from '@/components/charts/MarketSegmentChart';
import GrowthChart from '@/components/charts/GrowthChart';
import TopPerformersChart from '@/components/charts/TopPerformersChart';
import DateRangePicker from '@/components/DateRangePicker';
import { subYears } from 'date-fns';

const Analytics = () => {
  const [startDate, setStartDate] = useState<Date>(subYears(new Date(), 2));
  const [endDate, setEndDate] = useState<Date>(new Date());
  
  const handleDateRangeChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };
  
  return (
    <div className="min-h-screen bg-theme-dark flex flex-col">
      <div className="pt-24 px-4 pb-4 flex-grow">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 pt-4">
            <h1 className="font-pixel text-3xl text-theme-pink mb-3">TEKNO INSIGHTS ANALYTICS</h1>
            <p className="font-mono text-muted-foreground">
              Explore visual data insights on legal tech market trends, investment patterns, and competitive analysis.
            </p>
          </div>
          
          <div className="mb-6">
            <div className="w-full md:w-64">
              <DateRangePicker 
                startDate={startDate}
                endDate={endDate}
                onRangeChange={handleDateRangeChange}
              />
            </div>
          </div>
          
          <div className="h-[calc(100vh-340px)] border border-theme-purple rounded-lg overflow-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-theme-dark border border-theme-purple rounded-lg p-4">
                <h3 className="font-mono font-bold text-theme-light mb-4">FUNDING TRENDS</h3>
                <div className="h-64">
                  <FundingChart startDate={startDate} endDate={endDate} />
                </div>
              </div>
              
              <div className="bg-theme-dark border border-theme-purple rounded-lg p-4">
                <h3 className="font-mono font-bold text-theme-light mb-4">MARKET SEGMENTS</h3>
                <div className="h-64">
                  <MarketSegmentChart />
                </div>
              </div>
              
              <div className="bg-theme-dark border border-theme-purple rounded-lg p-4">
                <h3 className="font-mono font-bold text-theme-light mb-4">GROWTH METRICS</h3>
                <div className="h-64">
                  <GrowthChart startDate={startDate} endDate={endDate} />
                </div>
              </div>
              
              <div className="bg-theme-dark border border-theme-purple rounded-lg p-4">
                <h3 className="font-mono font-bold text-theme-light mb-4">TOP PERFORMERS</h3>
                <div className="h-64">
                  <TopPerformersChart startDate={startDate} endDate={endDate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Analytics;
