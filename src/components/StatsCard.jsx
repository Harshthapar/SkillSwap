import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function StatsCard({ title, value, icon: Icon, color = 'brand', subtext, onClick }) {
  const colorMap = {
    brand: {
      bg: 'bg-brand-50',
      icon: 'text-brand-600',
      border: 'border-brand-100',
      pill: 'bg-brand-100 text-brand-700'
    },
    amber: {
      bg: 'bg-amber-50',
      icon: 'text-amber-600',
      border: 'border-amber-100',
      pill: 'bg-amber-100 text-amber-800'
    },
    emerald: {
      bg: 'bg-emerald-50',
      icon: 'text-emerald-600',
      border: 'border-emerald-100',
      pill: 'bg-emerald-100 text-emerald-700'
    },
    indigo: {
      bg: 'bg-indigo-50',
      icon: 'text-indigo-600',
      border: 'border-indigo-100',
      pill: 'bg-indigo-100 text-indigo-700'
    }
  };

  const scheme = colorMap[color] || colorMap.brand;

  return (
    <div
      onClick={onClick}
      className={`bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-brand-200' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={`w-9 h-9 rounded-xl ${scheme.bg} flex items-center justify-center ${scheme.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <div className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">{value}</div>
        {subtext && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${scheme.pill}`}>
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}

