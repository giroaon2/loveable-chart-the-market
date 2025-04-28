
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
}

export interface ChartData {
  date: string;
  value: number;
}

export const marketIndices = [
  {
    symbol: "^DJI",
    name: "Dow Jones Industrial Average",
    price: 38273.54,
    change: 85.68,
    changePercent: 0.22,
  },
  {
    symbol: "^GSPC",
    name: "S&P 500",
    price: 5035.16,
    change: -3.28,
    changePercent: -0.07,
  },
  {
    symbol: "^IXIC",
    name: "NASDAQ Composite",
    price: 15938.92,
    change: 49.32,
    changePercent: 0.31,
  },
  {
    symbol: "^RUT",
    name: "Russell 2000",
    price: 2016.69,
    change: -12.87,
    changePercent: -0.63,
  },
];

export const trendingStocks: StockData[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.52,
    change: 1.76,
    changePercent: 0.97,
    marketCap: "2.82T",
    volume: "59.67M",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 402.56,
    change: -2.29,
    changePercent: -0.57,
    marketCap: "2.99T",
    volume: "22.54M",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 178.12,
    change: 2.34,
    changePercent: 1.33,
    marketCap: "1.85T",
    volume: "32.78M",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 143.96,
    change: -1.23,
    changePercent: -0.85,
    marketCap: "1.79T",
    volume: "25.41M",
  },
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    price: 463.28,
    change: 5.93,
    changePercent: 1.30,
    marketCap: "1.18T",
    volume: "17.92M",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 193.57,
    change: -2.84,
    changePercent: -1.45,
    marketCap: "617.32B",
    volume: "97.29M",
  },
];

export const getStockChartData = (symbol: string): ChartData[] => {
  // Generate random chart data for demo purposes
  const today = new Date();
  const data: ChartData[] = [];
  
  // Base value varies by stock symbol to create different charts
  let baseValue = 0;
  switch (symbol) {
    case "AAPL": baseValue = 180; break;
    case "MSFT": baseValue = 400; break;
    case "AMZN": baseValue = 175; break;
    case "GOOGL": baseValue = 140; break;
    case "META": baseValue = 460; break;
    case "TSLA": baseValue = 190; break;
    case "^DJI": baseValue = 38200; break;
    case "^GSPC": baseValue = 5000; break;
    case "^IXIC": baseValue = 15900; break;
    case "^RUT": baseValue = 2000; break;
    default: baseValue = 100;
  }
  
  // Generate data for the last 30 days
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Random fluctuation around the base value
    const randomFactor = 0.05; // 5% max fluctuation
    const fluctuation = baseValue * randomFactor * (Math.random() - 0.5) * 2;
    const value = baseValue + fluctuation;
    
    // Slight trend based on the day to create patterns
    const trend = (i % 7 === 0) ? baseValue * 0.01 : 0; 
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat((value + trend).toFixed(2))
    });
    
    // Update base value for next iteration (creates a trend)
    baseValue = value;
  }
  
  return data;
};

export const getStockDetails = (symbol: string): StockData | undefined => {
  const stock = trendingStocks.find(stock => stock.symbol === symbol);
  return stock;
};

export const searchStocks = (query: string): StockData[] => {
  if (!query) return [];
  
  const normalizedQuery = query.toLowerCase();
  return trendingStocks.filter(
    stock => 
      stock.symbol.toLowerCase().includes(normalizedQuery) || 
      stock.name.toLowerCase().includes(normalizedQuery)
  );
};
