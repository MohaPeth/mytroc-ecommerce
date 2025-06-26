
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormErrorMessage } from './FormErrorMessage';
import { cn } from '@/lib/utils';

interface BaseFieldProps {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  className?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'time';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}

interface TextareaFieldProps extends BaseFieldProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

interface SelectFieldProps extends BaseFieldProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  error,
  required,
  className,
  type = 'text',
  placeholder,
  value,
  onChange,
  min,
  max,
  step
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        step={step}
        className={cn(error && "border-red-500")}
        required={required}
      />
      <FormErrorMessage message={error} />
    </div>
  );
};

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  id,
  error,
  required,
  className,
  placeholder,
  value,
  onChange,
  rows = 4
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={cn(error && "border-red-500")}
        required={required}
      />
      <FormErrorMessage message={error} />
    </div>
  );
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  error,
  required,
  className,
  placeholder,
  value,
  onChange,
  options
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn(error && "border-red-500")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormErrorMessage message={error} />
    </div>
  );
};
