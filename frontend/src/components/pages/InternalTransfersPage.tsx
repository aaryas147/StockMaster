import React, { useState } from 'react';
import { Plus, Save, X, ArrowLeftRight, ArrowRight } from 'lucide-react';
import { PageLayout } from '../PageLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { DataTable } from '../DataTable';
import { StatusBadge } from '../StatusBadge';

const existingTransfers = [
  { id: 'TRF-4523', from: 'Main Warehouse', to: 'Warehouse B', date: '2025-11-22', items: 8, status: 'pending' },
  { id: 'TRF-4522', from: 'Warehouse B', to: 'Main Warehouse', date: '2025-11-22', items: 5, status: 'waiting' },
  { id: 'TRF-4521', from: 'Main Warehouse', to: 'Warehouse C', date: '2025-11-22', items: 10, status: 'done' },
  { id: 'TRF-4520', from: 'Warehouse C', to: 'Main Warehouse', date: '2025-11-21', items: 12, status: 'done' },
];

export function InternalTransfersPage() {
  const [showNewForm, setShowNewForm] = useState(false);
  const [lineItems, setLineItems] = useState([
    { id: 1, product: '', quantity: '' }
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, { id: lineItems.length + 1, product: '', quantity: '' }]);
  };

  const removeLineItem = (id: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const columns = [
    { key: 'id', header: 'Transfer ID' },
    { 
      key: 'from', 
      header: 'From → To',
      render: (item: typeof existingTransfers[0]) => (
        <div className="flex items-center gap-2">
          <span>{item.from}</span>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
          <span>{item.to}</span>
        </div>
      )
    },
    { key: 'date', header: 'Date' },
    { key: 'items', header: 'Items' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof existingTransfers[0]) => (
        <StatusBadge variant={item.status as any}>
          {item.status === 'done' ? 'Completed' : item.status === 'waiting' ? 'In Transit' : 'Pending'}
        </StatusBadge>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (item: typeof existingTransfers[0]) => (
        <Button size="sm" variant="outline">
          View Details
        </Button>
      )
    },
  ];

  return (
    <PageLayout
      title="Internal Transfers"
      subtitle="Move inventory between warehouse locations"
      action={
        !showNewForm && (
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => setShowNewForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Transfer
          </Button>
        )
      }
    >
      {/* New Transfer Form */}
      {showNewForm && (
        <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <ArrowLeftRight className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-foreground">New Internal Transfer</h3>
                <p className="text-sm text-muted-foreground">Move items between locations</p>
              </div>
            </div>
            <button 
              onClick={() => setShowNewForm(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Transfer Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm text-foreground mb-2">Transfer ID</label>
              <Input value="TRF-4524" disabled className="bg-muted/50" />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Transfer Date *</label>
              <Input type="date" defaultValue="2025-11-22" />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Assigned To</label>
              <Select>
                <option value="">Select staff...</option>
                <option>Sarah Staff</option>
                <option>Mike Warehouse</option>
                <option>Lisa Handler</option>
              </Select>
            </div>
          </div>

          {/* Location Transfer Flow */}
          <div className="mb-6 p-6 bg-muted/30 rounded-lg">
            <h4 className="text-sm text-foreground mb-4">Transfer Locations</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-xs text-muted-foreground mb-2">From Location *</label>
                <Select>
                  <option value="">Select source location...</option>
                  <option>Main Warehouse</option>
                  <option>Main Warehouse - Zone A</option>
                  <option>Main Warehouse - Zone B</option>
                  <option>Warehouse B</option>
                  <option>Warehouse C</option>
                </Select>
              </div>

              <div className="flex items-end pb-2">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-accent" />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-xs text-muted-foreground mb-2">To Location *</label>
                <Select>
                  <option value="">Select destination location...</option>
                  <option>Main Warehouse</option>
                  <option>Main Warehouse - Zone A</option>
                  <option>Main Warehouse - Zone B</option>
                  <option>Warehouse B</option>
                  <option>Warehouse C</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-foreground">Items to Transfer</h4>
              <Button 
                size="sm" 
                variant="outline"
                onClick={addLineItem}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {lineItems.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 bg-muted/30 rounded-lg">
                  <div className="md:col-span-7">
                    <label className="block text-xs text-muted-foreground mb-1">Product *</label>
                    <Select>
                      <option value="">Select product...</option>
                      <option>Mechanical Keyboard Pro</option>
                      <option>Wireless Mouse Elite</option>
                      <option>USB-C Hub</option>
                      <option>Monitor 27" 4K</option>
                      <option>Laptop Stand Pro</option>
                      <option>Webcam 4K Pro</option>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-muted-foreground mb-1">Quantity *</label>
                    <Input type="number" placeholder="0" min="1" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-muted-foreground mb-1">Available</label>
                    <div className="flex items-center h-10 px-3 bg-muted/50 border border-border rounded-lg">
                      <span className="text-sm text-muted-foreground">145</span>
                    </div>
                  </div>
                  <div className="md:col-span-1 flex items-end">
                    <button
                      onClick={() => removeLineItem(item.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors w-full"
                      disabled={lineItems.length === 1}
                    >
                      <X className={`w-4 h-4 mx-auto ${lineItems.length === 1 ? 'text-muted-foreground/50' : 'text-destructive'}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div className="mb-6">
            <label className="block text-sm text-foreground mb-2">Transfer Reason *</label>
            <Select>
              <option value="">Select reason...</option>
              <option>Stock Rebalancing</option>
              <option>Customer Order Fulfillment</option>
              <option>Warehouse Consolidation</option>
              <option>Damaged Goods</option>
              <option>Other</option>
            </Select>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm text-foreground mb-2">Notes</label>
            <textarea 
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
              rows={3}
              placeholder="Add any additional notes..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button 
              variant="outline"
              onClick={() => setShowNewForm(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="outline"
            >
              Save as Draft
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Save className="w-4 h-4 mr-2" />
              Create Transfer
            </Button>
          </div>
        </div>
      )}

      {/* Existing Transfers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Transfer History</h3>
          <div className="flex gap-2">
            <Select>
              <option>All Status</option>
              <option>Pending</option>
              <option>In Transit</option>
              <option>Completed</option>
            </Select>
          </div>
        </div>
        <DataTable columns={columns} data={existingTransfers} />
      </div>
    </PageLayout>
  );
}
