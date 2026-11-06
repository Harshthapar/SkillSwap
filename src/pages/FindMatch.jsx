import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowRightLeft,
  CheckCircle2,
  Info,
  SlidersHorizontal,
  Zap,
  TrendingUp,
  Clock
} from 'lucide-react';
import MatchCard from '../components/MatchCard';
import { useSkillSwap } from '../context/SkillSwapContext';
import { calculateMatchScore } from '../utils/matchingAlgorithm';

export default function FindMatch() {
  const { students, currentUser } = useSkillSwap();
  const [minScore, setMinScore] = useState(60);
  const [filterMode, setFilterMode] = useState('All');

  // Compute matched students with scores
  const matchedList = useMemo(() => {
    return students
      .map(student => ({
        ...student,
        matchScore: calculateMatchScore(currentUser, student)
      }))
      .filter(student => {
        if (student.matchScore < minScore) return false;
        if (filterMode !== 'All') {
          if (filterMode === 'High' && student.matchScore < 85) return false;
          if (filterMode === 'Prime' && student.matchScore < 90) return false;
        }
        return true;
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [students, currentUser, minScore, filterMode]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md mb-2 border border-brand-200">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>Intelligent Reverse Skill Matching</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Reciprocal Peer Matches
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          SkillSwap calculates match compatibility based on mutual skill reciprocity, schedule overlap, and preferred learning formats.
        </p>
      </div>

      {/* Explanatory banner */}
      <div className="bg-gradient-to-r from-brand-900 to-navy-950 text-white rounded-2xl p-5 sm:p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-300" />
              Transparent Reverse Matching Algorithm
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              Matches are scored on <strong>55% Skill Reciprocity</strong> (you teach what they want, they teach what you want), <strong>25% Availability overlap</strong>, and <strong>20% Learning Mode compatibility</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs">
            <div className="text-center px-2">
              <span className="block font-extrabold text-lg text-brand-300">55%</span>
              <span className="text-[10px] text-slate-300">Reciprocal</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-2">
              <span className="block font-extrabold text-lg text-emerald-300">25%</span>
              <span className="text-[10px] text-slate-300">Availability</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-2">
              <span className="block font-extrabold text-lg text-purple-300">20%</span>
              <span className="text-[10px] text-slate-300">Format</span>
            </div>
          </div>
        </div>
      </div>

      {/* Matching Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Min score slider */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider shrink-0">
            Min Compatibility: <span className="text-brand-600 font-extrabold">{minScore}%</span>
          </label>
          <input
            type="range"
            min="30"
            max="95"
            step="5"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
          />
        </div>

        {/* Filter Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">Filter:</span>
          {['All', 'High (85%+)', 'Prime (90%+)'].map((filter) => {
            const val = filter.split(' ')[0];
            const isActive = filterMode === val;
            return (
              <button
                key={filter}
                onClick={() => setFilterMode(val)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Matches Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Found <strong className="text-slate-800">{matchedList.length}</strong> compatible reciprocal matches</span>
          <span>Ranked by compatibility percentage</span>
        </div>

        {matchedList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No matches found at this threshold</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Lower the minimum compatibility percentage slider to view more potential swap partners.
            </p>
            <button
              onClick={() => { setMinScore(50); setFilterMode('All'); }}
              className="mt-2 text-xs font-bold text-brand-600 hover:text-brand-700 underline cursor-pointer"
            >
              Reset to 50% Threshold
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {matchedList.map(student => (
              <MatchCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

