import React from 'react';
import { Sparkles, ArrowRightLeft, Clock, MapPin, Zap } from 'lucide-react';
import { useSkillSwap } from '../context/SkillSwapContext';
import { calculateMatchScore, getReciprocalDetails } from '../utils/matchingAlgorithm';

export default function MatchCard({ student, onConnect }) {
  const { currentUser, openExchangeModal } = useSkillSwap();

  const score = calculateMatchScore(currentUser, student);
  const { youTeach, peerTeaches } = getReciprocalDetails(currentUser, student);

  const getScoreColor = (val) => {
    if (val >= 85) return 'from-emerald-500 to-teal-600 text-emerald-700 bg-emerald-50 border-emerald-200';
    if (val >= 70) return 'from-brand-500 to-purple-600 text-brand-700 bg-brand-50 border-brand-200';
    return 'from-amber-500 to-orange-600 text-amber-700 bg-amber-50 border-amber-200';
  };

  const scoreStyle = getScoreColor(score);

  const handleConnect = () => {
    if (onConnect) {
      onConnect(student);
    } else {
      openExchangeModal(student);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-brand-400 transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
      {/* Top Banner highlight for >90% compatibility */}
      {score >= 90 && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-teal-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl tracking-wider uppercase flex items-center gap-1 shadow-xs">
          <Zap className="w-3 h-3 fill-white" />
          <span>Prime Reciprocal Match</span>
        </div>
      )}

      <div>
        {/* Profile info & Compatibility Circle */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-13 h-13 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-brand-400 transition-all"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-700 transition-colors">
                  {student.name}
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {student.department} • <span className="text-brand-600">{student.year}</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Active {student.recentlyActive || 'recently'}
              </p>
            </div>
          </div>

          {/* Compatibility Score Pill */}
          <div className="flex flex-col items-end shrink-0">
            <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${scoreStyle.split(' ').slice(2).join(' ')}`}>
              <Sparkles className="w-4 h-4 shrink-0 text-brand-600" />
              <div className="text-right">
                <span className="text-base font-extrabold tracking-tight">{score}%</span>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Compatibility
            </span>
          </div>
        </div>

        {/* Reverse Skill Matching Exchange Banner */}
        <div className="bg-gradient-to-br from-brand-50/70 via-purple-50/40 to-slate-50 border border-brand-100 rounded-xl p-3.5 mb-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> You Teach
            </span>
            <ArrowRightLeft className="w-3.5 h-3.5 text-brand-500" />
            <span className="text-brand-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span> Peer Teaches
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-white/80 backdrop-blur-xs p-2 rounded-lg border border-slate-200/60 shadow-2xs">
              <span className="text-xs font-bold text-slate-800 block truncate">{youTeach}</span>
              <span className="text-[10px] text-slate-500">From your skills</span>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-2 rounded-lg border border-slate-200/60 shadow-2xs">
              <span className="text-xs font-bold text-slate-800 block truncate">{peerTeaches}</span>
              <span className="text-[10px] text-slate-500">From peer's skills</span>
            </div>
          </div>
        </div>

        {/* Detailed Skills breakdown */}
        <div className="space-y-2 mb-4 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-slate-400 font-medium">Offered:</span>
            <span className="font-semibold text-slate-700 text-right truncate max-w-[200px]">
              {student.skillsOffered?.map(s => s.name).join(', ')}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-slate-400 font-medium">Desired:</span>
            <span className="font-semibold text-slate-700 text-right truncate max-w-[200px]">
              {student.skillsWanted?.map(s => s.name).join(', ')}
            </span>
          </div>
        </div>

        {/* Availability & Mode */}
        <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{student.learningPreferences?.availability}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-slate-600">
            <span>{student.learningPreferences?.format}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="text-xs text-slate-500">
          <span className="font-bold text-slate-800">{student.completedExchanges || 0}</span> swaps completed
        </div>

        <button
          onClick={handleConnect}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <span>Connect & Exchange</span>
          <ArrowRightLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

