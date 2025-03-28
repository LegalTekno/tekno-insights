
import { useState, useEffect } from 'react';
import { Download, ChevronDown, Filter, FileText } from 'lucide-react';
import Footer from '@/components/Footer';
import DateRangePicker from '@/components/DateRangePicker';
import { fetchLegalpioneerData, fetchQuarterlyData, datasetLastUpdated } from '@/utils/legalpioneers';
import { subYears } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReportChart from '@/components/ReportChart';

// Chart types for visualization
const chartTypes = [
  { id: 'line', name: 'Line Chart' },
  { id: 'bar', name: 'Bar Chart' },
  { id: 'pie', name: 'Pie Chart' },
  { id: 'area', name: 'Area Chart' },
];

// Metrics available for visualization
const metrics = [
  { id: 'funding', name: 'Funding' },
  { id: 'exits', name: 'Exits' },
  { id: 'growth', name: 'Growth Rate' },
  { id: 'seed', name: 'Seed Investments' },
  { id: 'companies', name: 'Company Count' },
  { id: 'investors', name: 'Investor Count' },
];

// Segments for filtering
const segments = [
  { id: 'all', name: 'All Segments' },
  { id: 'legal', name: 'Legal' },
  { id: 'compliance', name: 'Compliance' },
  { id: 'contracts', name: 'Contracts' },
  { id: 'litigation', name: 'Litigation' },
  { id: 'e-discovery', name: 'E-Discovery' },
  { id: 'ip', name: 'Intellectual Property' },
];

// Areas for filtering
const areas = [
  { id: 'all', name: 'All Areas' },
  { id: 'northAmerica', name: 'North America' },
  { id: 'europe', name: 'Europe' },
  { id: 'asia', name: 'Asia' },
  { id: 'other', name: 'Other Regions' },
];

const Reports = () => {
  // Date range state
  const [startDate, setStartDate] = useState<Date>(subYears(new Date(), 2));
  const [endDate, setEndDate] = useState<Date>(new Date());
  
  // Filter states
  const [segment, setSegment] = useState('all');
  const [area, setArea] = useState('all');
  const [chartType, setChartType] = useState('line');
  const [selectedMetrics, setSelectedMetrics] = useState(['funding', 'exits']);
  
  // Data states
  const [quarterlyData, setQuarterlyData] = useState([]);
  const [companiesData, setCompaniesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // UI states
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  
  // Load initial data
  useEffect(() => {
    async function loadData() {
      try {
        const quarters = await fetchQuarterlyData();
        const companies = await fetchLegalpioneerData();
        
        setQuarterlyData(quarters);
        setCompaniesData(companies);
        
        // Set initial filtered data
        applyFilters(quarters, companies);
      } catch (error) {
        console.error('Error loading report data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  // Apply filters when they change
  useEffect(() => {
    if (!loading) {
      applyFilters(quarterlyData, companiesData);
    }
  }, [startDate, endDate, segment, area, loading, searchTerm]);
  
  // Handle date range change
  const handleDateRangeChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };
  
  // Apply all filters to the data
  const applyFilters = (quarters, companies) => {
    // Filter quarterly data by date and segment
    let filtered = [...quarters];
    
    // Apply date filtering
    filtered = filtered.filter(item => {
      const [q, year] = item.quarter.split(' ');
      const quarterMap = { Q1: 0, Q2: 3, Q3: 6, Q4: 9 };
      const quarter = quarterMap[q];
      const itemDate = new Date(parseInt(year), quarter, 1);
      return itemDate >= startDate && itemDate <= endDate;
    });
    
    // Apply search term filtering if present
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.quarter.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Set filtered data for the chart
    setFilteredData(filtered);
    
    // Create table data from companies
    let tableCompanies = [...companies];
    
    // Apply segment filter
    if (segment !== 'all') {
      tableCompanies = tableCompanies.filter(company => 
        company.category.toLowerCase() === segment.toLowerCase()
      );
    }
    
    // Apply area filter
    if (area !== 'all') {
      // This is a simplified area filter - in real implementation, you'd have proper location data
      const areaMapping = {
        'northAmerica': ['US', 'USA', 'Canada'],
        'europe': ['UK', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands'],
        'asia': ['China', 'Japan', 'India', 'Singapore', 'Hong Kong'],
      };
      
      if (areaMapping[area]) {
        tableCompanies = tableCompanies.filter(company => 
          areaMapping[area].some(country => 
            company.location?.includes(country)
          )
        );
      }
    }
    
    // Apply search filter to companies
    if (searchTerm) {
      tableCompanies = tableCompanies.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort and slice for table display
    setTableData(
      tableCompanies
        .sort((a, b) => b.fundingTotal - a.fundingTotal)
        .slice(0, 10)
    );
  };
  
  // Toggle a metric selection
  const toggleMetric = (metricId) => {
    if (selectedMetrics.includes(metricId)) {
      setSelectedMetrics(selectedMetrics.filter(id => id !== metricId));
    } else {
      setSelectedMetrics([...selectedMetrics, metricId]);
    }
  };
  
  // Export report data
  const exportReport = async (format) => {
    setIsExporting(true);
    
    try {
      // Simulate export delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let content = '';
      
      if (format === 'csv') {
        // Create CSV content
        const headers = ['Name', 'Category', 'Funding Total', 'Founded Year', 'Status'];
        content = headers.join(',') + '\n';
        
        tableData.forEach(company => {
          const row = [
            `"${company.name}"`,
            `"${company.category}"`,
            company.fundingTotal,
            company.foundedYear,
            `"${company.status}"`
          ].join(',');
          content += row + '\n';
        });
        
        // Create and download the file
        const blob = new Blob([content], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `legal-tech-report-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (format === 'pdf') {
        // In a real implementation, you would generate a PDF here
        // For now, we'll just show an alert
        alert('PDF export would be generated here. This would include all charts and tables from the current view.');
      }
    } catch (error) {
      console.error('Error exporting report:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-theme-dark flex flex-col">
      <div className="pt-24 px-4 pb-4 flex-grow">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 pt-4">
            <h1 className="font-pixel text-3xl text-theme-pink mb-3">TEKNO INSIGHTS REPORTS</h1>
            <p className="font-mono text-muted-foreground">
              Generate comprehensive reports based on legal tech market data. Customize visualizations and export to CSV or PDF.
            </p>
          </div>
          
          {/* Filters Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <DateRangePicker 
                startDate={startDate}
                endDate={endDate}
                onRangeChange={handleDateRangeChange}
              />
            </div>
            
            <div>
              <div className="flex gap-2">
                <Select value={segment} onValueChange={setSegment}>
                  <SelectTrigger className="bg-theme-dark border-theme-purple hover:bg-theme-purple/20 text-white">
                    <SelectValue placeholder="Segment: All" />
                  </SelectTrigger>
                  <SelectContent className="bg-theme-dark border-theme-purple">
                    {segments.map(item => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={area} onValueChange={setArea}>
                  <SelectTrigger className="bg-theme-dark border-theme-purple hover:bg-theme-purple/20 text-white">
                    <SelectValue placeholder="Area: All" />
                  </SelectTrigger>
                  <SelectContent className="bg-theme-dark border-theme-purple">
                    {areas.map(item => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-theme-dark border-theme-purple text-white p-2 pl-10 rounded"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Chart Type and Metrics Selection */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="bg-theme-dark border-theme-purple hover:bg-theme-purple/20 text-white">
                  <SelectValue placeholder="Chart Type" />
                </SelectTrigger>
                <SelectContent className="bg-theme-dark border-theme-purple">
                  {chartTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <div className="border border-theme-purple rounded p-2 h-full">
                <div className="text-xs font-mono text-muted-foreground mb-1">
                  Select Metrics:
                </div>
                <div className="flex flex-wrap gap-2">
                  {metrics.map(metric => (
                    <button 
                      key={metric.id}
                      className={`px-2 py-0.5 text-xs rounded ${
                        selectedMetrics.includes(metric.id)
                          ? 'bg-theme-pink text-white'
                          : 'bg-theme-dark border border-theme-purple text-muted-foreground'
                      }`}
                      onClick={() => toggleMetric(metric.id)}
                    >
                      {metric.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <Button
                onClick={() => exportReport('csv')}
                disabled={isExporting || tableData.length === 0}
                className="bg-theme-dark border border-theme-purple hover:bg-theme-purple/20 text-white w-full h-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="border border-theme-purple rounded-lg overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="animate-pulse text-theme-light font-mono">Loading report data...</div>
              </div>
            ) : (
              <div className="min-h-[500px]">
                {filteredData.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 p-6">
                    {/* Chart Section */}
                    <div className="h-[300px] bg-theme-dark border border-theme-purple rounded-lg p-4">
                      <h3 className="font-mono font-bold text-theme-light mb-4">
                        {selectedMetrics.map(id => 
                          metrics.find(m => m.id === id)?.name
                        ).join(' vs ')}
                      </h3>
                      <ReportChart 
                        data={filteredData}
                        chartType={chartType}
                        metrics={selectedMetrics}
                      />
                    </div>
                    
                    {/* Table Section */}
                    <div className="overflow-x-auto">
                      <h3 className="font-mono font-bold text-theme-light mb-4">
                        TOP COMPANIES
                      </h3>
                      <div className="border border-theme-purple rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-theme-purple/20 hover:bg-theme-purple/30">
                              <TableHead className="text-theme-light">Company</TableHead>
                              <TableHead className="text-theme-light">Segment</TableHead>
                              <TableHead className="text-theme-light">Founded</TableHead>
                              <TableHead className="text-theme-light text-right">Funding</TableHead>
                              <TableHead className="text-theme-light text-right">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tableData.map((company) => (
                              <TableRow key={company.id} className="hover:bg-theme-purple/10">
                                <TableCell className="font-bold">{company.name}</TableCell>
                                <TableCell>{company.category}</TableCell>
                                <TableCell>{company.foundedYear}</TableCell>
                                <TableCell className="text-right">${company.fundingTotal}M</TableCell>
                                <TableCell className="text-right">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    company.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 
                                    company.status === 'Acquired' ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-red-500/20 text-red-400'
                                  }`}>
                                    {company.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[400px]">
                    <div className="text-muted-foreground font-mono text-center">
                      <FileText className="h-16 w-16 mx-auto opacity-30 mb-4" />
                      <p>No data matches your current filters.</p>
                      <p className="mt-2">Try adjusting your search criteria or date range.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground text-right mt-2 font-mono">
            Last updated: {datasetLastUpdated}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reports;
