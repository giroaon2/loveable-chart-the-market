
import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartData, StockData, getStockChartData } from '@/lib/stockData';
import { XIcon } from 'lucide-react';

interface StockDetailProps {
  stock: StockData;
  onClose: () => void;
}

const StockDetail: React.FC<StockDetailProps> = ({ stock, onClose }) => {
  const data = getStockChartData(stock.symbol);
  const isPositive = stock.change >= 0;

  // Calculate range for scaling
  const minValue = Math.min(...data.map(item => item.value)) - 5;
  const maxValue = Math.max(...data.map(item => item.value)) + 5;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">{stock.name} ({stock.symbol})</CardTitle>
            <CardDescription>Market Cap: {stock.marketCap} • Volume: {stock.volume}</CardDescription>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-muted"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">${stock.price.toFixed(2)}</div>
                <div className={isPositive ? 'positive text-lg' : 'negative text-lg'}>
                  {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </div>
              </div>
              <div className="text-muted-foreground text-sm">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>

            <Tabs defaultValue="area">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="area">Area</TabsTrigger>
                <TabsTrigger value="line">Line</TabsTrigger>
                <TabsTrigger value="volume">Volume</TabsTrigger>
              </TabsList>
              <TabsContent value="area" className="mt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                          <stop 
                            offset="5%" 
                            stopColor={isPositive ? "hsl(var(--positive))" : "hsl(var(--negative))"} 
                            stopOpacity={0.8} 
                          />
                          <stop 
                            offset="95%" 
                            stopColor={isPositive ? "hsl(var(--positive))" : "hsl(var(--negative))"} 
                            stopOpacity={0.1} 
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(tick) => {
                          const date = new Date(tick);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                      />
                      <YAxis domain={[minValue, maxValue]} />
                      <Tooltip 
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                        labelFormatter={(label) => {
                          const date = new Date(label);
                          return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={isPositive ? "hsl(var(--positive))" : "hsl(var(--negative))"} 
                        fillOpacity={1}
                        fill="url(#colorStock)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="line" className="mt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(tick) => {
                          const date = new Date(tick);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                      />
                      <YAxis domain={[minValue, maxValue]} />
                      <Tooltip 
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                        labelFormatter={(label) => {
                          const date = new Date(label);
                          return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={isPositive ? "hsl(var(--positive))" : "hsl(var(--negative))"} 
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="volume" className="mt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(tick) => {
                          const date = new Date(tick);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                      />
                      <YAxis domain={[minValue, maxValue]} />
                      <Tooltip 
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Volume']}
                        labelFormatter={(label) => {
                          const date = new Date(label);
                          return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                        }}
                      />
                      <Bar 
                        dataKey="value" 
                        fill={isPositive ? "hsl(var(--positive))" : "hsl(var(--negative))"} 
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">About {stock.symbol}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    This is a placeholder for company information. In a real application, this would include company description, 
                    sector information, and other relevant details about {stock.name}.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Key Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Market Cap</span>
                      <span className="text-sm font-medium">{stock.marketCap}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Volume</span>
                      <span className="text-sm font-medium">{stock.volume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Day Range</span>
                      <span className="text-sm font-medium">${(stock.price * 0.98).toFixed(2)} - ${(stock.price * 1.02).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">52 Week Range</span>
                      <span className="text-sm font-medium">${(stock.price * 0.8).toFixed(2)} - ${(stock.price * 1.2).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockDetail;
