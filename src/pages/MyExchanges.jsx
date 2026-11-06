import React, { useState } from 'react';
import {
  Repeat,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  AlertCircle,
  ArrowRightLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Ban
} from 'lucide-react';
import { useSkillSwap } from '../context/SkillSwapContext';

export default function MyExchanges() {
  const { exchanges, updateExchangeStatus } = useSkillSwap();
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedExchangeDetails, setSelectedExchangeDetails] = useState(null);

  const statuses = ['All', 'Pending', 'Accepted', 'Active', 'Completed', 'Rejected'];

  const filteredExchanges = exchanges.filter(exc => {
    if (filterStatus === 'All') return true;
    return exc.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Active':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default: // Pending
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md mb-2 border border-brand-200">
          <Repeat className="w-3.5 h-3.5 text-brand-600" />
          <span>Peer Learning Tracking</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Skill Exchanges
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your outgoing and incoming peer skill requests, track active sessions, and mark milestones.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {statuses.map(st => {
          const isActive = filterStatus === st;
          const count = st === 'All' ? exchanges.length : exchanges.filter(e => e.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{st}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Exchanges List */}
      <div className="space-y-4">
        {filteredExchanges.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
            <Repeat className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No {filterStatus !== 'All' ? filterStatus : ''} exchanges found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Explore Discover Skills or Find a Match to start a reciprocal learning exchange with your peers.
            </p>
          </div>
        ) : (
          filteredExchanges.map(exc => (
            <div
              key={exc.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              {/* Partner info & Exchange details */}
              <div className="flex items-start sm:items-center gap-4 min-w-0">
                <img
                  src={exc.partnerAvatar}
                  alt={exc.partnerName}
                  className="w-13 h-13 rounded-2xl object-cover ring-2 ring-slate-100 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-slate-900 text-base">{exc.partnerName}</h3>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(exc.status)}`}>
                      {exc.status}
                    </span>
                    <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                    <span className="text-xs text-slate-500 font-medium">{exc.department}</span>
                  </div>

                  {/* Skills involved */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 flex-wrap">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                      Teaching: {exc.skillTeaching}
                    </span>
                    <ArrowRightLeft className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200/60">
                      Learning: {exc.skillLearning}
                    </span>
                  </div>

                  {/* Date & Mode info */}
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {exc.duration} ({exc.creditsValue} cr)
                    </span>
                    <span>•</span>
                    <span>{exc.learningFormat}</span>
                    <span>•</span>
                    <span>{exc.date}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons based on status */}
              <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                {/* View Details modal toggle */}
                <button
                  onClick={() => setSelectedExchangeDetails(exc)}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  View Details
                </button>

                {exc.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => updateExchangeStatus(exc.id, 'Accepted')}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => updateExchangeStatus(exc.id, 'Rejected')}
                      className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition-all cursor-pointer"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                  </>
                )}

                {(exc.status === 'Accepted' || exc.status === 'Active') && (
                  <button
                    onClick={() => updateExchangeStatus(exc.id, 'Completed')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Mark as Completed (+{exc.creditsValue} Credits)</span>
                  </button>
                )}

                {exc.status === 'Completed' && (
                  <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Exchanged & Credited</span>
                  </div>
                )}

                {exc.status === 'Rejected' && (
                  <span className="text-xs text-rose-600 font-semibold px-2 py-1 bg-rose-50 rounded-lg">
                    Closed
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detailed Modal */}
      {selectedExchangeDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Exchange Details</h3>
              <button
                onClick={() => setSelectedExchangeDetails(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={selectedExchangeDetails.partnerAvatar}
                alt={selectedExchangeDetails.partnerName}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-bold text-slate-800">{selectedExchangeDetails.partnerName}</h4>
                <p className="text-xs text-slate-500">{selectedExchangeDetails.department}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-slate-800">{selectedExchangeDetails.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-bold text-slate-800">{selectedExchangeDetails.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Value:</span>
                <span className="font-bold text-amber-700">+{selectedExchangeDetails.creditsValue} Skill Credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Format:</span>
                <span className="font-bold text-slate-800">{selectedExchangeDetails.learningFormat}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Session Notes:
              </span>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                {selectedExchangeDetails.notes || 'No extra notes provided.'}
              </p>
            </div>

            <button
              onClick={() => setSelectedExchangeDetails(null)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

