import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: React.ComponentType<{ className?: string }>;
  color?: 'primary' | 'success' | 'warning' | 'info';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = 'primary' 
}) => {
  const colorClasses = {
    primary: 'text-primary-500 bg-primary-50',
    success: 'text-green-500 bg-green-50',
    warning: 'text-yellow-500 bg-yellow-50',
    info: 'text-blue-500 bg-blue-50',
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-secondary text-sm font-medium">{title}</p>
          <p className="text-2xl font-semibold text-text-primary mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              {change.type === 'increase' ? (
                <ArrowUpIcon className="w-4 h-4 text-success mr-1" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 text-error mr-1" />
              )}
              <span className={`text-sm ${change.type === 'increase' ? 'text-success' : 'text-error'}`}>
                {Math.abs(change.value)}%
              </span>
              <span className="text-text-secondary text-sm ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;