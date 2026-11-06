import React from 'react';
import {
  Users,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Star
} from 'lucide-react';
import { COMMUNITY_ACTIVITIES } from '../data/mockData';
import { useSkillSwap } from '../context/SkillSwapContext';

export default function Community({ setActivePage }) {
  const { students, openExchangeModal } = useSkillSwap();

  const trendingSkills = [
    { name: 'UI/UX & Figma', learners: 42, growth: '+28%' },
    { name: 'Machine Learning & PyTorch', learners: 38, growth: '+35%' },
    { name: 'React.js & Next.js', learners: 34, growth: '+22%' },
    { name: 'Embedded C++ & Robotics', learners: 26, growth: '+19%' },
    { name: 'Public Speaking & Debate', learners: 21, growth: '+14%' },
  ];

  const topMentors = students
    .slice()
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  const achievements = [
    { title: 'Campus Mentor of the Month', holder: 'Priya Nair', badge: '🥇 Gold Tier', dept: 'AI Lab' },
    { title: 'Fastest 20 Swaps Milestone', holder: 'Karan Sharma', badge: '⚡ Velocity', dept: 'CS Dept' },
    { title: 'Best Design Critique Lead', holder: 'Elena Rostova', badge: '🎨 Masterclass', dept: 'Design School' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md mb-2 border border-brand-200">
          <Users className="w-3.5 h-3.5 text-brand-600" />
          <span>Student Knowledge Network</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Community Hub
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore campus learning trends, discover top student mentors, and stay inspired by peer activity.
        </p>
      </div>

      {/* Grid: Trending Skills & Top Mentors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h2 className="text-base font-bold text-slate-900">Live Peer Activity Feed</h2>
              </div>
              <span className="text-xs text-slate-400 font-medium">Real-time updates</span>
            </div>

            <div className="divide-y divide-slate-100">
              {COMMUNITY_ACTIVITIES.map(act => (
                <div key={act.id} className="py-3.5 flex items-start gap-3.5">
                  <img
                    src={act.avatar}
                    alt={act.user}
                    className="w-10 h-10 rounded-xl object-cover shrink-0 ring-1 ring-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-bold">{act.user}</strong>{' '}
                      {act.action}{' '}
                      <strong className="text-brand-700 font-semibold">{act.target}</strong>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{act.details}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Recognition & Achievements */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-slate-900">Student Honors & Badges</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {achievements.map((ach, idx) => (
                <div key={idx} className="bg-gradient-to-br from-amber-50/60 to-purple-50/40 border border-amber-200/60 p-4 rounded-xl">
                  <span className="text-xs font-bold text-amber-800 block mb-1">{ach.badge}</span>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">{ach.title}</h4>
                  <p className="text-[11px] text-slate-600 font-medium mt-1">{ach.holder} • {ach.dept}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Trending Skills & Mentors */}
        <div className="space-y-6">
          {/* Trending Skills */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <h2 className="text-base font-bold text-slate-900">Trending Skills</h2>
            </div>
            <div className="space-y-3">
              {trendingSkills.map((sk, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs pb-2 border-b border-slate-50 last:border-0 last:pb-0">
                  <div>
                    <span className="font-bold text-slate-800 block">{sk.name}</span>
                    <span className="text-[10px] text-slate-400">{sk.learners} students seeking</span>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[11px]">
                    {sk.growth}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Student Mentors */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Top Mentors</h2>
              <button
                onClick={() => setActivePage('discover')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 cursor-pointer"
              >
                View all
              </button>
            </div>
            <div className="space-y-3.5">
              {topMentors.map(mentor => (
                <div key={mentor.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-9 h-9 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">{mentor.name}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{mentor.skillsOffered[0]?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg shrink-0">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{mentor.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

