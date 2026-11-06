import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  X,
  ArrowUpDown,
  SlidersHorizontal,
  Compass,
  GraduationCap
} from 'lucide-react';
import SkillCard from '../components/SkillCard';
import { useSkillSwap } from '../context/SkillSwapContext';
import { SKILL_CATEGORIES } from '../data/mockData';
import { calculateMatchScore } from '../utils/matchingAlgorithm';

export default function DiscoverSkills() {
  const { students, currentUser } = useSkillSwap();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedFormat, setSelectedFormat] = useState('All Formats');
  const [selectedAvailability, setSelectedAvailability] = useState('All Availabilities');
  const [sortBy, setSortBy] = useState('compatibility'); // 'compatibility' | 'credits' | 'recent'

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedLevel('All Levels');
    setSelectedFormat('All Formats');
    setSelectedAvailability('All Availabilities');
    setSortBy('compatibility');
  };

  const isFiltered = searchTerm !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedLevel !== 'All Levels' ||
    selectedFormat !== 'All Formats' ||
    selectedAvailability !== 'All Availabilities';

  // Filtered & Sorted student list
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // 1. Search filter: student name, skill name, department
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = student.name.toLowerCase().includes(query);
        const matchesDept = student.department.toLowerCase().includes(query);
        const matchesTeachSkill = student.skillsOffered?.some(s => s.name.toLowerCase().includes(query));
        const matchesWantSkill = student.skillsWanted?.some(s => s.name.toLowerCase().includes(query));

        if (!matchesName && !matchesDept && !matchesTeachSkill && !matchesWantSkill) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'All Categories') {
        const matchesCategory = student.skillsOffered?.some(s => s.category === selectedCategory) ||
          student.skillsWanted?.some(s => s.category === selectedCategory);
        if (!matchesCategory) return false;
      }

      // 3. Experience level filter
      if (selectedLevel !== 'All Levels') {
        const matchesLevel = student.skillsOffered?.some(s => s.level.toLowerCase() === selectedLevel.toLowerCase());
        if (!matchesLevel) return false;
      }

      // 4. Learning format filter
      if (selectedFormat !== 'All Formats') {
        if (student.learningPreferences?.format !== selectedFormat) return false;
      }

      // 5. Availability filter
      if (selectedAvailability !== 'All Availabilities') {
        if (!student.learningPreferences?.availability?.includes(selectedAvailability)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'compatibility') {
        const scoreA = calculateMatchScore(currentUser, a);
        const scoreB = calculateMatchScore(currentUser, b);
        return scoreB - scoreA;
      }
      if (sortBy === 'credits') {
        return (b.skillCredits || 0) - (a.skillCredits || 0);
      }
      // 'recent'
      return (b.completedExchanges || 0) - (a.completedExchanges || 0);
    });
  }, [students, searchTerm, selectedCategory, selectedLevel, selectedFormat, selectedAvailability, sortBy, currentUser]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md mb-2 border border-brand-200">
            <Compass className="w-3.5 h-3.5" />
            <span>Campus Talent Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover Skills
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse student-mentors, explore skill offerings, and expand your abilities together.
          </p>
        </div>

        {/* Clear Filters CTA */}
        {isFiltered && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-xl transition-all self-start sm:self-auto cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name, skill (e.g. C++, Figma, Python), or department..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Category */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              {SKILL_CATEGORIES.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="All Levels">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Format */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Learning Format
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="All Formats">All Formats</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Online">Online</option>
              <option value="In-person">In-person</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Availability
            </label>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="All Availabilities">All Times</option>
              <option value="Weekend">Weekends</option>
              <option value="Evening">Evenings</option>
              <option value="Weekday">Weekdays</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="compatibility">Highest Compatibility</option>
              <option value="credits">Most Skill Credits</option>
              <option value="recent">Most Completed Swaps</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs font-medium text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-800">{filteredStudents.length}</strong> student mentors
        </span>
        {isFiltered && (
          <span className="text-brand-600 font-semibold">Active filters applied</span>
        )}
      </div>

      {/* Profile Cards Grid */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No matching peer profiles found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting filters to view all available student skills.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-2 text-xs font-bold text-brand-600 hover:text-brand-700 underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStudents.map(student => (
            <SkillCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
}

