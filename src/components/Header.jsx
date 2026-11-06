import React, { useState } from 'react';
import { Search, Bell, PlusCircle, Coins } from 'lucide-react';
import { useSkillSwap } from '../context/SkillSwapContext';
import NotificationDropdown from './NotificationDropdown';

export default function Header({ onSearch, activePage, setActivePage }) {
  const { currentUser, notifications, setActiveModal } = useSkillSwap();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Global Search Bar */}
      <div className="flex-1 max-w-md relative hidden sm:block">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search skills, topics, or peer mentors..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Create Skill Offer Button */}
        <button
          onClick={() => setActiveModal('offer')}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-sm shadow-brand-500/25 transition-all hover:shadow-md cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Skill Offer</span>
        </button>

        {/* Skill Credits Badge */}
        <button
          onClick={() => setActivePage('wallet')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 rounded-xl transition-all cursor-pointer group"
          title="View Skill Wallet"
        >
          <Coins className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
          <span className="text-xs sm:text-sm font-bold text-amber-800">{currentUser.skillCredits}</span>
          <span className="text-[11px] text-amber-700 hidden md:inline font-medium">Credits</span>
        </button>

        {/* Notifications Dropdown Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-brand-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-600 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>
          <NotificationDropdown
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        </div>

        {/* Profile Avatar Quick Jump */}
        <button
          onClick={() => setActivePage('profile')}
          className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-85 transition-opacity cursor-pointer text-left"
          title="My Profile"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/30"
          />
          <div className="hidden lg:block leading-tight">
            <p className="text-xs font-bold text-slate-800 truncate max-w-[110px]">{currentUser.name}</p>
            <p className="text-[10px] text-slate-500 truncate max-w-[110px]">{currentUser.department.split('&')[0]}</p>
          </div>
        </button>
      </div>
    </header>
  );
}

