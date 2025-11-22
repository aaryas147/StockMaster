import React from 'react';
import { Search, Bell, Moon, Sun, User } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface TopNavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  userRole?: 'manager' | 'staff';
}

export function TopNavbar({ isDarkMode, onToggleTheme, userRole = 'manager' }: TopNavbarProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <SearchBar placeholder="Search products, orders, transactions..." />
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4 ml-6">
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-foreground" />
          )}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right">
            <p className="text-sm text-foreground">
              {userRole === 'manager' ? 'John Manager' : 'Sarah Staff'}
            </p>
            <p className="text-xs text-muted-foreground">
              {userRole === 'manager' ? 'Inventory Manager' : 'Warehouse Staff'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <User className="w-5 h-5 text-accent" />
          </div>
        </div>
      </div>
    </header>
  );
}
