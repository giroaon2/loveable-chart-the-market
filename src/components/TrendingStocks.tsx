
import React from 'react';
import { trendingStocks } from '@/lib/stockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartBar, TrendingUp } from 'lucide-react';

const TrendingStocks: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Trending Stocks</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingStocks.slice(0, 5).map((stock) => (
            <div key={stock.symbol} className="flex items-center">
              <div className="flex items-center gap-2 w-[30%]">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <ChartBar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-xs text-muted-foreground truncate w-24">{stock.name}</div>
                </div>
              </div>
              <div className="flex-1 text-right">
                <div className="font-medium">${stock.price.toFixed(2)}</div>
                <div className={stock.change >= 0 ? 'positive text-xs' : 'negative text-xs'}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingStocks;
