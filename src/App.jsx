import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';
import ExchangeModal from './components/ExchangeModal';
import SkillOfferModal from './components/SkillOfferModal';

// Pages
import Dashboard from './pages/Dashboard';
import DiscoverSkills from './pages/DiscoverSkills';
import FindMatch from './pages/FindMatch';
import MyExchanges from './pages/MyExchanges';
import SkillWallet from './pages/SkillWallet';
import Community from './pages/Community';
import Profile from './pages/Profile';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global search proxy to navigate to Discover with filter
  const handleGlobalSearch = (query) => {
    if (query && activePage !== 'discover') {
      setActivePage('discover');
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard setActivePage={setActivePage} />;
      case 'discover':
        return <DiscoverSkills />;
      case 'matches':
        return <FindMatch />;
      case 'exchanges':
        return <MyExchanges />;
      case 'wallet':
        return <SkillWallet />;
      case 'community':
        return <Community setActivePage={setActivePage} />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 flex flex-col antialiased">
      {/* Toast Notification Container */}
      <Toast />

      {/* Global Modals */}
      <ExchangeModal />
      <SkillOfferModal />

      {/* Sidebar for Desktop & Drawer for Mobile */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Mobile Top Bar */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-extrabold text-navy-900 text-lg tracking-tight">
            Skill<span className="text-brand-600">Swap</span>
          </span>
          <div className="w-9" /> {/* balance spacing */}
        </div>

        {/* Global Header */}
        <Header
          onSearch={handleGlobalSearch}
          activePage={activePage}
          setActivePage={setActivePage}
        />

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200/80 bg-white py-6 px-6 text-center text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <span>SkillSwap — Peer-to-Peer Student Skill Exchange Network</span>
            <span>Zero Tuition • Reciprocal Mentorship • Skill Credits</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

