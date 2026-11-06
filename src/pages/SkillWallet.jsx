import React from 'react';
import {
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  ShieldCheck,
  Award,
  Sparkles,
  Info
} from 'lucide-react';
import { useSkillSwap } from '../context/SkillSwapContext';

export default function SkillWallet() {
  const { currentUser, transactions } = useSkillSwap();

  const totalEarned = transactions
    .filter(t => t.type === 'earned')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = transactions
    .filter(t => t.type === 'spent')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md mb-2 border border-amber-200">
          <Coins className="w-3.5 h-3.5 text-amber-600" />
          <span>Peer Time Banking & Skill Credits</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Skill Credit Wallet
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Skill Credits are earned by teaching peers. Use credits to unlock mentorship sessions from top campus talents.
        </p>
      </div>

      {/* Credit Balance Card */}
      <div className="bg-gradient-to-br from-navy-900 via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-brand-950/10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Current Available Balance
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                {currentUser.skillCredits}
              </span>
              <span className="text-base sm:text-lg text-amber-400 font-bold">Skill Credits</span>
            </div>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Simulated learning currency • Zero monetary conversion</span>
            </p>
          </div>

          {/* Quick stats mini strip */}
          <div className="grid grid-cols-2 gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <div>
              <span className="text-[11px] text-slate-300 block font-medium">Lifetime Earned</span>
              <div className="flex items-center gap-1 text-emerald-300 font-extrabold text-lg mt-0.5">
                <ArrowUpRight className="w-4 h-4" />
                <span>+{totalEarned} cr</span>
              </div>
            </div>
            <div className="border-l border-white/15 pl-4">
              <span className="text-[11px] text-slate-300 block font-medium">Lifetime Spent</span>
              <div className="flex items-center gap-1 text-purple-300 font-extrabold text-lg mt-0.5">
                <ArrowDownLeft className="w-4 h-4" />
                <span>-{totalSpent} cr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 top-0 w-64 h-64 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Credit Rules / Rates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">30-Minute Session</h4>
            <div className="text-lg font-extrabold text-navy-900 mt-0.5">+10 Credits</div>
            <p className="text-[11px] text-slate-500 mt-1">
              Standard Q&A, code review, or quick concept breakdown.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 border border-brand-200">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">60-Minute Session</h4>
            <div className="text-lg font-extrabold text-navy-900 mt-0.5">+20 Credits</div>
            <p className="text-[11px] text-slate-500 mt-1">
              In-depth pair programming, project build, or portfolio critique.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Peer Mentor Bonus</h4>
            <div className="text-lg font-extrabold text-navy-900 mt-0.5">+30 Credits</div>
            <p className="text-[11px] text-slate-500 mt-1">
              Awarded for maintaining 4.8+ rating over 10 verified exchanges.
            </p>
          </div>
        </div>
      </div>

      {/* Transactions Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Recent Activity & Credit Ledger</h3>
            <p className="text-xs text-slate-500">History of learning and teaching credit distributions</p>
          </div>
          <span className="text-xs text-slate-400 font-medium">All logged on-device</span>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.map(tx => (
            <div key={tx.id} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  tx.type === 'earned' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-purple-50 text-purple-600 border border-purple-200'
                }`}>
                  {tx.type === 'earned' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">{tx.description}</h4>
                  <span className="text-[11px] text-slate-400">{tx.date}</span>
                </div>
              </div>

              <div className={`text-sm font-extrabold shrink-0 ${
                tx.type === 'earned' ? 'text-emerald-600' : 'text-slate-700'
              }`}>
                {tx.type === 'earned' ? `+${tx.amount}` : `-${tx.amount}`} Credits
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

