
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            
            {(trend && trendValue) && (
              <div className="flex items-center mt-2">
                <span className={cn(
                  "text-xs font-medium",
                  trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'
                )}>
                  {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
                </span>
                {description && <span className="text-xs text-muted-foreground ml-1">{description}</span>}
              </div>
            )}
            
            {(!trend && description) && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          
          <div className="rounded-full bg-mytroc-primary/10 p-2.5 text-mytroc-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
