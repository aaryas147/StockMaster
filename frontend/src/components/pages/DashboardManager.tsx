import React from 'react';
import { Package, AlertTriangle, PackageCheck, Truck, TrendingUp, TrendingDown } from 'lucide-react';
import { PageLayout } from '../PageLayout';
import { KPICard } from '../KPICard';
import { DataTable } from '../DataTable';
import { StatusBadge } from '../StatusBadge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stockTrendData = [
  { month: 'Jan', value: 45000 },
  { month: 'Feb', value: 52000 },
  { month: 'Mar', value: 48000 },
  { month: 'Apr', value: 61000 },
  { month: 'May', value: 55000 },
  { month: 'Jun', value: 67000 },
];

const lowStockItems = [
  { id: 1, name: 'Laptop Stand Pro', sku: 'LSP-001', current: 5, minimum: 20, status: 'low' },
  { id: 2, name: 'Wireless Mouse Elite', sku: 'WME-045', current: 8, minimum: 25, status: 'low' },
  { id: 3, name: 'USB-C Hub', sku: 'UCH-023', current: 12, minimum: 30, status: 'low' },
  { id: 4, name: 'Webcam 4K Pro', sku: 'WCP-089', current: 3, minimum: 15, status: 'low' },
];

const recentTransactions = [
  { id: 1, type: 'Receipt', item: 'Mechanical Keyboard', qty: '+50', time: '2 hours ago', status: 'done' },
  { id: 2, type: 'Delivery', item: 'Monitor 27"', qty: '-15', time: '3 hours ago', status: 'done' },
  { id: 3, type: 'Transfer', item: 'Office Chair', qty: '10', time: '5 hours ago', status: 'waiting' },
  { id: 4, type: 'Adjustment', item: 'Desk Lamp', qty: '-2', time: '6 hours ago', status: 'done' },
  { id: 5, type: 'Receipt', item: 'Cable Organizer', qty: '+100', time: '8 hours ago', status: 'done' },
];

export function DashboardManager() {
  const lowStockColumns = [
    { key: 'name', header: 'Product Name' },
    { key: 'sku', header: 'SKU' },
    { 
      key: 'current', 
      header: 'Current Stock',
      render: (item: typeof lowStockItems[0]) => (
        <span className="text-red-600 dark:text-red-400">{item.current}</span>
      )
    },
    { key: 'minimum', header: 'Min. Required' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof lowStockItems[0]) => (
        <StatusBadge variant="low">Low Stock</StatusBadge>
      )
    },
  ];

  const transactionsColumns = [
    { key: 'type', header: 'Type' },
    { key: 'item', header: 'Item' },
    { 
      key: 'qty', 
      header: 'Quantity',
      render: (item: typeof recentTransactions[0]) => (
        <span className={item.qty.startsWith('+') ? 'text-green-600 dark:text-green-400' : item.qty.startsWith('-') ? 'text-red-600 dark:text-red-400' : ''}>
          {item.qty}
        </span>
      )
    },
    { key: 'time', header: 'Time' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof recentTransactions[0]) => (
        <StatusBadge variant={item.status as any}>{item.status === 'done' ? 'Completed' : 'Pending'}</StatusBadge>
      )
    },
  ];

  return (
    <PageLayout
      title="Dashboard"
      subtitle="Welcome back! Here's what's happening with your inventory today."
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Products"
          value="1,248"
          icon={Package}
          trend={{ value: '+12% from last month', isPositive: true }}
        />
        <KPICard
          title="Low Stock Items"
          value="24"
          subtitle="Requires attention"
          icon={AlertTriangle}
          trend={{ value: '+4 since yesterday', isPositive: false }}
        />
        <KPICard
          title="Pending Receipts"
          value="18"
          subtitle="Awaiting processing"
          icon={PackageCheck}
        />
        <KPICard
          title="Pending Deliveries"
          value="32"
          subtitle="Ready to ship"
          icon={Truck}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Stock Trend Chart */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-foreground mb-1">Stock Value Trend</h3>
              <p className="text-sm text-muted-foreground">Last 6 months</p>
            </div>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+18.2%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={stockTrendData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7BBDE8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#7BBDE8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#6EA2B3" opacity={0.1} />
              <XAxis dataKey="month" stroke="#6EA2B3" fontSize={12} />
              <YAxis stroke="#6EA2B3" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#7BBDE8" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Overview */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-foreground mb-6">Activity Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <PackageCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-foreground">Receipts Processed</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
              <p className="text-xl text-foreground">47</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-foreground">Deliveries Shipped</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
              <p className="text-xl text-foreground">28</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-foreground">Internal Transfers</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
              <p className="text-xl text-foreground">15</p>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <h3 className="text-foreground">Low Stock Alert</h3>
          <span className="text-sm text-muted-foreground">({lowStockItems.length} items)</span>
        </div>
        <DataTable columns={lowStockColumns} data={lowStockItems} />
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-foreground mb-4">Recent Transactions</h3>
        <DataTable columns={transactionsColumns} data={recentTransactions} />
      </div>
    </PageLayout>
  );
}
