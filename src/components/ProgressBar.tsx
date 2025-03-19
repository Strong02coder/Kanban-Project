
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, className }) => {
  return (
    <div className={cn("w-full h-1.5 bg-secondary rounded-full overflow-hidden", className)}>
      <div 
        className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
        style={{ width: `${value}%` }}
        role="progressbar" 
        aria-valuenow={value} 
        aria-valuemin={0} 
        aria-valuemax={100}
      />
    </div>
  );
};

export default ProgressBar;
