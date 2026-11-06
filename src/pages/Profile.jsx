import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Star,
  Coins,
  Repeat,
  Plus,
  Trash2,
  CheckCircle2,
  Save,
  BookOpen,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { useSkillSwap } from '../context/SkillSwapContext';

export default function Profile() {
  const { currentUser, updateUserProfile } = useSkillSwap();

  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    department: currentUser.department || '',
    year: currentUser.year || '',
    bio: currentUser.bio || '',
    format: currentUser.learningPreferences?.format || 'Hybrid',
    availability: currentUser.learningPreferences?.availability || 'Evenings & Weekends',
  });

  const [skillsOffered, setSkillsOffered] = useState(currentUser.skillsOffered || []);
  const [skillsWanted, setSkillsWanted] = useState(currentUser.skillsWanted || []);

  const [newTeachSkill, setNewTeachSkill] = useState('');
  const [newTeachLevel, setNewTeachLevel] = useState('Intermediate');
  const [newWantSkill, setNewWantSkill] = useState('');

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTeachSkill = () => {
    if (!newTeachSkill.trim()) return;
    setSkillsOffered(prev => [
      ...prev,
      { name: newTeachSkill.trim(), category: 'General', level: newTeachLevel, desc: 'Student mentor' }
    ]);
    setNewTeachSkill('');
  };

  const handleRemoveTeachSkill = (index) => {
    setSkillsOffered(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddWantSkill = () => {
    if (!newWantSkill.trim()) return;
    setSkillsWanted(prev => [
      ...prev,
      { name: newWantSkill.trim(), category: 'General', level: 'Beginner', desc: 'Wants to master' }
    ]);
    setNewWantSkill('');
  };

  const handleRemoveWantSkill = (index) => {
    setSkillsWanted(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: formData.name,
      department: formData.department,
      year: formData.year,
      bio: formData.bio,
      skillsOffered,
      skillsWanted,
      learningPreferences: {
        ...currentUser.learningPreferences,
        format: formData.format,
        availability: formData.availability
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md mb-2 border border-brand-200">
          <User className="w-3.5 h-3.5 text-brand-600" />
          <span>Student Identity & Skills Matrix</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Student Profile
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize what you can teach and what you want to learn. Changes immediately recalculate reciprocal compatibility.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-brand-500/10 shadow-md"
          />
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{currentUser.name}</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {currentUser.department} • <span className="text-brand-600 font-semibold">{currentUser.year}</span>
            </p>
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-lg border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{currentUser.rating} ({currentUser.reviewsCount} reviews)</span>
              </span>
              <span className="flex items-center gap-1 bg-brand-50 text-brand-700 text-xs font-bold px-2.5 py-0.5 rounded-lg border border-brand-200">
                <Coins className="w-3.5 h-3.5 text-brand-600" />
                <span>{currentUser.skillCredits} Credits</span>
              </span>
              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-lg border border-emerald-200">
                <Repeat className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentUser.completedExchanges} Swaps</span>
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveAll}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-brand-500/20 transition-all cursor-pointer self-start md:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </div>

      {/* Editing Form */}
      <form onSubmit={handleSaveAll} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details & Preferences */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base pb-2 border-b border-slate-100">
            Personal & Campus Details
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleProfileChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleProfileChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Year of Study
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleProfileChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Bio / Learning Philosophy
            </label>
            <textarea
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleProfileChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Learning Mode
              </label>
              <select
                name="format"
                value={formData.format}
                onChange={handleProfileChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Online">Online</option>
                <option value="In-person">In-person</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Availability
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleProfileChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                <option value="Evenings & Weekends">Evenings & Weekends</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>
        </div>

        {/* Skills Matrix (Teach & Learn) */}
        <div className="space-y-6">
          {/* Skills I Can Teach */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Skills I Can Teach ({skillsOffered.length})
              </span>
            </h3>

            {/* Existing offered skills */}
            <div className="flex flex-wrap gap-2">
              {skillsOffered.map((sk, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1.5 rounded-xl text-xs font-semibold"
                >
                  <span>{sk.name}</span>
                  <span className="text-[10px] text-emerald-600 font-normal">({sk.level})</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTeachSkill(idx)}
                    className="ml-1 text-emerald-500 hover:text-emerald-700 p-0.5"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add new teach skill */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newTeachSkill}
                onChange={(e) => setNewTeachSkill(e.target.value)}
                placeholder="Add skill to teach (e.g. Flutter, SQL)..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <select
                value={newTeachLevel}
                onChange={(e) => setNewTeachLevel(e.target.value)}
                className="px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button
                type="button"
                onClick={handleAddTeachSkill}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Skills I Want to Learn */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500"></span>
                Skills I Want to Learn ({skillsWanted.length})
              </span>
            </h3>

            {/* Existing wanted skills */}
            <div className="flex flex-wrap gap-2">
              {skillsWanted.map((sk, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 bg-brand-50 text-brand-800 border border-brand-200/80 px-3 py-1.5 rounded-xl text-xs font-semibold"
                >
                  <span>{sk.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveWantSkill(idx)}
                    className="ml-1 text-brand-500 hover:text-brand-700 p-0.5"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add new want skill */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newWantSkill}
                onChange={(e) => setNewWantSkill(e.target.value)}
                placeholder="Add skill to learn (e.g. Design Systems, Cloud)..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
              <button
                type="button"
                onClick={handleAddWantSkill}
                className="px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

