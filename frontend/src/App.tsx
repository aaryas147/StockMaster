import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { LoginPage } from './components/pages/LoginPage';
import { DashboardManager } from './components/pages/DashboardManager';
import { DashboardStaff } from './components/pages/DashboardStaff';
import { ProductsPage } from './components/pages/ProductsPage';
import { ReceiptsPage } from './components/pages/ReceiptsPage';
import { DeliveryOrdersPage } from './components/pages/DeliveryOrdersPage';
import { InternalTransfersPage } from './components/pages/InternalTransfersPage';
import { InventoryAdjustmentsPage } from './components/pages/InventoryAdjustmentsPage';
import { MoveHistoryPage } from './components/pages/MoveHistoryPage';
import { WarehouseSetupPage } from './components/pages/WarehouseSetupPage';
import { ProfilePage } from './components/pages/ProfilePage';

type UserRole = 'manager' | 'staff' | null;
type PageType = 'dashboard' | 'products' | 'receipts' | 'deliveries' | 'transfers' | 'adjustments' | 'history' | 'warehouse' | 'profile';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply theme on mount and when changed
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = (role: 'manager' | 'staff') => {
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Render current page based on route
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return userRole === 'manager' ? <DashboardManager /> : <DashboardStaff />;
      case 'products':
        return <ProductsPage />;
      case 'receipts':
        return <ReceiptsPage />;
      case 'deliveries':
        return <DeliveryOrdersPage />;
      case 'transfers':
        return <InternalTransfersPage />;
      case 'adjustments':
        return <InventoryAdjustmentsPage />;
      case 'history':
        return <MoveHistoryPage />;
      case 'warehouse':
        return <WarehouseSetupPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return userRole === 'manager' ? <DashboardManager /> : <DashboardStaff />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar 
          isDarkMode={isDarkMode} 
          onToggleTheme={toggleTheme}
          userRole={userRole || 'manager'}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
