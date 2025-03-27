
import Footer from '@/components/Footer';
import FundingChart from '@/components/charts/FundingChart';
import MarketSegmentChart from '@/components/charts/MarketSegmentChart';
import GrowthChart from '@/components/charts/GrowthChart';
import TopPerformersChart from '@/components/charts/TopPerformersChart';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-theme-dark flex flex-col">
      <div className="pt-24 px-4 pb-4 flex-grow">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6">
            <h1 className="font-pixel text-3xl text-theme-pink mb-2">TEKNO INSIGHTS ANALYTICS</h1>
            <p className="font-mono text-muted-foreground">
              Explore visual data insights on legal tech market trends, investment patterns, and competitive analysis.
            </p>
          </div>
          
          <div className="h-[calc(100vh-220px)] border border-theme-purple rounded-lg overflow-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-theme-dark border border-theme-purple rounded-lg p-4">
                <h3 className="font-mono font-bold text-theme-light mb-4">FUNDING TRENDS</h3>
                <div className="h-64">
                  <FundingChart />
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
                  <GrowthChart />
                </div>
              </div>
              
              <div className="bg-theme-dark border border-theme-purple rounded-lg p-4">
                <h3 className="font-mono font-bold text-theme-light mb-4">TOP PERFORMERS</h3>
                <div className="h-64">
                  <TopPerformersChart />
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
