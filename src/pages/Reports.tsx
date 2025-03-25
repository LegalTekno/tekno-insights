
import ReportGenerator from '@/components/ReportGenerator';

const Reports = () => {
  return (
    <div className="min-h-screen bg-theme-dark pt-24 px-4 pb-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="font-pixel text-3xl text-theme-pink mb-2">Tekno Insights Reports</h1>
          <p className="font-mono text-muted-foreground">
            Generate comprehensive reports based on our exclusive legal tech market data to support your investment decisions.
          </p>
        </div>
        
        <div className="h-[calc(100vh-220px)] border border-theme-purple rounded-lg overflow-hidden">
          <ReportGenerator />
        </div>
      </div>
    </div>
  );
};

export default Reports;
