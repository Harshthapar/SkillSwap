import React from 'react';
import { BookOpen, Sparkles, MapPin, Clock, Star, Coins, ArrowRight } from 'lucide-react';
import { useSkillSwap } from '../context/SkillSwapContext';

export default function SkillCard({ student, onConnect }) {
  const { openExchangeModal } = useSkillSwap();

  const handleConnect = () => {
    if (onConnect) {
      onConnect(student);
    } else {
      openExchangeModal(student);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-lg hover:border-brand-300 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Student Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 group-hover:ring-brand-400 transition-all"
            />
            <div>
              <h3 className="font-bold text-slate-800 text-base leading-tight group-hover:text-brand-700 transition-colors">
                {student.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {student.department} • <span className="text-brand-600 font-semibold">{student.year}</span>
              </p>
            </div>
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-lg text-xs font-bold shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{student.rating}</span>
          </div>
        </div>

        {/* Bio snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed font-normal">
          {student.bio}
        </p>

        {/* Skills Section */}
        <div className="space-y-3 pt-1 border-t border-slate-100">
          {/* Can Teach */}
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Can Teach ({student.skillsOffered?.length || 0})</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {student.skillsOffered?.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-semibold px-2.5 py-1 rounded-lg"
                >
                  {skill.name} <span className="text-[10px] text-emerald-600 font-normal">({skill.level})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Wants to Learn */}
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-700 uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
              <span>Wants to Learn ({student.skillsWanted?.length || 0})</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {student.skillsWanted?.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-brand-50 text-brand-800 border border-brand-200/60 text-xs font-semibold px-2.5 py-1 rounded-lg"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{student.learningPreferences?.availability || 'Flexible'}</span>
          </div>
          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
            {student.learningPreferences?.format || 'Hybrid'}
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50/80 px-2.5 py-1 rounded-lg">
          <Coins className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-xs font-bold">{student.skillCredits}</span>
          <span className="text-[10px] text-amber-600">cr</span>
        </div>

        <button
          onClick={handleConnect}
          className="flex-1 flex items-center justify-center gap-1.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <span>Connect & Swap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

