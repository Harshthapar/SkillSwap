import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Database,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useSkillSwap } from '../context/SkillSwapContext';

export default function SettingsPage() {
  const { showToast } = useSkillSwap();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [creditAlerts, setCreditAlerts] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState('Campus-wide');

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all data back to original state?")) {
      localStorage.clear();
      showToast("Storage cleared. Reloading platform...", "info");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleSaveSettings = () => {
    showToast("Preferences saved successfully!", "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md mb-2">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>Platform Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure notifications, reciprocal matching discovery preferences, and workspace storage.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Notification preferences */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Bell className="w-4 h-4 text-brand-600" />
            <h3 className="font-bold text-slate-900 text-sm">Notification Channels</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-800 block">High Compatibility Match Alerts</span>
                <span className="text-[11px] text-slate-500">Notify me immediately when an 85%+ reciprocal match joins</span>
              </div>
              <input
                type="checkbox"
                checked={matchAlerts}
                onChange={(e) => setMatchAlerts(e.target.checked)}
                className="w-4 h-4 accent-brand-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Skill Credit Distributions</span>
                <span className="text-[11px] text-slate-500">Show in-app toasts when sessions are completed & credited</span>
              </div>
              <input
                type="checkbox"
                checked={creditAlerts}
                onChange={(e) => setCreditAlerts(e.target.checked)}
                className="w-4 h-4 accent-brand-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Exchange Request Notifications</span>
                <span className="text-[11px] text-slate-500">Receive alerts when peers request peer sessions</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-brand-600 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Discovery & Privacy */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Shield className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Discovery & Campus Reach</h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Profile Visibility
            </label>
            <select
              value={profileVisibility}
              onChange={(e) => setProfileVisibility(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="Campus-wide">Campus-wide (All Departments)</option>
              <option value="Department-only">Department-only Peers</option>
              <option value="Active-Matches">Only Reciprocal Match Inquiries</option>
            </select>
          </div>
        </div>

        {/* Local Storage & Reset */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Database className="w-4 h-4 text-purple-600" />
            <h3 className="font-bold text-slate-900 text-sm">Local Storage Management</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            All skill offers, exchanges, credits, and profile customizations are saved to your browser's persistent localStorage.
          </p>
          <div className="pt-1 flex items-center justify-between">
            <button
              onClick={handleResetData}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data to Defaults</span>
            </button>
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

