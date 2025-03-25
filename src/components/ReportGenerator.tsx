
import { useState } from 'react';
import { FileText, Download, Loader2, ChevronDown, Check } from 'lucide-react';

interface ReportOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ReportGenerator = () => {
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);

  const reportOptions: ReportOption[] = [
    {
      id: 'market-overview',
      title: 'Market Overview',
      description: 'Comprehensive analysis of legal tech market size, growth, and trends',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'funding-analysis',
      title: 'Funding Analysis',
      description: 'Detailed breakdown of investment rounds, valuations, and investor activity',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'competitive-landscape',
      title: 'Competitive Landscape',
      description: 'Analysis of key players, market segmentation, and competitive positioning',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'technology-trends',
      title: 'Technology Trends',
      description: 'Deep dive into emerging technologies, adoption rates, and innovation patterns',
      icon: <FileText className="w-5 h-5" />
    }
  ];

  const handleReportTypeSelect = (reportId: string) => {
    setSelectedReportType(reportId);
    setIsDropdownOpen(false);
  };

  const generateReport = async () => {
    if (!selectedReportType) return;

    setIsGenerating(true);
    setGeneratedReport(null);

    // Simulate report generation delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const reports = {
      'market-overview': `# Legal Tech Market Overview Report
      
## Executive Summary
The global legal tech market is experiencing unprecedented growth, with a CAGR of 16.5% over the past five years. Current market size stands at $25.7 billion, with projections indicating a $38.2 billion market by 2026.

## Market Dynamics
- **Growth Drivers**: Digital transformation initiatives, cost reduction pressures, COVID-19 acceleration
- **Inhibitors**: Regulatory complexity, security concerns, slow adoption in traditional firms
- **Regional Analysis**: North America (48%), Europe (29%), APAC (18%), ROW (5%)

## Segment Analysis
1. **Practice Management**: $7.2B, 12.8% CAGR
2. **Contract Management**: $4.6B, 18.7% CAGR
3. **IP Management**: $3.9B, 9.2% CAGR
4. **E-discovery**: $5.1B, 15.3% CAGR
5. **Legal Research**: $3.5B, 22.1% CAGR
6. **Others**: $1.4B, 8.5% CAGR

## Key Trends
1. Cloud adoption accelerating (76% of new deployments)
2. AI integration becoming standard (53% of tools incorporate NLP)
3. Mobile-first solutions gaining traction (38% YoY growth)
4. API-first platforms dominating new entrants (91% of 2022-23 launches)

## Investment Outlook
The sector has attracted $9.1 billion in venture capital over the past 24 months, with a notable shift toward later-stage investments as the market matures.`,

      'funding-analysis': `# Legal Tech Funding Analysis Report
      
## Executive Summary
Legal tech funding reached a record $4.9 billion in 2023, representing a 23% increase YoY despite broader tech investment contraction. The sector is attracting unprecedented attention from specialized legal tech VCs and mainstream investors.

## Investment Rounds
- **Seed/Angel**: $410M across 112 deals, $3.7M avg deal
- **Series A**: $985M across 43 deals, $22.9M avg deal
- **Series B**: $1.1B across 28 deals, $39.3M avg deal
- **Series C+**: $1.7B across 15 deals, $113.3M avg deal
- **PE/M&A**: $704M across 18 deals, $39.1M avg deal

## Investor Landscape
### Most Active VCs
1. LegalTech Fund (19 deals)
2. Bessemer Venture Partners (12 deals)
3. Andreessen Horowitz (9 deals)
4. Sequoia Capital (8 deals)
5. Accel (7 deals)

### Geographic Distribution
- US/Canada: 61% of funding
- Europe: 24% of funding
- Asia: 11% of funding
- Rest of World: 4% of funding

## Valuations
- Early-stage median: $12M pre-money
- Mid-stage median: $89M pre-money
- Late-stage median: $315M pre-money

## Exit Activity
- 8 IPOs in past 36 months
- 37 acquisitions in past 24 months
- Median exit multiple: 5.7x revenue`,

      'competitive-landscape': `# Legal Tech Competitive Landscape Report
      
## Executive Summary
The legal tech landscape has grown increasingly complex, with 1,587 active companies competing across 17 distinct categories. Market concentration is increasing through consolidation, with the top 5% of companies controlling 63% of market share.

## Market Leaders by Segment
### Practice Management
1. Clio (21% market share)
2. MyCase (14% market share)
3. Smokeball (9% market share)

### Contract Management
1. DocuSign (26% market share)
2. Ironclad (17% market share)
3. ContractPodAi (11% market share)

### E-Discovery
1. Relativity (31% market share)
2. Logikcull (14% market share)
3. Everlaw (11% market share)

### Legal Research
1. LexisNexis (28% market share)
2. Westlaw (25% market share)
3. ROSS Intelligence (7% market share)

## Competitive Positioning Matrix
The industry has evolved into four distinct strategic groups:
1. **Incumbents**: High market share, mature offerings, slower innovation
2. **Challengers**: Rapid growth, targeted offerings, high innovation velocity
3. **Specialists**: Niche focus, deep expertise, premium pricing
4. **Disruptors**: Novel business models, radical innovation, category creation

## Customer Satisfaction
- Industry NPS average: 36
- Highest NPS: ContractPodAi (72)
- Lowest NPS among leaders: LegalZoom (18)

## Barriers to Entry
1. Data network effects (strongest in research tools)
2. Regulatory compliance expertise
3. Ecosystem integration requirements
4. Channel relationships with law schools/firms`,

      'technology-trends': `# Legal Tech Technology Trends Report
      
## Executive Summary
The legal tech sector is undergoing rapid technological transformation, with AI/ML, blockchain, and cloud technologies driving the next wave of innovation. We're seeing convergence between previously distinct technology stacks and increased emphasis on interoperability.

## Key Technology Trends

### AI and Machine Learning
- 76% of new legal tech products incorporate AI components
- NLP capabilities present in 82% of document review tools
- Predictive analytics adoption up 117% YoY
- GPT-based solutions growing at 184% CAGR

### Data Security & Privacy
- Zero-trust architecture adoption up 143% in legal tech
- 91% of solutions now offer end-to-end encryption
- Blockchain-verified document integrity growing at 68% CAGR
- Multi-factor authentication standard in 97% of enterprise solutions

### Cloud Architecture
- SaaS delivery model dominates with 83% market share
- Multi-cloud deployment strategies adopted by 47% of vendors
- Edge computing implementations emerging for time-sensitive applications
- Containerization adoption up 128% YoY

### Integration & Interoperability
- API-first design philosophy adopted by 76% of new entrants
- Open API standards gaining traction (73% of new products)
- Microservices architecture implemented by 62% of scale-ups
- Standard data exchange formats emerging (SALI, LEDES 2.0)

## Innovation Hotspots
1. **Smart contracts**: Programmable agreements with automated execution
2. **Predictive justice**: Outcome prediction based on historical case data
3. **Regulatory intelligence**: Automated compliance monitoring and updating
4. **Legal process automation**: End-to-end workflow automation
5. **Knowledge graphs**: Relationship mapping across legal concepts and documents`
    };

    setGeneratedReport(reports[selectedReportType as keyof typeof reports] || null);
    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (!generatedReport) return;
    
    // Create a blob from the report content
    const blob = new Blob([generatedReport], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedReportType}-report.md`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h2 className="text-xl font-pixel text-theme-pink mb-6">Investment Report Generator</h2>
        
        {/* Report selection */}
        <div className="mb-8">
          <label className="block text-sm font-mono text-theme-light mb-2">
            Report Type
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full flex items-center justify-between bg-theme-dark border border-theme-purple rounded-md px-4 py-3 text-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedReportType ? (
                reportOptions.find(opt => opt.id === selectedReportType)?.title
              ) : (
                "Select a report type"
              )}
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute mt-1 w-full bg-theme-dark border border-theme-purple rounded-md shadow-lg z-10 animate-pixel-fade-in">
                {reportOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`w-full flex items-start gap-3 p-3 hover:bg-theme-purple transition-colors ${
                      selectedReportType === option.id ? 'bg-theme-purple/50' : ''
                    }`}
                    onClick={() => handleReportTypeSelect(option.id)}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {option.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium flex items-center">
                        {option.title}
                        {selectedReportType === option.id && (
                          <Check className="w-4 h-4 ml-2" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Generate button */}
        <button
          onClick={generateReport}
          disabled={!selectedReportType || isGenerating}
          className={`w-full py-3 rounded-md font-pixel ${
            !selectedReportType || isGenerating 
              ? 'bg-theme-purple/50 cursor-not-allowed' 
              : 'pixel-button'
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Generating Report...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <FileText className="w-5 h-5 mr-2" />
              Generate Report
            </div>
          )}
        </button>
      </div>
      
      {/* Generated report display */}
      {generatedReport && (
        <div className="flex-1 border-t border-theme-purple mt-4 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-theme-purple">
            <h3 className="font-pixel text-theme-pink">
              {reportOptions.find(opt => opt.id === selectedReportType)?.title} Report
            </h3>
            <button
              onClick={handleDownload}
              className="flex items-center text-sm font-mono bg-theme-dark hover:bg-theme-purple transition-colors px-3 py-1.5 rounded border border-theme-purple"
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="retro-terminal font-mono text-sm whitespace-pre-line">
              {generatedReport}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;
