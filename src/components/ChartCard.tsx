
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartData } from '@/lib/stockData';

interface ChartCardProps {
  title: string;
  description?: string;
  data: ChartData[];
  price: number;
  change: number;
  changePercent: number;
  height?: number;
  onClick?: () => void;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  data,
  price,
  change,
  changePercent,
  height = 250,
  onClick
}) => {
  const isPositive = change >= 0;
  const chartColor = isPositive ? 'hsl(var(--positive))' : 'hsl(var(--negative))';
  
  // Format price with commas for thousands
  const formattedPrice = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${formattedPrice}</div>
            <div className={isPositive ? 'positive' : 'negative'}>
              {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(tick) => {
                  const date = new Date(tick);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
                tick={{ fontSize: 10 }}
                tickMargin={5}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={['dataMin - 5', 'dataMax + 5']} 
                hide 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={chartColor} 
                fillOpacity={1}
                fill={`url(#color${title})`} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
