import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import MarketOverview from '@/components/MarketOverview';
import TrendingStocks from '@/components/TrendingStocks';
import StockSearch from '@/components/StockSearch';
import StockDetail from '@/components/StockDetail';
import ChartCard from '@/components/ChartCard';
import { getStockChartData, StockData, trendingStocks } from '@/lib/stockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, DollarSign, TrendingUp, Coins } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectStock = (stock: StockData) => {
    setSelectedStock(stock);
    setSearchQuery('');
  };

  const handleCloseStockDetail = () => {
    setSelectedStock(null);
  };

  const handleStockCardClick = (stock: StockData) => {
    setSelectedStock(stock);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onOpenMenu={() => setMenuOpen(!menuOpen)} onSearch={handleSearch} />
      <StockSearch searchQuery={searchQuery} onSelectStock={handleSelectStock} />
      
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>S&P 500</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,035.16</div>
              <div className="text-xs text-muted-foreground">{t('last_updated')}: {new Date().toLocaleDateString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                  <span>Dow Jones</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">38,273.54</div>
              <div className="text-xs text-muted-foreground">{t('last_updated')}: {new Date().toLocaleDateString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span>NASDAQ</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15,938.92</div>
              <div className="text-xs text-muted-foreground">{t('last_updated')}: {new Date().toLocaleDateString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-muted-foreground" />
                  <span>Russell 2000</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,016.69</div>
              <div className="text-xs text-muted-foreground">{t('last_updated')}: {new Date().toLocaleDateString()}</div>
            </CardContent>
          </Card>
        </div>
        
        <MarketOverview />
        
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">{t('top_performers')}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {trendingStocks.slice(0, 4).map((stock) => (
                  <ChartCard
                    key={stock.symbol}
                    title={stock.symbol}
                    description={stock.name}
                    data={getStockChartData(stock.symbol)}
                    price={stock.price}
                    change={stock.change}
                    changePercent={stock.changePercent}
                    height={180}
                    onClick={() => handleStockCardClick(stock)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">{t('market_activity')}</h2>
            <TrendingStocks />
          </div>
        </div>
      </main>
      
      {selectedStock && (
        <StockDetail stock={selectedStock} onClose={handleCloseStockDetail} />
      )}
    </div>
  );
};

export default Index;
