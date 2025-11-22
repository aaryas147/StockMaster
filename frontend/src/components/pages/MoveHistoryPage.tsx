import React, { useState } from 'react';
import { History, Filter, Download, Calendar } from 'lucide-react';
import { PageLayout } from '../PageLayout';
import { Button } from '../ui/button';
import { SearchBar } from '../SearchBar';
import { DataTable } from '../DataTable';
import { StatusBadge } from '../StatusBadge';
import { Select } from '../ui/select';
import { Input } from '../ui/input';

const moveHistoryData = [
  {
    id: 1,
    timestamp: '2025-11-22 14:30',
    type: 'Receipt',
    reference: 'RCP-2044',
    product: 'Mechanical Keyboard Pro',
    quantity: '+50',
    location: 'Main Warehouse - A1',
    user: 'Sarah Staff',
    status: 'done'
  },
  {
    id: 2,
    timestamp: '2025-11-22 13:15',
    type: 'Delivery',
    reference: 'DEL-8903',
    product: 'Monitor 27" 4K',
    quantity: '-15',
    location: 'Main Warehouse - B2',
    user: 'Mike Warehouse',
    status: 'done'
  },
  {
    id: 3,
    timestamp: '2025-11-22 11:45',
    type: 'Transfer',
    reference: 'TRF-4521',
    product: 'Office Chair',
    quantity: '10',
    location: 'Main WH → Warehouse B',
    user: 'Lisa Handler',
    status: 'done'
  },
  {
    id: 4,
    timestamp: '2025-11-22 10:20',
    type: 'Adjustment',
    reference: 'ADJ-7822',
    product: 'Desk Lamp LED',
    quantity: '-2',
    location: 'Main Warehouse - C3',
    user: 'John Manager',
    status: 'done'
  },
  {
    id: 5,
    timestamp: '2025-11-22 09:00',
    type: 'Receipt',
    reference: 'RCP-2043',
    product: 'USB-C Hub',
    quantity: '+100',
    location: 'Main Warehouse - A2',
    user: 'Sarah Staff',
    status: 'done'
  },
  {
    id: 6,
    timestamp: '2025-11-21 16:45',
    type: 'Delivery',
    reference: 'DEL-8902',
    product: 'Wireless Mouse Elite',
    quantity: '-25',
    location: 'Main Warehouse - A1',
    user: 'Mike Warehouse',
    status: 'done'
  },
  {
    id: 7,
    timestamp: '2025-11-21 15:30',
    type: 'Transfer',
    reference: 'TRF-4520',
    product: 'Laptop Stand Pro',
    quantity: '8',
    location: 'Warehouse C → Main WH',
    user: 'Lisa Handler',
    status: 'done'
  },
  {
    id: 8,
    timestamp: '2025-11-21 14:00',
    type: 'Adjustment',
    reference: 'ADJ-7821',
    product: 'Webcam 4K Pro',
    quantity: '-3',
    location: 'Warehouse B',
    user: 'John Manager',
    status: 'done'
  },
];

export function MoveHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const getOperationTypeColor = (type: string) => {
    switch (type) {
      case 'Receipt':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Delivery':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'Transfer':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      case 'Adjustment':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-400';
    }
  };

  const columns = [
    { 
      key: 'timestamp', 
      header: 'Timestamp',
      render: (item: typeof moveHistoryData[0]) => (
        <span className="text-foreground text-sm">{item.timestamp}</span>
      )
    },
    { 
      key: 'type', 
      header: 'Operation Type',
      render: (item: typeof moveHistoryData[0]) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs ${getOperationTypeColor(item.type)}`}>
          {item.type}
        </span>
      )
    },
    { 
      key: 'reference', 
      header: 'Reference',
      render: (item: typeof moveHistoryData[0]) => (
        <span className="text-accent hover:underline cursor-pointer">{item.reference}</span>
      )
    },
    { key: 'product', header: 'Item' },
    { 
      key: 'quantity', 
      header: 'Quantity',
      render: (item: typeof moveHistoryData[0]) => (
        <span className={`${
          item.quantity.startsWith('+') 
            ? 'text-green-600 dark:text-green-400' 
            : item.quantity.startsWith('-')
            ? 'text-red-600 dark:text-red-400'
            : 'text-foreground'
        }`}>
          {item.quantity}
        </span>
      )
    },
    { key: 'location', header: 'Location' },
    { 
      key: 'user', 
      header: 'User',
      render: (item: typeof moveHistoryData[0]) => (
        <span className="text-sm text-muted-foreground">{item.user}</span>
      )
    },
  ];

  return (
    <PageLayout
      title="Move History"
      subtitle="Track all inventory movements and operations"
      action={
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      }
    >
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-4">
          <SearchBar 
            placeholder="Search by product, reference, or user..." 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
        <div className="md:col-span-2">
          <Select>
            <option>All Operations</option>
            <option>Receipt</option>
            <option>Delivery</option>
            <option>Transfer</option>
            <option>Adjustment</option>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Select>
            <option>All Locations</option>
            <option>Main Warehouse</option>
            <option>Warehouse B</option>
            <option>Warehouse C</option>
          </Select>
        </div>
        <div className="md:col-span-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input type="date" className="pl-9" defaultValue="2025-11-22" />
          </div>
        </div>
        <div className="md:col-span-2">
          <Button variant="outline" className="w-full">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Movements</p>
          <p className="text-2xl text-foreground">2,847</p>
          <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Receipts</p>
          <p className="text-2xl text-green-600 dark:text-green-400">1,124</p>
          <p className="text-xs text-muted-foreground mt-1">+189 incoming</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Deliveries</p>
          <p className="text-2xl text-blue-600 dark:text-blue-400">956</p>
          <p className="text-xs text-muted-foreground mt-1">-142 outgoing</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Adjustments</p>
          <p className="text-2xl text-orange-600 dark:text-orange-400">127</p>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </div>
      </div>

      {/* Move History Table */}
      <DataTable columns={columns} data={moveHistoryData} />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">
          Showing <span className="text-foreground">1-8</span> of <span className="text-foreground">2,847</span> movements
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm" className="bg-accent text-accent-foreground">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">...</Button>
          <Button variant="outline" size="sm">356</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </PageLayout>
  );
}
