
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface UnifiedLoadingStateProps {
  variant?: 'spinner' | 'skeleton' | 'card' | 'full-page';
  text?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UnifiedLoadingState: React.FC<UnifiedLoadingStateProps> = ({
  variant = 'spinner',
  text,
  className,
  size = 'md'
}) => {
  if (variant === 'full-page') {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <LoadingSpinner size={size} text={text} />
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <Card className={cn("animate-pulse", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <LoadingSpinner size={size} text={text} />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/5"></div>
      </div>
    );
  }

  return (
    <div className={cn("flex justify-center items-center py-8", className)}>
      <LoadingSpinner size={size} text={text} />
    </div>
  );
};
