import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  PackageCheck, 
  Truck, 
  ArrowLeftRight, 
  ClipboardList, 
  History, 
  Warehouse,
  User
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'receipts', label: 'Receipts', icon: PackageCheck },
  { id: 'deliveries', label: 'Delivery Orders', icon: Truck },
  { id: 'transfers', label: 'Internal Transfers', icon: ArrowLeftRight },
  { id: 'adjustments', label: 'Inventory Adjustments', icon: ClipboardList },
  { id: 'history', label: 'Move History', icon: History },
  { id: 'warehouse', label: 'Warehouse Setup', icon: Warehouse },
  { id: 'profile', label: 'Profile', icon: User },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl text-sidebar-foreground">
          <span className="text-accent">Stock</span>Master
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Inventory Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground text-center">
          v1.0.0
        </p>
      </div>
    </div>
  );
}
