
import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { StockData, searchStocks } from '@/lib/stockData';

interface StockSearchProps {
  onSelectStock: (stock: StockData) => void;
  searchQuery: string;
}

const StockSearch: React.FC<StockSearchProps> = ({ onSelectStock, searchQuery }) => {
  const [results, setResults] = useState<StockData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery) {
      setResults(searchStocks(searchQuery));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isOpen || results.length === 0) {
    return null;
  }

  return (
    <div ref={searchRef} className="absolute top-16 right-4 left-4 md:right-auto md:left-1/2 md:-translate-x-1/2 md:w-[500px] z-50">
      <Card>
        <CardContent className="p-2">
          <div className="flex items-center justify-between mb-2 p-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <SearchIcon className="h-4 w-4" />
              <span>Search Results</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-muted"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-1">
            {results.map((stock) => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer"
                onClick={() => {
                  onSelectStock(stock);
                  setIsOpen(false);
                }}
              >
                <div>
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                </div>
                <div className="text-right">
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
    </div>
  );
};

export default StockSearch;
