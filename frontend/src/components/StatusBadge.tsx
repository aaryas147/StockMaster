import React from 'react';

type BadgeVariant = 'done' | 'draft' | 'waiting' | 'canceled' | 'pending' | 'low' | 'medium' | 'high';

interface StatusBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  done: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  draft: 'bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-400',
  waiting: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  canceled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  pending: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  low: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  high: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

export function StatusBadge({ variant, children, className = '' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
