
// This file contains mock data for demonstration purposes
// In a production app, this would be replaced with actual API calls

export interface LegalTechCompany {
  id: string;
  name: string;
  category: string;
  fundingTotal: number;
  fundingRounds: FundingRound[];
  foundedYear: number;
  employees: number;
  burnRate: number;
  annualRevenue: number | null;
  valuation: number | null;
  investors: string[];
}

export interface FundingRound {
  id: string;
  type: 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'Series D' | 'Private Equity' | 'IPO';
  amount: number;
  date: string;
  leadInvestor: string;
  postMoneyValuation: number | null;
}

export const mockCompanies: LegalTechCompany[] = [
  {
    id: '1',
    name: 'Clio',
    category: 'Practice Management',
    fundingTotal: 250,
    fundingRounds: [
      {
        id: '1-1',
        type: 'Series D',
        amount: 250,
        date: '2023-05-15',
        leadInvestor: 'TCV',
        postMoneyValuation: 1800
      }
    ],
    foundedYear: 2008,
    employees: 650,
    burnRate: 2.8,
    annualRevenue: 120,
    valuation: 1800,
    investors: ['TCV', 'JMI Equity', 'Bessemer Venture Partners']
  },
  {
    id: '2',
    name: 'LegalZoom',
    category: 'Legal Services',
    fundingTotal: 535,
    fundingRounds: [
      {
        id: '2-1',
        type: 'IPO',
        amount: 535,
        date: '2023-03-22',
        leadInvestor: 'Public Market',
        postMoneyValuation: 7500
      }
    ],
    foundedYear: 2001,
    employees: 1100,
    burnRate: 8.5,
    annualRevenue: 470,
    valuation: 7500,
    investors: ['Kleiner Perkins', 'Institutional Venture Partners', 'T. Rowe Price']
  },
  {
    id: '3',
    name: 'Relativity',
    category: 'E-Discovery',
    fundingTotal: 100,
    fundingRounds: [
      {
        id: '3-1',
        type: 'Private Equity',
        amount: 100,
        date: '2023-07-10',
        leadInvestor: 'Silver Lake',
        postMoneyValuation: 3500
      }
    ],
    foundedYear: 2001,
    employees: 1300,
    burnRate: 7.2,
    annualRevenue: 380,
    valuation: 3500,
    investors: ['Silver Lake', 'ICONIQ Capital']
  },
  {
    id: '4',
    name: 'ContractPodAi',
    category: 'Contract Management',
    fundingTotal: 115,
    fundingRounds: [
      {
        id: '4-1',
        type: 'Series C',
        amount: 115,
        date: '2023-04-05',
        leadInvestor: 'SoftBank Vision Fund',
        postMoneyValuation: 650
      }
    ],
    foundedYear: 2012,
    employees: 280,
    burnRate: 3.5,
    annualRevenue: 45,
    valuation: 650,
    investors: ['SoftBank Vision Fund', 'Eagle Proprietary Investments', 'Insight Partners']
  },
  {
    id: '5',
    name: 'Everlaw',
    category: 'E-Discovery',
    fundingTotal: 85,
    fundingRounds: [
      {
        id: '5-1',
        type: 'Series D',
        amount: 85,
        date: '2023-02-18',
        leadInvestor: 'CapitalG',
        postMoneyValuation: 820
      }
    ],
    foundedYear: 2010,
    employees: 320,
    burnRate: 4.1,
    annualRevenue: 70,
    valuation: 820,
    investors: ['CapitalG', 'Menlo Ventures', 'Andreessen Horowitz']
  }
];

export const mockCategories = [
  'Practice Management',
  'Contract Management',
  'E-Discovery',
  'Legal Research',
  'Regulatory Tech',
  'IP Management',
  'Access to Justice',
  'Legal Services',
  'Document Automation'
];

export const mockMarketTrends = [
  {
    id: '1',
    trend: 'AI Integration',
    description: 'Machine learning and AI features becoming standard in legal tech products',
    growthRate: 38,
    category: 'Technology'
  },
  {
    id: '2',
    trend: 'Cloud Migration',
    description: 'Shift from on-premise to cloud-based legal software solutions',
    growthRate: 27,
    category: 'Infrastructure'
  },
  {
    id: '3',
    trend: 'API-First Design',
    description: 'Platforms prioritizing interoperability and ecosystem integration',
    growthRate: 24,
    category: 'Architecture'
  },
  {
    id: '4',
    trend: 'Compliance Automation',
    description: 'Automated regulatory compliance monitoring and updating',
    growthRate: 21,
    category: 'Functionality'
  },
  {
    id: '5',
    trend: 'Legal Process Automation',
    description: 'End-to-end workflow automation for common legal processes',
    growthRate: 18,
    category: 'Efficiency'
  }
];

// Mock function to simulate API call for chat responses
export const getMockChatResponse = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (query.toLowerCase().includes('funding') || query.toLowerCase().includes('investment')) {
        resolve(`Based on our data, legal tech funding reached $4.9 billion in 2023, a 23% increase year-over-year. The top categories by funding were Practice Management (28%), E-Discovery (20%), and Contract Management (18%).`);
      } else if (query.toLowerCase().includes('trends') || query.toLowerCase().includes('growing')) {
        resolve(`The fastest growing trends in legal tech are AI integration (38% YoY growth), cloud migration (27% growth), and API-first design (24% growth). Compliance automation and legal process automation are also showing significant traction.`);
      } else if (query.toLowerCase().includes('company') || query.toLowerCase().includes('companies')) {
        resolve(`The top 5 legal tech companies by valuation are LegalZoom ($7.5B), Relativity ($3.5B), Clio ($1.8B), Everlaw ($820M), and ContractPodAi ($650M). Collectively, these companies raised over $1 billion in funding in 2023.`);
      } else {
        resolve(`I don't have specific information on that query. Would you like to know about legal tech funding trends, company valuations, or market growth areas?`);
      }
    }, 1500);
  });
};
