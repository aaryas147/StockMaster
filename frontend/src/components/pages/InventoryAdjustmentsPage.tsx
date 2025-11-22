import React, { useState } from 'react';
import { Plus, Save, X, ClipboardList, AlertCircle } from 'lucide-react';
import { PageLayout } from '../PageLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { DataTable } from '../DataTable';
import { StatusBadge } from '../StatusBadge';

const existingAdjustments = [
  { id: 'ADJ-7823', date: '2025-11-22', items: 3, reason: 'Physical Count', status: 'done' },
  { id: 'ADJ-7822', date: '2025-11-22', items: 5, reason: 'Damaged Goods', status: 'done' },
  { id: 'ADJ-7821', date: '2025-11-21', items: 2, reason: 'Lost Items', status: 'done' },
  { id: 'ADJ-7820', date: '2025-11-21', items: 4, reason: 'Physical Count', status: 'done' },
];

export function InventoryAdjustmentsPage() {
  const [showNewForm, setShowNewForm] = useState(false);
  const [lineItems, setLineItems] = useState([
    { id: 1, product: '', systemQty: 145, countedQty: '', difference: 0 }
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, { id: lineItems.length + 1, product: '', systemQty: 0, countedQty: '', difference: 0 }]);
  };

  const removeLineItem = (id: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const updateCountedQty = (id: number, value: string) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        const counted = parseInt(value) || 0;
        return { ...item, countedQty: value, difference: counted - item.systemQty };
      }
      return item;
    }));
  };

  const columns = [
    { key: 'id', header: 'Adjustment ID' },
    { key: 'date', header: 'Date' },
    { key: 'items', header: 'Items Adjusted' },
    { key: 'reason', header: 'Reason' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof existingAdjustments[0]) => (
        <StatusBadge variant="done">Completed</StatusBadge>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (item: typeof existingAdjustments[0]) => (
        <Button size="sm" variant="outline">
          View Details
        </Button>
      )
    },
  ];

  return (
    <PageLayout
      title="Inventory Adjustments"
      subtitle="Adjust stock quantities for counts, damages, or discrepancies"
      action={
        !showNewForm && (
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => setShowNewForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Adjustment
          </Button>
        )
      }
    >
      {/* New Adjustment Form */}
      {showNewForm && (
        <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-foreground">New Inventory Adjustment</h3>
                <p className="text-sm text-muted-foreground">Correct inventory discrepancies</p>
              </div>
            </div>
            <button 
              onClick={() => setShowNewForm(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Adjustment Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm text-foreground mb-2">Adjustment ID</label>
              <Input value="ADJ-7824" disabled className="bg-muted/50" />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Date *</label>
              <Input type="date" defaultValue="2025-11-22" />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Location *</label>
              <Select>
                <option value="">Select location...</option>
                <option>Main Warehouse</option>
                <option>Main Warehouse - Zone A</option>
                <option>Main Warehouse - Zone B</option>
                <option>Warehouse B</option>
                <option>Warehouse C</option>
              </Select>
            </div>
          </div>

          {/* Reason */}
          <div className="mb-6">
            <label className="block text-sm text-foreground mb-2">Adjustment Reason *</label>
            <Select>
              <option value="">Select reason...</option>
              <option>Physical Count Correction</option>
              <option>Damaged Goods</option>
              <option>Lost Items</option>
              <option>Found Items</option>
              <option>System Error Correction</option>
              <option>Theft/Shrinkage</option>
              <option>Other</option>
            </Select>
          </div>

          {/* Line Items */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-foreground">Items to Adjust</h4>
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
                <div key={item.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-5">
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
                      <label className="block text-xs text-muted-foreground mb-1">System Qty</label>
                      <div className="flex items-center h-10 px-3 bg-muted/50 border border-border rounded-lg">
                        <span className="text-sm text-muted-foreground">{item.systemQty}</span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-muted-foreground mb-1">Counted Qty *</label>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        min="0"
                        value={item.countedQty}
                        onChange={(e) => updateCountedQty(item.id, e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-muted-foreground mb-1">Difference</label>
                      <div className={`flex items-center h-10 px-3 border border-border rounded-lg ${
                        item.difference > 0 
                          ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' 
                          : item.difference < 0
                          ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30'
                          : 'bg-muted/50'
                      }`}>
                        <span className={`text-sm ${
                          item.difference > 0
                            ? 'text-green-600 dark:text-green-400'
                            : item.difference < 0
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-muted-foreground'
                        }`}>
                          {item.difference > 0 ? '+' : ''}{item.difference || 0}
                        </span>
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
                </div>
              ))}
            </div>

            {/* Warning for negative adjustments */}
            {lineItems.some(item => item.difference < 0) && (
              <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg mt-4">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    Negative adjustments detected. Please ensure you have verified the counts and documented the reason for stock reduction.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm text-foreground mb-2">Notes</label>
            <textarea 
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
              rows={3}
              placeholder="Document the reason for this adjustment, reference numbers, etc..."
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
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Save className="w-4 h-4 mr-2" />
              Save Adjustment
            </Button>
          </div>
        </div>
      )}

      {/* Existing Adjustments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Adjustment History</h3>
          <div className="flex gap-2">
            <Select>
              <option>All Reasons</option>
              <option>Physical Count</option>
              <option>Damaged Goods</option>
              <option>Lost Items</option>
              <option>System Error</option>
            </Select>
          </div>
        </div>
        <DataTable columns={columns} data={existingAdjustments} />
      </div>
    </PageLayout>
  );
}
