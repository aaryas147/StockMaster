import React, { useState } from 'react';
import { Plus, Save, X, Truck, Package } from 'lucide-react';
import { PageLayout } from '../PageLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { DataTable } from '../DataTable';
import { StatusBadge } from '../StatusBadge';

const existingDeliveries = [
  { id: 'DEL-8905', customer: 'Enterprise Corp', date: '2025-11-22', items: 12, status: 'pending' },
  { id: 'DEL-8904', customer: 'TechStart Inc', date: '2025-11-22', items: 8, status: 'pending' },
  { id: 'DEL-8903', customer: 'Office Solutions', date: '2025-11-22', items: 15, status: 'done' },
  { id: 'DEL-8902', customer: 'Global Systems', date: '2025-11-21', items: 20, status: 'done' },
];

export function DeliveryOrdersPage() {
  const [showNewForm, setShowNewForm] = useState(false);
  const [lineItems, setLineItems] = useState([
    { id: 1, product: '', requestedQty: '', availableQty: 145 }
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, { id: lineItems.length + 1, product: '', requestedQty: '', availableQty: 0 }]);
  };

  const removeLineItem = (id: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const columns = [
    { key: 'id', header: 'Delivery ID' },
    { key: 'customer', header: 'Customer' },
    { key: 'date', header: 'Date' },
    { key: 'items', header: 'Items' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof existingDeliveries[0]) => (
        <StatusBadge variant={item.status as any}>
          {item.status === 'done' ? 'Shipped' : 'Ready to Pick'}
        </StatusBadge>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (item: typeof existingDeliveries[0]) => (
        <Button size="sm" variant="outline">
          {item.status === 'pending' ? 'Pick Items' : 'View Details'}
        </Button>
      )
    },
  ];

  return (
    <PageLayout
      title="Delivery Orders (Outgoing)"
      subtitle="Manage outgoing deliveries to customers"
      action={
        !showNewForm && (
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => setShowNewForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Delivery Order
          </Button>
        )
      }
    >
      {/* New Delivery Form */}
      {showNewForm && (
        <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-foreground">New Delivery Order</h3>
                <p className="text-sm text-muted-foreground">Create outgoing shipment</p>
              </div>
            </div>
            <button 
              onClick={() => setShowNewForm(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Delivery Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm text-foreground mb-2">Delivery ID</label>
              <Input value="DEL-8906" disabled className="bg-muted/50" />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Customer *</label>
              <Select>
                <option value="">Select customer...</option>
                <option>Enterprise Corp</option>
                <option>TechStart Inc</option>
                <option>Office Solutions</option>
                <option>Global Systems</option>
                <option>Digital Dynamics</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Delivery Date *</label>
              <Input type="date" defaultValue="2025-11-23" />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm text-foreground mb-3">Shipping Address</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs text-muted-foreground mb-1">Address Line 1 *</label>
                <Input placeholder="Street address..." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-muted-foreground mb-1">Address Line 2</label>
                <Input placeholder="Apartment, suite, etc..." />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">City *</label>
                <Input placeholder="City..." />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">State/Province *</label>
                <Input placeholder="State..." />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Postal Code *</label>
                <Input placeholder="12345" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Country *</label>
                <Select>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-foreground">Items to Pick</h4>
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
                  <div className="md:col-span-6">
                    <label className="block text-xs text-muted-foreground mb-1">Product *</label>
                    <Select>
                      <option value="">Select product...</option>
                      <option>Mechanical Keyboard Pro (145 available)</option>
                      <option>Wireless Mouse Elite (8 available)</option>
                      <option>USB-C Hub (12 available)</option>
                      <option>Monitor 27" 4K (67 available)</option>
                      <option>Laptop Stand Pro (5 available)</option>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-muted-foreground mb-1">Quantity *</label>
                    <Input type="number" placeholder="0" min="1" />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs text-muted-foreground mb-1">Available Stock</label>
                    <div className="flex items-center h-10 px-3 bg-muted/50 border border-border rounded-lg">
                      <Package className="w-4 h-4 text-muted-foreground mr-2" />
                      <span className="text-sm text-green-600 dark:text-green-400">{item.availableQty}</span>
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

          {/* Shipping Notes */}
          <div className="mb-6">
            <label className="block text-sm text-foreground mb-2">Shipping Instructions</label>
            <textarea 
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
              rows={3}
              placeholder="Special delivery instructions, handling notes, etc..."
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
              Create Delivery Order
            </Button>
          </div>
        </div>
      )}

      {/* Existing Deliveries */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Delivery Orders</h3>
          <div className="flex gap-2">
            <Select>
              <option>All Status</option>
              <option>Ready to Pick</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </Select>
          </div>
        </div>
        <DataTable columns={columns} data={existingDeliveries} />
      </div>
    </PageLayout>
  );
}
