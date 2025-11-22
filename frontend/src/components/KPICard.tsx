import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export function KPICard({ title, value, subtitle, icon: Icon, trend, className = '' }: KPICardProps) {
  return (
    <div className={`bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground text-sm mb-2">{title}</p>
          <p className="text-3xl text-foreground mb-1">{value}</p>
          {subtitle && (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          )}
          {trend && (
            <div className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {trend.value}
            </div>
          )}
        </div>
        <div className="bg-accent/10 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-accent" />
        </div>
      </div>
    </div>
  );
}
