import React, { useState } from 'react';
import { X, Sparkles, Clock, MapPin, ArrowRightLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useSkillSwap } from '../context/SkillSwapContext';
import { calculateMatchScore, getReciprocalDetails } from '../utils/matchingAlgorithm';

export default function ExchangeModal() {
  const { currentUser, exchangePeer, activeModal, closeModals, createExchangeRequest } = useSkillSwap();

  if (activeModal !== 'exchange' || !exchangePeer) return null;

  const score = calculateMatchScore(currentUser, exchangePeer);
  const { youTeach: defaultTeach, peerTeaches: defaultLearn } = getReciprocalDetails(currentUser, exchangePeer);

  const [teachSkill, setTeachSkill] = useState(defaultTeach);
  const [learnSkill, setLearnSkill] = useState(defaultLearn);
  const [duration, setDuration] = useState('60 mins');
  const [format, setFormat] = useState(exchangePeer.learningPreferences?.format || 'Hybrid');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createExchangeRequest({
      peer: exchangePeer,
      teachSkill,
      learnSkill,
      format,
      duration,
      notes
    });
    closeModals();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-brand-50 text-brand-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-brand-200">
                Peer Skill Exchange Proposal
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">Initiate Peer Exchange</h2>
          </div>
          <button
            onClick={closeModals}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {/* Exchange comparison card */}
          <div className="bg-gradient-to-br from-brand-50/60 via-purple-50/30 to-slate-50 border border-brand-100 rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-3 items-center relative">
              {/* Current User */}
              <div className="flex flex-col items-center text-center p-2 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full object-cover mb-2 ring-2 ring-brand-500/20"
                />
                <span className="text-xs font-bold text-slate-900 truncate w-full">{currentUser.name}</span>
                <span className="text-[10px] text-slate-500 truncate w-full">You</span>
              </div>

              {/* Peer */}
              <div className="flex flex-col items-center text-center p-2 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
                <img
                  src={exchangePeer.avatar}
                  alt={exchangePeer.name}
                  className="w-12 h-12 rounded-full object-cover mb-2 ring-2 ring-emerald-500/20"
                />
                <span className="text-xs font-bold text-slate-900 truncate w-full">{exchangePeer.name}</span>
                <span className="text-[10px] text-slate-500 truncate w-full">{exchangePeer.department}</span>
              </div>
            </div>

            {/* Compatibility banner */}
            <div className="mt-3 pt-3 border-t border-brand-100/70 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-600" />
                Match Compatibility:
              </span>
              <span className="font-extrabold text-brand-700 bg-white px-2.5 py-0.5 rounded-lg border border-brand-200">
                {score}% Reciprocal
              </span>
            </div>
          </div>

          {/* Skill mapping selections */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Skill You Will Teach:
              </label>
              <select
                value={teachSkill}
                onChange={(e) => setTeachSkill(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                {currentUser.skillsOffered?.map((s, idx) => (
                  <option key={idx} value={s.name}>
                    {s.name} ({s.level})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Skill You Will Learn from {exchangePeer.name}:
              </label>
              <select
                value={learnSkill}
                onChange={(e) => setLearnSkill(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                {exchangePeer.skillsOffered?.map((s, idx) => (
                  <option key={idx} value={s.name}>
                    {s.name} ({s.level})
                  </option>
                ))}
              </select>
            </div>

            {/* Proposed session duration & format */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Duration:
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                >
                  <option value="30 mins">30 mins (10 Credits)</option>
                  <option value="45 mins">45 mins (15 Credits)</option>
                  <option value="60 mins">60 mins (20 Credits)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Learning Mode:
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                >
                  <option value="Hybrid">Hybrid (Flexible)</option>
                  <option value="Online">Online Video Call</option>
                  <option value="In-person">In-person Campus Meetup</option>
                </select>
              </div>
            </div>

            {/* Note to peer */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Note to Peer (Optional):
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Suggest topics or preferred dates for our first exchange..."
                rows="2"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          {/* Value promise */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Guaranteed zero financial cost. Both peers gain credits upon mutual completion.</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={closeModals}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-sm font-bold rounded-xl shadow-md shadow-brand-500/20 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Send Exchange Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

