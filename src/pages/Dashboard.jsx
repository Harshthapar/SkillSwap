import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Coins,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Repeat,
  Plus
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import MatchCard from '../components/MatchCard';
import SkillCard from '../components/SkillCard';
import { useSkillSwap } from '../context/SkillSwapContext';

export default function Dashboard({ setActivePage }) {
  const { currentUser, students, exchanges, setActiveModal } = useSkillSwap();

  const skillsOfferedCount = currentUser.skillsOffered?.length || 0;
  const skillsLearningCount = currentUser.skillsWanted?.length || 0;
  const activeExchangesCount = exchanges.filter(e => e.status === 'Active' || e.status === 'Accepted').length;
  const skillCreditsBalance = currentUser.skillCredits || 0;

  // Top 2 recommended matches
  const recommendedStudents = students.slice(0, 2);

  // Discover preview (3 students)
  const discoverPreview = students.slice(2, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Dashboard Top Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-brand-950 to-brand-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-brand-950/10">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-brand-200 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>Campus Peer Knowledge Exchange</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Skill Exchange Dashboard
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Discover talent. Share knowledge. Build new skills without monetary cost.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveModal('offer')}
              className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-brand-500/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Offer a Skill</span>
            </button>
            <button
              onClick={() => setActivePage('matches')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 active:bg-white/25 text-white font-semibold text-sm px-4 py-2.5 rounded-xl border border-white/15 backdrop-blur-xs transition-all cursor-pointer"
            >
              <span>Explore Reciprocal Matches</span>
              <ArrowRight className="w-4 h-4 text-brand-300" />
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-brand-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-32 top-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatsCard
          title="Skills Offered"
          value={skillsOfferedCount}
          icon={GraduationCap}
          color="brand"
          subtext="Active Mentorship"
          onClick={() => setActivePage('profile')}
        />
        <StatsCard
          title="Skills Learning"
          value={skillsLearningCount}
          icon={BookOpen}
          color="indigo"
          subtext="In Progress"
          onClick={() => setActivePage('discover')}
        />
        <StatsCard
          title="Active Exchanges"
          value={activeExchangesCount}
          icon={Repeat}
          color="emerald"
          subtext="Scheduled Peer Swaps"
          onClick={() => setActivePage('exchanges')}
        />
        <StatsCard
          title="Skill Credits"
          value={skillCreditsBalance}
          icon={Coins}
          color="amber"
          subtext="Earned via Teaching"
          onClick={() => setActivePage('wallet')}
        />
      </div>

      {/* Section: Reverse Skill Matching Highlight */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Top Reciprocal Matches
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Students who can teach what you want to learn, and want to learn what you can teach.
            </p>
          </div>
          <button
            onClick={() => setActivePage('matches')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recommendedStudents.map(student => (
            <MatchCard key={student.id} student={student} />
          ))}
        </div>
      </section>

      {/* Section: Trending Skill Discovery Preview */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Explore Peer Talent
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Recent skill offers published across campus departments.
            </p>
          </div>
          <button
            onClick={() => setActivePage('discover')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Browse All ({students.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {discoverPreview.map(student => (
            <SkillCard key={student.id} student={student} />
          ))}
        </div>
      </section>

      {/* Quick How-It-Works Educational Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          How SkillSwap Zero-Cost Learning Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-700 font-extrabold text-sm flex items-center justify-center shrink-0 border border-brand-200">
              1
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">List Your Skills</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Publish what you can teach and what you want to learn. No fees or payments required.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 font-extrabold text-sm flex items-center justify-center shrink-0 border border-purple-200">
              2
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Reverse Matching</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Our algorithm discovers reciprocal pairs where both peers benefit from mutual mentorship.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-sm flex items-center justify-center shrink-0 border border-emerald-200">
              3
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Earn Skill Credits</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Complete structured sessions (30-60m) to accumulate credits and build your campus reputation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

