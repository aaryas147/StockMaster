import React, { useState } from 'react';
import { Plus, Filter, Download, Edit2, Trash2, MoreHorizontal } from 'lucide-react';
import { PageLayout } from '../PageLayout';
import { Button } from '../ui/button';
import { SearchBar } from '../SearchBar';
import { DataTable } from '../DataTable';
import { StatusBadge } from '../StatusBadge';
import { Select } from '../ui/select';

const productsData = [
  { 
    id: 1, 
    name: 'Mechanical Keyboard Pro', 
    sku: 'MKP-001', 
    category: 'Electronics',
    stock: 145,
    minStock: 50,
    price: '$129.99',
    status: 'high'
  },
  { 
    id: 2, 
    name: 'Wireless Mouse Elite', 
    sku: 'WME-045', 
    category: 'Electronics',
    stock: 8,
    minStock: 25,
    price: '$49.99',
    status: 'low'
  },
  { 
    id: 3, 
    name: 'USB-C Hub', 
    sku: 'UCH-023', 
    category: 'Accessories',
    stock: 12,
    minStock: 30,
    price: '$39.99',
    status: 'low'
  },
  { 
    id: 4, 
    name: 'Monitor 27" 4K', 
    sku: 'MON-4K27', 
    category: 'Displays',
    stock: 67,
    minStock: 20,
    price: '$499.99',
    status: 'medium'
  },
  { 
    id: 5, 
    name: 'Laptop Stand Pro', 
    sku: 'LSP-001', 
    category: 'Accessories',
    stock: 5,
    minStock: 20,
    price: '$79.99',
    status: 'low'
  },
  { 
    id: 6, 
    name: 'Webcam 4K Pro', 
    sku: 'WCP-089', 
    category: 'Electronics',
    stock: 3,
    minStock: 15,
    price: '$199.99',
    status: 'low'
  },
  { 
    id: 7, 
    name: 'Ergonomic Office Chair', 
    sku: 'EOC-500', 
    category: 'Furniture',
    stock: 89,
    minStock: 30,
    price: '$349.99',
    status: 'medium'
  },
  { 
    id: 8, 
    name: 'Desk Lamp LED', 
    sku: 'DLL-234', 
    category: 'Lighting',
    stock: 156,
    minStock: 40,
    price: '$59.99',
    status: 'high'
  },
];

export function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    { key: 'name', header: 'Product Name' },
    { key: 'sku', header: 'SKU' },
    { key: 'category', header: 'Category' },
    { 
      key: 'stock', 
      header: 'Stock',
      render: (item: typeof productsData[0]) => (
        <span className={
          item.status === 'low' 
            ? 'text-red-600 dark:text-red-400' 
            : item.status === 'medium'
            ? 'text-yellow-600 dark:text-yellow-400'
            : 'text-green-600 dark:text-green-400'
        }>
          {item.stock}
        </span>
      )
    },
    { key: 'minStock', header: 'Min. Stock' },
    { key: 'price', header: 'Price' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof productsData[0]) => (
        <StatusBadge variant={item.status as any}>
          {item.status === 'low' ? 'Low Stock' : item.status === 'medium' ? 'Medium' : 'In Stock'}
        </StatusBadge>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (item: typeof productsData[0]) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
            <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </button>
          <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600" />
          </button>
        </div>
      )
    },
  ];

  return (
    <PageLayout
      title="Products"
      subtitle="Manage your inventory products and stock levels"
      action={
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      }
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar 
            placeholder="Search products by name or SKU..." 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
        <div className="flex gap-3">
          <Select>
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Displays</option>
            <option>Furniture</option>
            <option>Lighting</option>
          </Select>
          <Select>
            <option>All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Products</p>
          <p className="text-2xl text-foreground">1,248</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Stock Value</p>
          <p className="text-2xl text-foreground">$456.8K</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Low Stock Items</p>
          <p className="text-2xl text-red-600 dark:text-red-400">24</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Categories</p>
          <p className="text-2xl text-foreground">12</p>
        </div>
      </div>

      {/* Products Table */}
      <DataTable columns={columns} data={productsData} />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">
          Showing <span className="text-foreground">1-8</span> of <span className="text-foreground">1,248</span> products
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm" className="bg-accent text-accent-foreground">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">...</Button>
          <Button variant="outline" size="sm">156</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </PageLayout>
  );
}
