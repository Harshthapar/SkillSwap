import React, { useState } from 'react';
import { X, Plus, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { useSkillSwap } from '../context/SkillSwapContext';
import { SKILL_CATEGORIES } from '../data/mockData';

export default function SkillOfferModal() {
  const { activeModal, closeModals, addSkillOffer } = useSkillSwap();

  if (activeModal !== 'offer') return null;

  const [formData, setFormData] = useState({
    skillName: '',
    category: 'Programming',
    experienceLevel: 'Intermediate',
    description: '',
    canTeach: '',
    wantToLearn: '',
    availability: 'Evenings & Weekends',
    learningMode: 'Hybrid'
  });

  const categories = SKILL_CATEGORIES.filter(c => c !== 'All Categories');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.skillName.trim()) return;

    addSkillOffer(formData);
    closeModals();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="bg-brand-50 text-brand-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-brand-200">
              Peer Learning Community
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">Create Skill Offer</h2>
          </div>
          <button
            onClick={closeModals}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Skill Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Skill Name *
              </label>
              <input
                type="text"
                name="skillName"
                required
                value={formData.skillName}
                onChange={handleChange}
                placeholder="e.g. Next.js, Figma, Python..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Experience level & Learning Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Experience Level
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                <option value="Beginner">Beginner (Foundations)</option>
                <option value="Intermediate">Intermediate (Practical Projects)</option>
                <option value="Advanced">Advanced (Production & Mastery)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Learning Mode
              </label>
              <select
                name="learningMode"
                value={formData.learningMode}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Online">Online Video / Screen Share</option>
                <option value="In-person">In-person Campus Meetup</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Description / What I Can Teach
            </label>
            <textarea
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain key concepts, tools, or projects you can guide a peer through..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          {/* What I want to learn in return */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              What I Want To Learn In Return (Reverse Match Anchor)
            </label>
            <input
              type="text"
              name="wantToLearn"
              value={formData.wantToLearn}
              onChange={handleChange}
              placeholder="e.g. UI/UX Design, Docker, Video Editing, Statistics..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          {/* Preferred Availability */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Preferred Availability
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="Evenings & Weekends">Evenings & Weekends</option>
              <option value="Weekdays">Weekdays (After classes)</option>
              <option value="Weekends Only">Weekends Only</option>
              <option value="Flexible Schedule">Flexible Schedule</option>
            </select>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
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
              <span>Publish Skill Offer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

