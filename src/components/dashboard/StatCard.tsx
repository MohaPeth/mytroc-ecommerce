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
  return <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-elevated hover:translate-y-[-4px]", className)}>
      <CardContent className="p-6 px-0 py-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1 tracking-wide uppercase">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
            
            {trend && trendValue && <div className="flex items-center mt-2">
                <div className={cn("flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5", trend === 'up' ? 'bg-green-100 text-green-700' : trend === 'down' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700')}>
                  <span>
                    {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
                  </span>
                  <span>{trendValue}</span>
                </div>
                {description && <span className="text-xs text-muted-foreground ml-2">{description}</span>}
              </div>}
            
            {!trend && description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          </div>
          
          <div className="rounded-lg bg-gradient-to-tr from-mytroc-primary/20 to-mytroc-primary/5 p-3 text-mytroc-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default StatCard;