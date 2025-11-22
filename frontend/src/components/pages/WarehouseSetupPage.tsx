import React from 'react';
import { Warehouse, MapPin, Plus } from 'lucide-react';
import { PageLayout } from '../PageLayout';
import { Button } from '../ui/button';
import { DataTable } from '../DataTable';
import { StatusBadge } from '../StatusBadge';

const warehouseData = [
  { id: 1, name: 'Main Warehouse', location: 'New York, NY', zones: 12, capacity: '50,000 sqft', status: 'high' },
  { id: 2, name: 'Warehouse B', location: 'Los Angeles, CA', zones: 8, capacity: '35,000 sqft', status: 'high' },
  { id: 3, name: 'Warehouse C', location: 'Chicago, IL', zones: 6, capacity: '25,000 sqft', status: 'medium' },
];

export function WarehouseSetupPage() {
  const columns = [
    { key: 'name', header: 'Warehouse Name' },
    { key: 'location', header: 'Location' },
    { key: 'zones', header: 'Zones' },
    { key: 'capacity', header: 'Capacity' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof warehouseData[0]) => (
        <StatusBadge variant={item.status as any}>
          {item.status === 'high' ? 'Active' : 'Maintenance'}
        </StatusBadge>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: () => (
        <Button size="sm" variant="outline">
          Manage Zones
        </Button>
      )
    },
  ];

  return (
    <PageLayout
      title="Warehouse Setup"
      subtitle="Manage warehouse locations and storage zones"
      action={
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Warehouse
        </Button>
      }
    >
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Warehouse className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Warehouses</p>
              <p className="text-2xl text-foreground">3</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Zones</p>
              <p className="text-2xl text-foreground">26</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Warehouse className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Capacity</p>
              <p className="text-2xl text-foreground">110K sqft</p>
            </div>
          </div>
        </div>
      </div>

      {/* Warehouses Table */}
      <DataTable columns={columns} data={warehouseData} />
    </PageLayout>
  );
}
