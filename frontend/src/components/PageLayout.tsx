import React from 'react';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function PageLayout({ title, subtitle, action, children }: PageLayoutProps) {
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl text-foreground mb-2">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
}
