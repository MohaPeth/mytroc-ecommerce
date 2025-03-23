
import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

interface SalesChartProps {
  data: SalesData[];
  title: string;
  description?: string;
}

const SalesChart: React.FC<SalesChartProps> = ({ data, title, description }) => {
  const chartConfig = {
    revenue: {
      label: "Revenu",
      color: "#16a34a"
    },
    orders: {
      label: "Commandes",
      color: "#3b82f6"
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer 
          config={chartConfig}
          className="aspect-[4/3] sm:aspect-[16/9]"
        >
          <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  labelFormatter={(value) => `Date: ${value}`}
                />
              }
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="revenue" 
              stroke="var(--color-revenue)" 
              activeDot={{ r: 8 }} 
              name="Revenu" 
              strokeWidth={2}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="orders" 
              stroke="var(--color-orders)" 
              activeDot={{ r: 8 }} 
              name="Commandes" 
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
