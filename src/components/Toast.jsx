import React from 'react';
import { CheckCircle, AlertCircle, Info, Coins, X } from 'lucide-react';
import { useSkillSwap } from '../context/SkillSwapContext';

export default function Toast() {
  const { toasts, removeToast } = useSkillSwap();

  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'wallet':
        return <Coins className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      default:
        return <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between p-4 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-xl shadow-xl shadow-slate-200/50 transition-all transform animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center gap-3">
            {getIcon(toast.type)}
            <p className="text-sm font-medium text-slate-800 leading-snug">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

