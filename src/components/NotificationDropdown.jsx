import React, { useRef, useEffect } from 'react';
import { Bell, CheckCheck, Sparkles, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSkillSwap } from '../context/SkillSwapContext';

export default function NotificationDropdown({ isOpen, onClose }) {
  const { notifications, markNotificationsAsRead } = useSkillSwap();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-200/90 rounded-2xl shadow-2xl shadow-brand-950/10 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800 text-sm">Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-brand-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markNotificationsAsRead}
            className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm">
            No notifications yet
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              className={`p-3.5 hover:bg-slate-50 transition-colors flex gap-3 ${!n.read ? 'bg-brand-50/40' : ''}`}
            >
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                {n.type === 'match' ? (
                  <Sparkles className="w-4 h-4 text-brand-600" />
                ) : n.type === 'wallet' ? (
                  <span className="text-xs font-bold text-brand-700">+¢</span>
                ) : n.type === 'accepted' ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                ) : (
                  <RefreshCw className="w-4 h-4 text-brand-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className="text-xs font-semibold text-slate-800 truncate">{n.title}</h4>
                  <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <p className="text-[11px] text-slate-500 font-medium">
          SkillSwap Peer Alerts & Sync
        </p>
      </div>
    </div>
  );
}

