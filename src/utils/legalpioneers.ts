
import { LegalTechCompany, FundingRound } from './mockData';

// Function to fetch and process data from the Legalpioneer GitHub repository
export async function fetchLegalpioneerData(): Promise<LegalTechCompany[]> {
  try {
    // Fetch the dataset from GitHub raw content
    const response = await fetch('https://raw.githubusercontent.com/Legalcomplex/Legalpioneer/main/data/legaltech_companies.json');
    
    if (!response.ok) {
      throw new Error('Failed to fetch Legalpioneer data');
    }

    const data = await response.json();
    
    // Transform the data to match our LegalTechCompany interface
    const transformedData: LegalTechCompany[] = data.map((item: any) => ({
      id: item.id || String(Math.random()),
      name: item.name || 'Unknown',
      category: item.category || 'Other',
      fundingTotal: item.funding_total || 0,
      fundingRounds: transformFundingRounds(item.funding_rounds || []),
      foundedYear: item.founded_year || 2000,
      employees: item.employees || 0,
      burnRate: item.burn_rate || 0,
      annualRevenue: item.annual_revenue || null,
      valuation: item.valuation || null,
      investors: item.investors || []
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching Legalpioneer data:', error);
    // Fall back to mock data if fetching fails
    console.log('Falling back to mock data');
    const { mockCompanies } = await import('./mockData');
    return mockCompanies;
  }
}

// Helper function to transform funding rounds data
function transformFundingRounds(rounds: any[]): FundingRound[] {
  return rounds.map((round, index) => ({
    id: round.id || `round-${index}`,
    type: mapRoundType(round.type),
    amount: round.amount || 0,
    date: round.date || new Date().toISOString().split('T')[0],
    leadInvestor: round.lead_investor || 'Unknown',
    postMoneyValuation: round.post_money_valuation || null
  }));
}

// Map round types to our expected format
function mapRoundType(type: string): 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'Series D' | 'Private Equity' | 'IPO' {
  const typeMap: Record<string, 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'Series D' | 'Private Equity' | 'IPO'> = {
    'seed': 'Seed',
    'series_a': 'Series A',
    'series_b': 'Series B',
    'series_c': 'Series C',
    'series_d': 'Series D',
    'private_equity': 'Private Equity',
    'ipo': 'IPO',
  };
  
  return typeMap[type?.toLowerCase()] || 'Seed';
}

// Function to get market trends data
export async function fetchMarketTrendsData() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Legalcomplex/Legalpioneer/main/data/market_trends.json');
    
    if (!response.ok) {
      throw new Error('Failed to fetch market trends data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching market trends data:', error);
    // Fall back to mock data if fetching fails
    const { mockMarketTrends } = await import('./mockData');
    return mockMarketTrends;
  }
}
