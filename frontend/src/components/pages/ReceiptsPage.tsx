import React, { useState } from 'react';
import { Plus, Save, X, PackageCheck } from 'lucide-react';
import { PageLayout } from '../PageLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { DataTable } from '../DataTable';
import { StatusBadge } from '../StatusBadge';

const existingReceipts = [
  { id: 'RCP-2045', vendor: 'Tech Supplies Co.', date: '2025-11-22', items: 25, status: 'pending' },
  { id: 'RCP-2044', vendor: 'Office Depot', date: '2025-11-22', items: 30, status: 'done' },
  { id: 'RCP-2043', vendor: 'Electronics Hub', date: '2025-11-21', items: 18, status: 'done' },
  { id: 'RCP-2042', vendor: 'Tech Supplies Co.', date: '2025-11-21', items: 22, status: 'done' },
];

export function ReceiptsPage() {
  const [showNewForm, setShowNewForm] = useState(false);
  const [lineItems, setLineItems] = useState([
    { id: 1, product: '', quantity: '', location: '' }
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, { id: lineItems.length + 1, product: '', quantity: '', location: '' }]);
  };

  const removeLineItem = (id: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const columns = [
    { key: 'id', header: 'Receipt ID' },
    { key: 'vendor', header: 'Vendor' },
    { key: 'date', header: 'Date' },
    { key: 'items', header: 'Items' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof existingReceipts[0]) => (
        <StatusBadge variant={item.status as any}>
          {item.status === 'done' ? 'Processed' : 'Pending'}
        </StatusBadge>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (item: typeof existingReceipts[0]) => (
        <Button size="sm" variant="outline">
          View Details
        </Button>
      )
    },
  ];

  return (
    <PageLayout
      title="Receipts (Incoming Stock)"
      subtitle="Process incoming inventory from vendors and suppliers"
      action={
        !showNewForm && (
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => setShowNewForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Receipt
          </Button>
        )
      }
    >
      {/* New Receipt Form */}
      {showNewForm && (
        <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <PackageCheck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-foreground">New Receipt</h3>
                <p className="text-sm text-muted-foreground">Process incoming inventory</p>
              </div>
            </div>
            <button 
              onClick={() => setShowNewForm(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Receipt Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm text-foreground mb-2">Receipt ID</label>
              <Input value="RCP-2046" disabled className="bg-muted/50" />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Vendor *</label>
              <Select>
                <option value="">Select vendor...</option>
                <option>Tech Supplies Co.</option>
                <option>Office Depot</option>
                <option>Electronics Hub</option>
                <option>Furniture World</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Date *</label>
              <Input type="date" defaultValue="2025-11-22" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-foreground mb-2">Reference Number</label>
            <Input placeholder="PO-12345 or Invoice number..." />
          </div>

          {/* Line Items */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-foreground">Items</h4>
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
                  <div className="md:col-span-5">
                    <label className="block text-xs text-muted-foreground mb-1">Product *</label>
                    <Select>
                      <option value="">Select product...</option>
                      <option>Mechanical Keyboard Pro</option>
                      <option>Wireless Mouse Elite</option>
                      <option>USB-C Hub</option>
                      <option>Monitor 27" 4K</option>
                      <option>Laptop Stand Pro</option>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-muted-foreground mb-1">Quantity *</label>
                    <Input type="number" placeholder="0" min="1" />
                  </div>
                  <div className="md:col-span-4">
                    <label className="block text-xs text-muted-foreground mb-1">Location *</label>
                    <Select>
                      <option value="">Select location...</option>
                      <option>Main Warehouse - A1</option>
                      <option>Main Warehouse - A2</option>
                      <option>Main Warehouse - B1</option>
                      <option>Warehouse B - C1</option>
                    </Select>
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

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm text-foreground mb-2">Notes</label>
            <textarea 
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
              rows={3}
              placeholder="Add any additional notes or comments..."
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
              Validate & Process
            </Button>
          </div>
        </div>
      )}

      {/* Existing Receipts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Recent Receipts</h3>
          <div className="flex gap-2">
            <Select>
              <option>All Status</option>
              <option>Pending</option>
              <option>Processed</option>
            </Select>
          </div>
        </div>
        <DataTable columns={columns} data={existingReceipts} />
      </div>
    </PageLayout>
  );
}
