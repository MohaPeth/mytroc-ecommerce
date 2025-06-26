
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormErrorMessageProps {
  message?: string;
  className?: string;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ 
  message, 
  className 
}) => {
  if (!message) return null;

  return (
    <div className={cn("flex items-center gap-2 text-sm text-red-600 mt-1", className)}>
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};
