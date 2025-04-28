
import React from 'react';
import { marketIndices, getStockChartData } from '@/lib/stockData';
import ChartCard from './ChartCard';

const MarketOverview: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Market Overview</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {marketIndices.map((index) => (
          <ChartCard
            key={index.symbol}
            title={index.symbol}
            description={index.name}
            data={getStockChartData(index.symbol)}
            price={index.price}
            change={index.change}
            changePercent={index.changePercent}
            height={150}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketOverview;
