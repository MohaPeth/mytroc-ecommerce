
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type StatusType = 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'info' 
  | 'pending' 
  | 'approved' 
  | 'rejected' 
  | 'completed' 
  | 'cancelled'
  | 'published'
  | 'draft';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<string, { color: string; label: string }> = {
  success: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Succès' },
  error: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Erreur' },
  warning: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Attention' },
  info: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Info' },
  pending: { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'En attente' },
  approved: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Approuvé' },
  rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejeté' },
  completed: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Terminé' },
  cancelled: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Annulé' },
  published: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Publié' },
  draft: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Brouillon' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  className,
  size = 'md'
}) => {
  const config = statusConfig[status.toLowerCase()] || statusConfig.info;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  };

  return (
    <Badge 
      className={cn(
        config.color,
        sizeClasses[size],
        'border font-medium',
        className
      )}
    >
      {config.label}
    </Badge>
  );
};
