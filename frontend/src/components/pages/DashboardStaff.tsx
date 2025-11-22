import React from 'react';
import { CheckCircle2, PackageCheck, Truck, ArrowLeftRight, Clock } from 'lucide-react';
import { PageLayout } from '../PageLayout';
import { Button } from '../ui/button';
import { StatusBadge } from '../StatusBadge';

const tasksToday = [
  { 
    id: 1, 
    type: 'receipt', 
    title: 'Process Receipt #RCP-2045',
    vendor: 'Tech Supplies Co.',
    items: 25,
    priority: 'high',
    dueTime: '10:00 AM'
  },
  { 
    id: 2, 
    type: 'delivery', 
    title: 'Pick Delivery #DEL-8903',
    customer: 'Enterprise Corp',
    items: 12,
    priority: 'high',
    dueTime: '11:30 AM'
  },
  { 
    id: 3, 
    type: 'transfer', 
    title: 'Internal Transfer #TRF-4521',
    from: 'Main Warehouse',
    to: 'Warehouse B',
    items: 8,
    priority: 'medium',
    dueTime: '2:00 PM'
  },
  { 
    id: 4, 
    type: 'receipt', 
    title: 'Process Receipt #RCP-2046',
    vendor: 'Office Depot',
    items: 18,
    priority: 'medium',
    dueTime: '3:30 PM'
  },
];

export function DashboardStaff() {
  return (
    <PageLayout
      title="My Tasks"
      subtitle="Here are your assigned tasks for today."
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Tasks Today</p>
            <Clock className="w-5 h-5 text-accent" />
          </div>
          <p className="text-3xl text-foreground mb-1">12</p>
          <p className="text-xs text-green-600 dark:text-green-400">4 completed</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Receipts to Process</p>
            <PackageCheck className="w-5 h-5 text-accent" />
          </div>
          <p className="text-3xl text-foreground">5</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Deliveries to Pick</p>
            <Truck className="w-5 h-5 text-accent" />
          </div>
          <p className="text-3xl text-foreground">4</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Transfers Assigned</p>
            <ArrowLeftRight className="w-5 h-5 text-accent" />
          </div>
          <p className="text-3xl text-foreground">3</p>
        </div>
      </div>

      {/* Tasks for Today */}
      <div className="mb-8">
        <h3 className="text-foreground mb-4">Tasks for Today</h3>
        <div className="space-y-4">
          {tasksToday.map((task) => (
            <div
              key={task.id}
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      task.type === 'receipt' 
                        ? 'bg-green-100 dark:bg-green-900/30' 
                        : task.type === 'delivery'
                        ? 'bg-blue-100 dark:bg-blue-900/30'
                        : 'bg-purple-100 dark:bg-purple-900/30'
                    }`}>
                      {task.type === 'receipt' && <PackageCheck className="w-5 h-5 text-green-600 dark:text-green-400" />}
                      {task.type === 'delivery' && <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                      {task.type === 'transfer' && <ArrowLeftRight className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                    </div>
                    <div>
                      <h4 className="text-foreground mb-1">{task.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {task.type === 'receipt' && `Vendor: ${task.vendor}`}
                        {task.type === 'delivery' && `Customer: ${task.customer}`}
                        {task.type === 'transfer' && `${task.from} → ${task.to}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>Items:</span>
                      <span className="text-foreground">{task.items}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Due: {task.dueTime}</span>
                    </div>
                    <StatusBadge variant={task.priority === 'high' ? 'high' : 'medium'}>
                      {task.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                    </StatusBadge>
                  </div>
                </div>

                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Start Task
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Completed */}
      <div>
        <h3 className="text-foreground mb-4">Recently Completed</h3>
        <div className="space-y-3">
          {[
            { title: 'Receipt #RCP-2044 processed', time: '8:30 AM', items: 30 },
            { title: 'Delivery #DEL-8902 picked', time: '9:15 AM', items: 15 },
            { title: 'Transfer #TRF-4520 completed', time: '9:45 AM', items: 10 },
          ].map((task, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-foreground">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.items} items • {task.time}</p>
                </div>
              </div>
              <StatusBadge variant="done">Completed</StatusBadge>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
