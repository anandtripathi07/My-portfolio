import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import {
  Wrench,
  Plus,
  Trash2,
  Search,
  Code,
  Terminal,
  Cpu,
  BarChart3,
  Share2,
  Layers,
  Sparkles,
} from 'lucide-react';

export const SkillsGrid: React.FC = () => {
  const { profile, addSkill, deleteSkill } = useProfile();
  const { skills } = profile;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend Development');

  const categories = [
    'Frontend Development',
    'Programming Languages',
    'AI and Machine Learning',
    'Data Analytics',
    'Digital Marketing',
    'Tools and Platforms',
  ];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Frontend Development':
        return Code;
      case 'Programming Languages':
        return Terminal;
      case 'AI and Machine Learning':
        return Cpu;
      case 'Data Analytics':
        return BarChart3;
      case 'Digital Marketing':
        return Share2;
      case 'Tools and Platforms':
      default:
        return Layers;
    }
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({
      name: newSkillName.trim(),
      category: newSkillCategory,
      isVerified: true,
    });
    setNewSkillName('');
    setIsAddingSkill(false);
  };

  return (
    <section id="skills" className="py-12 border-t border-neutral-800/80">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
              03 · Technical Competencies
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 tracking-tight">
              Skills Dashboard
            </h2>
            <p className="text-xs text-neutral-400">
              Verified technical capabilities organized across engineering, intelligence, and analytical disciplines.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddingSkill((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAddingSkill ? 'Cancel' : 'Add Skill'}</span>
            </button>
          </div>
        </div>

        {/* Quick Add Inline Form */}
        {isAddingSkill && (
          <form
            onSubmit={handleCreateSkill}
            className="p-4 rounded-xl bg-neutral-900/90 border border-indigo-500/30 flex flex-wrap items-center gap-3 animate-in fade-in"
          >
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g. PyTorch, SQL, React Native"
              className="flex-1 min-w-[200px] text-xs bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
              autoFocus
            />

            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
              className="text-xs bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 focus:outline-hidden focus:border-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors"
            >
              Save Skill
            </button>
          </form>
        )}

        {/* Filter Controls Bar (Interactive Segmented Buttons) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              All Skills ({skills.length})
            </button>

            {categories.map((cat) => {
              const count = skills.filter((s) => s.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-neutral-800 text-white shadow-xs'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-60 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter technologies..."
              className="w-full text-xs bg-neutral-900 border border-neutral-800 rounded-lg pl-8 pr-3 py-2 text-neutral-200 placeholder:text-neutral-500 focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Skills Grid Rendered by Category */}
        <div className="space-y-6">
          {(activeCategory === 'all' ? categories : [activeCategory]).map((categoryName) => {
            const categorySkills = filteredSkills.filter(
              (s) => s.category === categoryName
            );
            if (categorySkills.length === 0) return null;

            const CategoryIcon = getCategoryIcon(categoryName);

            return (
              <div
                key={categoryName}
                className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-neutral-800/60 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-200">
                    <CategoryIcon className="w-4 h-4 text-indigo-400" />
                    <span>{categoryName}</span>
                    <span className="text-[11px] font-mono text-neutral-400 font-normal">
                      ({categorySkills.length})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="group relative flex items-center justify-between p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800 hover:border-neutral-700 transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        <span className="text-xs font-medium text-neutral-200 truncate">
                          {skill.name}
                        </span>
                      </div>

                      <button
                        onClick={() => deleteSkill(skill.id)}
                        className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-rose-400 transition-opacity p-0.5"
                        title="Delete skill"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredSkills.length === 0 && (
            <div className="p-8 text-center rounded-xl bg-neutral-900/30 border border-dashed border-neutral-800 text-neutral-400 text-xs">
              No skills match &quot;{searchQuery}&quot;. Try adjusting your filter or add a new skill above.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
